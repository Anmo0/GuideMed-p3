import React, { useState } from 'react';
import { DiscScores, DiscDimension, BirkmanScores, SpecialtyMatchResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  Compass,
  Activity,
  Zap,
  Users,
  Shield,
  Search,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  Layers,
  BarChart3,
  Sliders,
  Target,
  FileText,
  Flame,
  HeartHandshake,
  Workflow,
  Sparkle,
  TrendingUp,
  Award
} from 'lucide-react';

interface DiscPersonalityCardProps {
  discScores: DiscScores;
  topDisc: DiscDimension;
  discProfileTitle: string;
  discProfileDescription: string;
  birkmanScores?: BirkmanScores;
  topMatches?: SpecialtyMatchResult[];
}

interface DimensionConfig {
  key: DiscDimension;
  name: string;
  englishName: string;
  color: string;
  bgLight: string;
  borderCol: string;
  textColor: string;
  badgeBg: string;
  accentHex: string;
  icon: React.ElementType;
  description: string;
  clinicalStrengths: string[];
  patientInteraction: string;
  teamRole: string;
  stressBehavior: string;
  growthAdvice: string;
  compatibleSettings: string;
}

const DISC_CONFIGS: Record<DiscDimension, DimensionConfig> = {
  D: {
    key: 'D',
    name: 'الحسم والقيادة',
    englishName: 'Dominance (D)',
    color: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-950/20',
    borderCol: 'border-rose-500/30',
    textColor: 'text-rose-400',
    badgeBg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
    accentHex: '#f43f5e',
    icon: Zap,
    description: 'المبادرة الجريئة وسرعة اتخاذ القرارات المصيرية في المواقف السريرية الطارئة والحاسمة.',
    clinicalStrengths: [
      'القدرة على قيادة فرق الإنعاش والعمليات في اللحظات الحرجة دون تردد',
      'حسم الخطة العلاجية بوضوح وتحمل المسؤولية الإكلينيكية الكاملة',
      'إنجاز المهام الجراحية والإجرائية المعقدة بكفاءة وثبات نفسي'
    ],
    patientInteraction: 'مباشر، واضح، ومحدد. يركز على شرح الخطة والنتائج العملية دون إطالة، ويبث الثقة بحزمه.',
    teamRole: 'قائد ميداني طبيعي، يوزع الأدوار بحزم ويحب السرعة والإنتاجية العالية ويرفض التباطؤ.',
    stressBehavior: 'قد يميل إلى نفاد الصبر أو فرض الرأي عند بطء الإجراءات أو تردد الآخرين تحت الضغط.',
    growthAdvice: 'تدريب النفس على الاستماع للملاحظات الثانوية ومراعاة وتيرة الفريق وتخفيف حدة التوجيه في الأوقات الروتينية.',
    compatibleSettings: 'غرف العمليات الكبرى، طب الطوارئ والحوادث، جراحة العظام، وجراحة المخ والأعصاب.'
  },
  I: {
    key: 'I',
    name: 'التأثير والتواصل',
    englishName: 'Influence (I)',
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-950/20',
    borderCol: 'border-amber-500/30',
    textColor: 'text-amber-400',
    badgeBg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    accentHex: '#f59e0b',
    icon: Users,
    description: 'الذكاء العاطفي والقدرة الاستثنائية على الإقناع وبث الطمأنينة والتفاؤل في قلوب المرضى والزملاء.',
    clinicalStrengths: [
      'بناء الألفة العلاجية وكسر حاجز الخوف لدى الأطفال وأهالي المرضى',
      'براعة في التثقيف الصحي وإقناع المريض بالالتزام بالحمية والعلاج الدوائي',
      'تحفيز الفريق الطبي وبث الروح المعنوية والإيجابية في أوقات التعب'
    ],
    patientInteraction: 'ودود، مشجع، ومتعاطف. يمنح المريض وقتاً كافياً للتعبير عن مشاعره ويبث الأمل الواقعي.',
    teamRole: 'منسق ومحفز اجتماعي، يبني جسور التواصل بين التخصصات والتمريض وإدارة القسم.',
    stressBehavior: 'قد ينزعج من العزلة أو الروتين الصارم، وقد يتأثر نفسياً بشكاوى المرضى وصعوبة الشفاء.',
    growthAdvice: 'العناية بالتوثيق الإكلينيكي الروتيني في السجلات الطبية دون تأجيل، ووضع حدود عاطفية صحية.',
    compatibleSettings: 'طب الأطفال، طب الأسرة، الطب النفسي، التجميل، والتثقيف الصحي والتلطيفي.'
  },
  S: {
    key: 'S',
    name: 'الاستقرار والصبر',
    englishName: 'Steadiness (S)',
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-950/20',
    borderCol: 'border-emerald-500/30',
    textColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    accentHex: '#10b981',
    icon: Shield,
    description: 'الهدوء النفسي، الاستمرارية الصبورة، والوفاء بالعلاقة الإنسانية الممتدة مع المرضى المزمنين.',
    clinicalStrengths: [
      'الاستماع العميق والصبور لشكاوى المرضى المعقدة والمتعددة دون تذمر',
      'الاستقرار الانفعالي والموثوقية العالية في المناوبات الطويلة والمجهدة',
      'إدارة الأمراض المزمنة (السكري، الروماتيزم، الكلى) بنَفَس طويل ودقة'
    ],
    patientInteraction: 'هادئ ومطمئن جداً. المريض يشعر بأنه مسموع ومفهوم باهتمام أصيل غير متسرع.',
    teamRole: 'عضو فريق وفي ومخلص، يدعم زملاءه بهدوء ويفضل بيئة العمل المنسجمة الخالية من النزاعات.',
    stressBehavior: 'قد يتردد في مواجهة النزاعات الإدارية، وقد يقاوم التغييرات المفاجئة في جداول العمل.',
    growthAdvice: 'المبادرة بالتعبير الصريح عن الاحتياجات المهنية والتكيف المرن مع مستجدات المناوبات الطارئة.',
    compatibleSettings: 'الباطنة العامة والتخصصية (الغدد، الكلى، الروماتيزم)، طب الأسرة، وطب كبار السن.'
  },
  C: {
    key: 'C',
    name: 'الدقة والمعيارية',
    englishName: 'Conscientiousness (C)',
    color: 'from-cyan-500 to-blue-600',
    bgLight: 'bg-cyan-950/20',
    borderCol: 'border-cyan-500/30',
    textColor: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    accentHex: '#06b6d4',
    icon: Search,
    description: 'العقلية التحليلية الاستقصائية، والالتزام الصارم بالمعايير العلمية وأدلة الطب المبني على البراهين.',
    clinicalStrengths: [
      'فك ألغاز الحالات السريرية النادرة وربط الأعراض بالفحوصات المخبرية والجينومية',
      'الدقة الفائقة في قراءة الصور الإشعاعية والشرائح النسيجية دون إغفال تفصيل',
      'مراجعة البروتوكولات الدوائية وتفادي الأخطاء الطبية والتداخلات التفاعلية'
    ],
    patientInteraction: 'موضوعي وعلمي وموثوق. يشرح بالحقائق والأرقام ويحرص على دقة التشخيص قبل إطلاق الوعود.',
    teamRole: 'المرجع العلمي والنوعي للقسم، يدقق في التفاصيل الفنية ويضمن مطابقة معايير الاعتماد والجودة.',
    stressBehavior: 'قد يقع في فخ "التحليل المفرط" (Analysis Paralysis) عند شح المعلومات السريرية في الطوارئ.',
    growthAdvice: 'تقبل النسبية في الطب، واتخاذ القرارات السريرية الواقعية في الوقت المناسب حتى مع عدم اكتمال كافة الفحوصات.',
    compatibleSettings: 'الأشعة التشخيصية والتداخلية، الباثولوجي والمختبرات، طب الأعصاب، والوراثة السريرية.'
  }
};

