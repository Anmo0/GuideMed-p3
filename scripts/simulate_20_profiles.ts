import { QUIZ_QUESTIONS } from '../src/data/quizQuestions';
import { SPECIALTIES_DB } from '../src/data/specialties';
import { calculateEvaluation } from '../src/utils/scoringEngine';

interface TestProfile {
  id: number;
  name: string;
  expectedCategory: string;
  expectedTopKeywords: string[];
  targetMetrics: {
    manual: number;
    lifestyle: number;
    intellectual: number;
    contact: number;
    stress: number;
    income: number;
    research: number;
  };
  preferredDisc: string[];
  preferredKeywords: string[];
}

// إنشاء 20 شخصية سريرية محاكية وفق المعايير العالمية
const testProfiles: TestProfile[] = [
  // 1. جراح قلب وأوعية دموية
  {
    id: 1,
    name: 'د. فيصل - جراح قلب وأوعية دموية',
    expectedCategory: 'جراحة كبرى',
    expectedTopKeywords: ['قلب', 'أوعية', 'جراحة'],
    targetMetrics: { manual: 10, stress: 9, income: 9, contact: 5, intellectual: 7, lifestyle: 2, research: 6 },
    preferredDisc: ['D'],
    preferredKeywords: ['قلب', 'أوعية', 'مفتوح', 'جراحة', 'مجهري']
  },

  // 2. طبيب أسرة ورعاية أولية
  {
    id: 2,
    name: 'د. سارة - استشارية طب أسرة ورعاية شاملة',
    expectedCategory: 'طب الأسرة والرعاية الأولية',
    expectedTopKeywords: ['أسرة', 'باطنة', 'وقائي', 'أولية', 'نفسي', 'أطفال', 'غدد'],
    targetMetrics: { manual: 2, stress: 2, income: 6, contact: 10, intellectual: 7, lifestyle: 9, research: 4 },
    preferredDisc: ['S', 'I'],
    preferredKeywords: ['أسرة', 'وقاية', 'شامل', 'ممتدة', 'ألفة', 'مجتمع']
  },

  // 3. طبيب جلدية وعيادات متخصصة
  {
    id: 3,
    name: 'د. لمى - طبيبة جلدية وتجميل غير جراحي',
    expectedCategory: 'تخصصات دقيقة ونمط حياة مميز',
    expectedTopKeywords: ['جلدية', 'تجميل', 'عيون', 'أشعة'],
    targetMetrics: { manual: 4, stress: 1, income: 9, contact: 6, intellectual: 6, lifestyle: 10, research: 4 },
    preferredDisc: ['S', 'C'],
    preferredKeywords: ['جلدية', 'عيادة', 'جودة الحياة', 'جافة', 'تجميل']
  },

  // 4. طبيب أطفال ورعاية المواليد
  {
    id: 4,
    name: 'د. خالد - استشاري طب أطفال ورعاية حديثي الولادة',
    expectedCategory: 'طب الأطفال وتفرعاته',
    expectedTopKeywords: ['أطفال', 'مواليد', 'أسرة', 'نفسي'],
    targetMetrics: { manual: 3, stress: 4, income: 6, contact: 10, intellectual: 7, lifestyle: 7, research: 5 },
    preferredDisc: ['S', 'I'],
    preferredKeywords: ['أطفال', 'رضع', 'مواليد', 'حكمة', 'إنساني']
  },

  // 5. استشاري أشعة تشخيصية وتداخلية
  {
    id: 5,
    name: 'د. زياد - استشاري أشعة ورنين مغناطيسي',
    expectedCategory: 'الطب التشخيصي والمخبري',
    expectedTopKeywords: ['أشعة', 'نووي', 'باثولوجي'],
    targetMetrics: { manual: 2, stress: 3, income: 8, contact: 1, intellectual: 9, lifestyle: 8, research: 7 },
    preferredDisc: ['C'],
    preferredKeywords: ['شاشات', 'أشعة', 'ذكاء اصطناعي', 'تقارير', 'صامت']
  },

  // 6. عالم أمراض وتشريح نسيجي (Pathology)
  {
    id: 6,
    name: 'د. نورة - استشارية علم الأمراض والتشريح المرضي',
    expectedCategory: 'الطب التشخيصي والمخبري',
    expectedTopKeywords: ['أمراض', 'باثولوجي', 'مختبرات', 'أنسجة'],
    targetMetrics: { manual: 2, stress: 2, income: 7, contact: 0, intellectual: 10, lifestyle: 9, research: 9 },
    preferredDisc: ['C'],
    preferredKeywords: ['مجهر', 'باثولوجي', 'عينات', 'أنسجة', 'دليل قاطع']
  },

  // 7. استشاري طب نفسي
  {
    id: 7,
    name: 'د. طارق - استشاري الطب النفسي والعلاج السلوكي',
    expectedCategory: 'الطب النفسي والصحة العقلية',
    expectedTopKeywords: ['نفسي', 'أسرة', 'سلوكي'],
    targetMetrics: { manual: 0, stress: 4, income: 7, contact: 10, intellectual: 8, lifestyle: 8, research: 4 },
    preferredDisc: ['S', 'I'],
    preferredKeywords: ['نفسي', 'سلوكي', 'تعاطف', 'تحليل', 'استماع']
  },

  // 8. جراح عظام وإصابات ملاعب
  {
    id: 8,
    name: 'د. راكان - جراح عظام ومفاصل رياضية',
    expectedCategory: 'جراحة كبرى',
    expectedTopKeywords: ['عظام', 'جراحة', 'مفاصل', 'إصابات'],
    targetMetrics: { manual: 10, stress: 6, income: 9, contact: 5, intellectual: 5, lifestyle: 6, research: 4 },
    preferredDisc: ['D'],
    preferredKeywords: ['عظام', 'مفاصل', 'كسر', 'ميكانيكية', 'رياضي']
  },

  // 9. طبيب طوارئ وإنعاش حوادث
  {
    id: 9,
    name: 'د. عمر - استشاري طب الطوارئ والحوادث',
    expectedCategory: 'طب الطوارئ والعناية الحرجة',
    expectedTopKeywords: ['طوارئ', 'عناية', 'حوادث', 'إنعاش', 'جراحة'],
    targetMetrics: { manual: 7, stress: 10, income: 7, contact: 6, intellectual: 6, lifestyle: 5, research: 3 },
    preferredDisc: ['D'],
    preferredKeywords: ['طوارئ', 'حوادث', 'إنعاش', 'شفتات', 'سريع']
  },

  // 10. جراح مخ وأعصاب
  {
    id: 10,
    name: 'د. وليد - جراح مخ وأعصاب وقاعدة جمجمة',
    expectedCategory: 'جراحة كبرى',
    expectedTopKeywords: ['مخ', 'أعصاب', 'جمجمة', 'جراحة'],
    targetMetrics: { manual: 10, stress: 10, income: 9, contact: 5, intellectual: 9, lifestyle: 1, research: 8 },
    preferredDisc: ['D', 'C'],
    preferredKeywords: ['مخ', 'أعصاب', 'مجهري', 'جمجمة', 'دقيق']
  },

  // 11. استشاري طب الأورام والسرطان
  {
    id: 11,
    name: 'د. منيرة - استشارية علاج الأورام والطب الجزيئي',
    expectedCategory: 'طب باطني عام وتخصصي',
    expectedTopKeywords: ['أورام', 'دم', 'سرطان', 'باطنة', 'غدد', 'جينوم'],
    targetMetrics: { manual: 2, stress: 6, income: 8, contact: 9, intellectual: 9, lifestyle: 6, research: 9 },
    preferredDisc: ['C', 'S'],
    preferredKeywords: ['أورام', 'جينات', 'تلطيفي', 'سريري', 'علاج']
  },

  // 12. استشاري أمراض النساء والتوليد
  {
    id: 12,
    name: 'د. هيفاء - استشارية التوليد وأمراض النساء',
    expectedCategory: 'النساء والتوليد وجراحة الحوض',
    expectedTopKeywords: ['نساء', 'توليد', 'جراحة', 'أجنة'],
    targetMetrics: { manual: 8, stress: 8, income: 8, contact: 8, intellectual: 6, lifestyle: 3, research: 4 },
    preferredDisc: ['D', 'S'],
    preferredKeywords: ['توليد', 'نساء', 'حوامل', 'ولادة', 'جنين']
  },

  // 13. استشاري تخدير وعناية مركزة
  {
    id: 13,
    name: 'د. سامي - استشاري التخدير والإنعاش الجراحي',
    expectedCategory: 'تخصصات دقيقة ونمط حياة مميز',
    expectedTopKeywords: ['تخدير', 'عناية', 'ألم'],
    targetMetrics: { manual: 7, stress: 7, income: 8, contact: 2, intellectual: 8, lifestyle: 7, research: 4 },
    preferredDisc: ['C', 'D'],
    preferredKeywords: ['تخدير', 'نائم', 'فسيولوجيا', 'شفتات', 'إفاقة']
  },

  // 14. استشاري أمراض الروماتيزم والمفاصل المناعية
  {
    id: 14,
    name: 'د. إبراهيم - استشاري الروماتيزم والمناعة السريرية',
    expectedCategory: 'طب باطني عام وتخصصي',
    expectedTopKeywords: ['روماتيزم', 'مناعة', 'باطنة', 'جينوم', 'غدد'],
    targetMetrics: { manual: 2, stress: 3, income: 7, contact: 8, intellectual: 10, lifestyle: 8, research: 7 },
    preferredDisc: ['C', 'S'],
    preferredKeywords: ['روماتيزم', 'مناعة', 'لغز', 'رمادية', 'مزمن']
  },

  // 15. استشاري طب وجراحة العيون
  {
    id: 15,
    name: 'د. ماجد - جراح عيون وقرنية تخصصية',
    expectedCategory: 'تخصصات دقيقة ونمط حياة مميز',
    expectedTopKeywords: ['عيون', 'قرنية', 'ليزك', 'جراحة'],
    targetMetrics: { manual: 9, stress: 3, income: 9, contact: 6, intellectual: 7, lifestyle: 8, research: 5 },
    preferredDisc: ['C', 'S'],
    preferredKeywords: ['عيون', 'قرنية', 'ليزك', 'مجهري', 'جاف']
  },

  // 16. استشاري الطب الوقائي والصحة العامة
  {
    id: 16,
    name: 'د. ريم - استشارية الطب الوقائي والوبائيات',
    expectedCategory: 'طب باطني عام وتخصصي',
    expectedTopKeywords: ['وقائي', 'صحة', 'مجتمع', 'وبائيات', 'جينوم'],
    targetMetrics: { manual: 0, stress: 2, income: 6, contact: 6, intellectual: 8, lifestyle: 9, research: 9 },
    preferredDisc: ['S', 'C'],
    preferredKeywords: ['وقائي', 'وباء', 'مجتمع', 'عدوى', 'صحة عامة']
  },

  // 17. استشاري العناية المركزة (Intensivist)
  {
    id: 17,
    name: 'د. حمزة - استشاري العناية المركزة والحالات الحرجة',
    expectedCategory: 'طب الطوارئ والعناية الحرجة',
    expectedTopKeywords: ['عناية', 'حرجة', 'إنعاش', 'طوارئ', 'جراحة'],
    targetMetrics: { manual: 8, stress: 10, income: 8, contact: 4, intellectual: 9, lifestyle: 3, research: 6 },
    preferredDisc: ['D'],
    preferredKeywords: ['عناية', 'تنفس صناعي', 'إنعاش', 'قتال', 'حرجة']
  },

  // 18. جراح تجميل وترميم
  {
    id: 18,
    name: 'د. تركي - جراح التجميل والترميم المجهري',
    expectedCategory: 'جراحة كبرى',
    expectedTopKeywords: ['تجميل', 'ترميم', 'جراحة'],
    targetMetrics: { manual: 10, stress: 4, income: 10, contact: 7, intellectual: 6, lifestyle: 7, research: 4 },
    preferredDisc: ['D', 'I'],
    preferredKeywords: ['تجميل', 'ترميم', 'عيادة خاصة', 'أنسجة', 'مجهري']
  },

  // 19. استشاري طب الأعصاب والفسيولوجيا الإكلينيكية
  {
    id: 19,
    name: 'د. ياسمين - استشارية طب المخ والأعصاب السريري',
    expectedCategory: 'طب باطني عام وتخصصي',
    expectedTopKeywords: ['أعصاب', 'دماغ', 'باطنة', 'فسيولوجيا', 'جينوم', 'غدد'],
    targetMetrics: { manual: 1, stress: 4, income: 7, contact: 7, intellectual: 10, lifestyle: 7, research: 7 },
    preferredDisc: ['C'],
    preferredKeywords: ['أعصاب', 'دماغ', 'تخطيط', 'لغز', 'باطنة']
  },

  // 20. استشاري الأمراض المعدية والأحياء الدقيقة
  {
    id: 20,
    name: 'د. عادل - استشاري الأمراض المعدية والميكروبيولوجيا',
    expectedCategory: 'طب باطني عام وتخصصي',
    expectedTopKeywords: ['معدية', 'ميكروبيولوجيا', 'باطنة', 'عدوى', 'وقائي'],
    targetMetrics: { manual: 1, stress: 4, income: 6, contact: 7, intellectual: 10, lifestyle: 7, research: 9 },
    preferredDisc: ['C'],
    preferredKeywords: ['معدية', 'مضادات', 'أوبئة', 'ميكروبيولوجيا', 'استقصاء']
  }
];

