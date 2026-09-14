import React from 'react';
import { Specialty, SpecialtyMetrics } from '../types';
import { RadarChart } from './RadarChart';
import { X, GitCompare, Trash2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ComparisonModalProps {
  specialties: Specialty[];
  onClose: () => void;
  onRemoveSpecialty: (specialtyId: string) => void;
  onClearAll: () => void;
}

const METRICS_LABELS: { key: keyof SpecialtyMetrics; label: string }[] = [
  { key: 'lifestyle', label: 'جودة الحياة والراحة' },
  { key: 'income', label: 'الدخل والخاص' },
  { key: 'manual', label: 'المهارة اليدوية' },
  { key: 'contact', label: 'التواصل الإنساني' },
  { key: 'stress', label: 'تحمل التوتر والحدة' },
  { key: 'intellectual', label: 'العمق الفكري' },
  { key: 'research', label: 'البحث العلمي' }
];

export const ComparisonModal: React.FC<ComparisonModalProps> = ({
  specialties,
  onClose,
  onRemoveSpecialty,
  onClearAll
}) => {
  if (specialties.length === 0) return null;

  const specA = specialties[0];
  const specB = specialties[1];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="relative w-full max-w-5xl bg-[#080d20] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-[#0e1738]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
              <GitCompare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                مقارنة التخصصات الطبية وجهاً لوجه
              </h2>
              <p className="text-xs text-slate-400">
                مقارنة تفصيلية بين {specialties.length} تخصصات في المعايير ومتطلبات القبول
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-compare-clear"
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/70 hover:text-rose-300 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>إفراغ القائمة</span>
            </button>

            <button
              id="btn-compare-close"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          {/* Radar Comparison if 2 items */}
          {specA && specB && (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col items-center">
              <h3 className="text-sm font-bold text-slate-300 mb-2">
                تطابق الرادار المتقاطع بين التخصصين
              </h3>
              <RadarChart
                metrics={specA.metrics}
                comparisonMetrics={specB.metrics}
                label={specA.name}
                comparisonLabel={specB.name}
                size={290}
              />
            </div>
          )}

          {/* Side by Side Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specialties.map((spec, sIdx) => {
              const badgeColor = sIdx === 0 ? 'text-cyan-400' : 'text-amber-400';

              return (
                <div
                  key={spec.id}
                  className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    {/* Header line */}
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {spec.category}
                        </span>
                        <h3 className="text-2xl font-black text-white mt-1">{spec.name}</h3>
                        <p className="text-xs font-mono text-slate-400">{spec.englishName}</p>
                      </div>

                      <button
                        onClick={() => onRemoveSpecialty(spec.id)}
                        className="text-slate-500 hover:text-rose-400 p-1.5 transition-colors cursor-pointer"
                        title="إزالة من المقارنة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Quick Specs */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">مدة البورد</div>
                        <div className="font-bold text-white mt-0.5">{spec.duration}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">درجة SMLE</div>
                        <div className="font-bold text-cyan-400 mt-0.5">{spec.smleRange}</div>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                        <div className="text-slate-400 text-[10px]">التنافسية</div>
                        <div className="font-bold text-amber-400 mt-0.5">{spec.competition}</div>
                      </div>
                    </div>

                    {/* Detailed Metric Bars */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-bold text-slate-400">تقييم المعايير الأساسية:</div>
                      {METRICS_LABELS.map((item) => (
                        <div key={item.key} className="space-y-0.5">
                          <div className="flex justify-between text-xs text-slate-300">
                            <span>{item.label}</span>
                            <span className="font-bold font-mono">{spec.metrics[item.key]}/10</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                sIdx === 0 ? 'bg-cyan-500' : 'bg-amber-500'
                              }`}
                              style={{ width: `${spec.metrics[item.key] * 10}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Lifestyle and Income summaries */}
                    <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <div>
                        <span className="font-bold text-slate-400 block mb-0.5">نمط الحياة:</span>
                        <p className="text-slate-300 leading-relaxed">{spec.lifestyle}</p>
                      </div>
                      <div>
                        <span className="font-bold text-emerald-400 block mb-0.5">الدخل المالي:</span>
                        <p className="text-slate-300 leading-relaxed">{spec.income}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
