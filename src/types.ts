export type SpecialtyCategory =
  | 'جراحة كبرى'
  | 'جراحة تخصصية ودقيقة'
  | 'طب باطني وتفرعاته'
  | 'طب الأطفال وتفرعاته'
  | 'علوم الأعصاب والطب النفسي'
  | 'التشخيص والأشعة والمختبرات'
  | 'التخدير والعناية الحرجة والطوارئ'
  | 'الرعاية الأولية والوقائية والمجتمع'
  | 'طب الجلدية وإعادة التأهيل'
  | 'طب كبار السن وتلطيف الألم'
  | 'مجالات خاصة وطيران';

export interface SpecialtyMetrics {
  lifestyle: number;     // 1–10: 10 = Best work-life balance & controlled hours
  income: number;        // 1–10: 10 = Highest market income & private clinic yield
  manual: number;        // 1–10: 10 = High manual procedural & surgical dexterity
  contact: number;       // 1–10: 10 = Deep longitudinal patient contact & counseling
  stress: number;        // 1–10: 10 = High acute stress, critical life-or-death
  intellectual: number;  // 1–10: 10 = High diagnostic reasoning & puzzle solving
  research: number;      // 1–10: 10 = High research, academic trials & genetics
}

export type DiscDimension = 'D' | 'I' | 'S' | 'C';

export interface DiscScores {
  D: number; // Dominance: Decisive, direct, goal-oriented
  I: number; // Influence: Outgoing, persuasive, communicative
  S: number; // Steadiness: Patient, steady, empathetic, calm
  C: number; // Conscientiousness: Analytical, precise, quality-focused
}

export interface BirkmanScores {
  activity: number;    // Physical/energetic pace
  empathy: number;     // Emotional attunement & relational sensitivity
  structure: number;   // Need for rules, protocols, order
  change: number;      // Need for novelty & rapid variety
  advantage: number;   // Competitive & financial drive
}

export interface Specialty {
  id: string;
  category: SpecialtyCategory;
  name: string;
  englishName: string;
  duration: string;
  competition: 'منخفضة' | 'متوسطة' | 'متوسطة–مرتفعة' | 'مرتفعة' | 'مرتفعة جداً' | 'تنافسية شديدة';
  smleRange: string;
  lifestyle: string;
  income: string;
  patientType: string;
  boardDetails: string;
  metrics: SpecialtyMetrics;
  discAlignment: DiscDimension[];
  birkmanAlignment: {
    activity: 'high' | 'moderate' | 'low';
    empathy: 'high' | 'moderate' | 'low';
    structure: 'high' | 'moderate' | 'low';
    change: 'high' | 'moderate' | 'low';
    advantage: 'high' | 'moderate' | 'low';
  };
  tags: string[];
  pros: string[];
  cons: string[];
}

export type LearningStyleType = 'visual' | 'auditory' | 'kinesthetic';

export interface MedicalLearningStyleMethod {
  title: string;
  description: string;
  recommendedTools: string[];
}

export interface MedicalLearningStyle {
  primary: LearningStyleType;
  title: string;
  englishTitle: string;
  description: string;
  scores: {
    visual: number; // percentage 0-100
    auditory: number;
    kinesthetic: number;
  };
  rawScores: {
    visual: number;
    auditory: number;
    kinesthetic: number;
  };
  cognitiveTraits: string[];
  optimalStudyMethods: MedicalLearningStyleMethod[];
  boardExamStrategy: string; // استراتيجية التحضير لاختبارات البورد و SMLE
  roundsAndClinicalTip: string; // أثناء المرور السريري والمناقشات الصباحية
  pitfallsToAvoid: string[]; // محاذير تشتت انتباه هذا النمط
  speedRetentionHack: string; // تقنية التثبيت السريع للمعلومات الدوائية والتشخيصية
}

export interface QuestionOption {
  text: string;
  subtext?: string;
  discWeights?: Partial<Record<DiscDimension, number>>;
  birkmanWeights?: Partial<Record<keyof BirkmanScores, number>>;
  metricWeights?: Partial<Record<keyof SpecialtyMetrics, number>>;
  learningStyleWeights?: Partial<Record<LearningStyleType, number>>;
  specialType?: 'none' | 'all';
}

export interface QuizQuestion {
  id: number;
  category: string;
  title: string;
  description?: string;
  allowMultiple?: boolean;
  options: QuestionOption[];
}

export interface SpecialtyMatchResult {
  specialty: Specialty;
  matchPercentage: number;
  metricDelta: Record<keyof SpecialtyMetrics, number>;
  strengths: string[];
  cautions: string[];
}

export interface PvipsDimensionScore {
  score: number; // 0-100 normalized
  level: 'مرتفع جداً' | 'مرتفع' | 'متوازن' | 'معتدل' | 'منخفض';
  description: string;
}

export interface PvipsAnalysis {
  autonomy: PvipsDimensionScore;          // الاستقلالية وحرية القرار الإكلينيكي
  teamwork: PvipsDimensionScore;          // العمل الجماعي والتكاملي متعدد التخصصات
  technicalMastery: PvipsDimensionScore;  // الإتقان التقني والمهاري الدقيق
  teachingScholarship: PvipsDimensionScore; // التدريس والتعليم الطبي والأكاديمي
  workLifeBalance: PvipsDimensionScore;     // التوازن بين الحياة والعمل وجودة الحياة (Controllable Lifestyle)
  altruismCommunity: PvipsDimensionScore;   // الإيثار وصحة المجتمع
  prestigeIncome: PvipsDimensionScore;      // المكانة والدخل المالي والميزة التنافسية
  patientRelationship: PvipsDimensionScore; // عمق العلاقة الإنسانية الممتدة مع المرضى
  clinicalPersonaTitle: string;        // التوصيف المهني السريري الذكي
  summaryNarrative: string;            // ملخص نصي تحليلي ذكي يربط إجابات المستخدم بالقيم المهنية الجوهرية
  coreValuesDrivers: string[];         // أهم الدوافع القيمية الجوهرية الموجهة
  keyStrengths: string[];              // أبرز نقاط القوة الإكلينيكية المستنتجة
  idealEnvironment: string;            // البيئة المهنية والسريرية المثالية للممارسة
  growthAdvice: string;                // نصيحة استراتيجية مخصصة للنمو المهني وتفادي الاحتراق
}

export interface UserEvaluation {
  discScores: DiscScores;
  birkmanScores: BirkmanScores;
  userMetrics: SpecialtyMetrics;
  topDisc: DiscDimension;
  discProfileTitle: string;
  discProfileDescription: string;
  pvipsAnalysis: PvipsAnalysis;
  medicalLearningStyle?: MedicalLearningStyle;
  results: SpecialtyMatchResult[];
}
