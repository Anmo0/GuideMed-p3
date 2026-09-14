import React from 'react';
import { Specialty } from '../types';
import { RadarChart } from './RadarChart';
import {
  X,
  Bookmark,
  GitCompare,
  Clock,
  Award,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  HeartHandshake,
  Brain,
  ShieldCheck
} from 'lucide-react';

interface SpecialtyDetailModalProps {
  specialty: Specialty | null;
  onClose: () => void;
  onToggleFavorite: (specialtyId: string) => void;
  isFavorite: (specialtyId: string) => boolean;
  onToggleCompare: (specialty: Specialty) => void;
  isCompared: (specialtyId: string) => boolean;
}

export const SpecialtyDetailModal: React.FC<SpecialtyDetailModalProps> = ({
  specialty,
  onClose,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared
}) => {
  if (!specialty) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
      dir="rtl"
    >
      <div
        className="relative w-full max-w-4xl bg-[#090f22] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-7 border-b border-slate-800 flex items-start justify-between gap-4 bg-gradient-to-r from-slate-900 to-[#0c1633]">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60">
                {specialty.category}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                specialty.trackType === 'residency'
                  ? 'bg-blue-950/80 text-blue-300 border-blue-800/60'
                  : specialty.trackType === 'fellowship'
                  ? 'bg-purple-950/80 text-purple-300 border-purple-800/60'
                  : 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
              }`}>
                {specialty.trackType === 'residency'
                  ? 'برنامج إقامة مباشرة'
                  : specialty.trackType === 'fellowship'
                  ? 'برنامج زمالة دقيقة'
                  : 'مسار مشترك / مدمج'}
              </span>
              <span className="text-xs font-semibold text-slate-400">
                المدة: {specialty.duration}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {specialty.name}
            </h2>
            <p className="text-sm font-mono text-cyan-400 font-semibold mt-0.5">
              {specialty.englishName}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-modal-compare"
              onClick={() => onToggleCompare(specialty)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isCompared(specialty.id)
                  ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
              }`}
              title="مقارنة التخصص"
            >
              <GitCompare className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isCompared(specialty.id) ? 'مضاف للمقارنة' : 'مقارنة'}
              </span>
            </button>

            <button
              id="btn-modal-fav"
              onClick={() => onToggleFavorite(specialty.id)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isFavorite(specialty.id)
                  ? 'bg-amber-950 border-amber-600 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="حفظ في المفضلة"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            <button
              id="btn-modal-close"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 hover:text-rose-400 text-slate-400 border border-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-800/80">
          {/* Section 1: Overview & Radar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-2">
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                طبيعة العمل ونمط المعيشة
              </h3>
              <p className="text-sm text-slate-200 leading-relaxed">
                {specialty.lifestyle}
              </p>

              {specialty.lifestyleShift && (
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-800/60 space-y-1.5 shadow-sm">
                  <div className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                    <span>تحول نمط الحياة والدخل بالتخصص الدقيق:</span>
                  </div>
                  <p className="text-xs text-purple-200 leading-relaxed font-medium">
                    {specialty.lifestyleShift}
                  </p>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-cyan-400" />
                  <span>فئات المرضى والمراجعين:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {specialty.patientType}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span>آفاق الدخل المالي وفرص القطاع الخاص:</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {specialty.income}
                </p>
              </div>
            </div>

            <div className="md:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-slate-400 mb-2">
                رادار المعايير السبعة للتخصص
              </div>
              <RadarChart
                metrics={specialty.metrics}
                label={specialty.name}
                size={270}
                showLegend={false}
              />
            </div>
          </div>

          {/* Section 2: SCFHS Saudi Board Details */}
          <div className="pt-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>تفاصيل البورد السعودي ومتطلبات القبول (SCFHS 2025)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">مدة التدريب</div>
                <div className="text-lg font-bold text-white mt-1">{specialty.duration}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">درجة SMLE التقديرية للقبول</div>
                <div className="text-lg font-bold text-cyan-400 mt-1">{specialty.smleRange}</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="text-xs text-slate-400">مستوى التنافسية</div>
                <div className="text-lg font-bold text-amber-400 mt-1">{specialty.competition}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>مسار التدريب والأهلية:</span>
              </div>
              <p className="text-xs text-white leading-relaxed font-medium">
                {specialty.pathway}
              </p>
              {specialty.parentSpecialty && (
                <div className="text-[11px] text-slate-400 pt-1">
                  البورد الأساسي المؤهل: <span className="text-cyan-300 font-semibold">{specialty.parentSpecialty}</span>
                </div>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-xs font-bold text-slate-300 mb-1">تفاصيل البورد والاعتماد:</div>
              <p className="text-xs text-slate-400 leading-relaxed">
                {specialty.boardDetails}
              </p>
            </div>
          </div>

          {/* Section 3: Pros & Cons */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 space-y-3">
              <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>أبرز المميزات والإيجابيات</span>
              </h4>
              <ul className="space-y-2">
                {specialty.pros.map((pro, pIdx) => (
                  <li key={pIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-emerald-400">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 space-y-3">
              <h4 className="text-sm font-bold text-rose-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                <span>التحديات والصعوبات المحتملة</span>
              </h4>
              <ul className="space-y-2">
                {specialty.cons.map((con, cIdx) => (
                  <li key={cIdx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-rose-400">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 4: Tags */}
          <div className="pt-6">
            <div className="text-xs font-bold text-slate-400 mb-2">الوسوم والمسارات المرتبطة:</div>
            <div className="flex flex-wrap gap-1.5">
              {specialty.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
