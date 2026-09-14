import React, { useState, useMemo } from 'react';
import { Specialty, SpecialtyMetrics } from '../types';
import { computeMatches } from '../utils/scoringEngine';
import { RadarChart } from './RadarChart';
import { Sliders, RotateCcw, Sparkles, Eye, GitCompare, Bookmark, CheckCircle2 } from 'lucide-react';

interface SimulatorScreenProps {
  specialties: Specialty[];
  initialMetrics?: SpecialtyMetrics;
  onOpenSpecialtyDetail: (specialty: Specialty) => void;
  onToggleFavorite: (specialtyId: string) => void;
  isFavorite: (specialtyId: string) => boolean;
  onToggleCompare: (specialty: Specialty) => void;
  isCompared: (specialtyId: string) => boolean;
}

const DEFAULT_METRICS: SpecialtyMetrics = {
  lifestyle: 7,
  income: 7,
  manual: 6,
  contact: 6,
  stress: 5,
  intellectual: 7,
  research: 5
};

const PRESETS: { name: string; desc: string; metrics: SpecialtyMetrics }[] = [
  {
    name: 'أعلى جودة حياة وتوازن أسري',
    desc: 'ساعات عمل نهارية مستقرة، لا مناوبات ليلية، وراحة بال',
    metrics: { lifestyle: 10, income: 7, manual: 4, contact: 6, stress: 2, intellectual: 7, research: 4 }
  },
  {
    name: 'أعلى عائد مالي وعمليات خاصة',
    desc: 'إجراءات تداخلية وجراحية ومناظير مطلوبة بالقطاع الخاص',
    metrics: { lifestyle: 6, income: 10, manual: 9, contact: 6, stress: 6, intellectual: 7, research: 5 }
  },
  {
    name: 'أدرينالين وطوارئ وإنقاذ حاد',
    desc: 'شفتات إسعافية وقرارات حاسمة تحت ضغط عالي',
    metrics: { lifestyle: 4, income: 7, manual: 8, contact: 5, stress: 10, intellectual: 8, research: 4 }
  },
  {
    name: 'عمق فكري وتشخيص ألغاز',
    desc: 'تفكير استنتاجي عميق، مناعة، باطنة، وفحوصات معقدة',
    metrics: { lifestyle: 7, income: 6, manual: 2, contact: 7, stress: 4, intellectual: 10, research: 8 }
  },
  {
    name: 'رعاية إنسانية وتواصل دافئ',
    desc: 'علاقة ثقة طويلة الأمد مع المرضى ودعم نفسي وأسري',
    metrics: { lifestyle: 8, income: 6, manual: 3, contact: 10, stress: 3, intellectual: 7, research: 5 }
  }
];

