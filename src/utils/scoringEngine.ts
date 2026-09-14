import {
  Specialty,
  SpecialtyMetrics,
  DiscScores,
  BirkmanScores,
  DiscDimension,
  UserEvaluation,
  SpecialtyMatchResult,
  PvipsAnalysis,
  PvipsDimensionScore,
  MedicalLearningStyle,
  LearningStyleType
} from '../types';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';

const METRIC_KEYS: (keyof SpecialtyMetrics)[] = [
  'lifestyle',
  'income',
  'manual',
  'contact',
  'stress',
  'intellectual',
  'research'
];

export function calculateEvaluation(
  selectedAnswers: Record<number, number[]>,
  specialties: Specialty[]
): UserEvaluation {
  const discScores: DiscScores = { D: 10, I: 10, S: 10, C: 10 };
  const birkmanScores: BirkmanScores = { activity: 10, empathy: 10, structure: 10, change: 10, advantage: 10 };
  const rawMetrics: Record<keyof SpecialtyMetrics, number> = {
    lifestyle: 5.5,
    income: 5.5,
    manual: 5.0,
    contact: 5.5,
    stress: 5.0,
    intellectual: 6.0,
    research: 5.0
  };
  const learningRawScores = { visual: 12, auditory: 12, kinesthetic: 12 };

  // Process all answers
  Object.entries(selectedAnswers).forEach(([qIdStr, optionIndices]) => {
    const qId = parseInt(qIdStr, 10);
    const question = QUIZ_QUESTIONS.find((q) => q.id === qId);
    if (!question || !optionIndices || optionIndices.length === 0) return;

    optionIndices.forEach((optIdx) => {
      const option = question.options[optIdx];
      if (!option) return;

      // Handle DISC
      if (option.discWeights) {
        Object.entries(option.discWeights).forEach(([k, val]) => {
          if (val) {
            discScores[k as DiscDimension] += val;
          }
        });
      }

      // Handle Birkman
      if (option.birkmanWeights) {
        Object.entries(option.birkmanWeights).forEach(([k, val]) => {
          if (val) {
            birkmanScores[k as keyof BirkmanScores] += val;
          }
        });
      }

      // Handle Metrics
      if (option.metricWeights) {
        Object.entries(option.metricWeights).forEach(([k, val]) => {
          if (val) {
            rawMetrics[k as keyof SpecialtyMetrics] += val * 0.18;
          }
        });
      }

      // Handle Medical Learning Style
      if (option.learningStyleWeights) {
        Object.entries(option.learningStyleWeights).forEach(([k, val]) => {
          if (val) {
            learningRawScores[k as LearningStyleType] += val;
          }
        });
      }
    });
  });

  // Clamp userMetrics to 1.0 - 10.0 range
  const userMetrics: SpecialtyMetrics = {
    lifestyle: Math.min(10, Math.max(1, Math.round(rawMetrics.lifestyle * 10) / 10)),
    income: Math.min(10, Math.max(1, Math.round(rawMetrics.income * 10) / 10)),
    manual: Math.min(10, Math.max(1, Math.round(rawMetrics.manual * 10) / 10)),
    contact: Math.min(10, Math.max(1, Math.round(rawMetrics.contact * 10) / 10)),
    stress: Math.min(10, Math.max(1, Math.round(rawMetrics.stress * 10) / 10)),
    intellectual: Math.min(10, Math.max(1, Math.round(rawMetrics.intellectual * 10) / 10)),
    research: Math.min(10, Math.max(1, Math.round(rawMetrics.research * 10) / 10))
  };

  // Determine Primary and Secondary DISC
  const discEntries = (Object.entries(discScores) as [DiscDimension, number][]).sort(
    (a, b) => b[1] - a[1]
  );
  const topDisc = discEntries[0][0];
  const secondDisc = discEntries[1][0];

  const { title: discProfileTitle, description: discProfileDescription } = getDiscProfileDetails(
    topDisc,
    secondDisc
  );

  // Compute PVIPS (Physician Values in Practice) Profile
  const pvipsAnalysis = analyzePvipsProfile(
    selectedAnswers,
    userMetrics,
    discScores,
    birkmanScores
  );

  // Compute Medical Learning Style Profile
  const medicalLearningStyle = analyzeMedicalLearningStyle(
    learningRawScores,
    userMetrics,
    topDisc
  );

  // Compute matches for all specialties
  const results = computeMatches(userMetrics, topDisc, secondDisc, specialties);

  return {
    discScores,
    birkmanScores,
    userMetrics,
    topDisc,
    discProfileTitle,
    discProfileDescription,
    pvipsAnalysis,
    medicalLearningStyle,
    results
  };
}

export function computeMatches(
  userMetrics: SpecialtyMetrics,
  topDisc: DiscDimension,
  secondDisc: DiscDimension | null,
  specialties: Specialty[]
): SpecialtyMatchResult[] {
  // Weights for each metric's contribution to similarity
  const metricWeights: Record<keyof SpecialtyMetrics, number> = {
    lifestyle: 1.2,
    income: 1.0,
    manual: 1.4,
    contact: 1.2,
    stress: 1.1,
    intellectual: 1.1,
    research: 0.9
  };

  const totalWeight = Object.values(metricWeights).reduce((a, b) => a + b, 0);

  const scored = specialties.map((spec) => {
    let weightedSqDist = 0;
    const metricDelta: Record<keyof SpecialtyMetrics, number> = {} as any;

    METRIC_KEYS.forEach((key) => {
      const diff = userMetrics[key] - spec.metrics[key];
      metricDelta[key] = Math.round(diff * 10) / 10;
      weightedSqDist += metricWeights[key] * Math.pow(diff, 2);
    });

    // Root mean squared error normalized to 0-10 scale
    const rmse = Math.sqrt(weightedSqDist / totalWeight);

    // Baseline match percentage (exponential decay from error)
    // max possible rmse is ~9, typical good match is 0.8-1.5
    let rawPercent = Math.max(30, Math.min(99, 100 - rmse * 11.2));

    // DISC alignment bonus (up to +6%)
    if (spec.discAlignment.includes(topDisc)) {
      rawPercent += 4;
    }
    if (secondDisc && spec.discAlignment.includes(secondDisc)) {
      rawPercent += 2.5;
    }

    const matchPercentage = Math.min(99, Math.round(rawPercent));

    // Calculate strengths & cautions
    const strengths: string[] = [];
    const cautions: string[] = [];

    if (Math.abs(metricDelta.manual) <= 1 && spec.metrics.manual >= 7) {
      strengths.push('تطابق ممتاز مع شغفك بالعمل الإجرائي والمهارة اليدوية');
    }
    if (Math.abs(metricDelta.intellectual) <= 1 && spec.metrics.intellectual >= 8) {
      strengths.push('يشبع فضولك المعرفي وعمقك في التفكير السريري الاستنتاجي');
    }
    if (Math.abs(metricDelta.lifestyle) <= 1.5 && spec.metrics.lifestyle >= 7) {
      strengths.push('يوفر لك جودة حياة وتوازناً أسرياً ممتازاً يتناغم مع أولوياتك');
    }
    if (Math.abs(metricDelta.contact) <= 1 && spec.metrics.contact >= 8) {
      strengths.push('يمنحك الفرصة لبناء علاقات إنسانية عميقة ورعاية ممتدة للمرضى');
    }
    if (Math.abs(metricDelta.income) <= 1.5 && spec.metrics.income >= 8) {
      strengths.push('يفتح لك آفاق دخل مجزية وفرصاً واعدة في القطاع الخاص والمراكز المتخصصة');
    }
    if (spec.discAlignment.includes(topDisc)) {
      strengths.push(`ينسجم بصورة طبيعية مع سمات شخصيتك القيادية السائدة (${topDisc})`);
    }

    // Cautions
    if (userMetrics.lifestyle >= 7 && spec.metrics.lifestyle <= 4) {
      cautions.push('تحدي جودة الحياة: ساعات العمل والمناوبات الطارئة قد تشكل ضغطاً على وقتك الشخصي');
    }
    if (userMetrics.stress <= 4 && spec.metrics.stress >= 8) {
      cautions.push('حساسية التوتر: الحالات الحرجة وقرارات اللحظات الأخيرة تتطلب مرونة عصبية عالية');
    }
    if (userMetrics.manual >= 7 && spec.metrics.manual <= 3) {
      cautions.push('قلة الإجراءات: التخصص يعتمد على التفكير والاستشارات مع غياب شبه تام للعمل الجراحي');
    }
    if (userMetrics.contact <= 3 && spec.metrics.contact >= 8) {
      cautions.push('كثافة التواصل: يتطلب تعاملاً مستمراً وصبوراً مع أهالي المرضى والشكاوى اليومية');
    }

    if (strengths.length === 0) {
      strengths.push('توافق متوازن مع المعايير العامة دون تفوق استثنائي في محور واحد');
    }

    return {
      specialty: spec,
      matchPercentage,
      metricDelta,
      strengths,
      cautions
    };
  });

  // Sort descending by match percentage
  return scored.sort((a, b) => b.matchPercentage - a.matchPercentage);
}