// دالة اختيار الخيار الأمثل لكل سؤال وفق السمات المهنية للملف الشخصي
function chooseOptionForProfile(profile: TestProfile, q: typeof QUIZ_QUESTIONS[0]): number[] {
  let bestScore = -9999;
  let bestIdx = 0;

  q.options.forEach((opt, idx) => {
    // تجاوز الخيارات الخاصة بالعموميات إذا وجد غيرها
    if (opt.specialType === 'none' || opt.specialType === 'all') {
      return;
    }

    let score = 0;
    const fullText = (opt.text + ' ' + (opt.subtext || '')).toLowerCase();

    // 1. تطابق الكلمات المفتاحية التفضيلية للملف
    profile.preferredKeywords.forEach((kw) => {
      if (fullText.includes(kw.toLowerCase())) {
        score += 25;
      }
    });

    // 2. تطابق نمط DISC
    if (opt.discWeights) {
      Object.entries(opt.discWeights).forEach(([dim, weight]) => {
        if (profile.preferredDisc.includes(dim)) {
          score += weight * 4;
        } else {
          score -= weight * 1.5;
        }
      });
    }

    // 3. تطابق المعايير الكمية (Metric Alignment)
    if (opt.metricWeights) {
      Object.entries(opt.metricWeights).forEach(([key, val]) => {
        const metricKey = key as keyof typeof profile.targetMetrics;
        const targetVal = profile.targetMetrics[metricKey];
        if (targetVal !== undefined) {
          // إذا كان الهدف مرتفعاً (> 5.5) والوزن موجباً، يضاف
          const normalizedTarget = (targetVal - 5.0) / 5.0; // -1 to +1
          score += val * normalizedTarget * 6;
        }
      });
    }

    if (score > bestScore) {
      bestScore = score;
      bestIdx = idx;
    }
  });

  return [bestIdx];
}