interface BirkmanDimensionInfo {
  key: keyof BirkmanScores;
  name: string;
  englishName: string;
  color: string;
  accentHex: string;
  icon: React.ElementType;
  description: string;
  usualBehavior: string;
  underlyingNeed: string;
  stressResponse: string;
  clinicalImpact: string;
}

const BIRKMAN_DIMENSIONS_CONFIG: Record<keyof BirkmanScores, BirkmanDimensionInfo> = {
  activity: {
    key: 'activity',
    name: 'النشاط والإيقاع الحركي',
    englishName: 'Physical Activity & Energy',
    color: 'from-rose-500 to-amber-500',
    accentHex: '#f43f5e',
    icon: Flame,
    description: 'درجة تفضيل العمل الحركي النشط والتنقل والتدخلات اليدوية السريرية مقارنة بالجلوس المكتبي.',
    usualBehavior: 'نشيط ومبادر، يفضل العمل اليدوي والإجرائي، ويفضل التواجد في غرف العمليات والطوارئ.',
    underlyingNeed: 'بيئة سريرية حيوية تتيح الحركة والتدخل اليدوي وتتجنب الجلوس الطويل في العيادات الروتينية.',
    stressResponse: 'عند تقييده بالمكاتب أو البطء، قد يشعر بالتململ الشديد ونفاد الصبر وفقدان الحماس المهني.',
    clinicalImpact: 'يمنح الطبيب لياقة عالية في الجراحات الطويلة والمناوبات الحركية والمناورات الإجرائية.'
  },
  empathy: {
    key: 'empathy',
    name: 'التعاطف والحساسية الإنسانية',
    englishName: 'Empathy & Relational Sensitivity',
    color: 'from-teal-400 to-emerald-500',
    accentHex: '#10b981',
    icon: HeartHandshake,
    description: 'مستوى الاستجابة العاطفية لمعاناة المرضى وعمق الاندماج الإنساني في الرعاية السريرية.',
    usualBehavior: 'مستمع عميق، يراعي مشاعر المريض وعائلته، ويهتم بالجوانب النفسية والاجتماعية المرافقة للمرض.',
    underlyingNeed: 'وقت كافٍ لكل مريض، وبيئة عمل داعمة تحترم البُعد الإنساني ولا تعامل المرضى كأرقام فقط.',
    stressResponse: 'عند ضغط المواعيد السريعة أو البيئات الجافة، قد يتعرض للإرهاق العاطفي (Compassion Fatigue).',
    clinicalImpact: 'بناء روابط علاجية متينة ترفع التزام المريض بالخطة العلاجية وتقلل الشكاوى الطبية.'
  },
  structure: {
    key: 'structure',
    name: 'الهيكلية والنظام والبروتوكولات',
    englishName: 'Structure & Clinical Protocols',
    color: 'from-cyan-400 to-blue-500',
    accentHex: '#06b6d4',
    icon: Workflow,
    description: 'تفضيل العمل الممنهج وفق مسارات علاجية واضحة وموثقة وبروتوكولات إكلينيكية محددة.',
    usualBehavior: 'منظم ودقيق، يلتزم بالأدلة السريرية والإرشادات التوجيهية (Guidelines)، ويوثق الملفات باحتراف.',
    underlyingNeed: 'وضوح الإجراءات وسياسات القسم وتوفر الإرشادات المعتمدة وتجنب العشوائية والقرارات المرتجلة.',
    stressResponse: 'عند غياب المعايير أو الفوضى الإدارية، قد يصبح متشدداً جداً في الإجراءات أو يقاوم التدخلات غير المقننة.',
    clinicalImpact: 'حماية المرضى من الأخطاء الطبية وضمان الامتثال الصارم لمعايير الجودة وسلامة المرضى.'
  },
  change: {
    key: 'change',
    name: 'التنوع والتجدد وسرعة الوتيرة',
    englishName: 'Change & Variety',
    color: 'from-purple-400 to-indigo-500',
    accentHex: '#a855f7',
    icon: Sparkle,
    description: 'الرغبة في التجدد المستمر ومواجهة حالات سريرية متنوعة وغير متوقعة وتفادي الروتين المتكرر.',
    usualBehavior: 'مرن وسريع التكيف، يتحمس للحالات النادرة وتحديات التشخيص والتقنيات الطبية المستحدثة.',
    underlyingNeed: 'تنوع في الحالات اليومية والمهام والمناوبات وتجنب التكرار الرتيب لنفس النمط المرضي.',
    stressResponse: 'عند الوقوع في روتين يومي متطابق، قد يفقد الدافع أو يسعى لتغيير القسم أو البحث عن تحديات بديلة.',
    clinicalImpact: 'القدرة العالية على إدارة التحديات الطبية المعقدة والاندماج السريع في التخصصات سريعة التطور.'
  },
  advantage: {
    key: 'advantage',
    name: 'التنافسية والمردود والمكانة',
    englishName: 'Advantage & Career Drive',
    color: 'from-amber-400 to-rose-500',
    accentHex: '#f59e0b',
    icon: Award,
    description: 'الدافع نحو التميز المهني، اعتلاء المناصب الإكلينيكية والأكاديمية، والمردود المالي المرتفع.',
    usualBehavior: 'طموح وتنافسي، يسعى لتحقيق نتائج ملموسة، ويحرص على السمعة المهنية والريادة في مجاله.',
    underlyingNeed: 'تقدير صريح للإنجازات، وفرص حقيقية للترقي والتفوق المهني ومردود يعكس حجم الجهد المبذول.',
    stressResponse: 'عند تجاهل الإنجاز أو غياب المسار التصاعدي، قد يشعر بالإحباط أو يميل للتنافس الحاد مع الزملاء.',
    clinicalImpact: 'دفع عجلة القسم نحو التميز ونشر الأبحاث وتطوير الخدمات وتصدر التصنيفات الطبية.'
  }
};