function getDiscProfileDetails(
  topDisc: DiscDimension,
  secondDisc: DiscDimension
): { title: string; description: string } {
  const profileMap: Record<string, { title: string; description: string }> = {
    'D-C': {
      title: 'القائد التحليلي الحاسم (Decisive Strategist - D/C)',
      description:
        'تجمع بين سرعة الحسم والجرأة القيادية مع التدقيق المعياري الصارم. تحسم في اللحظات الحرجة بناءً على حقائق وأرقام دقيقة. تناسبك غرف العمليات الكبرى، جراحات الدماغ والقلب، والتخصصات التداخلية الدقيقة.'
    },
    'D-I': {
      title: 'القائد المحفز الميداني (Dynamic Driver - D/I)',
      description:
        'شخصية مفعمة بالحيوية والطاقة العالية والقدرة على المبادرة وتوجيه الفرق الطبية في أوقات الأزمات. تحب البيئات سريعة الإيقاع وتكره الرتابة. تتألق في جراحة العظام، الطوارئ والحوادث، والطب الرياضي.'
    },
    'D-S': {
      title: 'القائد الصبور الموجه (Steadfast Achiever - D/S)',
      description:
        'حازم في تحقيق الأهداف دون أن تفقد هدوءك وصبرك وطاقتك الاستيعابية. موثوق جداً في الأزمات الممتدة. تتفوق في جراحة الأطفال، النساء والتوليد، وجراحة الأوعية الدموية.'
    },
    'I-D': {
      title: 'المبادر المؤثر الجريء (Persuasive Trailblazer - I/D)',
      description:
        'شخصية جذابة وكاريزمية، تتواصل ببراعة مع المرضى وتتخذ خطوات تسويقية واستثمارية واثقة. تتألق في جراحة التجميل، الطب الرياضي، ومراكز جراحة اليوم الواحد.'
    },
    'I-S': {
      title: 'الممارس الإنساني الودود (Empathetic Communicator - I/S)',
      description:
        'طبيب إنساني من الطراز الأول، تمتلك سحر الاستماع وبث الطمأنينة والأمل في نفوس المرضى وعائلاتهم. تناسبك جداً عيادات طب الأسرة، طب الأطفال العام، الطب النفسي، والطب التلطيفي.'
    },
    'I-C': {
      title: 'المتحدث العلمي الخبير (Articulate Specialist - I/C)',
      description:
        'تجمع بين الفصاحة والقدرة على التوضيح والإقناع مع التمكن العلمي الدقيق. تحب الأناقة والجمال الطبي المبني على المعايير. تتألق في الأمراض الجلدية، طب العيون، ومناظير الجهاز الهضمي.'
    },
    'S-I': {
      title: 'الملاذ الحنون الصبور (Caring Counselor - S/I)',
      description:
        'شخصية دافئة وهادئة تمنح المريض شعوراً بالأمان والراحة العميقة. تتحمل شكاوى المرضى برحابة صدر نادرة. تتألق في الطب النفسي للأطفال، طب كبار السن، والرعاية التلطيفية.'
    },
    'S-C': {
      title: 'الممارس المتفاني المنهجي (Methodical Caregiver - S/C)',
      description:
        'منضبط، منظم، هادئ الأعصاب، يراعي أدق التفاصيل الفسيولوجية دون تسرع أو إهمال. تتفوق في الباطنة العامة، أمراض الغدد الصماء والسكري، الروماتيزم، وأمراض الكلى.'
    },
    'S-D': {
      title: 'السند الهادئ الحاسم (Calm Anchor - S/D)',
      description:
        'تتسم بالاتزان النفسي الشديد والقدرة على امتصاص توتر الآخرين والتدخل بحزم وقت الضرورة. تناسبك تخصصات مثل التخدير، العناية الحرجة، وطب الأطفال.'
    },
    'C-D': {
      title: 'الخبير الاستقصائي المعياري (Precision Architect - C/D)',
      description:
        'عقلية تفكير هندسية متطورة في حل المعضلات المعقدة. تطلب الكمال والوضوح وترفض التخمين. تتألق في الأشعة التداخلية، جراحة المخ والأعصاب، والأشعة التشخيصية.'
    },
    'C-S': {
      title: 'المحقق العلمي الهادئ (Analytical Scholar - C/S)',
      description:
        'مفكر سريري عميق، تبحث في أدق تفاصيل المناعة والوراثة والفسيولوجيا. تتمتع ببال طويل في متابعة الحالات النادرة. تناسبك طب الأعصاب، أمراض الكلى، الوراثة الطبية، والأمراض المعدية.'
    },
    'C-I': {
      title: 'الاستشاري الأكاديمي المبتكر (Insightful Advisor - C/I)',
      description:
        'قدرة استثنائية على تحليل البيانات الطبية المعقدة وصياغتها في تقارير واستشارات جلية للأطباء والباحثين. تتألق في علم الأمراض (الباثولوجي)، الطب النووي، والطب الوقائي والوبائيات.'
    }
  };

  const key = `${topDisc}-${secondDisc}`;
  if (profileMap[key]) {
    return profileMap[key];
  }

  // Fallback defaults
  const fallbackSingle: Record<DiscDimension, { title: string; description: string }> = {
    D: {
      title: 'النمط القيادي الحازم (Dominant Leader)',
      description:
        'تتميز بالجرأة وسرعة اتخاذ القرارات الحاسمة والميل للمهام ذات التحدي والنتائج السريعة الملموسة.'
    },
    I: {
      title: 'النمط الاجتماعي التأثيري (Inspiring Influencer)',
      description:
        'تتميز بمهارات التواصل العالية، والتعاطف الصادق، والقدرة على بناء علاقات ثقة وإيجابية مع المرضى والزملاء.'
    },
    S: {
      title: 'النمط المستقر الصبور (Steady Supporter)',
      description:
        'تتميز بالصبر والهدوء والوفاء طويل الأمد للمرضى، والقدرة على العمل في بيئات متزنة ومستقرة.'
    },
    C: {
      title: 'النمط التحليلي المعياري (Conscientious Analyst)',
      description:
        'تتميز بالدقة الشديدة، والحرص على تطبيق أعلى معايير الجودة العلمية، وعشق التفكير الاستنتاجي المنهجي.'
    }
  };

  return fallbackSingle[topDisc];
}

