import React from 'react';
import { SpecialtyMetrics } from '../types';

interface RadarChartProps {
  metrics: SpecialtyMetrics;
  comparisonMetrics?: SpecialtyMetrics;
  label?: string;
  comparisonLabel?: string;
  size?: number;
  showLegend?: boolean;
}

const METRIC_CONFIG: { key: keyof SpecialtyMetrics; label: string }[] = [
  { key: 'lifestyle', label: 'جودة الحياة' },
  { key: 'income', label: 'الدخل المالي' },
  { key: 'manual', label: 'المهارة اليدوية' },
  { key: 'contact', label: 'التواصل الإنساني' },
  { key: 'stress', label: 'تحمل التوتر' },
  { key: 'intellectual', label: 'العمق الفكري' },
  { key: 'research', label: 'البحث العلمي' }
];

export const RadarChart: React.FC<RadarChartProps> = ({
  metrics,
  comparisonMetrics,
  label = 'التخصص',
  comparisonLabel = 'شخصيتك',
  size = 320,
  showLegend = true
}) => {
  const center = size / 2;
  const radius = (size / 2) * 0.72;
  const totalAxes = METRIC_CONFIG.length;
  const angleStep = (Math.PI * 2) / totalAxes;

  // Function to convert value (1-10) and axis index to SVG (x, y) coordinates
  const getCoordinates = (value: number, index: number) => {
    // Start at the top (-PI/2) and rotate clockwise
    const angle = index * angleStep - Math.PI / 2;
    const normalizedValue = Math.max(1, Math.min(10, value)) / 10;
    const r = radius * normalizedValue;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points string
  const primaryPoints = METRIC_CONFIG.map((item, i) => {
    const coords = getCoordinates(metrics[item.key] || 5, i);
    return `${coords.x},${coords.y}`;
  }).join(' ');

  const comparisonPoints = comparisonMetrics
    ? METRIC_CONFIG.map((item, i) => {
        const coords = getCoordinates(comparisonMetrics[item.key] || 5, i);
        return `${coords.x},${coords.y}`;
      }).join(' ')
    : null;

  // Concentric polygon grids (at 2, 4, 6, 8, 10)
  const gridLevels = [2, 4, 6, 8, 10];

  return (
    <div className="flex flex-col items-center justify-center select-none w-full max-w-full overflow-hidden" dir="rtl">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ maxWidth: size, maxHeight: size }}
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Cyan glow gradient for primary */}
          <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </linearGradient>

          {/* Amber glow gradient for comparison */}
          <linearGradient id="compGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.15" />
          </linearGradient>

          <filter id="radarGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Concentric Web Grid */}
        {gridLevels.map((lvl) => {
          const points = Array.from({ length: totalAxes }, (_, i) => {
            const coords = getCoordinates(lvl, i);
            return `${coords.x},${coords.y}`;
          }).join(' ');
          return (
            <polygon
              key={lvl}
              points={points}
              fill="none"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="1"
              strokeDasharray={lvl === 10 ? 'none' : '3,3'}
            />
          );
        })}

        {/* Axis Lines and Labels */}
        {METRIC_CONFIG.map((item, i) => {
          const outerCoords = getCoordinates(10, i);
          const angle = i * angleStep - Math.PI / 2;
          // Label position slightly beyond the max radius
          const labelDist = radius + 22;
          const labelX = center + labelDist * Math.cos(angle);
          const labelY = center + labelDist * Math.sin(angle);

          return (
            <g key={item.key}>
              <line
                x1={center}
                y1={center}
                x2={outerCoords.x}
                y2={outerCoords.y}
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="1"
              />
              <text
                x={labelX}
                y={labelY + 4}
                textAnchor="middle"
                className="text-[10.5px] font-semibold fill-slate-300"
              >
                {item.label}
              </text>
            </g>
          );
        })}

        {/* Comparison Polygon (e.g. User Profile) */}
        {comparisonPoints && (
          <polygon
            points={comparisonPoints}
            fill="url(#compGradient)"
            stroke="#f59e0b"
            strokeWidth="2"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-out"
          />
        )}

        {/* Primary Polygon (e.g. Specialty) */}
        <polygon
          points={primaryPoints}
          fill="url(#primaryGradient)"
          stroke="#06b6d4"
          strokeWidth="2.5"
          strokeLinejoin="round"
          filter="url(#radarGlow)"
          className="transition-all duration-500 ease-out"
        />

        {/* Primary Points (Dots) */}
        {METRIC_CONFIG.map((item, i) => {
          const coords = getCoordinates(metrics[item.key] || 5, i);
          return (
            <circle
              key={item.key}
              cx={coords.x}
              cy={coords.y}
              r="4"
              fill="#06b6d4"
              stroke="#0f172a"
              strokeWidth="1.5"
            />
          );
        })}

        {/* Comparison Points (Dots) */}
        {comparisonMetrics &&
          METRIC_CONFIG.map((item, i) => {
            const coords = getCoordinates(comparisonMetrics[item.key] || 5, i);
            return (
              <circle
                key={`comp-${item.key}`}
                cx={coords.x}
                cy={coords.y}
                r="3.5"
                fill="#f59e0b"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            );
          })}
      </svg>

      {/* Optional Legend */}
      {showLegend && (
        <div className="flex items-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block shadow-sm shadow-cyan-500/50" />
            <span className="text-slate-300 font-medium">{label}</span>
          </div>
          {comparisonMetrics && (
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block shadow-sm shadow-amber-500/50" />
              <span className="text-slate-300 font-medium">{comparisonLabel}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
