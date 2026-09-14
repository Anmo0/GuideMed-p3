import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Eye,
  Headphones,
  Activity,
  Sparkles,
  BookOpen,
  GraduationCap,
  Stethoscope,
  AlertTriangle,
  Zap,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { MedicalLearningStyle, LearningStyleType } from '../types';

interface MedicalLearningStyleCardProps {
  learningStyle: MedicalLearningStyle;
}

export const MedicalLearningStyleCard: React.FC<MedicalLearningStyleCardProps> = ({
  learningStyle
}) => {
  const [activeTab, setActiveTab] = useState<LearningStyleType>(learningStyle.primary);

  const styleConfig = {
    visual: {
      name: 'النمط البصري (Visual)',
      icon: Eye,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      barColor: 'bg-cyan-500',
      tagBg: 'bg-cyan-950/80 text-cyan-300 border-cyan-800/60'
    },
    auditory: {
      name: 'النمط السمعي (Auditory)',
      icon: Headphones,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      barColor: 'bg-emerald-500',
      tagBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60'
    },
    kinesthetic: {
      name: 'النمط العملي/الإجرائي (Kinesthetic)',
      icon: Activity,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      barColor: 'bg-amber-500',
      tagBg: 'bg-amber-950/80 text-amber-300 border-amber-800/60'
    }
  };

  const currentCfg = styleConfig[learningStyle.primary];

  return (
    <div
      id="medical-learning-style-card"
      className="p-5 sm:p-7 rounded-3xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/70">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/10">
            <Brain className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-extrabold text-white text-lg sm:text-xl tracking-tight">
                نمط التعلم والاستيعاب الإكلينيكي
              </h3>
              <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
                VARK Medical Model
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
              دليلك الاستراتيجي لتحقيق أعلى درجات SMLE والتفوق في اختبارات البورد وسنوات التدريب السريري
            </p>
          </div>
        </div>

        {/* Primary Badge */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1.5 shrink-0 bg-slate-950/60 sm:bg-transparent p-3 sm:p-0 rounded-2xl border border-slate-800/60 sm:border-0">
          <span className="text-[11px] text-slate-400">النمط المهيمن الأساسي:</span>
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black ${currentCfg.bgColor} ${currentCfg.textColor} border ${currentCfg.borderColor}`}>
              <currentCfg.icon className="w-3.5 h-3.5" />
              {currentCfg.name}
            </span>
          </div>
        </div>
      </div>

      {/* Distribution Bar & Tabs */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
          <span>التوزيع النسبي للقنوات الإدراكية في عقلك:</span>
          <span className="text-[11px] text-slate-500">انقر على أي نمط لاستكشاف خطته</span>
        </div>

        {/* Multi-segment Progress Bar */}
        <div className="w-full h-3.5 rounded-full bg-slate-950/90 border border-slate-800 overflow-hidden flex p-0.5 gap-1">
          <div
            style={{ width: `${learningStyle.scores.visual}%` }}
            className="h-full rounded-full bg-cyan-500 transition-all duration-700 relative group cursor-pointer"
            title={`بصري: ${learningStyle.scores.visual}%`}
            onClick={() => setActiveTab('visual')}
          />
          <div
            style={{ width: `${learningStyle.scores.auditory}%` }}
            className="h-full rounded-full bg-emerald-500 transition-all duration-700 relative group cursor-pointer"
            title={`سمعي: ${learningStyle.scores.auditory}%`}
            onClick={() => setActiveTab('auditory')}
          />
          <div
            style={{ width: `${learningStyle.scores.kinesthetic}%` }}
            className="h-full rounded-full bg-amber-500 transition-all duration-700 relative group cursor-pointer"
            title={`عملي: ${learningStyle.scores.kinesthetic}%`}
            onClick={() => setActiveTab('kinesthetic')}
          />
        </div>

        {/* Legend Selector Pills */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-3">
          <button
            id="btn-style-tab-visual"
            onClick={() => setActiveTab('visual')}
            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
              activeTab === 'visual'
                ? 'bg-cyan-950/50 border-cyan-500 text-cyan-300 ring-1 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
                : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-xs font-bold">بصري</span>
            </div>
            <span className="text-xs sm:text-sm font-black text-cyan-400">
              {learningStyle.scores.visual}%
            </span>
          </button>

          <button
            id="btn-style-tab-auditory"
            onClick={() => setActiveTab('auditory')}
            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
              activeTab === 'auditory'
                ? 'bg-emerald-950/50 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/30 shadow-lg shadow-emerald-950/40'
                : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs font-bold">سمعي</span>
            </div>
            <span className="text-xs sm:text-sm font-black text-emerald-400">
              {learningStyle.scores.auditory}%
            </span>
          </button>

          <button
            id="btn-style-tab-kinesthetic"
            onClick={() => setActiveTab('kinesthetic')}
            className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
              activeTab === 'kinesthetic'
                ? 'bg-amber-950/50 border-amber-500 text-amber-300 ring-1 ring-amber-500/30 shadow-lg shadow-amber-950/40'
                : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold">عملي/إجرائي</span>
            </div>
            <span className="text-xs sm:text-sm font-black text-amber-400">
              {learningStyle.scores.kinesthetic}%
            </span>
          </button>
        </div>
      </div>

      {/* Dynamic Tab Content */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {/* Overview Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {learningStyle.title}
                </h4>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {learningStyle.description}
              </p>
            </div>

            {/* Grid of Traits & Study Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {/* Cognitive Traits */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/40 border border-slate-800/70 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs sm:text-sm mb-3">
                    <Brain className="w-4 h-4" />
                    <span>كيف يعالج عقلك المعلومات الطبية؟</span>
                  </div>
                  <ul className="space-y-2.5">
                    {learningStyle.cognitiveTraits.map((trait, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{trait}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Speed Retention Hack */}
                <div className="mt-4 p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-800/40">
                  <div className="flex items-center gap-2 text-cyan-300 text-xs font-bold mb-1">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>حيلة التثبيت السريع (Speed Retention Hack):</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {learningStyle.speedRetentionHack}
                  </p>
                </div>
              </div>

              {/* Optimal Study Methods */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/40 border border-slate-800/70 space-y-3.5">
                <div className="flex items-center gap-2 text-sky-300 font-bold text-xs sm:text-sm">
                  <BookOpen className="w-4 h-4" />
                  <span>طرق المذاكرة الأنسب والأدوات الموصى بها</span>
                </div>

                <div className="space-y-3">
                  {learningStyle.optimalStudyMethods.map((method, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
                    >
                      <h5 className="font-bold text-white text-xs sm:text-sm mb-1">
                        {method.title}
                      </h5>
                      <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">
                        {method.description}
                      </p>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {method.recommendedTools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-md bg-slate-800/90 text-slate-300 border border-slate-700/60 font-mono"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic Advice Cards: Board Exam & Rounds */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Board & SMLE Strategy */}
              <div className="p-4 sm:p-5 rounded-2xl bg-indigo-950/20 border border-indigo-800/40">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs sm:text-sm mb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-400" />
                  <span>استراتيجية اختبارات البورد و SMLE</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {learningStyle.boardExamStrategy}
                </p>
              </div>

              {/* Rounds & On-Call Retention */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/40">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs sm:text-sm mb-2">
                  <Stethoscope className="w-4 h-4 text-emerald-400" />
                  <span>أثناء المرور الصباحي والمناوبات (Morning Rounds)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {learningStyle.roundsAndClinicalTip}
                </p>
              </div>
            </div>

            {/* Pitfalls to Avoid */}
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-900/40 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-rose-300 text-xs sm:text-sm mb-1.5">
                  محاذير ومشتتات يجب أن تتجنبها بحزم:
                </h5>
                <ul className="space-y-1">
                  {learningStyle.pitfallsToAvoid.map((pitfall, pIdx) => (
                    <li key={pIdx} className="text-xs text-rose-200/90 list-disc list-inside leading-relaxed">
                      {pitfall}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