/**
 * دالة تحليل الأنماط المهنية والقيم المهنية الجوهرية (PVIPS: Physician Values in Practice Scale)
 * تربط إجابات المستخدم بالقيم المهنية الكبرى:
 * 1. الاستقلالية والسيادة الإكلينيكية (Autonomy & Independent Decision Making)
 * 2. التدريس ونقل المعرفة والبحث الأكاديمي (Teaching & Scholarship)
 * 3. التوازن بين الحياة والعمل والنمط القابل للتحكم (Work-Life Balance & Controllable Lifestyle)
 * 4. الإيثار وصحة المجتمع والأثر العام (Altruism & Population Health)
 * 5. الدخل المالي والمكانة والميزة التنافسية (Income, Prestige & Business Drive)
 * 6. عمق الرعاية والعلاقة الإنسانية الممتدة مع المرضى (Patient Relationship & Longitudinal Care)
 */
export function analyzePvipsProfile(
  selectedAnswers: Record<number, number[]>,
  userMetrics: SpecialtyMetrics,
  discScores: DiscScores,
  birkmanScores: BirkmanScores
): PvipsAnalysis {
  // تجميع مؤشرات القيم الجوهرية من الأسئلة والمقاييس بمعايرة دقيقة
  let autonomyRaw = 32;
  let teamworkRaw = 32;
  let technicalMasteryRaw = 32;
  let teachingRaw = 32;
  let balanceRaw = 32;
  let altruismRaw = 32;
  let prestigeRaw = 32;
  let patientRelRaw = 32;

  // الربط المباشر من المقاييس المجمعة
  balanceRaw += (userMetrics.lifestyle - 5.5) * 4.2 - (userMetrics.stress - 5) * 2.1;
  autonomyRaw += (discScores.D - 10) * 0.9 + (birkmanScores.advantage - 10) * 0.7;
  teamworkRaw += (discScores.S - 10) * 0.8 + (discScores.I - 10) * 0.6 + (birkmanScores.empathy - 10) * 0.7;
  technicalMasteryRaw += (userMetrics.manual - 5.5) * 4.5 + (discScores.D - 10) * 0.5 + (discScores.C - 10) * 0.5;
  teachingRaw += (userMetrics.research - 5) * 2.8 + (userMetrics.intellectual - 6) * 2.2 + (discScores.C - 10) * 0.6;
  prestigeRaw += (userMetrics.income - 5.5) * 3.8 + (birkmanScores.advantage - 10) * 0.9;
  patientRelRaw += (userMetrics.contact - 5.5) * 3.8 + (birkmanScores.empathy - 10) * 1.1;
  altruismRaw += (birkmanScores.empathy - 10) * 0.9 + (userMetrics.contact - 5.5) * 1.6 + (userMetrics.lifestyle < 4 ? 6 : 0);

  // تحليل تفصيلي لخيارات الأسئلة المحورية
  const q30 = selectedAnswers[30] || [];
  if (q30.includes(0)) teachingRaw += 8;
  if (q30.includes(1)) { prestigeRaw += 6; teachingRaw -= 4; }
  if (q30.includes(2)) altruismRaw += 7;

  const q31 = selectedAnswers[31] || [];
  if (q31.includes(0)) autonomyRaw += 9; // سيادة فردية
  if (q31.includes(1)) { autonomyRaw -= 4; teamworkRaw += 8; }  // عمل تشاركي
  if (q31.includes(2)) autonomyRaw += 5; // رأي استشاري محايد
  if (q31.includes(3)) { autonomyRaw += 8; prestigeRaw += 6; } // عيادة خاصة

  const q32 = selectedAnswers[32] || [];
  if (q32.includes(0)) technicalMasteryRaw += 11; // جراحة مجهرية وأوعية دقيقة
  if (q32.includes(1)) technicalMasteryRaw += 8; // مهارة ميكانيكية عظمية
  if (q32.includes(2)) technicalMasteryRaw += 9; // مناظير وقساطر وتدخلات دقيقة
  if (q32.includes(3)) technicalMasteryRaw -= 9; // سريري بدون إجراءات يدوية

  const q36 = selectedAnswers[36] || [];
  if (q36.includes(0)) { altruismRaw += 9; teamworkRaw += 7; } // وبائيات وصحة عامة
  if (q36.includes(1)) teachingRaw += 6; // ميكروبيولوجيا وأمراض معدية
  if (q36.includes(2)) { technicalMasteryRaw += 6; autonomyRaw += 4; } // إنعاش وعزل

  const q38 = selectedAnswers[38] || [];
  if (q38.includes(0)) technicalMasteryRaw += 7; // حقن ومحفزات ألم تداخلي
  if (q38.includes(2)) technicalMasteryRaw += 8; // استئصال جراحي جذري

  const q41 = selectedAnswers[41] || [];
  if (q41.includes(0)) teamworkRaw += 10; // لجان أورام متعددة التخصصات MDT
  if (q41.includes(1)) { teamworkRaw += 7; technicalMasteryRaw += 5; } // فريق تدخل سريع
  if (q41.includes(2)) { teamworkRaw -= 7; autonomyRaw += 8; } // عيادة خاصة فردية
  if (q41.includes(3)) { teamworkRaw -= 4; teachingRaw += 6; } // خبير تشخيصي

  const q42 = selectedAnswers[42] || [];
  if (q42.includes(0)) balanceRaw += 11; // جودة الحياة خط أحمر
  if (q42.includes(1)) { balanceRaw -= 10; altruismRaw += 8; prestigeRaw += 5; } // تضحية كاملة
  if (q42.includes(2)) balanceRaw += 5; // نظام مجمع Block shifts

  const q43 = selectedAnswers[43] || [];
  if (q43.includes(0)) { autonomyRaw += 10; prestigeRaw += 8; } // عيادة خاصة
  if (q43.includes(1)) { autonomyRaw -= 4; balanceRaw += 4; teamworkRaw += 5; } // منظومة حكومية آمنة
  if (q43.includes(2)) { autonomyRaw += 5; prestigeRaw += 6; } // ممارسة مزدوجة
  if (q43.includes(3)) autonomyRaw += 7; // تقارير فنية محايدة

  const q44 = selectedAnswers[44] || [];
  if (q44.includes(0)) teachingRaw += 10; // باحث سريري دولي
  if (q44.includes(1)) teachingRaw -= 4; // ممارس ميداني

  const q46 = selectedAnswers[46] || [];
  if (q46.includes(0)) technicalMasteryRaw += 9; // روبوت دافنشي
  if (q46.includes(1)) technicalMasteryRaw += 8; // جراحة مفتوحة ولمس حسي
  if (q46.includes(2)) teachingRaw += 5; // ذكاء اصطناعي وأشعة

  const q47 = selectedAnswers[47] || [];
  if (q47.includes(0)) { autonomyRaw += 6; teamworkRaw += 4; } // قائد أوركسترا حازم
  if (q47.includes(1)) teamworkRaw += 10; // محاور تشاركي
  if (q47.includes(2)) { teamworkRaw -= 4; autonomyRaw += 5; } // مستشار علمي صامت

  const q48 = selectedAnswers[48] || [];
  if (q48.includes(0)) altruismRaw += 8; // وقاية استباقية
  if (q48.includes(1)) { autonomyRaw += 4; technicalMasteryRaw += 6; } // تدخل جراحي تفاعلي
  if (q48.includes(2)) { technicalMasteryRaw += 6; patientRelRaw += 5; } // ترميم وتأهيل

  const q49 = selectedAnswers[49] || [];
  if (q49.includes(0)) prestigeRaw += 9; // متحدث دولي ومكانة عالمية
  if (q49.includes(1)) { prestigeRaw -= 6; altruismRaw += 5; } // تأثير صامت

  const q50 = selectedAnswers[50] || [];
  if (q50.includes(0)) { technicalMasteryRaw += 10; autonomyRaw += 5; prestigeRaw += 4; } // إتقان ميكانيكي
  if (q50.includes(1)) { patientRelRaw += 9; altruismRaw += 6; } // حكمة سريرية شاملة
  if (q50.includes(2)) { teachingRaw += 9; altruismRaw += 6; } // استقصاء وبحث جزيئي
  if (q50.includes(3)) balanceRaw += 10; // توازن وجودة حياة

  const q51 = selectedAnswers[51] || [];
  if (q51.includes(0)) { patientRelRaw += 6; teachingRaw += 4; } // غموض رمادي استقرائي
  if (q51.includes(1)) { teachingRaw += 5; balanceRaw += 4; } // قطع مخبري وشعاعي
  if (q51.includes(2)) { autonomyRaw += 6; technicalMasteryRaw += 7; } // استكشاف جراحي حاسم
  if (q51.includes(3)) { teamworkRaw += 5; balanceRaw += 4; } // خوارزمية بروتوكولية

  const q52 = selectedAnswers[52] || [];
  if (q52.includes(0)) { altruismRaw += 10; patientRelRaw += 9; } // رعاية تلطيفية وإنسانية
  if (q52.includes(1)) { autonomyRaw += 6; technicalMasteryRaw += 6; balanceRaw -= 7; } // إنعاش قتالي حتى النهاية
  if (q52.includes(2)) { balanceRaw += 10; prestigeRaw += 4; } // تجنب حالات الوفاة
  if (q52.includes(3)) { teachingRaw += 9; altruismRaw += 5; } // أبحاث أورام وعلاجات جينية

  const q53 = selectedAnswers[53] || [];
  if (q53.includes(0)) { technicalMasteryRaw += 9; prestigeRaw += 7; } // مفاصل وقساطر وأجهزة
  if (q53.includes(1)) { teachingRaw += 7; balanceRaw += 5; } // ذكاء اصطناعي وبرمجيات
  if (q53.includes(2)) { patientRelRaw += 7; altruismRaw += 5; } // ممارسة سريرية إنسانية كلاسيكية

  const q54 = selectedAnswers[54] || [];
  if (q54.includes(0)) { patientRelRaw += 9; teamworkRaw += 7; } // استماع نشط وتحالف علاجي
  if (q54.includes(1)) { autonomyRaw += 7; prestigeRaw += 4; } // حدود قانونية حازمة
  if (q54.includes(2)) { balanceRaw += 7; teamworkRaw -= 4; } // تقارير فنية محايدة

  const q55 = selectedAnswers[55] || [];
  if (q55.includes(0)) { technicalMasteryRaw += 8; prestigeRaw += 7; teachingRaw += 5; } // تخصص دقيق ميكروي
  if (q55.includes(1)) { patientRelRaw += 9; altruismRaw += 7; balanceRaw += 4; } // طبيب شامل موسوعي
  if (q55.includes(2)) { technicalMasteryRaw += 6; autonomyRaw += 7; } // تدخلي شامل للطوارئ

  const q56 = selectedAnswers[56] || [];
  if (q56.includes(0)) { technicalMasteryRaw += 5; balanceRaw += 5; } // إغلاق فوري سريع
  if (q56.includes(1)) { technicalMasteryRaw += 7; prestigeRaw += 5; } // دورة جراحية محددة
  if (q56.includes(2)) { patientRelRaw += 10; altruismRaw += 6; } // رعاية تراكمية ممتدة

  const q57 = selectedAnswers[57] || [];
  if (q57.includes(0)) { technicalMasteryRaw += 8; autonomyRaw += 5; } // مناعة حسية كاملة للجراحة
  if (q57.includes(1)) { patientRelRaw += 5; balanceRaw += 3; } // فحص سريري باطني معتاد
  if (q57.includes(2)) { balanceRaw += 9; prestigeRaw += 4; } // بيئة جافة ونظيفة ومحكمة

  const q58 = selectedAnswers[58] || [];
  if (q58.includes(0)) { teachingRaw += 7; teamworkRaw += 5; } // توثيق قانوني وبحثي دقيق
  if (q58.includes(1)) { technicalMasteryRaw += 7; autonomyRaw += 5; } // عمل يدوي 85%
  if (q58.includes(2)) { balanceRaw += 7; teachingRaw += 3; } // قوالب صور وأرقام

  const q59 = selectedAnswers[59] || [];
  if (q59.includes(0)) { altruismRaw += 11; technicalMasteryRaw += 6; } // إغاثة كوارث وخطوط أولى
  if (q59.includes(1)) { altruismRaw += 10; patientRelRaw += 7; } // صحة عامة وتطعيمات ومياه
  if (q59.includes(2)) { prestigeRaw += 7; technicalMasteryRaw += 5; } // مراكز مرجعية متقدمة

  const q60 = selectedAnswers[60] || [];
  if (q60.includes(0)) { patientRelRaw += 11; altruismRaw += 9; } // ملاذ القلوب
  if (q60.includes(1)) { technicalMasteryRaw += 11; prestigeRaw += 9; autonomyRaw += 7; } // الجراح الأسطوري
  if (q60.includes(2)) { teachingRaw += 11; prestigeRaw += 6; } // العالم المبتكر
  if (q60.includes(3)) { balanceRaw += 11; prestigeRaw += 6; } // الرائد المتوازن

  // دالة تحويل الدرجة الخام إلى مستوى ونسبة ووصف
  const formatDimension = (
    scoreRaw: number,
    highDesc: string,
    balancedDesc: string,
    lowDesc: string
  ): PvipsDimensionScore => {
    const score = Math.max(15, Math.min(96, Math.round(scoreRaw)));
    let level: 'مرتفع جداً' | 'مرتفع' | 'متوازن' | 'معتدل' | 'منخفض';
    let description: string;

    if (score >= 82) {
      level = 'مرتفع جداً';
      description = highDesc;
    } else if (score >= 68) {
      level = 'مرتفع';
      description = highDesc;
    } else if (score >= 50) {
      level = 'متوازن';
      description = balancedDesc;
    } else if (score >= 38) {
      level = 'معتدل';
      description = balancedDesc;
    } else {
      level = 'منخفض';
      description = lowDesc;
    }

    return { score, level, description };
  };

  const autonomy = formatDimension(
    autonomyRaw,
    'تمنح أولوية قصوى للسيادة الفردية وحرية اتخاذ القرارات الإكلينيكية المستقلة، وتفضل البيئات أو العيادات التي تمنحك قيادة مصيرك المهني بعيداً عن البيروقراطية المقيدة.',
    'تتقبل المزيج المتوازن بين حرية القرار المستقل والعمل المشترك ضمن لجان وفرق طبية متعددة التخصصات.',
    'تفضل العمل تحت مظلة مؤسسية واضحة وبروتوكولات إرشادية صارمة تقلل من عبء المسؤولية الفردية المنفردة.'
  );

  const teamwork = formatDimension(
    teamworkRaw,
    'تزدهر في بيئات التعاون متعددة التخصصات (MDT) وتعتبر التكامل بين مختلف الكوادر الصحية ولجان الرعاية ركيزة تفوقك الإكلينيكي.',
    'تتعامل بمرونة بين العمل الفردي المستقل والمشاركة الفعالة في فرق العمل السريرية حسب طبيعة الحالة.',
    'تفضل الاعتماد التام على قراراتك الشخصية الذاتية وتتحاشى الاجتماعات واللجان الطبية المطولة.'
  );

  const technicalMastery = formatDimension(
    technicalMasteryRaw,
    'تمتلك شغفاً استثنائياً بالإتقان الميكانيكي، والمهارات اليدوية الدقيقة، والجراحة المجهرية، والتحكم في التقنيات التداخلية المتطورة.',
    'تستمتع بدمج المهارة الإجرائية اليدوية مع الفكر التشخيصي الباطني بتوازن واعتدال.',
    'ينصب اهتمامك على الفكر الاستقرائي والتحليل السريري أو المخبري دون رغبة في الإجراءات الجراحية واليدوية.'
  );

  const teachingScholarship = formatDimension(
    teachingRaw,
    'يشكل الشغف الأكاديمي، ونقل المعرفة للأطباء المقيمين، والمشاركة في الأبحاث والتعليم السريري ركيزة جوهرية في هويتك الطبيانية.',
    'تنظر للتعليم الطبي كرافد إيجابي مكمل للممارسة السريرية متى ما توفرت البيئة الأكاديمية الداعمة دون الإخلال بمهامك الأساسية.',
    'ينصب تركيزك الخالص على الكفاءة التشغيلية والإنتاجية العلاجية المباشرة للمرضى بعيداً عن التكاليف الأكاديمية والتدريسية.'
  );

  const workLifeBalance = formatDimension(
    balanceRaw,
    'تعتبر التوازن بين الحياة الشخصية وضغط العمل وجودة ساعات الراحة والعائلة خطاً أحمر؛ تبحث عن تخصصات قابلة للتحكم (Controllable Lifestyle) بجدول منتظم وخلو من المناوبات المفاجئة.',
    'تتمتع بمرونة جيدة في إدارة الإجهاد مع الحرص على فترات استرجاع طاقة متوازنة تدعم الاستمرارية المهنية.',
    'تضع رسالة الإنقاذ والعمل الجراحي أو الحرج فوق اعتبارات الراحة الشخصية، ومستعد للالتزام بمناوبات استدعاء مكثفة ومسؤولية مستمرة على مدار الساعة.'
  );

  const altruismCommunity = formatDimension(
    altruismRaw,
    'تتحرك بدافع إيثاري عميق وصوت إنساني قوي، يهمك إحداث أثر ملموس في صحة المجتمع والوقاية الاستباقية أو تخفيف آلام الفئات الأكثر ضعفاً.',
    'تجمع بين التعاطف الإنساني والاحترافية العملية المتزنة في خدمة المراجعين.',
    'تركز على دقة الإجراء المهني والحلول التقنية أو العضوية الملموسة أكثر من الانغماس في الأبعاد المجتمعية العامة.'
  );

  const prestigeIncome = formatDimension(
    prestigeRaw,
    'تمتلك حساً ريادياً وطموحاً واضحاً نحو المكانة المهنية المرموقة، وتوسيع آفاق العائد المالي والاستثمار في القطاع الخاص والمراكز التخصصية.',
    'تنظر للدخل والمكانة كحق طبيعي مكمل للتميز المهني دون أن يكون المحرك الوحيد لقراراتك.',
    'تكتفي بالأمان الوظيفي المستقر وتفضل راحة البال أو الرسالة الأكاديمية والإنسانية على حساب الجري وراء المكاسب المالية التنافسية.'
  );

  const patientRelationship = formatDimension(
    patientRelRaw,
    'تستمد متعتك الحقيقية من التواصل الإنساني الدافئ والمرافقة الممتدة لسنوات مع المرضى وعائلاتهم والاستماع لقصصهم وآلامهم.',
    'تتعامل بتواصل إكلينيكي فعال ومهني يحقق الهدف العلاجي باحترام متبادل.',
    'تفضل التركيز على الأبعاد الفنية التشخيصية، الأجهزة، الصور أو العمليات تحت التخدير دون انخراط عاطفي طويل الأمد في الشكاوى اليومية.'
  );

  // استخلاص أهم 3 دوافع قيمية
  const driversMap: { name: string; score: number }[] = [
    { name: 'الاستقلالية وحرية القرار الإكلينيكي', score: autonomy.score },
    { name: 'العمل الجماعي والتعاون متعدد التخصصات', score: teamwork.score },
    { name: 'الإتقان التقني والمهارة اليدوية الدقيقة', score: technicalMastery.score },
    { name: 'التدريس والتعليم الطبي والأكاديمي', score: teachingScholarship.score },
    { name: 'التوازن وجودة الحياة الأسرية (Controllable Lifestyle)', score: workLifeBalance.score },
    { name: 'الإيثار الصحي والأثر المجتمعي', score: altruismCommunity.score },
    { name: 'المكانة والدخل والريادة المهنية', score: prestigeIncome.score },
    { name: 'العلاقة الإنسانية الممتدة مع المرضى', score: patientRelationship.score }
  ];

  driversMap.sort((a, b) => b.score - a.score);
  const coreValuesDrivers = driversMap.slice(0, 3).map((d) => `${d.name} (${d.score}%)`);

  // تحديد التوصيف المهني السريري الذكي (Clinical Persona Title)
  let clinicalPersonaTitle = 'الطبيب الشامل متعدد الكفاءات السريرية';
  if (technicalMastery.score >= 70 && autonomy.score >= 65) {
    clinicalPersonaTitle = 'المبتكر الإجرائي والجراح المتقن (Master Proceduralist)';
  } else if (teachingScholarship.score >= 70 && autonomy.score >= 50) {
    clinicalPersonaTitle = 'العالم الأكاديمي والمحقق الإكلينيكي (Academic Clinician)';
  } else if (patientRelationship.score >= 70 && altruismCommunity.score >= 65) {
    clinicalPersonaTitle = 'الحكيم الإنساني ورائد الرعاية الشاملة (Holistic Caregiver)';
  } else if (workLifeBalance.score >= 70 && autonomy.score >= 60) {
    clinicalPersonaTitle = 'الممارس الاستراتيجي عالي التوازن (Balanced Specialist)';
  } else if (teamwork.score >= 70 && altruismCommunity.score >= 60) {
    clinicalPersonaTitle = 'القائد التكاملي ومهندس الرعاية المشتركة (Collaborative Care Leader)';
  }

  // بناء نقاط القوة السريرية المستنتجة (Key Strengths)
  const keyStrengths: string[] = [];
  if (technicalMastery.score >= 65) keyStrengths.push('براعة فائقة في الإجراءات التداخلية والتحكم في الأدوات الدقيقة');
  if (autonomy.score >= 65) keyStrengths.push('شجاعة عالية في اتخاذ القرارات السريرية المستقلة وتحمل مسؤولية المريض');
  if (teamwork.score >= 65) keyStrengths.push('قدرة قيادية ممتازة على التنسيق ضمن لجان الرعاية متعددة التخصصات (MDT)');
  if (teachingScholarship.score >= 65) keyStrengths.push('شغف أصيل بنقل المعرفة السريرية وتأهيل أطباء المستقبل والبحث العلمي');
  if (patientRelationship.score >= 65) keyStrengths.push('ذكاء عاطفي وتواصل إنساني متقدم يبني ثقة عميقة وطويلة الأمد مع المرضى');
  if (workLifeBalance.score >= 65) keyStrengths.push('قدرة استراتيجية على ضبط عبء العمل ومنع الاحتراق الوظيفي لضمان استدامة العطاء');
  if (keyStrengths.length < 3) keyStrengths.push('مرونة عالية في التكيف مع متطلبات المنظومة الصحية وسلاسة اتخاذ القرار');

  // البيئة السريرية المثالية (Ideal Environment)
  let idealEnvironment = 'مراكز طبية تخصصية تجمع بين العمل السريري المنتظم والتعاون المؤسسي المتزن.';
  if (technicalMastery.score >= 70) {
    idealEnvironment = 'أجنحة العمليات الجراحية المتقدمة، وحدات القسطرة والمناظير، ومراكز جراحة اليوم الواحد التخصصية.';
  } else if (teachingScholarship.score >= 70) {
    idealEnvironment = 'المدن الطبية المرجعية، المستشفيات الجامعية، ومراكز الأبحاث والتجارب السريرية الدولية.';
  } else if (patientRelationship.score >= 70) {
    idealEnvironment = 'مراكز الرعاية الأولية المتقدمة، عيادات الباطنة التخصصية، ومراكز رعاية الأمراض المزمنة والتلطيفية.';
  } else if (workLifeBalance.score >= 70) {
    idealEnvironment = 'العيادات التخصصية المستقلة، المراكز النهارية ذات الجداول المنضبطة، وأقسام التشخيص غير المناوبة.';
  }

  // نصيحة استراتيجية للنمو وتفادي الاحتراق (Growth Advice)
  let growthAdvice = 'احرص على تنمية شبكة علاقاتك المهنية والاستمرار في التطوير الطبي المستمر مع الحفاظ على مرونة جدولك.';
  if (workLifeBalance.score < 50 && technicalMastery.score >= 70) {
    growthAdvice = 'شغفك العالي بالعمليات والإجراءات قد يجعلك عرضة للإجهاد البدني والذهني المتراكم؛ ضع فترات استرجاع طاقة دورية لحماية شغفك لعقود قادمة.';
  } else if (teachingScholarship.score >= 70) {
    growthAdvice = 'وازن بين أعباء التدريس الأكاديمي والالتزامات السريرية، واختر مستشفيات توفر وقتاً مخصصاً ومحمياً (Protected Research Time) للأبحاث.';
  } else if (autonomy.score >= 75) {
    growthAdvice = 'ابحث عن مسارات الممارسة الخاصة أو الزمالات التخصصية الدقيقة التي تمنحك استقلالية سريعة وتحكماً كاملاً في قراراتك الإكلينيكية.';
  }

  // بناء الملخص النصي التحليلي الشامل
  const top1 = driversMap[0];
  const top2 = driversMap[1];
  const top3 = driversMap[2];

  let summaryNarrative = `يكشف تحليلك وفق مقياس القيم المهنية في الممارسة (PVIPS) ومعايير رابطة الكليات الطبية الأمريكية (AAMC) عن بوصلة مهنية واضحة تقودها في المقام الأول قيمة «${top1.name}» بدرجة (${top1.score}%)، وتتكامل وثيقاً مع «${top2.name}» بدرجة (${top2.score}%) و«${top3.name}» بدرجة (${top3.score}%). `;

  if (workLifeBalance.score >= 70 && autonomy.score >= 65) {
    summaryNarrative += `هذا التوجه المزدوج نحو الاستقلالية وجودة الحياة يجعلك مرشحاً مثالياً لتخصصات العيادات المتخصصة والطب التخصصي القابل للتحكم، حيث السيادة في تنظيم جدولك اليومي وتحقيق التميز المادي والمهني دون استنزاف حياتك الشخصية.`;
  } else if (teachingScholarship.score >= 70) {
    summaryNarrative += `يشير شغفك المرتفع بالتدريس والبحث إلى طبيب أكاديمي بالفطرة، يزدهر في أروقة المدن الطبية والمستشفيات الجامعية الكبرى، حيث يجمع بين الرعاية المعقدة وتأهيل أطباء الغد وإثراء السجل الطبي بالأدلة العلمية.`;
  } else if (autonomy.score >= 75 && workLifeBalance.score < 50) {
    summaryNarrative += `يعكس هذا النمط الطبي الجريء شخصية قيادية حاسمة تفضل غرف العمليات والميادين الحرجة؛ فأنت مستعد للمخاطرة وتحمل الضغط العصبي والمناوبات الطويلة في سبيل تحقيق إنقاذ فوري ونتائج جراحية ملموسة تُنسب إلى براعتك اليدوية المباشرة.`;
  } else if (patientRelationship.score >= 70 && altruismCommunity.score >= 65) {
    summaryNarrative += `تبرز إجاباتك وجداناً إنسانياً عميقاً يجد معناه في الرعاية الشاملة ومرافقة المريض في رحلته العلاجية الممتدة، ما يمنحك تميزاً استثنائياً في مجالات الرعاية الأولية، الباطنة التخصصية، طب الأطفال، والطب التلطيفي.`;
  } else {
    summaryNarrative += `يعكس ملفك اتزاناً ناضجاً بين الجوانب السريرية والتشغيلية، مما يمنحك مرونة عالية للتكيف والتفوق في تخصصات تلائم ذكاءك التحليلي وتطلعاتك المستقبلية في المنظومة الصحية.`;
  }

  return {
    autonomy,
    teamwork,
    technicalMastery,
    teachingScholarship,
    workLifeBalance,
    altruismCommunity,
    prestigeIncome,
    patientRelationship,
    clinicalPersonaTitle,
    summaryNarrative,
    coreValuesDrivers,
    keyStrengths,
    idealEnvironment,
    growthAdvice
  };
}

