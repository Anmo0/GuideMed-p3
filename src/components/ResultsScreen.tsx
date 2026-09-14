import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserEvaluation, Specialty, SpecialtyCategory } from '../types';
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
  Building2
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
  const [copiedShare, setCopiedShare] = useState(false);

  const topMatch = evaluation.results[0];
  const secondMatch = evaluation.results[1];
  const thirdMatch = evaluation.results[2];

  // Filter remaining specialties list
  const filteredResults = evaluation.results.filter((res) => {
    const matchesSearch =
      res.specialty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.specialty.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.specialty.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' || res.specialty.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(evaluation.results.map((r) => r.specialty.category)));

  const handleShare = () => {
    const text = `نتيجتي في منصة Guide Med: التخصص الأعلى توافقاً معي هو ${topMatch.specialty.name} بنسبة ${topMatch.matchPercentage}% وفق نمط شخصيتي (${evaluation.discProfileTitle}).`;
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

      {/* Podium: Top 3 Specialties */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-amber-400" />
            <span>التخصصات الطبية الأكثر توافقاً مع شخصيتك</span>
          </h2>
          <span className="text-xs text-slate-400 hidden sm:inline">
            بناءً على التقييم المتكامل لـ 7 محاور مهنية
          </span>
        </div>

        {/* Top 1 Hero Card with Motion Hover */}
        {topMatch && (
          <motion.div
            id="hero-top-match-card"
            whileHover={{ y: -4, transition: { duration: 0.25 } }}
            className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-cyan-950/50 via-slate-900 to-slate-950 border-2 border-cyan-500/60 hover:border-cyan-400 shadow-2xl hover:shadow-cyan-500/10 transition-colors relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-all pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              {/* Left Info Column */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-cyan-500 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md">
                    <Trophy className="w-3.5 h-3.5" />
                    <span>الخيار الأول الموصى به</span>
                  </span>
                  <span className="text-xs font-bold text-slate-400">{topMatch.specialty.category}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-4xl font-black text-white mb-1">
                    {topMatch.specialty.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-cyan-400 font-mono">
                    {topMatch.specialty.englishName}
                  </p>
                </div>

                {/* Quick specs row */}
                <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">
                    مدة البرنامج: {topMatch.specialty.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700">
                    تنافسية القبول: {topMatch.specialty.competition}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-cyan-300 border border-slate-700">
                    درجة SMLE المتوقعة: {topMatch.specialty.smleRange}
                  </span>
                </div>

                {/* Why it matches */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-300">أبرز ركائز التوافق معك:</div>
                  <ul className="space-y-1.5">
                    {topMatch.strengths.slice(0, 3).map((str, idx) => (
                      <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 pt-3">
                  <motion.button
                    id="btn-top-match-detail"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenSpecialtyDetail(topMatch.specialty)}
                    className="flex-1 sm:flex-initial px-4 sm:px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50 min-h-[44px]"
                  >
                    <Eye className="w-4 h-4" />
                    <span>تفاصيل التخصص والبورد الكاملة</span>
                  </motion.button>

                  <motion.button
                    id="btn-top-match-compare"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onToggleCompare(topMatch.specialty)}
                    className={`px-3.5 sm:px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px] ${
                      isCompared(topMatch.specialty.id)
                        ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-200'
                    }`}
                  >
                    <GitCompare className="w-4 h-4" />
                    <span>{isCompared(topMatch.specialty.id) ? 'تمت الإضافة للمقارنة' : 'مقارنة'}</span>
                  </motion.button>

                  <motion.button
                    id="btn-top-match-fav"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleFavorite(topMatch.specialty.id)}
                    className={`p-2.5 rounded-xl border transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      isFavorite(topMatch.specialty.id)
                        ? 'bg-amber-950/80 border-amber-500 text-amber-300'
                        : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-400'
                    }`}
                    title="حفظ في المفضلة"
                  >
                    <Bookmark className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Right Radar Column */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-slate-950/60 border border-slate-800 w-full">
                <div className="text-center mb-1">
                  <span className="text-3xl sm:text-5xl font-black text-cyan-400">
                    {topMatch.matchPercentage}%
                  </span>
                  <div className="text-[11px] sm:text-xs font-bold text-slate-400">نسبة التطابق الإجمالي</div>
                </div>

                <RadarChart
                  metrics={topMatch.specialty.metrics}
                  comparisonMetrics={evaluation.userMetrics}
                  label={topMatch.specialty.name}
                  comparisonLabel="ملفك الشخصي"
                  size={260}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* 2nd and 3rd Runner-Ups Cards with Motion Hover */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {[secondMatch, thirdMatch].filter(Boolean).map((res, index) => (
            <motion.div
              key={res.specialty.id}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.2 } }}
              className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:shadow-xl hover:shadow-slate-950/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-0.5 rounded-full bg-slate-800 text-slate-300 text-xs font-bold">
                    المركز {index === 0 ? 'الثاني' : 'الثالث'}
                  </span>
                  <span className="text-2xl font-black text-sky-400 group-hover:text-cyan-300 transition-colors">
                    {res.matchPercentage}%
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {res.specialty.name}
                </h4>
                <p className="text-xs font-mono text-slate-400 mb-3">{res.specialty.englishName}</p>

                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
                  {res.specialty.lifestyle}
                </p>

                <div className="space-y-1.5 mb-4">
                  {res.strengths.slice(0, 2).map((str, sIdx) => (
                    <div key={sIdx} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{str}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 gap-2">
                <motion.button
                  id={`btn-runnerup-detail-${res.specialty.id}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onOpenSpecialtyDetail(res.specialty)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer min-h-[38px]"
                >
                  التفاصيل الكاملة
                </motion.button>

                <div className="flex items-center gap-2">
                  <motion.button
                    id={`btn-runnerup-compare-${res.specialty.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleCompare(res.specialty)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
                      isCompared(res.specialty.id)
                        ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="مقارنة"
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                  </motion.button>

                  <motion.button
                    id={`btn-runnerup-fav-${res.specialty.id}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onToggleFavorite(res.specialty.id)}
                    className={`p-2 rounded-lg border text-xs cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center ${
                      isFavorite(res.specialty.id)
                        ? 'bg-amber-950 border-amber-600 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                    title="حفظ"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
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

        {/* Categories Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
            }`}
          >
            جميع التصنيفات ({evaluation.results.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950'
                  : 'bg-slate-900 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="space-y-3">
          {filteredResults.map((item, index) => {
            const pct = item.matchPercentage;
            const barColor =
              pct >= 85
                ? 'from-emerald-400 to-teal-500'
                : pct >= 70
                ? 'from-cyan-400 to-blue-500'
                : pct >= 55
                ? 'from-amber-400 to-yellow-500'
                : 'from-slate-500 to-slate-600';

            return (
              <motion.div
                key={item.specialty.id}
                id={`ranked-item-${item.specialty.id}`}
                whileHover={{ scale: 1.008, x: -3, transition: { duration: 0.15 } }}
                className="p-4 sm:p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-800/60 hover:border-cyan-500/40 hover:shadow-lg hover:shadow-slate-950/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                {/* Left side: Rank & Title */}
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-800 group-hover:bg-cyan-500/20 group-hover:text-cyan-300 text-slate-400 text-xs font-black flex items-center justify-center shrink-0 transition-colors">
                    #{index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-200 transition-colors">
                        {item.specialty.name}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        ({item.specialty.englishName})
                      </span>
                      <span className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/50">
                        {item.specialty.category}
                      </span>
                    </div>

                    {/* Match percentage bar */}
                    <div className="flex items-center gap-3 mt-2 max-w-md">
                      <div className="w-full h-2 sm:h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-l ${barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="text-xs font-black text-cyan-400 w-10 text-left shrink-0">
                        {pct}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
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
          })}
        </div>
      </div>
    </div>
  );
};