export const DiscPersonalityCard: React.FC<DiscPersonalityCardProps> = ({
  discScores,
  topDisc,
  discProfileTitle,
  discProfileDescription,
  birkmanScores = { activity: 22, empathy: 24, structure: 26, change: 20, advantage: 18 }
}) => {
  // Top Active Model: DISC vs Birkman vs Comparison
  const [activeModel, setActiveModel] = useState<'disc' | 'birkman' | 'synthesis'>('disc');

  // DISC sub-views
  const [discChartType, setDiscChartType] = useState<'matrix' | 'radar' | 'bars' | 'traits'>('matrix');
  const [selectedDimension, setSelectedDimension] = useState<DiscDimension>(topDisc);

  // Birkman sub-views
  const [selectedBirkmanKey, setSelectedBirkmanKey] = useState<keyof BirkmanScores>('structure');

  // --- DISC Calculations ---
  const totalScore = Math.max(1, discScores.D + discScores.I + discScores.S + discScores.C);
  const percentages: Record<DiscDimension, number> = {
    D: Math.round((discScores.D / totalScore) * 100),
    I: Math.round((discScores.I / totalScore) * 100),
    S: Math.round((discScores.S / totalScore) * 100),
    C: Math.max(0, 100 - (
      Math.round((discScores.D / totalScore) * 100) +
      Math.round((discScores.I / totalScore) * 100) +
      Math.round((discScores.S / totalScore) * 100)
    ))
  };

  const taskVsPeople = ((discScores.I + discScores.S) - (discScores.D + discScores.C)) / totalScore;
  const fastVsDeliberate = ((discScores.D + discScores.I) - (discScores.S + discScores.C)) / totalScore;

  const mapWidth = 320;
  const mapHeight = 240;
  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  const pinX = Math.max(28, Math.min(mapWidth - 28, centerX + taskVsPeople * 110));
  const pinY = Math.max(28, Math.min(mapHeight - 28, centerY - fastVsDeliberate * 85));

  const currentConfig = DISC_CONFIGS[selectedDimension];

  // --- Birkman Calculations ---
  // Normalization of Birkman raw scores into 0 - 100 scale
  const normalizeBirkman = (val: number) => {
    // Typical scores range 10 - 45 in our engine
    return Math.min(100, Math.max(15, Math.round(((val - 8) / 32) * 100)));
  };

  const birkmanNormalized: Record<keyof BirkmanScores, number> = {
    activity: normalizeBirkman(birkmanScores.activity),
    empathy: normalizeBirkman(birkmanScores.empathy),
    structure: normalizeBirkman(birkmanScores.structure),
    change: normalizeBirkman(birkmanScores.change),
    advantage: normalizeBirkman(birkmanScores.advantage)
  };

  // Determine dominant Birkman Color / Archetype
  // Red (Doer: High Activity & Advantage)
  // Green (Communicator: High Empathy & Activity)
  // Yellow (Analyzer: High Structure & Low Change)
  // Blue (Planner: High Empathy & Structure)
  const getBirkmanArchetype = () => {
    const { activity, empathy, structure, change, advantage } = birkmanNormalized;
    if (activity >= 65 && advantage >= 55) {
      return {
        colorName: 'الأحمر (Red / Doer)',
        title: 'المنفذ والمبادر السريري المباشر',
        badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        summary: 'تتميز بطاقة حركية عالية، وتحب رؤية نتائج فورية وملموسة لتدخلاتك السريرية كالجراحة والطوارئ.',
        quadrant: 'red',
        hex: '#f43f5e'
      };
    } else if (empathy >= 60 && activity >= 50) {
      return {
        colorName: 'الأخضر (Green / Communicator)',
        title: 'المتواصل والمحفز الإكلينيكي',
        badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        summary: 'تتميز ببراعة التواصل وبناء الألفة مع المرضى وتحفيزهم على الامتثال للخطة العلاجية والوقائية.',
        quadrant: 'green',
        hex: '#10b981'
      };
    } else if (structure >= 60 && empathy >= 55) {
      return {
        colorName: 'الأزرق (Blue / Planner & Thinker)',
        title: 'المفكر والمخطط الاستراتيجي المتأني',
        badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        summary: 'تجمع بين العمق التحليلي والتعاطف الإنساني، وتهتم بفهم الأسباب الجذرية ووضع خطط علاجية متكاملة.',
        quadrant: 'blue',
        hex: '#3b82f6'
      };
    } else {
      return {
        colorName: 'الأصفر (Yellow / Analyzer & Process)',
        title: 'المحلل المنهجي وضابط المعايير',
        badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        summary: 'تتميز بالدقة الفائقة والالتزام بالبروتوكولات وضمان جودة الرعاية الطبية وفق البراهين الدقيقة.',
        quadrant: 'yellow',
        hex: '#eab308'
      };
    }
  };

  const birkmanArchetype = getBirkmanArchetype();
  const currentBirkmanInfo = BIRKMAN_DIMENSIONS_CONFIG[selectedBirkmanKey];

  return (
    <div
      id="personality-model-analysis-card"
      className="p-5 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0a1226] to-slate-900 border border-cyan-700/50 shadow-2xl relative overflow-hidden space-y-6"
      dir="rtl"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/90 pb-5 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-bold mb-2 shadow-sm">
            <Brain className="w-3.5 h-3.5 text-cyan-400" />
            <span>تحليل النماذج السلوكية والنفسية المكتشفة للطبيب</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
            نموذج الشخصية السريرية:{' '}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">
              {activeModel === 'disc' ? discProfileTitle : birkmanArchetype.title}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-3xl leading-relaxed font-normal">
            {activeModel === 'disc'
              ? discProfileDescription
              : birkmanArchetype.summary}
          </p>
        </div>

        {/* Primary Model Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-700/80 shadow-lg shrink-0">
          <button
            id="tab-select-model-disc"
            onClick={() => setActiveModel('disc')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeModel === 'disc'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/60 font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>نموذج DISC</span>
          </button>

          <button
            id="tab-select-model-birkman"
            onClick={() => setActiveModel('birkman')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeModel === 'birkman'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-950/60 font-black'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Target className="w-4 h-4" />
            <span>نموذج بيركمان (Birkman)</span>
          </button>

          <button
            id="tab-select-model-synthesis"
            onClick={() => setActiveModel('synthesis')}
            className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeModel === 'synthesis'
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/50 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>الخلاصة المدمجة</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          VIEW 1: DISC MODEL WITH INTERACTIVE CHARTS
         ========================================================================= */}
      {activeModel === 'disc' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Chart Sub-Tabs & Dominant Pill */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/70 border border-slate-800">
              <button
                id="btn-disc-chart-matrix"
                onClick={() => setDiscChartType('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  discChartType === 'matrix'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>مصفوفة التموضع 2D</span>
              </button>

              <button
                id="btn-disc-chart-radar"
                onClick={() => setDiscChartType('radar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  discChartType === 'radar'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>مخطط الرادار الشبكي</span>
              </button>

              <button
                id="btn-disc-chart-bars"
                onClick={() => setDiscChartType('bars')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  discChartType === 'bars'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>مخطط الأشرطة المقارنة</span>
              </button>

              <button
                id="btn-disc-chart-traits"
                onClick={() => setDiscChartType('traits')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  discChartType === 'traits'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>التشريح السلوكي (الأبعاد الأربعة)</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-300 font-medium">النمط السائد:</span>
              <span className="px-3 py-1 rounded-xl bg-cyan-950/90 border border-cyan-500/50 text-cyan-200 text-xs font-bold font-mono shadow-sm">
                {topDisc} ({percentages[topDisc]}%)
              </span>
            </div>
          </div>

          {/* Top Multi-Segment Normalized Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300 font-semibold px-1">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>توزيع القوى السلوكية لنموذج DISC:</span>
              </span>
              <span className="text-[11px] text-slate-300 font-mono">100% Normalized</span>
            </div>

            {/* Stacked Percentage Bar */}
            <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden flex p-0.5 border border-slate-700/80 shadow-inner">
              <div
                className="h-full bg-rose-500 rounded-r-full cursor-pointer transition-all hover:opacity-90"
                style={{ width: `${percentages.D}%` }}
                onClick={() => setSelectedDimension('D')}
                title={`الحسم (D): ${percentages.D}%`}
              />
              <div
                className="h-full bg-amber-500 cursor-pointer transition-all hover:opacity-90"
                style={{ width: `${percentages.I}%` }}
                onClick={() => setSelectedDimension('I')}
                title={`التأثير (I): ${percentages.I}%`}
              />
              <div
                className="h-full bg-emerald-500 cursor-pointer transition-all hover:opacity-90"
                style={{ width: `${percentages.S}%` }}
                onClick={() => setSelectedDimension('S')}
                title={`الاستقرار (S): ${percentages.S}%`}
              />
              <div
                className="h-full bg-cyan-500 rounded-l-full cursor-pointer transition-all hover:opacity-90"
                style={{ width: `${percentages.C}%` }}
                onClick={() => setSelectedDimension('C')}
                title={`الدقة (C): ${percentages.C}%`}
              />
            </div>

            {/* Dimension Selection Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {(['D', 'I', 'S', 'C'] as DiscDimension[]).map((dim) => {
                const cfg = DISC_CONFIGS[dim];
                const isSelected = selectedDimension === dim;
                return (
                  <button
                    key={dim}
                    id={`disc-pill-selector-${dim}`}
                    onClick={() => setSelectedDimension(dim)}
                    className={`p-2.5 rounded-xl border text-right transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? `${cfg.bgLight} ${cfg.borderCol} ring-1 ring-cyan-400/50 shadow-md`
                        : 'bg-slate-950/70 border-slate-700/80 hover:border-slate-600'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cfg.accentHex }} />
                        <span className="text-xs font-bold text-white truncate">{cfg.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-300 block font-mono font-medium">{cfg.englishName}</span>
                    </div>
                    <span className={`text-xs font-black font-mono ${cfg.textColor}`}>
                      {percentages[dim]}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CHART OPTION 1: 2D CARTESIAN MATRIX */}
          {discChartType === 'matrix' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-950/80 border border-slate-700/80 relative shadow-xl">
                <div className="w-full flex items-center justify-between text-[11px] font-bold text-slate-300 mb-2 px-1">
                  <span>مصفوفة التموضع السلوكي الإكلينيكي 2D</span>
                  <span className="text-cyan-300 font-mono">
                    ({Math.round(taskVsPeople * 100)}، {Math.round(fastVsDeliberate * 100)})
                  </span>
                </div>

                <svg
                  viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                  className="w-full max-w-[340px] sm:max-w-[400px] h-auto overflow-visible select-none"
                >
                  <defs>
                    <radialGradient id="userPinPulseDisc" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.9" />
                      <stop offset="70%" stopColor="#06b6d4" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {/* Quadrants */}
                  <rect
                    x="8"
                    y="8"
                    width={centerX - 10}
                    height={centerY - 10}
                    rx="8"
                    fill={selectedDimension === 'D' ? 'rgba(244, 63, 94, 0.22)' : 'rgba(244, 63, 94, 0.08)'}
                    stroke={selectedDimension === 'D' ? '#f43f5e' : 'rgba(244, 63, 94, 0.3)'}
                    strokeWidth={selectedDimension === 'D' ? '2' : '1'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedDimension('D')}
                  />
                  <rect
                    x={centerX + 2}
                    y="8"
                    width={centerX - 10}
                    height={centerY - 10}
                    rx="8"
                    fill={selectedDimension === 'I' ? 'rgba(245, 158, 11, 0.22)' : 'rgba(245, 158, 11, 0.08)'}
                    stroke={selectedDimension === 'I' ? '#f59e0b' : 'rgba(245, 158, 11, 0.3)'}
                    strokeWidth={selectedDimension === 'I' ? '2' : '1'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedDimension('I')}
                  />
                  <rect
                    x={centerX + 2}
                    y={centerY + 2}
                    width={centerX - 10}
                    height={centerY - 10}
                    rx="8"
                    fill={selectedDimension === 'S' ? 'rgba(16, 185, 129, 0.22)' : 'rgba(16, 185, 129, 0.08)'}
                    stroke={selectedDimension === 'S' ? '#10b981' : 'rgba(16, 185, 129, 0.3)'}
                    strokeWidth={selectedDimension === 'S' ? '2' : '1'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedDimension('S')}
                  />
                  <rect
                    x="8"
                    y={centerY + 2}
                    width={centerX - 10}
                    height={centerY - 10}
                    rx="8"
                    fill={selectedDimension === 'C' ? 'rgba(6, 182, 212, 0.22)' : 'rgba(6, 182, 212, 0.08)'}
                    stroke={selectedDimension === 'C' ? '#06b6d4' : 'rgba(6, 182, 212, 0.3)'}
                    strokeWidth={selectedDimension === 'C' ? '2' : '1'}
                    className="cursor-pointer transition-colors"
                    onClick={() => setSelectedDimension('C')}
                  />

                  {/* Axes */}
                  <line
                    x1={centerX}
                    y1="8"
                    x2={centerX}
                    y2={mapHeight - 8}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />
                  <line
                    x1="8"
                    y1={centerY}
                    x2={mapWidth - 8}
                    y2={centerY}
                    stroke="rgba(255, 255, 255, 0.25)"
                    strokeWidth="1.5"
                    strokeDasharray="3,3"
                  />

                  {/* Labels */}
                  <text x="35" y="38" className="text-sm font-black fill-rose-300">D</text>
                  <text x="35" y="52" className="text-[9.5px] font-bold fill-slate-200">حاسم / مبادر</text>

                  <text x={mapWidth - 35} y="38" textAnchor="end" className="text-sm font-black fill-amber-300">I</text>
                  <text x={mapWidth - 35} y="52" textAnchor="end" className="text-[9.5px] font-bold fill-slate-200">مؤثر / تواصل</text>

                  <text x={mapWidth - 35} y={mapHeight - 40} textAnchor="end" className="text-sm font-black fill-emerald-300">S</text>
                  <text x={mapWidth - 35} y={mapHeight - 26} textAnchor="end" className="text-[9.5px] font-bold fill-slate-200">صبور / مستقر</text>

                  <text x="35" y={mapHeight - 40} className="text-sm font-black fill-cyan-300">C</text>
                  <text x="35" y={mapHeight - 26} className="text-[9.5px] font-bold fill-slate-200">دقيق / تحليلي</text>

                  {/* Axes Headers */}
                  <text x={centerX} y="18" textAnchor="middle" className="text-[9px] font-bold fill-slate-300">
                    ▲ وتيرة سريعة وحاسمة
                  </text>
                  <text x={centerX} y={mapHeight - 12} textAnchor="middle" className="text-[9px] font-bold fill-slate-300">
                    ▼ وتيرة متأنية وممنهجة
                  </text>
                  <text x="14" y={centerY + 3} textAnchor="start" className="text-[8.5px] font-bold fill-slate-300">
                    ◄ تركيز على المهام
                  </text>
                  <text x={mapWidth - 14} y={centerY + 3} textAnchor="end" className="text-[8.5px] font-bold fill-slate-300">
                    تركيز على العلاقات ►
                  </text>

                  {/* Pin */}
                  <g>
                    <circle cx={pinX} cy={pinY} r="18" fill="url(#userPinPulseDisc)" />
                    <circle cx={pinX} cy={pinY} r="7" fill="#06b6d4" stroke="#0f172a" strokeWidth="2" />
                    <circle cx={pinX} cy={pinY} r="2.5" fill="#ffffff" />
                    <rect
                      x={pinX - 38}
                      y={pinY - 24}
                      width="76"
                      height="16"
                      rx="4"
                      fill="#020617"
                      stroke="#06b6d4"
                      strokeWidth="1.2"
                    />
                    <text
                      x={pinX}
                      y={pinY - 13}
                      textAnchor="middle"
                      className="text-[8.5px] font-extrabold fill-cyan-300"
                    >
                      موضعك السريري
                    </text>
                  </g>
                </svg>

                <p className="text-[11px] text-slate-300 text-center mt-3 font-normal">
                  يعكس موضع النقطة التقاء وتيرة عملك المفضلة مع أسلوب توجيهك الذهني (المهام الإجرائية vs العلاقات الإنسانية).
                </p>
              </div>

              {/* Quadrant Quick Highlight Card */}
              <div className="lg:col-span-5 space-y-4">
                <div className={`p-5 rounded-2xl ${currentConfig.bgLight} border ${currentConfig.borderCol} space-y-3 shadow-lg`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-xl bg-slate-900 text-cyan-300 border border-slate-700">
                        <currentConfig.icon className="w-5 h-5" style={{ color: currentConfig.accentHex }} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white">{currentConfig.name}</h3>
                        <span className="text-xs font-mono text-slate-300 font-medium">{currentConfig.englishName}</span>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${currentConfig.badgeBg}`}>
                      {percentages[selectedDimension]}% توافق
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {currentConfig.description}
                  </p>

                  <div className="pt-2 border-t border-slate-700/80 space-y-1.5">
                    <span className="text-xs font-bold text-slate-200 block">
                      الأثر الإكلينيكي المباشر:
                    </span>
                    <ul className="space-y-1">
                      {currentConfig.clinicalStrengths.slice(0, 2).map((st, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-200 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-700 text-xs text-slate-200 flex items-start gap-2.5 shadow-sm">
                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>نصيحة الممارسة:</strong> {currentConfig.growthAdvice}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* CHART OPTION 2: RADAR / SPIDER CHART */}
          {discChartType === 'radar' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
              <div className="lg:col-span-7 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-xl">
                <div className="w-full flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                  <span>مخطط الرادار التفاعلي لأبعاد DISC الأربعة</span>
                  <span className="text-cyan-300 font-mono">Radar Spider Chart</span>
                </div>

                {/* SVG Radar Chart */}
                <svg viewBox="0 0 280 280" className="w-full max-w-[320px] h-auto overflow-visible select-none">
                  {/* Concentric Polygons */}
                  {[0.25, 0.5, 0.75, 1.0].map((level, lIdx) => {
                    const r = 90 * level;
                    return (
                      <polygon
                        key={lIdx}
                        points={`140,${140 - r} ${140 + r},140 140,${140 + r} ${140 - r},140`}
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1"
                        strokeDasharray={lIdx < 3 ? '2,2' : undefined}
                      />
                    );
                  })}

                  {/* Level percentage markers */}
                  <text x="144" y={140 - 90 * 0.5} className="text-[8px] fill-slate-500 font-mono">50%</text>
                  <text x="144" y={140 - 90 * 1.0} className="text-[8px] fill-slate-400 font-mono">100%</text>

                  {/* Cross Axes */}
                  <line x1="140" y1="40" x2="140" y2="240" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <line x1="40" y1="140" x2="240" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

                  {/* User Data Polygon */}
                  {(() => {
                    // Maximum percentage clamp (e.g. 50% is full normalized scale)
                    const rD = (Math.min(100, percentages.D * 2.2) / 100) * 90;
                    const rI = (Math.min(100, percentages.I * 2.2) / 100) * 90;
                    const rS = (Math.min(100, percentages.S * 2.2) / 100) * 90;
                    const rC = (Math.min(100, percentages.C * 2.2) / 100) * 90;

                    const pD = `140,${140 - rD}`;
                    const pI = `${140 + rI},140`;
                    const pS = `140,${140 + rS}`;
                    const pC = `${140 - rC},140`;

                    return (
                      <g>
                        <polygon
                          points={`${pD} ${pI} ${pS} ${pC}`}
                          fill="rgba(6, 182, 212, 0.28)"
                          stroke="#06b6d4"
                          strokeWidth="2.5"
                        />
                        {/* Vertices */}
                        <circle cx={140} cy={140 - rD} r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx={140 + rI} cy={140} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx={140} cy={140 + rS} r="4.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                        <circle cx={140 - rC} cy={140} r="4.5" fill="#06b6d4" stroke="#ffffff" strokeWidth="1.5" />
                      </g>
                    );
                  })()}

                  {/* Dimension Outer Labels */}
                  {/* D: Top */}
                  <text x="140" y="26" textAnchor="middle" className="text-xs font-black fill-rose-300">
                    الحسم (D): {percentages.D}%
                  </text>
                  {/* I: Right */}
                  <text x="248" y="144" textAnchor="start" className="text-xs font-black fill-amber-300">
                    التأثير (I): {percentages.I}%
                  </text>
                  {/* S: Bottom */}
                  <text x="140" y="262" textAnchor="middle" className="text-xs font-black fill-emerald-300">
                    الاستقرار (S): {percentages.S}%
                  </text>
                  {/* C: Left */}
                  <text x="32" y="144" textAnchor="end" className="text-xs font-black fill-cyan-300">
                    الدقة (C): {percentages.C}%
                  </text>
                </svg>
              </div>

              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>تفسير النمط الهندسي لقواك السريرية:</span>
                </h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  يُظهر الشكل الهندسي امتداد قدراتك بين قطبي <strong>السرعة والتنفيذ</strong> (الأعلى) و<strong>التأني والتحليل</strong> (الأسفل)، وبين <strong>العلاقات الإنسانية</strong> (اليمين) و<strong>المهام الإجرائية</strong> (اليسار).
                </p>
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-700 space-y-2">
                  <div className="text-xs font-bold text-cyan-300">النمط البارز في شكلك الهندسي:</div>
                  <div className="text-xs text-slate-200">
                    {percentages[topDisc] >= 35
                      ? `تركيز مرتفع جداً في بُعد (${DISC_CONFIGS[topDisc].name}) مما يجعلك مناسباً للمسارات التي تطلب حسماً مباشراً وتخصصاً دقيقاً.`
                      : 'توزيع متوازن ومتعدد القدرات يمنحك مرونة عالية للتكيف مع بيئات المستشفيات المتنوعة.'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* CHART OPTION 3: COMPARATIVE BAR CHARTS */}
          {discChartType === 'bars' && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-xl space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-cyan-400" />
                  <span>مخطط الأشرطة التنافسية للأبعاد السلوكية</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono">المتوسط المرجعي للأطباء: 25%</span>
              </div>

              <div className="space-y-4">
                {(['D', 'I', 'S', 'C'] as DiscDimension[]).map((dim) => {
                  const cfg = DISC_CONFIGS[dim];
                  const pct = percentages[dim];
                  const isTop = dim === topDisc;
                  return (
                    <div key={dim} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.accentHex }} />
                          <span className="font-bold text-white">{cfg.name} ({cfg.englishName})</span>
                          {isTop && (
                            <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                              الأعلى توافقاً
                            </span>
                          )}
                        </div>
                        <span className="font-mono font-black text-white text-sm">{pct}%</span>
                      </div>

                      {/* Bar Track */}
                      <div className="w-full h-4 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden relative">
                        {/* 25% Baseline marker */}
                        <div className="absolute top-0 bottom-0 left-1/4 w-0.5 bg-slate-600/60 z-10" title="المتوسط المرجعي 25%" />
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.6 }}
                          className={`h-full rounded-xl bg-gradient-to-r ${cfg.color}`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CHART OPTION 4: 4-DIMENSION TRAITS & CLINICAL SETTINGS */}
          {discChartType === 'traits' && (
            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-700 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: currentConfig.accentHex }} />
                    <h3 className="text-lg font-black text-white">
                      {currentConfig.name} ({currentConfig.englishName})
                    </h3>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${currentConfig.badgeBg}`}>
                    قوة السمة: {percentages[selectedDimension]}%
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1.5">
                    <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>طريقة التواصل مع المرضى (Bedside Manner)</span>
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentConfig.patientInteraction}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1.5">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      <span>التفاعل مع الفريق الطبي والتمريض</span>
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentConfig.teamRole}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1.5">
                    <span className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      <span>السلوك تحت الضغط والمناوبات الشاقة</span>
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentConfig.stressBehavior}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-700 space-y-1.5">
                    <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>نصيحة النمو وتفادي الاحتراق المهني</span>
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {currentConfig.growthAdvice}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-700 text-xs text-slate-200">
                  <strong className="text-cyan-300">البيئات الأكثر انسجاماً: </strong>
                  {currentConfig.compatibleSettings}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          VIEW 2: BIRKMAN CLINICAL MODEL WITH VISUAL GAUGES & 4-COLOR GRID
         ========================================================================= */}
      {activeModel === 'birkman' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Birkman Archetype Summary Banner */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-700 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-lg shrink-0"
                style={{ backgroundColor: `${birkmanArchetype.hex}25`, color: birkmanArchetype.hex, border: `1.5px solid ${birkmanArchetype.hex}60` }}
              >
                <Target className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-black text-white">{birkmanArchetype.title}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${birkmanArchetype.badgeColor}`}>
                    {birkmanArchetype.colorName}
                  </span>
                </div>
                <p className="text-xs text-slate-200 mt-0.5">
                  تحليل الدوافع والاحتياجات السريرية الخفية للطبيب وفق منهجية بيركمان (Birkman Method).
                </p>
              </div>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-300 font-medium shrink-0">
              <span className="text-cyan-300 font-bold">المحرك النفسي: </span>
              {birkmanArchetype.summary}
            </div>
          </div>

          {/* 5-Dimension Visual Horizontal Gauge Meters */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: 5 Interactive Dimension Bar Meters */}
            <div className="lg:col-span-7 space-y-3.5 p-5 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-xl">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                <span>أبعاد بيركمان الخمسة للبيئة الإكلينيكية:</span>
                <span className="text-cyan-300 font-normal text-[11px]">انقر لعرض التشريح النفسي</span>
              </div>

              {(Object.keys(BIRKMAN_DIMENSIONS_CONFIG) as (keyof BirkmanScores)[]).map((dimKey) => {
                const info = BIRKMAN_DIMENSIONS_CONFIG[dimKey];
                const score = birkmanNormalized[dimKey];
                const isSelected = selectedBirkmanKey === dimKey;

                // Level label
                const levelLabel = score >= 70 ? 'مرتفع' : score >= 45 ? 'معتدل / متوازن' : 'منخفض';

                return (
                  <div
                    key={dimKey}
                    id={`birkman-bar-item-${dimKey}`}
                    onClick={() => setSelectedBirkmanKey(dimKey)}
                    className={`p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-cyan-500/70 ring-1 ring-cyan-500/40 shadow-md'
                        : 'bg-slate-900/50 border-slate-700/70 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <info.icon className="w-4 h-4" style={{ color: info.accentHex }} />
                        <span className="text-xs font-bold text-white">{info.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">({info.englishName})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                          {levelLabel}
                        </span>
                        <span className="text-xs font-black font-mono text-white min-w-[32px] text-left">
                          {score}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Track */}
                    <div className="w-full h-2.5 rounded-full bg-slate-950 border border-slate-800 overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-full rounded-full bg-gradient-to-r ${info.color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Deep Behavioral Needs & Stress Anatomy */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <currentBirkmanInfo.icon className="w-5 h-5" style={{ color: currentBirkmanInfo.accentHex }} />
                    <div>
                      <h4 className="text-sm font-bold text-white">{currentBirkmanInfo.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">{currentBirkmanInfo.englishName}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-cyan-300 font-mono">
                    {birkmanNormalized[selectedBirkmanKey]}%
                  </span>
                </div>

                {/* 3 Pillars of Birkman */}
                <div className="space-y-2.5 text-xs">
                  {/* Usual Behavior */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                    <div className="font-bold text-cyan-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>السلوك المعتاد والواضح (Usual Behavior):</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {currentBirkmanInfo.usualBehavior}
                    </p>
                  </div>

                  {/* Underlying Need */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-400" />
                      <span>الاحتياج البيئي الخفي (Underlying Need):</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {currentBirkmanInfo.underlyingNeed}
                    </p>
                  </div>

                  {/* Stress Response */}
                  <div className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-1">
                    <div className="font-bold text-rose-300 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                      <span>سلوك التوتر عند غياب الدعم (Stress Behavior):</span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {currentBirkmanInfo.stressResponse}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-slate-200">
                  <strong className="text-cyan-300">الأثر على ممارستك: </strong>
                  {currentBirkmanInfo.clinicalImpact}
                </div>
              </div>
            </div>
          </div>

          {/* Birkman 4-Color Grid Matrix */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-xl space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-cyan-400" />
              <span>مصفوفة ألوان بيركمان للأطباء (Birkman 4-Color Clinical Matrix)</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Red */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  birkmanArchetype.quadrant === 'red'
                    ? 'bg-rose-950/30 border-rose-500 ring-1 ring-rose-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-rose-400">الأحمر: المنفذ المباشر</span>
                  {birkmanArchetype.quadrant === 'red' && (
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                      نمطك السائد
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  طاقة حركية، إنجازات فورية وتدخل يدوي حاسم (الجراحة، الطوارئ، الحوادث).
                </p>
              </div>

              {/* Green */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  birkmanArchetype.quadrant === 'green'
                    ? 'bg-emerald-950/30 border-emerald-500 ring-1 ring-emerald-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-emerald-400">الأخضر: المتواصل</span>
                  {birkmanArchetype.quadrant === 'green' && (
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      نمطك السائد
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  إقناع وبناء علاقات وكسر الحواجز والتثقيف الإكلينيكي (الأطفال، الأسرة، النفسية).
                </p>
              </div>

              {/* Yellow */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  birkmanArchetype.quadrant === 'yellow'
                    ? 'bg-amber-950/30 border-amber-500 ring-1 ring-amber-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-amber-400">الأصفر: المحلل المنهجي</span>
                  {birkmanArchetype.quadrant === 'yellow' && (
                    <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                      نمطك السائد
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  أنظمة وبروتوكولات وتدقيق البيانات وضبط الجودة (الأشعة، الباثولوجي، الجودة).
                </p>
              </div>

              {/* Blue */}
              <div
                className={`p-4 rounded-xl border transition-all ${
                  birkmanArchetype.quadrant === 'blue'
                    ? 'bg-blue-950/30 border-blue-500 ring-1 ring-blue-500/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-blue-400">الأزرق: المفكر المخطط</span>
                  {birkmanArchetype.quadrant === 'blue' && (
                    <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                      نمطك السائد
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  عمق استراتيجي وتعاطف صبور وخطط علاجية ممتدة (الأعصاب، الأورام، الباطنة العامة).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW 3: SYNTHESIS COMPARISON (DISC + BIRKMAN UNIFIED SUMMARY)
         ========================================================================= */}
      {activeModel === 'synthesis' && (
        <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-700/80 shadow-xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <Layers className="w-4 h-4" />
            <span>الخلاصة المدمجة بين نموذجي DISC وبيركمان</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DISC Column */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400">نموذج DISC (الأسلوب السلوكي الظاهري)</span>
                <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[11px] font-bold font-mono">
                  {topDisc}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{discProfileTitle}</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                يحدد كيف تتصرف ميدانياً تحت ضغط المناوبات والعمليات، وأسلوب قيادتك للقرارات السريرية وسرعة وتيرتك في التعامل مع الفريق والمرضى.
              </p>
            </div>

            {/* Birkman Column */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400">نموذج بيركمان (الاحتياجات والدوافع النفسية)</span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[11px] font-bold">
                  {birkmanArchetype.colorName}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{birkmanArchetype.title}</h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                يكشف ما تحتاجه بيئتك الإكلينيكية من نظام وتواصل ودعم إداري لتعمل بأعلى شغف وتتجنب الاحتراق المهني على المدى الطويل.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-xs text-slate-200 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-cyan-300 text-sm block mb-1">الرؤية التوجيهية المتكاملة:</strong>
              تكامل نمطك السلوكي ({topDisc}) مع محركك النفسي ({birkmanArchetype.title}) يُرشحك للمسارات الطبية التي توفر توازناً بين التحدي الإكلينيكي والاستقرار النفسي المديد.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