export function analyzeMedicalLearningStyle(
  rawScores: { visual: number; auditory: number; kinesthetic: number },
  userMetrics: SpecialtyMetrics,
  topDisc: DiscDimension
): MedicalLearningStyle {
  // Fine-tune with clinical preferences
  const adjustedScores = { ...rawScores };
  if (userMetrics.manual >= 7) adjustedScores.kinesthetic += 4;
  if (userMetrics.contact >= 7) adjustedScores.auditory += 4;
  if (userMetrics.intellectual >= 7) adjustedScores.visual += 3;
  if (topDisc === 'C') adjustedScores.visual += 3;
  if (topDisc === 'I') adjustedScores.auditory += 3;
  if (topDisc === 'D') adjustedScores.kinesthetic += 3;

  const visualSafe = Math.max(5, adjustedScores.visual);
  const auditorySafe = Math.max(5, adjustedScores.auditory);
  const kinestheticSafe = Math.max(5, adjustedScores.kinesthetic);
  const total = visualSafe + auditorySafe + kinestheticSafe;

  const visualPct = Math.round((visualSafe / total) * 100);
  const auditoryPct = Math.round((auditorySafe / total) * 100);
  const kinestheticPct = Math.max(0, 100 - visualPct - auditoryPct);

  const scores = {
    visual: visualPct,
    auditory: auditoryPct,
    kinesthetic: kinestheticPct
  };

  // Determine Primary Style
  let primary: LearningStyleType = 'visual';
  if (auditorySafe >= visualSafe && auditorySafe >= kinestheticSafe) {
    primary = 'auditory';
  } else if (kinestheticSafe >= visualSafe && kinestheticSafe >= auditorySafe) {
    primary = 'kinesthetic';
  }

  if (primary === 'visual') {
    return {
      primary: 'visual',
      title: 'النمط البصري الإكلينيكي (Visual Medical Learner)',
      englishTitle: 'Visual & Spatial Medical Learner',
      description: 'تعتمد ذاكرتك الطبية على الرؤية المكانية والربط الصوري. تستحضر التشخيص والجرعات وتصنيف الأمراض عبر تذكر شكل الصفحة، المخطط الشجري (Algorithm)، ولون المخطط أو صورة الأشعة والشريحة المجهرية.',
      scores,
      rawScores: { visual: visualSafe, auditory: auditorySafe, kinesthetic: kinestheticSafe },
      cognitiveTraits: [
        'تثبيت استثنائي للمعلومات عبر الذاكرة الصورية والمكانية (Spatial & Visual Recall)',
        'براعة في قراءة صور الأشعة (X-Ray/CT/MRI) والشرائح النسيجية والفحص العيني للأمراض الجلدية',
        'استيعاب أسرع بنسبة 50% لخوارزميات العلاج عبر المخططات التوجيهية مقارنة بالنصوص الطويلة',
        'صعوبة في تذكر المحاضرات الطويلة السردية إذا لم تكن مدعومة بعروض تقديمية مصورة'
      ],
      optimalStudyMethods: [
        {
          title: 'بطاقات التكرار المتباعد المصورة (Visual Anki & Image Occlusion)',
          description: 'استخدم بطاقات Anki مع خاصية حجب النصوص من الصور والرسوم البيانية (Image Occlusion) لمراجعة التشريح، الأشعة، والأمراض الجلدية.',
          recommendedTools: ['Anki (Image Occlusion Enhanced)', 'Sketchy Medical (Micro & Pharm)', 'First Aid Visuals', 'Osmosis Animated Medicine']
        },
        {
          title: 'الخرائط الذهنية وخوارزميات التشخيص التفريقي بالألوان',
          description: 'حوّل فصول الباطنة والتشخيص المعقد إلى شجرات قرارات (Decision Trees) مشفرة بالألوان لربط العَرَض الأساسي بالفحوصات التتابعية.',
          recommendedTools: ['AMBOSS Flowcharts & Clinical Trees', 'MindMeister / XMind', 'Radiopaedia Library', 'UpToDate Visual Summaries']
        },
        {
          title: 'الأطالس الجراحية ثلاثية الأبعاد والمقاطع عالية الدقة',
          description: 'شاهد مقاطع الفيديو ثلاثية الأبعاد للعمليات الجراحية والفسيولوجيا المرضية لتثبيت خطوات التدخل في ذهنك قبل دخول العيادة أو العمليات.',
          recommendedTools: ['WebSurg HD', 'Touch Surgery Simulation App', 'Complete Anatomy 3D', 'Visible Body Atlas']
        }
      ],
      boardExamStrategy: 'في بنوك أسئلة SMLE والبورد (مثل UWorld و Amboss)، ركز فوراً على قراءة جدول المقارنة والصور الإيضاحية في نهاية شرح السؤال (Educational Objective) واحفظها في مجلد مراجعة صوري مخصص؛ فهذا يضمن لك استرجاعاً فورياً بنسبة 90% في قاعة الاختبار.',
      roundsAndClinicalTip: 'أثناء المرور الصباحي (Morning Rounds)، افتح صور الأشعة للمريض بنفسك على شاشة الـ PACS وتفحص المعالم التشريحية بدلاً من الاكتفاء بقراءة التقرير المكتوب، ودوّن ملاحظاتك اليومية في مذكرة صغيرة بتخطيط شجري وألوان مميزة.',
      pitfallsToAvoid: [
        'تجنب القراءة السلبية للكتب النصية الطويلة (Passive Textbook Reading) دون تحويلها لرسوم ومخططات ملونة',
        'احذر من حفظ الصور السريرية كأشكال مجردة دون ربطها بالفسيولوجيا المرضية (Pathophysiology) الكامنة'
      ],
      speedRetentionHack: 'استخدم تقنية "قصر الذاكرة الطبي" (Medical Mind Palace): تخيل مريضاً يقف أمامك واربط كل عرض مرضي بجزء من جسده أو بألوان معينة لتثبيت المتلازمات النادرة والآثار الجانبية.'
    };
  }

  if (primary === 'auditory') {
    return {
      primary: 'auditory',
      title: 'النمط السمعي والنقاشي الإكلينيكي (Auditory Medical Learner)',
      englishTitle: 'Auditory & Discussion-Based Learner',
      description: 'تستوعب المفاهيم الطبية عبر الشرح اللفظي، الاستماع للمحاضرات والبودكاست المتخصص، ومناقشة الحالات المعقدة مع الزملاء. تسترجع المعلومة في الامتحان بنبرة صوت المحاضر أو طريقة نطق الدواء.',
      scores,
      rawScores: { visual: visualSafe, auditory: auditorySafe, kinesthetic: kinestheticSafe },
      cognitiveTraits: [
        'قدرة استثنائية على استيعاب تفاصيل الحالات الطبية عبر السرد الشفهي ومناقشات تسليم النوبتجيات (Sign-out/Handoff)',
        'تفوق ملحوظ في التاريخ المرضي والتواصل الإنساني مع المرضى وفهم النبرات والمشاعر',
        'حفظ أسرع لأسماء الأدوية الغريبة والمتلازمات عبر التكرار الصوتي والإيقاع اللغوي',
        'تشتت الانتباه السريع في البيئات الصاخبة أو عند القراءة الصامتة لفترات طويلة دون تفاعل صوتي'
      ],
      optimalStudyMethods: [
        {
          title: 'البودكاست الطبي المتخصص أثناء التنقل والمناوبات',
          description: 'استغل أوقات القيادة والتمشي بالاستماع لبودكاستات طبية تناقش حالات حقيقية بأسلوب سردي وحواري مشوق وممنهج.',
          recommendedTools: ['The Curbsiders Internal Medicine Podcast', 'Divine Intervention Podcasts (SMLE/USMLE High-Yield)', 'The Clinical Problem Solvers', 'Core IM Podcast']
        },
        {
          title: 'مجموعات المدارسة وتقنية فاينمان للشرح الشفهي (Feynman Technique)',
          description: 'اشرح الموضوعات الصعبة لزملائك بصوتك، أو سجّل لنفسك ملخصات صوتية مدتها دقيقتان لكل مرض واستمع إليها قبل النوم.',
          recommendedTools: ['Study Group Case Discussions', 'Voice Memos / WhatsApp Audio Study Channel', 'Notion Audio Notes', 'Otter.ai Medical Notes']
        },
        {
          title: 'تطبيقات تحويل النصوص والمراجع الطبية إلى صوت (Medical Text-to-Speech)',
          description: 'حوّل أوراق المراجعة والخطوط الإرشادية (Clinical Guidelines) إلى تسجيلات صوتية للاستماع إليها أثناء الراحة.',
          recommendedTools: ['Speechify Medical Reader', 'NaturalReader', 'ReadAloud Chrome Extension', 'Audible Medical Series']
        }
      ],
      boardExamStrategy: 'اقرأ سيناريو السؤال في SMLE/البورد بهمس داخلي منظم، وتخيل نفسك تشرح السؤال لمريضك أو استشاريك؛ هذا يفعل فصك الصدغي ويزيد دقة استبعاد الخيارات الخاطئة بنسبة 25% مقارنة بالقراءة السريعة الصامتة.',
      roundsAndClinicalTip: 'ركز في أسلوب طرح الاستشاري للأسئلة أثناء المرور الصباحي وسجل مصطلحاته، وشارك بفعالية في عرض الحالة (Case Presentation) بصوت واثق متسلسل، حيث يرسخ الإلقاء الشفهي التشخيص في ذاكرتك للأبد.',
      pitfallsToAvoid: [
        'الاعتماد على القراءة الصامتة بمفردك لساعات طويلة؛ فهذا يؤدي إلى شرود الذهن وبطء التحصيل لهذا النمط',
        'المذاكرة في أماكن بها نقاشات جانبية مشتتة أو ضوضاء كلامية متداخلة'
      ],
      speedRetentionHack: 'صغ اختصارات لفظية وقوافي إيقاعية (Mnemonics & Acronyms) لأسماء الأدوية أو مراحل التخثر، ورددها بنغمة صوتية مكررة لتستحضرها في الاختبار بذاكرتك السمعية.'
    };
  }

  // Kinesthetic
  return {
    primary: 'kinesthetic',
    title: 'النمط العملي والإجرائي الإكلينيكي (Kinesthetic & Procedural Learner)',
    englishTitle: 'Hands-on & Experiential Medical Learner',
    description: 'تتعلم الطب بيدك وحركتك؛ لا تستقر المعلومة في ذهنك حتى تراها متجسدة في مريض حقيقي، أو تطبقها في معمل المهارات، أو تحلها عبر مئات الأسئلة التفاعلية ومحاكاة الحالات الطارئة.',
    scores,
    rawScores: { visual: visualSafe, auditory: auditorySafe, kinesthetic: kinestheticSafe },
    cognitiveTraits: [
      'اكتساب سريع للذاكرة العضلية والإجرائية (Muscle Memory) في الخياطة والقساطر والمناظير',
      'ربط قوي بين المرض والشخص الحقيقي الذي فحصته في المستشفى مقارنة بصفحات الكتب النظرية',
      'طاقة جسدية عالية وحاجة لتغيير وضعية الجلوس أو الحركة المستمرة لرفع التركيز أثناء المذاكرة',
      'ملل سريع من المحاضرات التلقينية الطويلة غير المصحوبة بنشاط تفاعلي أو تدريب يدوي'
    ],
    optimalStudyMethods: [
      {
        title: 'الحل النشط المكثف لبنوك الأسئلة التفاعلية (Active Q-Bank Testing)',
        description: 'لا تبدأ بقراءة الكتب؛ بل ابدأ مباشرة بالحل النشط (Test-First Approach) لبنك الأسئلة لتتعلم من الأخطاء العملية وتثبت المعلومة فورياً.',
        recommendedTools: ['UWorld Medical QBank', 'AMBOSS Interactive Questions', 'SMLE High-Yield Question Banks', 'BoardVitals Medical']
      },
      {
        title: 'محاكاة محطات الفحص السريري (OSCE Simulation) ومعامل المهارات',
        description: 'تدرّب على الدمى والمجسمات مع زميل يمثل دور المريض، وقم بإجراء الفحص السريري كاملاً بالخطوات الحركية المنظمة.',
        recommendedTools: ['Skills Lab Simulators', 'OSCE Stop Checklists', 'Geeky Medics Video Guides', 'Procedural Kits & Suture Pads']
      },
      {
        title: 'المذاكرة الحركية وتقنية بومودورو النشطة (Movement-Integrated Study)',
        description: 'ذاكر على فترات مركزة (25 دقيقة) باستخدام مكتب واقف (Standing Desk) أو أمام سبورة حائطية، واستغل فترات الراحة في المشي وتجديد الدورة الدموية.',
        recommendedTools: ['Standing Desks / Adjustable Workstations', 'Large Whiteboard & Markers', 'Pomodoro Timer Apps', 'Flashcard Physical Decks']
      }
    ],
    boardExamStrategy: 'لا تكتفِ بقراءة الشرح النظري في بنك الأسئلة؛ بل قف أمام سبورة واكتب بيدك خطوات التشخيص، أو اكتب على ورقة مسودة بيدك أثناء الاختبار، فالارتباط العصبي الحركي يعزز تذكر المعلومة بنسبة 40%.',
    roundsAndClinicalTip: 'بادر دائماً بالتطوع لإجراء الفحوصات السريرية (مثل فحص البطن، قياس الضغط، سحب الدم، تركيب الكانيولا، وخياطة الجروح) تحت إشراف مقيمك الأقدم، فكل إجراء تفعله بيدك يرسخ علم الأمراض المرتبط به في الذاكرة العضلية.',
    pitfallsToAvoid: [
      'الجلوس المستمر لساعات متصلة دون حركة؛ فهذا يسبب خمولاً ذهنياً حاداً لهذا النمط الإجرائي',
      'إهمال بنوك الأسئلة في بداية فترة المذاكرة وتأجيلها للنهاية؛ بنك الأسئلة هو قاطرة تعلمك الأساسية'
    ],
    speedRetentionHack: 'استخدم سبورة بيضاء كبيرة وأقلام ملونة واكتب وارسم وأنت واقف ومتحرك، ثم امسحها وأعد كتابتها من الذاكرة الحركية لتنشيط الذاكرة الإجرائية العصبية.'
  };
}
