import React from 'react';
import { Compass, Sliders, BookOpen, Sparkles, CheckCircle2, ShieldCheck, Award, ArrowLeft, RotateCcw, HardDrive } from 'lucide-react';
import { SPECIALTIES_DB } from '../data/specialties';

interface WelcomeScreenProps {
  onStartQuiz: () => void;
  onOpenSimulator: () => void;
  onOpenGuide: () => void;
  savedAnswerCount?: number;
  onResetAnswers?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStartQuiz,
  onOpenSimulator,
  onOpenGuide,
  savedAnswerCount = 0,
  onResetAnswers
}) => {
  const categoriesCount = new Set(SPECIALTIES_DB.map((s) => s.category)).size;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Top Banner / Hero */}
      <div className="text-center space-y-6 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/90 border border-cyan-500/50 text-cyan-200 text-xs sm:text-sm font-bold shadow-lg shadow-cyan-950/50">
          <Sparkles className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>منصة Guide Med — المرجع الاستشاري الذكي لاختيار التخصص الطبي</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
          منصة <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">Guide Med</span> لتوجيه{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
            التخصص الطبي الأمثل
          </span>
        </h1>

        <p className="max-w-3xl mx-auto text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
          تقييم سريري متقدم يدمج النماذج السلوكية النفسية (DISC) وأنماط التعلم الإكلينيكي (VARK)
          لقياس توافقك الدقيق مع <span className="text-cyan-300 font-bold underline decoration-cyan-500/50">{SPECIALTIES_DB.length} تخصصاً طبياً وجراحياً</span> مع
          مراعاة درجات SMLE وجودة الحياة والمردود المهني والاستقرار الأكاديمي.
        </p>

        {/* Saved Progress Alert Bar on Welcome Screen */}
        {savedAnswerCount > 0 && (
          <div
            id="welcome-saved-progress-banner"
            className="max-w-2xl mx-auto p-4 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/95 to-cyan-950/70 border border-emerald-500/60 shadow-2xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 text-right"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shrink-0 shadow-sm">
                <HardDrive className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white">لديك تقييم محفوظ في المتصفح</span>
                  <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/30 border border-emerald-500/40 text-emerald-200 text-xs font-bold">
                    {savedAnswerCount} من 63 سؤالاً مجاباً
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-1">
                  تم حفظ إجاباتك محلياً بشكل آمن. يمكنك المتابعة من حيث توقفت أو البدء باختبار جديد.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
              <button
                id="btn-resume-quiz-welcome"
                onClick={onStartQuiz}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-extrabold shadow-lg shadow-emerald-950 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>استئناف التقييم</span>
              </button>
              {onResetAnswers && (
                <button
                  id="btn-clear-quiz-welcome"
                  onClick={() => {
                    if (window.confirm('هل تريد مسح التقدم المحفوظ والبدء من السؤال الأول من جديد؟')) {
                      onResetAnswers();
                    }
                  }}
                  className="p-2 rounded-xl bg-slate-800/90 hover:bg-rose-950/60 text-slate-300 hover:text-rose-200 border border-slate-700/80 hover:border-rose-600/60 transition-all cursor-pointer"
                  title="مسح التقدم والبدء من جديد"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="btn-start-quiz-hero"
            onClick={onStartQuiz}
            className="px-8 py-4 rounded-xl font-extrabold text-white bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-xl shadow-cyan-600/30 border border-cyan-400/30 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3 cursor-pointer text-base sm:text-lg"
          >
            <Compass className="w-5 h-5 text-cyan-200" />
            <span>
              {savedAnswerCount > 0 ? 'متابعة تقييم Guide Med الكامل (63 معياراً)' : 'ابدأ تقييم Guide Med الكامل (63 بعداً سلوكياً وسريرياً)'}
            </span>
            <ArrowLeft className="w-5 h-5 text-cyan-200" />
          </button>

          <button
            id="btn-open-simulator-hero"
            onClick={onOpenSimulator}
            className="px-6 py-4 rounded-xl font-bold text-slate-100 bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 shadow-lg transition-all flex items-center gap-2.5 cursor-pointer text-sm sm:text-base"
          >
            <Sliders className="w-5 h-5 text-cyan-400" />
            <span>المحاكي السريع (تعديل المعايير يدوياً)</span>
          </button>

          <button
            id="btn-open-guide-hero"
            onClick={onOpenGuide}
            className="px-6 py-4 rounded-xl font-bold text-slate-100 bg-slate-850 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/60 shadow-lg transition-all flex items-center gap-2.5 cursor-pointer text-sm sm:text-base"
          >
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>تصفح أطلس التخصصات ({SPECIALTIES_DB.length} تخصصاً)</span>
          </button>
        </div>
      </div>

      {/* Key Highlights Numbers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-12">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 text-center shadow-lg transition-colors">
          <div className="text-3xl sm:text-4xl font-black text-cyan-300 mb-1">{SPECIALTIES_DB.length}</div>
          <div className="text-xs sm:text-sm font-bold text-slate-200">تخصصاً طبياً وجراحياً</div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">بوردات وزمالات سريرية معتمدة</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-blue-500/50 text-center shadow-lg transition-colors">
          <div className="text-3xl sm:text-4xl font-black text-blue-300 mb-1">63</div>
          <div className="text-xs sm:text-sm font-bold text-slate-200">معياراً سريرياً ونمط تعلم</div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">وفق معايير CanMEDS والتعليم الطبي</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-amber-500/50 text-center shadow-lg transition-colors">
          <div className="text-3xl sm:text-4xl font-black text-amber-300 mb-1">7</div>
          <div className="text-xs sm:text-sm font-bold text-slate-200">محاور تقييم مهنية</div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">جودة الحياة، الدخل، الجهد، التوتر...</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-700/80 hover:border-emerald-500/50 text-center shadow-lg transition-colors">
          <div className="text-3xl sm:text-4xl font-black text-emerald-300 mb-1">DISC</div>
          <div className="text-xs sm:text-sm font-bold text-slate-200">تحليل الشخصية السريرية</div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">مع النمط الإدراكي (VARK)</div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-700/90 backdrop-blur-md shadow-2xl my-6">
        <h2 className="text-xl sm:text-2xl font-black text-white mb-6 text-center">
          كيف يساعدك نظام Guide Med في اتخاذ أدق قرار مهني في مسيرتك؟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-950/70 border border-slate-700/80 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-black text-lg shadow-sm">
              1
            </div>
            <h3 className="font-bold text-white text-base">واقعية السيناريوهات السريرية</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              أسئلة الاختبار تحاكي تجارب الرزيدنت والمناوبات وغرف العمليات وعيادات كبار السن والأطفال،
              لتكشف ردود أفعالك العفوية الحقيقية تحت الضغط.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-950/70 border border-slate-700/80 hover:border-blue-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-black text-lg shadow-sm">
              2
            </div>
            <h3 className="font-bold text-white text-base">مطابقة خوارزمية متعددة الأبعاد</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              تتم مقارنة ملفك الشخصي عبر 7 محاور أساسية وتطبيق معاملات الترجيح لدرجات SMLE ونمط
              الحياة مع استخراج نقاط القوة والتحديات المحتملة في كل تخصص.
            </p>
          </div>

          <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-950/70 border border-slate-700/80 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-black text-lg shadow-sm">
              3
            </div>
            <h3 className="font-bold text-white text-base">دليل شامل وأداة مقارنة رأس برأس</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              استكشف تفاصيل التدريب في البورد ومراكز التدريب، مدة البرامج، أجور الخاص والحكومي، وقارن أي تخصصين وجهاً
              لوجه عبر الرادار البياني لتتخذ قرارك عن بينة.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-slate-300 py-6 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-4 font-medium">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Guide Med — محتوى علمي واستشاري مصمم لطلاب كليات الطب، أطباء الامتياز، وأطباء الإقامة</span>
        </div>
        <div className="text-slate-300">الإصدار السريري المعتمد 2025</div>
      </div>
    </div>
  );
};
