import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { UserEvaluation, Specialty, SpecialtyCategory, TrackType } from '../types';
import { RadarChart } from './RadarChart';
import { DiscPersonalityCard } from './DiscPersonalityCard';
import { MedicalLearningStyleCard } from './MedicalLearningStyleCard';
import {
  Trophy,
  Sparkles,
  Sliders,
  RotateCcw,
  Search,
  Filter,
  Eye,
  GitCompare,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  Brain,
  Share2,
  ShieldCheck,
  GraduationCap,
  Scale,
  HeartHandshake,
  Award,
  Users,
  Cpu,
  Compass,
  Lightbulb,
  Building2,
  Clock,
  GitFork,
  Layers,
  Star,
  BadgeCheck
} from 'lucide-react';

interface ResultsScreenProps {
  evaluation: UserEvaluation;
  onRetakeQuiz: () => void;
  onOpenSimulator: () => void;
  onOpenSpecialtyDetail: (specialty: Specialty) => void;
  onToggleFavorite: (specialtyId: string) => void;
  isFavorite: (specialtyId: string) => boolean;
  onToggleCompare: (specialty: Specialty) => void;
  isCompared: (specialtyId: string) => boolean;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  evaluation,
  onRetakeQuiz,
  onOpenSimulator,
  onOpenSpecialtyDetail,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTrackFilter, setSelectedTrackFilter] = useState<'all' | 'residency' | 'fellowship' | 'integrated'>('all');
  const [activeSectionView, setActiveSectionView] = useState<'all' | 'residency' | 'fellowship' | 'integrated'>('all');
  const [copiedShare, setCopiedShare] = useState(false);

  // Categorize results into three distinct tracks
  const residencyResults = useMemo(
    () => evaluation.results.filter((r) => r.specialty.trackType === 'residency'),
    [evaluation.results]
  );
  const fellowshipResults = useMemo(
    () => evaluation.results.filter((r) => r.specialty.trackType === 'fellowship'),
    [evaluation.results]
  );
  const integratedResults = useMemo(
    () => evaluation.results.filter((r) => r.specialty.trackType === 'integrated'),
    [evaluation.results]
  );

  const topResidency = residencyResults[0];
  const topFellowship = fellowshipResults[0];
  const topIntegrated = integratedResults[0];

  // Overall top match for sharing
  const overallTopMatch = evaluation.results[0];

  // Filter remaining specialties list
  const filteredResults = evaluation.results.filter((res) => {
    const matchesSearch =
      res.specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.specialty.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.specialty.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (res.specialty.pathway && res.specialty.pathway.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || res.specialty.category === selectedCategory;

    const matchesTrack =
      selectedTrackFilter === 'all' || res.specialty.trackType === selectedTrackFilter;

    return matchesSearch && matchesCategory && matchesTrack;
  });

  const categories = Array.from(new Set(evaluation.results.map((r) => r.specialty.category)));

  const handleShare = () => {
    const text = `نتيجتي في منصة Guide Med: التخصص الأعلى توافقاً معي هو ${overallTopMatch.specialty.name} بنسبة ${overallTopMatch.matchPercentage}% وفق نمط شخصيتي (${evaluation.discProfileTitle}).`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 sm:space-y-10" dir="rtl">
      {/* Top Header Actions Bar */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-slate-700/80 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-white">تقرير Guide Med السريري المتكامل</span>
              <span className="px-2.5 py-0.5 rounded-md bg-cyan-950/90 text-cyan-200 border border-cyan-500/40 text-[11px] font-bold">
                نسخة 2025
              </span>
            </div>
            <p className="text-xs text-slate-200 font-normal">تحليل التوافق السريري ومواءمة التخصصات لـ {evaluation.results.length} مساراً طبياً</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <motion.button
            id="btn-share-results"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[42px] shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>{copiedShare ? 'تم نسخ التقرير!' : 'مشاركة النتيجة'}</span>
          </motion.button>

          <motion.button
            id="btn-retake-quiz"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRetakeQuiz}
            className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[42px] shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>إعادة الاختبار</span>
          </motion.button>
        </div>
      </div>

      {/* Interactive DISC & Birkman Personality Analysis Feature Component */}
      <DiscPersonalityCard
        discScores={evaluation.discScores}
        birkmanScores={evaluation.birkmanScores}
        topDisc={evaluation.topDisc}
        discProfileTitle={evaluation.discProfileTitle}
        discProfileDescription={evaluation.discProfileDescription}
        topMatches={evaluation.results.slice(0, 6)}
      />

      {/* Medical Learning Style Analysis (VARK Model for Physicians) */}
      {evaluation.medicalLearningStyle && (
        <MedicalLearningStyleCard
          learningStyle={evaluation.medicalLearningStyle}
        />
      )}

      {/* PVIPS: Core Physician Values Analytical Profile */}
      {evaluation.pvipsAnalysis && (
        <div id="pvips-analysis-card" className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                <Scale className="w-4 h-4 text-cyan-400" />
                <span>تحليل الأنماط المهنية والقيم الجوهرية (PVIPS & AAMC)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {evaluation.pvipsAnalysis.clinicalPersonaTitle}
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {evaluation.pvipsAnalysis.coreValuesDrivers.map((driver, dIdx) => (
                <span
                  key={dIdx}
                  className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold"
                >
                  ★ {driver}
                </span>
              ))}
            </div>
          </div>

          {/* Narrative Summary Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-sm sm:text-base text-slate-100 leading-relaxed space-y-2 shadow-md">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold">
              <Compass className="w-4 h-4" />
              <span>خلاصة تقييم Guide Med للمسار المهني والشخصية السريرية:</span>
            </div>
            <p className="text-slate-200">{evaluation.pvipsAnalysis.summaryNarrative}</p>
          </div>

          {/* 8 Core PVIPS Dimensions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {/* 1. Autonomy */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">الاستقلالية وحرية القرار</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-rose-400">{evaluation.pvipsAnalysis.autonomy.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.autonomy.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.autonomy.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.autonomy.description}
              </p>
            </div>

            {/* 2. Teamwork & MDT */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
                    <Users className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">العمل الجماعي (MDT)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-blue-400">{evaluation.pvipsAnalysis.teamwork.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.teamwork.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.teamwork.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.teamwork.description}
              </p>
            </div>

            {/* 3. Technical Mastery */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">الإتقان التقني واليدوي</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-purple-400">{evaluation.pvipsAnalysis.technicalMastery.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.technicalMastery.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.technicalMastery.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.technicalMastery.description}
              </p>
            </div>

            {/* 4. Teaching & Scholarship */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">التدريس والطب الأكاديمي</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-indigo-400">{evaluation.pvipsAnalysis.teachingScholarship.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.teachingScholarship.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.teachingScholarship.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.teachingScholarship.description}
              </p>
            </div>

            {/* 5. Work-Life Balance */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">التوازن وجودة الحياة</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-emerald-400">{evaluation.pvipsAnalysis.workLifeBalance.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.workLifeBalance.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.workLifeBalance.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.workLifeBalance.description}
              </p>
            </div>

            {/* 6. Altruism & Population Health */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">الإيثار وصحة المجتمع</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-teal-400">{evaluation.pvipsAnalysis.altruismCommunity.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.altruismCommunity.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.altruismCommunity.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.altruismCommunity.description}
              </p>
            </div>

            {/* 7. Income & Prestige */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
                    <Award className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">المكانة والدخل والريادة</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-amber-400">{evaluation.pvipsAnalysis.prestigeIncome.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.prestigeIncome.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.prestigeIncome.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.prestigeIncome.description}
              </p>
            </div>

            {/* 8. Patient Relationship */}
            <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/90 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-white">العلاقة الإنسانية الممتدة</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black text-sky-400">{evaluation.pvipsAnalysis.patientRelationship.score}%</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                    {evaluation.pvipsAnalysis.patientRelationship.level}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-500 rounded-full"
                  style={{ width: `${evaluation.pvipsAnalysis.patientRelationship.score}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                {evaluation.pvipsAnalysis.patientRelationship.description}
              </p>
            </div>
          </div>

          {/* Strategic Synthesis Row: Strengths, Ideal Setting, Growth Advice */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 border-t border-slate-800/70">
            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/70 space-y-1.5">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <Sparkles className="w-4 h-4" />
                <span>أبرز نقاط قوتك الإكلينيكية</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-300">
                {evaluation.pvipsAnalysis.keyStrengths.map((str, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/70 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold">
                <Building2 className="w-4 h-4" />
                <span>البيئة السريرية المثالية</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluation.pvipsAnalysis.idealEnvironment}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/40 border border-slate-800/70 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Lightbulb className="w-4 h-4" />
                <span>توجيه مهني للوقاية من الاحتراق</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluation.pvipsAnalysis.growthAdvice}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Matches Categorized by Track Sections */}
      <div className="space-y-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
              <Trophy className="w-6 h-6 text-amber-400" />
              <span>أعلى التخصصات والمسارات توافقاً حسب الأقسام السريرية</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              تم تصنيف النتائج إلى 3 أقسام رئيسية: برامج الإقامة المباشرة، برامج الزمالات الدقيقة، والمسارات المشتركة والمدمجة مع توضيح المسار والمدة ونمط الحياة.
            </p>
          </div>

          {/* Tab Filter for Sections */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-2xl shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveSectionView('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeSectionView === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              كافة الأقسام معاً
            </button>
            <button
              onClick={() => setActiveSectionView('residency')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeSectionView === 'residency'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              الإقامات الرئيسية ({residencyResults.length})
            </button>
            <button
              onClick={() => setActiveSectionView('fellowship')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeSectionView === 'fellowship'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              الزمالات الدقيقة ({fellowshipResults.length})
            </button>
            <button
              onClick={() => setActiveSectionView('integrated')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                activeSectionView === 'integrated'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              المسارات المشتركة ({integratedResults.length})
            </button>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 1: برامج الإقامة المباشرة (Residency Tracks)           */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {(activeSectionView === 'all' || activeSectionView === 'residency') && topResidency && (
          <div className="space-y-5 rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-blue-950/30 to-slate-900/60 border border-blue-900/50 shadow-xl">
            {/* Section Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <GraduationCap className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>قسم التخصصات الرئيسية (برامج الإقامة المباشرة)</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-500/30">
                      Direct Residency
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    البرامج التأسيسية المباشرة التي يلتحق بها الطبيب فور إتمام سنة الامتياز واجتياز اختبار SMLE.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-300 bg-blue-950/80 px-3 py-1 rounded-lg border border-blue-800/60 w-fit">
                {residencyResults.length} تخصصاً متاحاً
              </span>
            </div>

            {/* Top 1 Residency Match Hero Card */}
            <motion.div
              id="hero-top-residency-card"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-blue-950/60 via-slate-900 to-slate-950 border-2 border-blue-500/60 hover:border-blue-400 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-blue-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md">
                      <Trophy className="w-3.5 h-3.5" />
                      <span>المركز الأول • أعلى توافق في الإقامة المباشرة</span>
                    </span>
                    <span className="text-xs font-bold text-slate-300 px-2.5 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                      {topResidency.specialty.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white mb-1">
                      {topResidency.specialty.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-blue-300 font-mono">
                      {topResidency.specialty.englishName}
                    </p>
                  </div>

                  {/* Pathway and Duration Highlights */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-start gap-2.5">
                      <GitFork className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-blue-300">مسار التدريب والاعتماد</div>
                        <div className="text-xs text-white font-medium">{topResidency.specialty.pathway}</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-blue-950/70 border border-blue-800/60 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-blue-300">مدة البرنامج والتنافسية</div>
                        <div className="text-xs text-white font-medium">
                          {topResidency.specialty.duration} • تنافسية {topResidency.specialty.competition} (SMLE: {topResidency.specialty.smleRange})
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lifestyle snippet */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-200 block mb-1">نمط الحياة وساعات العمل:</span>
                    {topResidency.specialty.lifestyle}
                  </div>

                  {/* Why it matches */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-300">أبرز ركائز التوافق مع شخصيتك:</div>
                    <ul className="space-y-1">
                      {topResidency.strengths.slice(0, 3).map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <motion.button
                      id={`btn-top-residency-detail-${topResidency.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenSpecialtyDetail(topResidency.specialty)}
                      className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>تفاصيل التخصص والمسار</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-residency-compare-${topResidency.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onToggleCompare(topResidency.specialty)}
                      className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                        isCompared(topResidency.specialty.id)
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      <span>{isCompared(topResidency.specialty.id) ? 'تمت المقارنة' : 'مقارنة'}</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-residency-fav-${topResidency.specialty.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleFavorite(topResidency.specialty.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isFavorite(topResidency.specialty.id)
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                      }`}
                      title="حفظ بالمفضلة"
                    >
                      <Bookmark className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Radar chart column */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-center mb-1">
                    <span className="text-3xl sm:text-4xl font-black text-blue-400">
                      {topResidency.matchPercentage}%
                    </span>
                    <div className="text-[11px] font-bold text-slate-400">نسبة التوافق مع برنامج الإقامة</div>
                  </div>
                  <RadarChart
                    metrics={topResidency.specialty.metrics}
                    comparisonMetrics={evaluation.userMetrics}
                    label={topResidency.specialty.name}
                    comparisonLabel="ملفك الشخصي"
                    size={230}
                  />
                </div>
              </div>
            </motion.div>

            {/* Runner ups in residency */}
            {residencyResults.slice(1, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {residencyResults.slice(1, 3).map((res, idx) => (
                  <div
                    key={res.specialty.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-blue-950 text-blue-300 text-xs font-bold border border-blue-800/50">
                          المركز {idx === 0 ? 'الثاني' : 'الثالث'} في الإقامة
                        </span>
                        <span className="text-xl font-black text-blue-400">{res.matchPercentage}%</span>
                      </div>
                      <h5 className="text-base sm:text-lg font-bold text-white mb-0.5">{res.specialty.name}</h5>
                      <p className="text-xs text-slate-400 font-mono mb-2">{res.specialty.englishName}</p>
                      <div className="flex items-center gap-2 text-xs text-blue-300 font-medium mb-2.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>المدة: {res.specialty.duration}</span>
                        <span>•</span>
                        <span>{res.specialty.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {res.specialty.pathway}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                      <button
                        onClick={() => onOpenSpecialtyDetail(res.specialty)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                      >
                        التفاصيل الكاملة
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleCompare(res.specialty)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isCompared(res.specialty.id)
                              ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="مقارنة"
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(res.specialty.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isFavorite(res.specialty.id)
                              ? 'bg-amber-950 border-amber-600 text-amber-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="حفظ"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 2: برامج الزمالة والتخصصات الدقيقة (Fellowships)       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {(activeSectionView === 'all' || activeSectionView === 'fellowship') && topFellowship && (
          <div className="space-y-5 rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-purple-950/30 to-slate-900/60 border border-purple-900/50 shadow-xl">
            {/* Section Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-purple-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
                  <Star className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>قسم برامج الزمالة والتخصصات الدقيقة</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
                      Fellowships & Subspecialties
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    برامج التدريب السريري التخصصي المتقدم بعد إتمام البورد العام، وتحقيق النقلة النوعية في نمط الحياة والدخل وطبيعة العمل.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-purple-300 bg-purple-950/80 px-3 py-1 rounded-lg border border-purple-800/60 w-fit">
                {fellowshipResults.length} برنامج زمالة دقيق
              </span>
            </div>

            {/* Top 1 Fellowship Match Hero Card */}
            <motion.div
              id="hero-top-fellowship-card"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-purple-950/60 via-slate-900 to-slate-950 border-2 border-purple-500/60 hover:border-purple-400 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-purple-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md">
                      <Star className="w-3.5 h-3.5" />
                      <span>المركز الأول • أعلى توافق في برامج الزمالة</span>
                    </span>
                    <span className="text-xs font-bold text-purple-300 px-2.5 py-0.5 rounded-md bg-purple-950/90 border border-purple-800/50">
                      {topFellowship.specialty.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white mb-1">
                      {topFellowship.specialty.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-purple-300 font-mono">
                      {topFellowship.specialty.englishName}
                    </p>
                  </div>

                  {/* Pathway & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-start gap-2.5">
                      <GitFork className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-purple-300">مسار الزمالة والمتطلب السابق</div>
                        <div className="text-xs text-white font-medium">{topFellowship.specialty.pathway}</div>
                        {topFellowship.specialty.parentSpecialty && (
                          <div className="text-[10px] text-purple-300 mt-0.5">البورد المؤهل: {topFellowship.specialty.parentSpecialty}</div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-purple-950/70 border border-purple-800/60 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-purple-300">مدة الزمالة والتنافسية</div>
                        <div className="text-xs text-white font-medium">
                          {topFellowship.specialty.duration} • تنافسية {topFellowship.specialty.competition}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Radical Lifestyle Shift Box */}
                  {topFellowship.specialty.lifestyleShift && (
                    <div className="p-3.5 rounded-xl bg-purple-900/30 border border-purple-600/40 text-xs text-purple-200 flex items-start gap-2.5 shadow-sm">
                      <TrendingUp className="w-4 h-4 text-purple-300 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-white block mb-0.5">التحول الجذري في نمط الحياة والدخل (Lifestyle Shift):</span>
                        <span>{topFellowship.specialty.lifestyleShift}</span>
                      </div>
                    </div>
                  )}

                  {/* Lifestyle detail */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-200 block mb-1">طبيعة نمط الحياة والدوام اليومي:</span>
                    {topFellowship.specialty.lifestyle}
                  </div>

                  {/* Why it matches */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-300">أبرز ركائز التوافق مع شخصيتك:</div>
                    <ul className="space-y-1">
                      {topFellowship.strengths.slice(0, 3).map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <motion.button
                      id={`btn-top-fellowship-detail-${topFellowship.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenSpecialtyDetail(topFellowship.specialty)}
                      className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>تفاصيل الزمالة والتخصص الدقيق</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-fellowship-compare-${topFellowship.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onToggleCompare(topFellowship.specialty)}
                      className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                        isCompared(topFellowship.specialty.id)
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      <span>{isCompared(topFellowship.specialty.id) ? 'تمت المقارنة' : 'مقارنة'}</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-fellowship-fav-${topFellowship.specialty.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleFavorite(topFellowship.specialty.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isFavorite(topFellowship.specialty.id)
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                      }`}
                      title="حفظ بالمفضلة"
                    >
                      <Bookmark className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Radar chart column */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-center mb-1">
                    <span className="text-3xl sm:text-4xl font-black text-purple-400">
                      {topFellowship.matchPercentage}%
                    </span>
                    <div className="text-[11px] font-bold text-slate-400">نسبة التوافق مع برنامج الزمالة</div>
                  </div>
                  <RadarChart
                    metrics={topFellowship.specialty.metrics}
                    comparisonMetrics={evaluation.userMetrics}
                    label={topFellowship.specialty.name}
                    comparisonLabel="ملفك الشخصي"
                    size={230}
                  />
                </div>
              </div>
            </motion.div>

            {/* Runner ups in fellowship */}
            {fellowshipResults.slice(1, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {fellowshipResults.slice(1, 3).map((res, idx) => (
                  <div
                    key={res.specialty.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-purple-950 text-purple-300 text-xs font-bold border border-purple-800/50">
                          المركز {idx === 0 ? 'الثاني' : 'الثالث'} في الزمالات
                        </span>
                        <span className="text-xl font-black text-purple-400">{res.matchPercentage}%</span>
                      </div>
                      <h5 className="text-base sm:text-lg font-bold text-white mb-0.5">{res.specialty.name}</h5>
                      <p className="text-xs text-slate-400 font-mono mb-2">{res.specialty.englishName}</p>
                      <div className="flex items-center gap-2 text-xs text-purple-300 font-medium mb-2.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>المدة: {res.specialty.duration}</span>
                        <span>•</span>
                        <span>{res.specialty.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {res.specialty.lifestyleShift || res.specialty.pathway}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                      <button
                        onClick={() => onOpenSpecialtyDetail(res.specialty)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                      >
                        التفاصيل الكاملة
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleCompare(res.specialty)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isCompared(res.specialty.id)
                              ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="مقارنة"
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(res.specialty.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isFavorite(res.specialty.id)
                              ? 'bg-amber-950 border-amber-600 text-amber-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="حفظ"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* SECTION 3: المسارات المشتركة والمدمجة (Integrated & Joint Tracks) */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        {(activeSectionView === 'all' || activeSectionView === 'integrated') && topIntegrated && (
          <div className="space-y-5 rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-emerald-950/30 to-slate-900/60 border border-emerald-900/50 shadow-xl">
            {/* Section Header Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-900/40 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <span>قسم المسارات المشتركة والمدمجة</span>
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                      Integrated & Joint Tracks
                    </span>
                  </h3>
                  <p className="text-xs text-slate-300">
                    برامج متصلة ومباشرة (مثل 0+6)، أو زمالات مشتركة مفتوحة لخريجي بوردات متعددة (مثل المعلوماتية الصحية، طب الألم، والطب الرياضي).
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-800/60 w-fit">
                {integratedResults.length} مساراً مشتركاً ومدمجاً
              </span>
            </div>

            {/* Top 1 Integrated Match Hero Card */}
            <motion.div
              id="hero-top-integrated-card"
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-5 sm:p-7 rounded-2xl bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-950 border-2 border-emerald-500/60 hover:border-emerald-400 shadow-2xl relative overflow-hidden group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3.5 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md">
                      <Layers className="w-3.5 h-3.5" />
                      <span>المركز الأول • أعلى توافق في المسارات المشتركة</span>
                    </span>
                    <span className="text-xs font-bold text-emerald-300 px-2.5 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-800/50">
                      {topIntegrated.specialty.category}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-2xl sm:text-3xl font-black text-white mb-1">
                      {topIntegrated.specialty.name}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold text-emerald-300 font-mono">
                      {topIntegrated.specialty.englishName}
                    </p>
                  </div>

                  {/* Pathway & Duration */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-start gap-2.5">
                      <GitFork className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-300">طبيعة المسار المشترك والمدمج</div>
                        <div className="text-xs text-white font-medium">{topIntegrated.specialty.pathway}</div>
                        {topIntegrated.specialty.parentSpecialty && (
                          <div className="text-[10px] text-emerald-300 mt-0.5">الأهلية: {topIntegrated.specialty.parentSpecialty}</div>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800/60 flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[11px] font-bold text-emerald-300">مدة المسار والتنافسية</div>
                        <div className="text-xs text-white font-medium">
                          {topIntegrated.specialty.duration} • تنافسية {topIntegrated.specialty.competition}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Lifestyle snippet */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-slate-200 block mb-1">نمط الحياة وطبيعة الممارسة:</span>
                    {topIntegrated.specialty.lifestyle}
                  </div>

                  {/* Why it matches */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-bold text-slate-300">أبرز ركائز التوافق مع شخصيتك:</div>
                    <ul className="space-y-1">
                      {topIntegrated.strengths.slice(0, 3).map((str, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    <motion.button
                      id={`btn-top-integrated-detail-${topIntegrated.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenSpecialtyDetail(topIntegrated.specialty)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                    >
                      <Eye className="w-4 h-4" />
                      <span>تفاصيل المسار الكاملة</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-integrated-compare-${topIntegrated.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onToggleCompare(topIntegrated.specialty)}
                      className={`px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                        isCompared(topIntegrated.specialty.id)
                          ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                      }`}
                    >
                      <GitCompare className="w-4 h-4" />
                      <span>{isCompared(topIntegrated.specialty.id) ? 'تمت المقارنة' : 'مقارنة'}</span>
                    </motion.button>

                    <motion.button
                      id={`btn-top-integrated-fav-${topIntegrated.specialty.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleFavorite(topIntegrated.specialty.id)}
                      className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        isFavorite(topIntegrated.specialty.id)
                          ? 'bg-amber-950 border-amber-500 text-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-400'
                      }`}
                      title="حفظ بالمفضلة"
                    >
                      <Bookmark className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Radar chart column */}
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                  <div className="text-center mb-1">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                      {topIntegrated.matchPercentage}%
                    </span>
                    <div className="text-[11px] font-bold text-slate-400">نسبة التوافق مع المسار المدمج</div>
                  </div>
                  <RadarChart
                    metrics={topIntegrated.specialty.metrics}
                    comparisonMetrics={evaluation.userMetrics}
                    label={topIntegrated.specialty.name}
                    comparisonLabel="ملفك الشخصي"
                    size={230}
                  />
                </div>
              </div>
            </motion.div>

            {/* Runner ups in integrated */}
            {integratedResults.slice(1, 3).length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-1">
                {integratedResults.slice(1, 3).map((res, idx) => (
                  <div
                    key={res.specialty.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800/50">
                          المركز {idx === 0 ? 'الثاني' : 'الثالث'} في المسارات المشتركة
                        </span>
                        <span className="text-xl font-black text-emerald-400">{res.matchPercentage}%</span>
                      </div>
                      <h5 className="text-base sm:text-lg font-bold text-white mb-0.5">{res.specialty.name}</h5>
                      <p className="text-xs text-slate-400 font-mono mb-2">{res.specialty.englishName}</p>
                      <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium mb-2.5">
                        <Clock className="w-3.5 h-3.5 shrink-0" />
                        <span>المدة: {res.specialty.duration}</span>
                        <span>•</span>
                        <span>{res.specialty.category}</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                        {res.specialty.pathway}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-800 gap-2">
                      <button
                        onClick={() => onOpenSpecialtyDetail(res.specialty)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold cursor-pointer transition-colors"
                      >
                        التفاصيل الكاملة
                      </button>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onToggleCompare(res.specialty)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isCompared(res.specialty.id)
                              ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="مقارنة"
                        >
                          <GitCompare className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onToggleFavorite(res.specialty.id)}
                          className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                            isFavorite(res.specialty.id)
                              ? 'bg-amber-950 border-amber-600 text-amber-300'
                              : 'bg-slate-800 border-slate-700 text-slate-400'
                          }`}
                          title="حفظ"
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Simulator Banner Callout */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-slate-900 border border-indigo-800/40 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white mb-1">
            هل ترغب في اختبار سيناريوهات أخرى بحرية؟
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            يمكنك استخدام المحاكي التفاعلي لرفع أو خفض ساعات العمل، الدخل المالي، أو العمليات يدوياً ورؤية التغير الفوري في ترتيب التخصصات.
          </p>
        </div>
        <button
          id="btn-goto-simulator-from-results"
          onClick={onOpenSimulator}
          className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Sliders className="w-4 h-4" />
          <span>فتح المحاكي التفاعلي</span>
        </button>
      </div>

      {/* All Specialties Full Ranked Atlas */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white">ترتيب كافة التخصصات الطبية ({evaluation.results.length} تخصصاً)</h3>
            <p className="text-xs text-slate-400">مرتبة تنازلياً حسب نسبة التوافق المحسوبة مع إجاباتك</p>
          </div>

          {/* Search bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-results-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث باسم التخصص أو الكلمة..."
              className="w-full pr-10 pl-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        {/* Track Type Filters */}
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <GitFork className="w-3.5 h-3.5 text-cyan-400" />
            <span>تصفية حسب نوع المسار السريري:</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => setSelectedTrackFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTrackFilter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              كافة المسارات ({evaluation.results.length})
            </button>
            <button
              onClick={() => setSelectedTrackFilter('residency')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTrackFilter === 'residency'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              برامج الإقامة المباشرة ({residencyResults.length})
            </button>
            <button
              onClick={() => setSelectedTrackFilter('fellowship')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTrackFilter === 'fellowship'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              برامج الزمالة الدقيقة ({fellowshipResults.length})
            </button>
            <button
              onClick={() => setSelectedTrackFilter('integrated')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                selectedTrackFilter === 'integrated'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              المسارات المشتركة والمدمجة ({integratedResults.length})
            </button>
          </div>
        </div>

        {/* Categories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-slate-200 text-slate-950 font-bold'
                : 'bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            كافة الأقسام الطبية
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-200 text-slate-950 font-bold'
                  : 'bg-slate-900/90 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {filteredResults.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-slate-900/40 border border-slate-800 text-slate-400">
              <p className="font-bold text-slate-300 mb-1">لا توجد تخصصات مطابقة للبحث المحدد</p>
              <p className="text-xs">جرب تغيير كلمات البحث أو إعادة ضبط تصفية المسارات والتصنيفات.</p>
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const pct = item.matchPercentage;
              const barColor =
                pct >= 85
                  ? 'from-emerald-400 to-teal-500'
                  : pct >= 70
                  ? 'from-cyan-400 to-blue-500'
                  : pct >= 55
                  ? 'from-amber-400 to-yellow-500'
                  : 'from-slate-500 to-slate-600';

              const trackBadge =
                item.specialty.trackType === 'residency'
                  ? { label: 'إقامة مباشرة', bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60' }
                  : item.specialty.trackType === 'fellowship'
                  ? { label: 'زمالة دقيقة', bg: 'bg-purple-950/80 text-purple-300 border-purple-800/60' }
                  : { label: 'مسار مشترك', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' };

              return (
                <motion.div
                  key={item.specialty.id}
                  id={`ranked-item-${item.specialty.id}`}
                  whileHover={{ scale: 1.006, x: -2, transition: { duration: 0.15 } }}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/60 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-slate-950/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
                >
                  {/* Left side: Rank, Title, Pathway & Specs */}
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <span className="w-8 h-8 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 text-slate-400 text-xs font-black flex items-center justify-center shrink-0 transition-colors mt-0.5">
                      #{index + 1}
                    </span>

                    <div className="min-w-0 flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-white text-base group-hover:text-cyan-200 transition-colors">
                          {item.specialty.name}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          ({item.specialty.englishName})
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${trackBadge.bg}`}>
                          {trackBadge.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/50">
                          {item.specialty.category}
                        </span>
                      </div>

                      {/* Pathway and duration details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                        <div className="flex items-center gap-1 text-cyan-300/90 font-medium">
                          <GitFork className="w-3.5 h-3.5 shrink-0" />
                          <span>المسار: {item.specialty.pathway}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-300">
                          <Clock className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                          <span>المدة: {item.specialty.duration}</span>
                        </div>
                        <div className="text-slate-400">
                          <span>التنافسية: {item.specialty.competition}</span>
                        </div>
                      </div>

                      {/* Lifestyle Shift highlight if fellowship */}
                      {item.specialty.lifestyleShift && (
                        <div className="text-[11px] text-purple-300/90 bg-purple-950/40 border border-purple-800/40 rounded-lg px-2.5 py-1 flex items-center gap-1.5">
                          <TrendingUp className="w-3 h-3 text-purple-400 shrink-0" />
                          <span className="font-semibold text-purple-200">تحول نمط الحياة:</span>
                          <span>{item.specialty.lifestyleShift}</span>
                        </div>
                      )}

                      {/* Match percentage bar */}
                      <div className="flex items-center gap-3 max-w-md pt-0.5">
                        <div className="w-full h-2 sm:h-2.5 rounded-full bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-l ${barColor}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-black text-cyan-400 w-12 text-left shrink-0">
                          {pct}% توافق
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right side: Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end lg:self-center">
                    <motion.button
                      id={`btn-ranked-detail-${item.specialty.id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenSpecialtyDetail(item.specialty)}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer min-h-[38px]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>التفاصيل</span>
                    </motion.button>

                    <motion.button
                      id={`btn-ranked-compare-${item.specialty.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleCompare(item.specialty)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
                        isCompared(item.specialty.id)
                          ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="مقارنة"
                    >
                      <GitCompare className="w-3.5 h-3.5" />
                    </motion.button>

                    <motion.button
                      id={`btn-ranked-fav-${item.specialty.id}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onToggleFavorite(item.specialty.id)}
                      className={`p-2 rounded-xl border text-xs cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
                        isFavorite(item.specialty.id)
                          ? 'bg-amber-950 border-amber-600 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                      }`}
                      title="حفظ"
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