// دالة تشغيل واختبار المحاكاة
export function run20Simulations() {
  console.log('=== تشغيل المحاكاة السريرية لـ 20 طبيباً (60 سؤالاً) ===');
  let passedCount = 0;

  testProfiles.forEach((profile) => {
    const selectedAnswers: Record<number, number[]> = {};
    QUIZ_QUESTIONS.forEach((q) => {
      selectedAnswers[q.id] = chooseOptionForProfile(profile, q);
    });

    const matchResults = calculateEvaluation(selectedAnswers, SPECIALTIES_DB);
    const top3 = matchResults.results.slice(0, 3);
    const topMatch = top3[0];
    const personaTitle = matchResults.pvipsAnalysis?.clinicalPersonaTitle || 'غير محدد';

    const matchesKeyword = profile.expectedTopKeywords.some((kw) =>
      topMatch.specialty.name.includes(kw) ||
      topMatch.specialty.englishName.toLowerCase().includes(kw.toLowerCase()) ||
      topMatch.specialty.category.includes(kw) ||
      topMatch.specialty.boardDetails.includes(kw)
    );

    // Also check top 3 for specialty match
    const inTop3 = profile.expectedTopKeywords.some((kw) =>
      top3.some((m) =>
        m.specialty.name.includes(kw) ||
        m.specialty.englishName.toLowerCase().includes(kw.toLowerCase()) ||
        m.specialty.category.includes(kw)
      )
    );

    const isPass = matchesKeyword || topMatch.specialty.category === profile.expectedCategory || inTop3;
    if (isPass) passedCount++;

    console.log(`[${isPass ? '✓ PASS' : '✗ WARN'}] #${profile.id} ${profile.name.padEnd(46, ' ')} -> ${topMatch.specialty.name} (${topMatch.matchPercentage}%) | الثاني: ${top3[1]?.specialty.name} (${top3[1]?.matchPercentage}%)`);
  });

  console.log(`\nالنتيجة النهائية للمحاكاة: نجح ${passedCount} من أصل ${testProfiles.length} (${(passedCount / testProfiles.length) * 100}%)`);
}

// تشغيل فوري
run20Simulations();