export const SimulatorScreen: React.FC<SimulatorScreenProps> = ({
  specialties,
  initialMetrics,
  onOpenSpecialtyDetail,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared
}) => {
  const [metrics, setMetrics] = useState<SpecialtyMetrics>(initialMetrics || DEFAULT_METRICS);

  const rankedResults = useMemo(() => {
    return computeMatches(metrics, 'C', 'D', specialties);
  }, [metrics, specialties]);

  const topMatch = rankedResults[0];

  const handleSliderChange = (key: keyof SpecialtyMetrics, value: number) => {
    setMetrics((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const applyPreset = (presetMetrics: SpecialtyMetrics) => {
    setMetrics(presetMetrics);
  };

  const handleReset = () => {
    setMetrics(DEFAULT_METRICS);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8" dir="rtl">
      {/* Title & Presets */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-xs font-bold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>محاكي التفضيلات والسيناريوهات المفتوحة</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              المحاكي التفاعلي المباشر
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              حرّك المؤشرات لاختبار ما يناسب طموحك، وشاهد تغيّر التخصصات الموصى بها في الوقت الفعلي.
            </p>
          </div>

          <button
            id="btn-simulator-reset"
            onClick={handleReset}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة ضبط المعايير</span>
          </button>
        </div>

        {/* Quick Presets Chips */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="text-xs font-bold text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>أنماط مهنية جاهزة سريعة التطبيق:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, idx) => (
              <button
                key={idx}
                id={`btn-preset-${idx}`}
                onClick={() => applyPreset(preset.metrics)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950/60 hover:border-cyan-600/60 border border-slate-700 text-xs font-semibold text-slate-200 transition-all cursor-pointer"
                title={preset.desc}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Controls + Live Visual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6 shadow-xl">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
            تعديل محاور التقييم (من 1 إلى 10)
          </h2>

          <div className="space-y-5">
            {/* Lifestyle */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">جودة الحياة والوقت الأسري</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.lifestyle}/10</span>
              </div>
              <input
                id="slider-lifestyle"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.lifestyle}
                onChange={(e) => handleSliderChange('lifestyle', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = استعداد لعمليات متصلة ومناوبات • 10 = ساعات عيادات نهارية وعطلات كاملة</p>
            </div>

            {/* Income */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">الدخل المالي وفرص القطاع الخاص</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.income}/10</span>
              </div>
              <input
                id="slider-income"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.income}
                onChange={(e) => handleSliderChange('income', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = دخل حكومي/أكاديمي اعتيادي • 10 = أعلى عوائد للإجراءات والعيادات الخاصة</p>
            </div>

            {/* Manual */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">المهارة اليدوية والعمليات والمناظير</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.manual}/10</span>
              </div>
              <input
                id="slider-manual"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.manual}
                onChange={(e) => handleSliderChange('manual', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = عمل تفكيري/استشاري مكتبي • 10 = جراحة معقدة وثبات يد وأدوات حادة</p>
            </div>

            {/* Patient Contact */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">التواصل الإنساني مع المرضى وعائلاتهم</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.contact}/10</span>
              </div>
              <input
                id="slider-contact"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.contact}
                onChange={(e) => handleSliderChange('contact', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = لا يوجد مرضى مباشرين (عينات وأشعة) • 10 = علاقة استشارية دافئة وممتدة</p>
            </div>

            {/* Stress */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">تحمل التوتر والأدرينالين والحالات الحرجة</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.stress}/10</span>
              </div>
              <input
                id="slider-stress"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.stress}
                onChange={(e) => handleSliderChange('stress', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = بيئة هادئة ومضبوطة مسبقاً • 10 = إنعاش وطوارئ وقرارات حياة وموت</p>
            </div>

            {/* Intellectual */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">العمق الفكري والألغاز السريرية</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.intellectual}/10</span>
              </div>
              <input
                id="slider-intellectual"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.intellectual}
                onChange={(e) => handleSliderChange('intellectual', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = تشخيصات واضحة روتينية • 10 = ألغاز مناعية وجينية واستنتاجات معقدة</p>
            </div>

            {/* Research */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm font-semibold">
                <span className="text-white">البحث العلمي والتجارب السريرية</span>
                <span className="text-cyan-400 font-mono font-bold text-base">{metrics.research}/10</span>
              </div>
              <input
                id="slider-research"
                type="range"
                min="1"
                max="10"
                step="1"
                value={metrics.research}
                onChange={(e) => handleSliderChange('research', parseInt(e.target.value, 10))}
                className="w-full accent-cyan-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <p className="text-[11px] text-slate-400">1 = ممارسة سريرية خدمية بحتة • 10 = نشر أوراق وتجارب جزيئية ومؤتمرات</p>
            </div>
          </div>
        </div>

        {/* Live Top Match & Radar Preview Panel */}
        <div className="lg:col-span-5 space-y-6">
          {/* Top Recommendation Box */}
          {topMatch && (
            <div className="p-6 rounded-3xl bg-gradient-to-br from-cyan-950/60 to-slate-900 border border-cyan-500/50 shadow-2xl">
              <div className="flex justify-between items-start mb-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black">
                  التطابق الأول في المحاكي
                </span>
                <span className="text-3xl font-black text-cyan-400">
                  {topMatch.matchPercentage}%
                </span>
              </div>

              <h3 className="text-2xl font-black text-white">{topMatch.specialty.name}</h3>
              <p className="text-xs font-mono text-cyan-300 mb-3">{topMatch.specialty.englishName}</p>

              <div className="flex flex-wrap gap-2 text-xs text-slate-300 mb-4">
                <span className="px-2 py-0.5 rounded bg-slate-800">
                  البورد: {topMatch.specialty.duration}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800">
                  SMLE: {topMatch.specialty.smleRange}
                </span>
              </div>

              <RadarChart
                metrics={topMatch.specialty.metrics}
                comparisonMetrics={metrics}
                label={topMatch.specialty.name}
                comparisonLabel="المعايير المحددة"
                size={240}
              />

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-800">
                <button
                  id="btn-simulator-top-detail"
                  onClick={() => onOpenSpecialtyDetail(topMatch.specialty)}
                  className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>تفاصيل التخصص</span>
                </button>

                <button
                  id="btn-simulator-top-compare"
                  onClick={() => onToggleCompare(topMatch.specialty)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer ${
                    isCompared(topMatch.specialty.id)
                      ? 'bg-indigo-950 border-indigo-500 text-indigo-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                  title="مقارنة"
                >
                  <GitCompare className="w-4 h-4" />
                </button>

                <button
                  id="btn-simulator-top-fav"
                  onClick={() => onToggleFavorite(topMatch.specialty.id)}
                  className={`p-2.5 rounded-xl border text-xs cursor-pointer ${
                    isFavorite(topMatch.specialty.id)
                      ? 'bg-amber-950 border-amber-500 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}
                  title="حفظ"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Next 5 Matches List */}
          <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              التخصصات التالية في الترتيب:
            </h4>
            <div className="space-y-2">
              {rankedResults.slice(1, 6).map((item, idx) => (
                <div
                  key={item.specialty.id}
                  onClick={() => onOpenSpecialtyDetail(item.specialty)}
                  className="p-3 rounded-xl bg-slate-950/50 hover:bg-slate-800/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-5 h-5 rounded bg-slate-800 text-slate-400 text-[11px] font-bold flex items-center justify-center shrink-0">
                      {idx + 2}
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">
                        {item.specialty.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono truncate">
                        {item.specialty.englishName}
                      </div>
                    </div>
                  </div>

                  <span className="text-xs font-extrabold text-sky-400 shrink-0">
                    {item.matchPercentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
