import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Sparkles,
  HelpCircle,
  Layers,
  Save,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  X,
  Clock,
  HardDrive,
  Compass,
  CheckCheck
} from 'lucide-react';

interface QuizScreenProps {
  questions: QuizQuestion[];
  selectedAnswers: Record<number, number[]>;
  onSelectOption: (questionId: number, optionIndex: number) => void;
  onFinishQuiz: () => void;
  onBackToWelcome: () => void;
  onClearAnswers?: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  selectedAnswers,
  onSelectOption,
  onFinishQuiz,
  onBackToWelcome,
  onClearAnswers
}) => {
  const totalQuestions = questions.length;

  // Initialize current index: restore from localStorage if exists and valid
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    try {
      const savedIdx = localStorage.getItem('medical_compass_quiz_index');
      if (savedIdx !== null) {
        const parsed = parseInt(savedIdx, 10);
        if (!isNaN(parsed) && parsed >= 0 && parsed < totalQuestions) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return 0;
  });

  const [showNavigator, setShowNavigator] = useState<boolean>(false);

  // Auto-save setting state
  const [autoSaveEnabled, setAutoSaveEnabled] = useState<boolean>(() => {
    try {
      const savedPref = localStorage.getItem('medical_compass_quiz_autosave');
      return savedPref !== 'false'; // default to true for seamless user experience
    } catch {
      return true;
    }
  });

  // Notification bar state
  const [isBannerDismissed, setIsBannerDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('medical_compass_banner_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const [saveToast, setSaveToast] = useState<string | null>(null);
  const [lastSavedTime, setLastSavedTime] = useState<string>('محفوظ الآن');

  const answeredCount = Object.keys(selectedAnswers).filter(
    (key) => (selectedAnswers[parseInt(key, 10)] || []).length > 0
  ).length;

  // Track if there's a resumed session with answers
  const [hasResumedSession, setHasResumedSession] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('medical_compass_quiz_answers');
      if (saved) {
        const parsed = JSON.parse(saved);
        return Object.keys(parsed).length > 0;
      }
    } catch {
      // ignore
    }
    return false;
  });

  // Persist index whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('medical_compass_quiz_index', currentIndex.toString());
    } catch {
      // ignore
    }
  }, [currentIndex]);

  // Persist auto-save preference
  useEffect(() => {
    try {
      localStorage.setItem('medical_compass_quiz_autosave', autoSaveEnabled.toString());
    } catch {
      // ignore
    }
  }, [autoSaveEnabled]);

  // Auto-save answers whenever selectedAnswers change, if autoSaveEnabled
  useEffect(() => {
    if (autoSaveEnabled && Object.keys(selectedAnswers).length > 0) {
      try {
        localStorage.setItem('medical_compass_quiz_answers', JSON.stringify(selectedAnswers));
        const now = new Date();
        const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
        localStorage.setItem('medical_compass_saved_at', timeStr);
        setLastSavedTime(`آخر حفظ: ${timeStr}`);
      } catch {
        // ignore
      }
    }
  }, [selectedAnswers, autoSaveEnabled]);

  const handleManualSave = () => {
    try {
      localStorage.setItem('medical_compass_quiz_answers', JSON.stringify(selectedAnswers));
      localStorage.setItem('medical_compass_quiz_index', currentIndex.toString());
      localStorage.setItem('medical_compass_quiz_autosave', 'true');
      setAutoSaveEnabled(true);
      const now = new Date();
      const timeStr = now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem('medical_compass_saved_at', timeStr);
      setLastSavedTime(`آخر حفظ: ${timeStr}`);
      setSaveToast('تم حفظ تقدمك بنجاح في ذاكرة المتصفح!');
      setTimeout(() => setSaveToast(null), 3500);
    } catch {
      setSaveToast('تعذر الحفظ في المتصفح');
      setTimeout(() => setSaveToast(null), 3000);
    }
  };

  const handleToggleAutoSave = (enable: boolean) => {
    setAutoSaveEnabled(enable);
    if (enable) {
      handleManualSave();
    } else {
      setSaveToast('تم إيقاف الحفظ التلقائي');
      setTimeout(() => setSaveToast(null), 2500);
    }
  };

  const handleDismissBanner = () => {
    setIsBannerDismissed(true);
    try {
      localStorage.setItem('medical_compass_banner_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  const handleShowBannerAgain = () => {
    setIsBannerDismissed(false);
    try {
      localStorage.removeItem('medical_compass_banner_dismissed');
    } catch {
      // ignore
    }
  };

  const handleClearSavedData = () => {
    if (window.confirm('هل أنت متأكد من رغبتك في مسح الإجابات المحفوظة والبدء من جديد؟')) {
      try {
        localStorage.removeItem('medical_compass_quiz_answers');
        localStorage.removeItem('medical_compass_quiz_index');
        localStorage.removeItem('medical_compass_saved_at');
        if (onClearAnswers) {
          onClearAnswers();
        }
        setCurrentIndex(0);
        setHasResumedSession(false);
        setSaveToast('تم مسح الإجابات المحفوظة بنجاح');
        setTimeout(() => setSaveToast(null), 3000);
      } catch {
        // ignore
      }
    }
  };

  // Find first unanswered question
  const handleJumpToFirstUnanswered = () => {
    const firstUnansweredIdx = questions.findIndex(
      (q) => !selectedAnswers[q.id] || selectedAnswers[q.id].length === 0
    );
    if (firstUnansweredIdx !== -1) {
      setCurrentIndex(firstUnansweredIdx);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setHasResumedSession(false);
  };

  const currentQ = questions[currentIndex] || questions[0];
  const currentSelections = selectedAnswers[currentQ.id] || [];
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const isFirstQuestion = currentIndex === 0;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleNext = () => {
    if (isLastQuestion) {
      onFinishQuiz();
    } else {
      setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (isFirstQuestion) {
      onBackToWelcome();
    } else {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6" dir="rtl">
      {/* Toast Notification Alert */}
      {saveToast && (
        <div
          id="toast-save-feedback"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-2xl bg-slate-900 border border-cyan-500/50 text-cyan-300 text-sm font-semibold shadow-2xl shadow-cyan-950/60 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <CheckCheck className="w-4 h-4 text-cyan-400 stroke-[2.5]" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          PROGRESS SAVE NOTIFICATION BAR (شريط تنبيه حفظ التقدم)
         ══════════════════════════════════════════════════════════════ */}
      {!isBannerDismissed ? (
        <div
          id="quiz-save-notification-bar"
          className={`mb-6 p-4 rounded-2xl border transition-all duration-300 relative overflow-hidden backdrop-blur-md shadow-lg ${
            autoSaveEnabled
              ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-cyan-950/40 border-emerald-500/30'
              : 'bg-gradient-to-r from-amber-950/30 via-slate-900/90 to-slate-900 border-amber-500/30'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Right: Icon & Text Information */}
            <div className="flex items-start sm:items-center gap-3">
              <div
                className={`p-2.5 rounded-xl shrink-0 ${
                  autoSaveEnabled
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                {autoSaveEnabled ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <HardDrive className="w-5 h-5 text-amber-400" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    {autoSaveEnabled ? 'الحفظ التلقائي مفعّل في المتصفح' : 'حفظ التقدم في متصفحك (localStorage)'}
                  </h4>
                  {autoSaveEnabled && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                      <span>محلي وآمن</span>
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                  {autoSaveEnabled ? (
                    <>
                      يتم حفظ إجاباتك فورياً في ذاكرة المتصفح ({answeredCount} من {totalQuestions} سؤالاً مجاب). يمكنك إغلاق الصفحة والعودة في أي وقت لاستئناف التقييم دون فقدان ما أنجزته.
                    </>
                  ) : (
                    <>
                      نقترح عليك تفعيل حفظ تقدمك محلياً على هذا الجهاز؛ لتتمكن من العودة لاحقاً واستكمال التقييم من حيث توقفت.
                    </>
                  )}
                </p>

                {autoSaveEnabled && (
                  <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2 font-mono">
                    <Clock className="w-3 h-3 text-slate-500" />
                    <span>{lastSavedTime}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Left: Quick Actions & Controls */}
            <div className="flex items-center gap-2 self-end sm:self-center shrink-0 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
              {autoSaveEnabled ? (
                <>
                  <button
                    id="btn-manual-save"
                    onClick={handleManualSave}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    title="حفظ فوري في المتصفح الآن"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>حفظ الآن</span>
                  </button>

                  <button
                    id="btn-clear-saved-progress"
                    onClick={handleClearSavedData}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700/60 hover:border-rose-800/50 text-xs font-medium transition-all cursor-pointer"
                    title="مسح التقدم المحفوظ للبدء من جديد"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">مسح المحفوظ</span>
                  </button>
                </>
              ) : (
                <button
                  id="btn-enable-autosave"
                  onClick={() => handleToggleAutoSave(true)}
                  className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950/40 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>تفعيل الحفظ التلقائي</span>
                </button>
              )}

              {/* Dismiss / Minimize button */}
              <button
                id="btn-dismiss-save-banner"
                onClick={handleDismissBanner}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-colors cursor-pointer"
                title="إخفاء هذا الشريط"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Compact minimized pill if user dismissed full banner */
        <div className="mb-4 flex items-center justify-between text-xs text-slate-400 px-3 py-1.5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>الحفظ التلقائي نشط في المتصفح ({answeredCount}/{totalQuestions} مجاب)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn-manual-save-mini"
              onClick={handleManualSave}
              className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline underline-offset-2"
            >
              حفظ الآن
            </button>
            <span className="text-slate-700">•</span>
            <button
              id="btn-restore-save-banner"
              onClick={handleShowBannerAgain}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              عرض التفاصيل
            </button>
          </div>
        </div>
      )}

      {/* Returning User Resume Banner (if returning with saved progress) */}
      {hasResumedSession && answeredCount > 0 && currentIndex === 0 && (
        <div
          id="resume-progress-alert"
          className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-slate-900 border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xl animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-cyan-200">مرحباً بك مجدداً! تم استرجاع تقدمك السابق</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                لديك {answeredCount} إجابة محفوظة في متصفحك. هل تود القفز إلى أول سؤال غير مكتمل؟
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              id="btn-resume-quiz"
              onClick={handleJumpToFirstUnanswered}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md shadow-cyan-950/40"
            >
              استئناف من حيث توقفت
            </button>
            <button
              id="btn-dismiss-resume"
              onClick={() => setHasResumedSession(false)}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
            >
              البدء من السؤال 1
            </button>
          </div>
        </div>
      )}

      {/* Top Navigation & Progress Header */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-200">
          <div className="flex items-center gap-2">
            <span className="text-cyan-300 font-bold">السؤال {currentIndex + 1}</span>
            <span className="text-slate-300">من أصل {totalQuestions}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-200 font-medium">تمت الإجابة: {answeredCount}/{totalQuestions}</span>
          </div>

          <button
            id="btn-toggle-navigator"
            onClick={() => setShowNavigator(!showNavigator)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs transition-colors cursor-pointer font-medium"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>خريطة الأسئلة ({totalQuestions})</span>
          </button>
        </div>

        {/* Smooth Animated Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-slate-800/90 border border-slate-700/50 overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-l from-cyan-400 via-sky-400 to-blue-500 transition-all duration-300 rounded-full shadow-sm shadow-cyan-500/50"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Collapsible Questions Grid Drawer */}
        {showNavigator && (
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl my-4 animate-in fade-in duration-200">
            <div className="text-xs font-bold text-slate-300 mb-3 flex items-center justify-between">
              <span>انتقل مباشرة لأي سؤال:</span>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="text-cyan-300">الأزرق = الحالي</span>
                <span className="text-emerald-300">الأخضر = تمت الإجابة</span>
              </div>
            </div>
            {/* 30 questions fit neatly into 10 columns on sm+ */}
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-1.5">
              {questions.map((q, idx) => {
                const isAnswered = (selectedAnswers[q.id] || []).length > 0;
                const isCurrent = idx === currentIndex;
                return (
                  <button
                    key={q.id}
                    id={`btn-nav-q-${q.id}`}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setShowNavigator(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`h-8 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isCurrent
                        ? 'bg-cyan-400 text-slate-950 ring-2 ring-cyan-200 shadow-md font-black'
                        : isAnswered
                        ? 'bg-emerald-950 border border-emerald-500/70 text-emerald-200 font-bold'
                        : 'bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-700/90 shadow-2xl backdrop-blur-md">
        {/* Category Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-xs font-bold mb-4 shadow-sm shadow-cyan-950">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{currentQ.category}</span>
        </div>

        {/* Question Title */}
        <h2 className="text-xl sm:text-2xl font-black text-white mb-2 leading-relaxed">
          {currentQ.title}
        </h2>

        {/* Subtext description */}
        {currentQ.description && (
          <p className="text-xs sm:text-sm text-slate-300 mb-6 flex items-center gap-1.5 font-normal">
            <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{currentQ.description}</span>
          </p>
        )}

        {/* Options List */}
        <div className="space-y-3 mt-6">
          {currentQ.options.map((option, optIdx) => {
            const isSelected = currentSelections.includes(optIdx);
            const isSpecialNone = option.specialType === 'none';
            const isSpecialAll = option.specialType === 'all';

            return (
              <div
                key={optIdx}
                id={`option-${currentQ.id}-${optIdx}`}
                onClick={() => onSelectOption(currentQ.id, optIdx)}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-start gap-4 select-none ${
                  isSelected
                    ? isSpecialNone
                      ? 'bg-rose-950/40 border-rose-500 shadow-lg shadow-rose-950/30'
                      : isSpecialAll
                      ? 'bg-amber-950/40 border-amber-400 shadow-lg shadow-amber-950/30'
                      : 'bg-cyan-950/50 border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                    : 'bg-slate-950/70 border-slate-700/80 hover:bg-slate-800/80 hover:border-cyan-500/40'
                }`}
              >
                {/* Custom Checkbox/Radio Indicator */}
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    isSelected
                      ? isSpecialNone
                        ? 'bg-rose-500 text-white'
                        : isSpecialAll
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-cyan-400 text-slate-950 font-bold'
                      : 'border border-slate-600 bg-slate-850'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>

                {/* Text and Subtext */}
                <div className="flex-1">
                  <div
                    className={`text-sm sm:text-base font-bold leading-normal ${
                      isSelected
                        ? isSpecialNone
                          ? 'text-rose-200'
                          : isSpecialAll
                          ? 'text-amber-200'
                          : 'text-white'
                        : 'text-slate-100'
                    }`}
                  >
                    {option.text}
                  </div>
                  {option.subtext && (
                    <div className="text-xs text-slate-300 mt-1 leading-relaxed font-normal">
                      {option.subtext}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-700/80 gap-4">
          <button
            id="btn-quiz-prev"
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-xl font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
            <span>{isFirstQuestion ? 'العودة للرئيسية' : 'السابق'}</span>
          </button>

          <button
            id="btn-quiz-next"
            onClick={handleNext}
            className={`px-7 py-3 rounded-xl font-extrabold text-sm sm:text-base transition-all flex items-center gap-2 cursor-pointer shadow-lg ${
              isLastQuestion
                ? 'bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 shadow-emerald-950/60 font-black'
                : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-cyan-950/50'
            }`}
          >
            <span>{isLastQuestion ? 'إكمال التقييم وعرض نتائج Guide Med' : 'السؤال التالي'}</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
