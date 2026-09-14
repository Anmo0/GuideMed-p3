import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // 1. سرعة اتخاذ القرار وبيئة العمل
  {
    id: 1,
    category: 'إيقاع العمل والبيئة السريرية',
    title: 'في أي بيئة عمل تشعر بأعلى درجات الاندماج والطاقة الذهنية؟',
    description: 'اختر جميع الخيارات التي تعكس تفضيلك الواقعي في الممارسة الطبية:',
    allowMultiple: true,
    options: [
      {
        text: 'بيئة ديناميكية سريعة؛ قرارات فورية، حالات حادة، وإنقاذ سريع للحياة في ثوانٍ أو دقائق.',
        subtext: 'مثل الطوارئ، العناية المركزة، غرف العمليات الإسعافية.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3, change: 3 },
        metricWeights: { stress: 3, manual: 1, lifestyle: -2 }
      },
      {
        text: 'عيادة خارجية منظمة بمواعيد محددة، تتيح لي فحص المريض بهدوء والتفكير الاستنتاجي المتأني.',
        subtext: 'مثل عيادات الغدد، الروماتيزم، طب الأسرة، الجلدية.',
        discWeights: { C: 2, S: 2 },
        birkmanWeights: { structure: 3, activity: -1 },
        metricWeights: { lifestyle: 3, contact: 2, stress: -2 }
      },
      {
        text: 'غرفة هادئة ومظلمة أو مختبر متقدم أركز فيه على الصور والأجهزة والتحاليل دون مقاطعات من المرضى.',
        subtext: 'مثل غرف تقارير الأشعة، مختبرات الباثولوجي، والطب النووي.',
        discWeights: { C: 3 },
        birkmanWeights: { activity: -2, empathy: -2, structure: 2 },
        metricWeights: { intellectual: 2, lifestyle: 3, contact: -4 }
      },
      {
        text: 'غرفة العمليات الجراحية؛ أركز لساعات طويلة على مهمة يدوية دقيقة وملموسة تكتمل باليدين.',
        subtext: 'مثل الجراحة العامة، العظام، العيون، التجميل.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { activity: 3, structure: 2 },
        metricWeights: { manual: 4, income: 2 }
      },
      {
        text: 'لا شيء من ذلك يناسبني تحديداً / أريد مزيجاً وسطاً.',
        specialType: 'none'
      },
      {
        text: 'جميع ما سبق يناسبني حسب المرحلة واليوم.',
        specialType: 'all'
      }
    ]
  },

  // 2. المهارة اليدوية والإجراءات التداخلية
  {
    id: 2,
    category: 'المهارة اليدوية والإجراءات',
    title: 'ما هو مدى شغفك باستخدام اليدين والآلات والمناظير في علاج المرضى؟',
    description: 'حدد مدى رغبتك في أن يكون عملك قائماً على التدخلات الإجرائية المباشرة:',
    allowMultiple: true,
    options: [
      {
        text: 'أعشق العمليات الجراحية المعقدة واستخدام الأدوات الحادة والمناظير لساعات طوال.',
        subtext: 'أشعر بالملل الشديد إذا اقتصر يومي على كتابة الوصفات الدوائية والحديث فقط.',
        discWeights: { D: 3, C: 1 },
        birkmanWeights: { activity: 3 },
        metricWeights: { manual: 4, stress: 2 }
      },
      {
        text: 'أفضل الإجراءات التداخلية السريعة والقصيرة (حقن مفاصل، مناظير عيادية، كيّ، قساطر) إلى جانب العيادة.',
        subtext: 'مثل الجلدية، الأنف والأذن، الجهاز الهضمي، القلب التداخلي.',
        discWeights: { I: 2, C: 2 },
        birkmanWeights: { structure: 2, advantage: 2 },
        metricWeights: { manual: 2, income: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل التفكير الطبي الاستدلالي الصرف؛ الفحص السريري، مراجعة الأدوية، وحل الألغاز دون جراحة.',
        subtext: 'مثل الباطنة العامة، الأعصاب، الغدد الصماء، الكلى، الوراثة.',
        discWeights: { C: 3, S: 1 },
        birkmanWeights: { activity: -2, structure: 2 },
        metricWeights: { intellectual: 3, manual: -3 }
      },
      {
        text: 'أفضل الجراحة الميكروسكوبية الدقيقة جداً التي تتطلب ثبات اليد ونعومة الحركة المليمترية.',
        subtext: 'مثل جراحة العيون، التجميل المجهري، قاع الجمجمة.',
        discWeights: { C: 3, D: 1 },
        birkmanWeights: { structure: 3 },
        metricWeights: { manual: 4, intellectual: 2, income: 2 }
      },
      {
        text: 'لا شيء من ذلك يصف مهاراتي المفضلة.',
        specialType: 'none'
      },
      {
        text: 'جميع ما سبق يروق لي بحسب ظروف الحالة.',
        specialType: 'all'
      }
    ]
  },

  // 3. التواصل الإنساني وطبيعة العلاقة بالمرضى
  {
    id: 3,
    category: 'العلاقة مع المرضى والتواصل',
    title: 'كيف تفضل شكل العلاقة والتواصل الإنساني مع المريض وعائلته؟',
    description: 'العلاقة الإنسانية هي جوهر مهنة الطب، اختر ما يناسب شخصيتك ونمط طاقتك النفسية:',
    allowMultiple: true,
    options: [
      {
        text: 'علاقة مستمرة وممتدة عبر شهور وسنوات؛ أتعرف على حياة المريض وأسرته وأرافقه في رحلة تعافيه.',
        subtext: 'مثل طب الأسرة، الأورام، الطب النفسي، الروماتيزم، طب الأطفال.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, intellectual: 1 }
      },
      {
        text: 'تواصل علاجي موجز ومحدد بالهدف؛ حل مشكلة المريض الجراحية أو الإجرائية ثم وداعه بسلام.',
        subtext: 'مثل الجراحة العامة، العظام، جراحة اليوم الواحد، التخدير.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { empathy: -1, activity: 2 },
        metricWeights: { contact: -1, manual: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل عدم التواصل المباشر مع المرضى الأحياء والتركيز بدلاً من ذلك على العينات والأشعة والبيانات.',
        subtext: 'مثل الباثولوجي، الأشعة التشخيصية، الطب المخبري، الطب الشرعي.',
        discWeights: { C: 3 },
        birkmanWeights: { empathy: -3, structure: 3 },
        metricWeights: { contact: -5, lifestyle: 3, intellectual: 2 }
      },
      {
        text: 'أستمتع بمساعدة المرضى في اللحظات الحرجة جداً وطمأنة عائلاتهم تحت وطأة الخوف والقلق.',
        subtext: 'مثل العناية المركزة، طوارئ الأطفال، الطب التلطيفي.',
        discWeights: { S: 3, D: 1 },
        birkmanWeights: { empathy: 3, activity: 2 },
        metricWeights: { contact: 3, stress: 2 }
      },
      {
        text: 'لا أملك تفضيلاً محدداً بشأن شكل التواصل.',
        specialType: 'none'
      },
      {
        text: 'جميع أنواع العلاقات السريرية مقبولة لدي ومحفزة.',
        specialType: 'all'
      }
    ]
  },

  // 4. التوازن بين العمل والحياة ونمط المعيشة
  {
    id: 4,
    category: 'جودة الحياة والتوازن الأسري',
    title: 'ما هي أولويتك الحقيقية في التوازن بين ساعات العمل والحياة الأسرية؟',
    description: 'كن صادقاً مع نفسك، فالسنوات القادمة ستقضيها في هذا الإيقاع:',
    allowMultiple: true,
    options: [
      {
        text: 'جودة الحياة والوقت العائلي أولوية قصوى؛ أرفض المناوبات الليلية وأريد عطلات أسبوعية مضمونة.',
        subtext: 'مثل الجلدية، العيون، طب الأسرة، الباثولوجي، الطب الوقائي.',
        discWeights: { S: 2, C: 2 },
        birkmanWeights: { structure: 3, activity: -2 },
        metricWeights: { lifestyle: 4, stress: -3 }
      },
      {
        text: 'نظام المناوبات المنفصلة (شفتات)؛ أعمل بتركيز مكثف ثم أتحرر تماماً من التفكير بالمستشفى في إجازتي.',
        subtext: 'مثل طب الطوارئ، التخدير، العناية المركزة.',
        discWeights: { D: 2, I: 1 },
        birkmanWeights: { change: 3, activity: 2 },
        metricWeights: { lifestyle: 2, stress: 2 }
      },
      {
        text: 'الطب شغفي الأول ومستعد للتضحية بساعات النوم وأوقات الفراغ لأجل تخصص جراحي أو أكاديمي عظيم.',
        subtext: 'مثل جراحة الأعصاب، جراحة القلب، زراعة الأعضاء، الأورام.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 4, advantage: 3 },
        metricWeights: { lifestyle: -4, stress: 3, income: 2 }
      },
      {
        text: 'أريد تخصصاً يسمح لي لاحقاً بإنشاء عيادة خاصة والتحكم الكامل في جدول المرضى والمواعيد.',
        subtext: 'مثل التجميل، الجلدية، العظام، الطب النفسي، النساء والتوليد.',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { advantage: 4 },
        metricWeights: { income: 3, lifestyle: 2 }
      },
      {
        text: 'ليس لدي اشتراطات خاصة بنمط الحياة حالياً.',
        specialType: 'none'
      },
      {
        text: 'أستطيع التكيف مع كافة أنماط الحياة المذكورة.',
        specialType: 'all'
      }
    ]
  },

  // 5. التطلعات المالية والقطاع الخاص
  {
    id: 5,
    category: 'الدخل المالي وفرص القطاع الخاص',
    title: 'ما هو وزن الحافز المالي وفرص الاستثمار الخاص في اختيارك للتخصص؟',
    description: 'السوق الطبي يختلف بشكل جذري بين التخصصات الإجرائية والتخصصات الاستشارية:',
    allowMultiple: true,
    options: [
      {
        text: 'الحافز المالي مرتفع جداً؛ أطمح لتحقيق أعلى دخل ممكن عبر العمليات والإجراءات التجميلية بالخاص.',
        subtext: 'مثل جراحة التجميل، الجلدية، جراحة العظام، تصحيح النظر.',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { advantage: 4 },
        metricWeights: { income: 4, manual: 1 }
      },
      {
        text: 'أفضل الاستقرار الوظيفي والدخل الحكومي والأكاديمي المضمون دون الانشغال بالمنافسة التسويقية.',
        subtext: 'مثل طب الأسرة، الطب الوقائي، الوراثة، علم الأمراض، طب الأطفال العام.',
        discWeights: { S: 3, C: 1 },
        birkmanWeights: { advantage: -2, structure: 3 },
        metricWeights: { income: -2, lifestyle: 2 }
      },
      {
        text: 'أطمح للعمل في كبرى المنشآت والشركات النفطية والصناعية بحزم رواتب ومزايا وظيفية رفيعة.',
        subtext: 'مثل الطب المهني، طب الطيران، الرعاية الصحية التنفيذية.',
        discWeights: { C: 2, D: 1 },
        birkmanWeights: { advantage: 3, structure: 2 },
        metricWeights: { income: 3, lifestyle: 2 }
      },
      {
        text: 'يهمني تخصص يمكنني فيه إجراء تدخلات عيادية سريعة ذات عائد مرتفع إلى جانب العمل المؤسسي.',
        subtext: 'مثل مناظير الجهاز الهضمي، حقن الألم، قسطرة الأوعية، الفيلر والبوتوكس.',
        discWeights: { I: 2, C: 1 },
        birkmanWeights: { advantage: 3 },
        metricWeights: { income: 3, manual: 2 }
      },
      {
        text: 'لا يشكل الجانب المالي فارقاً جوهرياً في رغبتي.',
        specialType: 'none'
      },
      {
        text: 'أرحب بجميع الخيارات التي توازن بين المهنة والدخل.',
        specialType: 'all'
      }
    ]
  },

  // 6. التعامل مع الضغوط والأدرينالين
  {
    id: 6,
    category: 'الاستجابة للضغط والطوارئ الحادة',
    title: 'عندما يتدهور مريض فجأة وتصبح حياته على المحك، كيف تتصرف عادة؟',
    description: 'طبيعة التفاعل العصبي التلقائي تحت الخطر تكشف نمطك المهني المناسب:',
    allowMultiple: true,
    options: [
      {
        text: 'أتحول فوراً للهدوء التام والتركيز الفولاذي، وأستمتع باتخاذ قرارات سريعة لإنقاذ المريض من الموت.',
        subtext: 'مثل أطباء الطوارئ، العناية المركزة، جراحة الحوادث، التخدير.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3, change: 3 },
        metricWeights: { stress: 3, manual: 1 }
      },
      {
        text: 'أشعر بالاستنزاف والتوتر العصبي من المواقف الحادة المفاجئة، وأفضل البيئات المحكومة مسبقاً.',
        subtext: 'مثل العيادات النهارية، التحاليل المخبرية، الرعاية التلطيفية، طب النوم.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { activity: -2, change: -3 },
        metricWeights: { stress: -3, lifestyle: 3 }
      },
      {
        text: 'أفضل أن يكون التوتر ذهنياً استنتاجياً لحل معضلة تشخيصية غامضة وليس توتراً بدنياً إسعافياً.',
        subtext: 'مثل أمراض الأعصاب، الروماتيزم، الكلى، المناعة الذاتية.',
        discWeights: { C: 3 },
        birkmanWeights: { structure: 3 },
        metricWeights: { intellectual: 3, stress: -1 }
      },
      {
        text: 'أحب التوتر التنافسي الجراحي داخل العمليات الذي يتطلب إتقاناً وانضباطاً مهارياً متواصلاً.',
        subtext: 'مثل جراحة القلب، جراحة الأوعية، العظام.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { activity: 2, advantage: 2 },
        metricWeights: { stress: 2, manual: 3 }
      },
      {
        text: 'لا أجد وصفاً دقيقاً لرد فعلي من هذه الخيارات.',
        specialType: 'none'
      },
      {
        text: 'أتكيف مع كافة المستويات وأتعامل باحتراف مع الطوارئ والهدوء معاً.',
        specialType: 'all'
      }
    ]
  },

  // 7. عمق التفكير وحل الألغاز التشخيصية
  {
    id: 7,
    category: 'العمق الفكري والألغاز السريرية',
    title: 'ما الذي يمنحك أكبر شعور بالإنجاز والرضا الفكري في يومك الطبي؟',
    description: 'طريقة عمل عقلك وتحليله للمعلومات الطبية:',
    allowMultiple: true,
    options: [
      {
        text: 'الربط المعقد بين تحاليل مناعية وفحوصات جينية وتاريخ مرضي للوصول لتشخيص نادر حار فيه الأطباء.',
        subtext: 'مثل طب الأعصاب، الروماتيزم، الأمراض المعدية، الوراثة، الكلى.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 2, activity: -1 },
        metricWeights: { intellectual: 4, research: 2 }
      },
      {
        text: 'استئصال ورم خبيث بالكامل أو تثبيت كسر متفتت ورؤية النتيجة العينية المباشرة بأم عيني.',
        subtext: 'مثل الجراحة العامة، العظام، الأنف والأذن، المسالك.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3 },
        metricWeights: { manual: 3, intellectual: -1 }
      },
      {
        text: 'فك شفرة صورة رنين مغناطيسي أو شريحة مجهرية وتقديم التقرير الحاسم الذي ينير الدرب للجراحين.',
        subtext: 'مثل الأشعة التشخيصية، الباثولوجي، الطب النووي.',
        discWeights: { C: 3 },
        birkmanWeights: { structure: 3, empathy: -2 },
        metricWeights: { intellectual: 3, contact: -3 }
      },
      {
        text: 'مساعدة مريض يعاني نفسياً أو يعاني من إدمان لاستعادة إرادته وتوازنه وتغيير مسار حياته بالكامل.',
        subtext: 'مثل الطب النفسي، طب الإدمان، الطب التلطيفي.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 3, intellectual: 2 }
      },
      {
        text: 'لا أشعر بانجذاب خاص لأي من هذه المهام.',
        specialType: 'none'
      },
      {
        text: 'كل هذه الإنجازات تشعرني بالرضا والفخر بنفس الدرجة.',
        specialType: 'all'
      }
    ]
  },

  // 8. البحث العلمي والأكاديمي والجينوم
  {
    id: 8,
    category: 'البحث العلمي والابتكار الأكاديمي',
    title: 'ما هو موقع البحث العلمي والأوراق البحثية والمؤتمرات في طموحك المهني؟',
    description: 'النشاط الأكاديمي والبحثي متطلب أساسي في بعض المسارات:',
    allowMultiple: true,
    options: [
      {
        text: 'أطمح لأن أكون عالماً إكلينيكياً ينشر تجارب سريرية ويبتكر بروتوكولات علاجية وعلاجات جزيئية.',
        subtext: 'مثل الأورام، زراعة الخلايا الجذعية، الوراثة الطبية، الأمراض المعدية.',
        discWeights: { C: 3, I: 1 },
        birkmanWeights: { structure: 3 },
        metricWeights: { research: 4, intellectual: 2 }
      },
      {
        text: 'أفضل العمل الميداني والسريري البحت وعلاج المرضى، ولا أتحمس للأوراق البحثية والإحصاءات.',
        subtext: 'مثل التخصصات الخدمية والإجرائية المباشرة.',
        discWeights: { D: 2, S: 1 },
        birkmanWeights: { activity: 2 },
        metricWeights: { research: -3, manual: 1 }
      },
      {
        text: 'أهتم بأبحاث الصحة العامة والوبائيات والسياسات الصحية التي تغير إحصاءات المجتمع.',
        subtext: 'مثل الطب الوقائي، طب الأسرة، إدارة الجودة الصحية.',
        discWeights: { C: 2, I: 2 },
        birkmanWeights: { structure: 2 },
        metricWeights: { research: 3, lifestyle: 1 }
      },
      {
        text: 'أحب ابتكار تقنيات جراحية وأدوات جديدة أو استخدام الذكاء الاصطناعي في تحليل الصور الطبية.',
        subtext: 'مثل الجراحة الروبوتية، الأشعة المتقدمة، التجميل المجهري.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { change: 3, advantage: 2 },
        metricWeights: { research: 3, intellectual: 2, manual: 2 }
      },
      {
        text: 'لا أملك اهتماماً بالبحث العلمي حالياً.',
        specialType: 'none'
      },
      {
        text: 'أوازن بين الممارسة السريرية والإنتاج البحثي المستمر.',
        specialType: 'all'
      }
    ]
  },

  // 9. فئات المرضى الديموغرافية (أطفال، بالغين، كبار سن)
  {
    id: 9,
    category: 'الفئات العمرية والديموغرافية',
    title: 'ما هي فئة المرضى التي تجد في نفسك أعظم صبر وتفاعل إيجابي معها؟',
    description: 'اختر الفئات التي تشعر تجاهها بأعلى درجات الارتياح العاطفي:',
    allowMultiple: true,
    options: [
      {
        text: 'الأطفال والرضع والخدج؛ أسعد بضحكاتهم وأتحمل بكاءهم ولدي الصبر لمخاطبتهم واللعب معهم.',
        subtext: 'مثل طب الأطفال، جراحة الأطفال، خدج NICU، قلب الأطفال.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 3 }
      },
      {
        text: 'البالغون فقط؛ أفضل الحوار العقلاني المباشر مع المريض دون وساطة طرف ثالث أو بكاء طفولي.',
        subtext: 'مثل الباطنة العامة، الجراحة العامة، المسالك، الصدرية، القلب.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { structure: 2 },
        metricWeights: { intellectual: 1 }
      },
      {
        text: 'كبار السن وأصحاب الأمراض المزمنة؛ أحب الاستماع لحكاياتهم وأشعر ببر كبير عند خدمتهم وتخفيف آلامهم.',
        subtext: 'مثل طب كبار السن، الرعاية التلطيفية، التأهيل الطبي، الروماتيزم.',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 4, activity: -2 },
        metricWeights: { contact: 3, lifestyle: 1 }
      },
      {
        text: 'الرياضيون والشباب ومراجعو التجميل؛ أصحاب طاقة حركية عالية وأهداف وظيفية أو جمالية واضحة.',
        subtext: 'مثل الطب الرياضي، جراحة العظام، التجميل، الجلدية.',
        discWeights: { I: 3, D: 1 },
        birkmanWeights: { activity: 3, advantage: 3 },
        metricWeights: { income: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل عدم التعامل مع مرضى مباشرين (عينات، أشعة، وفيات).',
        subtext: 'مثل الأشعة، الباثولوجي، الطب الشرعي.',
        discWeights: { C: 3 },
        birkmanWeights: { empathy: -3 },
        metricWeights: { contact: -4 }
      },
      {
        text: 'أتعامل بأريحية تامة مع كافة الفئات العمرية.',
        specialType: 'all'
      }
    ]
  },

  // 10. سمات القيادة والسلوك DISC
  {
    id: 10,
    category: 'الملف السلوكي والقيادي (DISC)',
    title: 'في الفريق الطبي داخل المستشفى، أي الأدوار السلوكية تجد نفسك فيها بعفوية؟',
    description: 'نموذج DISC يحدد أسلوبك الطبيعي في التفاعل والتأثير:',
    allowMultiple: true,
    options: [
      {
        text: 'النمط القيادي الحازم (D): أحب تولي زمام الأمور وتوجيه الفريق وحسم القرارات المصيرية دون تردد.',
        subtext: 'قرارات سريعة، تركيز على النتائج، مواجهة التحديات مباشرة.',
        discWeights: { D: 4 },
        birkmanWeights: { advantage: 3, activity: 2 },
        metricWeights: { stress: 2, manual: 1 }
      },
      {
        text: 'النمط التأثيري والاجتماعي (I): أرفع الروح المعنوية، أتواصل بحرارة، وأبني علاقات ثقة مع المرضى والزملاء.',
        subtext: 'إقناع وتفاؤل، تواصل لفظي متميز، بث الطمأنينة والبهجة.',
        discWeights: { I: 4 },
        birkmanWeights: { empathy: 3, activity: 1 },
        metricWeights: { contact: 3 }
      },
      {
        text: 'النمط المستقر والصبور (S): هادئ، مستمع ممتاز، أعمل بتناغم وموثوقية عالية، وأكره الصراعات والتقلبات.',
        subtext: 'صبر طويل، تعاطف أصيل، وفاء واستمرارية للمرضى والفريق.',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 3, structure: 2, activity: -1 },
        metricWeights: { lifestyle: 2, contact: 2 }
      },
      {
        text: 'النمط التحليلي الدقيق (C): منضبط للغاية، أراجع أدق التفاصيل والمعايير، وأتأكد من تطبيق البروتوكولات بنسبة 100%.',
        subtext: 'دقة متناهية، تفكير نقدي، جودة معيارية لا تقبل الخطأ.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, empathy: -1 },
        metricWeights: { intellectual: 3, lifestyle: 1 }
      },
      {
        text: 'لا أميل لأي من هذه الأنماط بشكل واضح.',
        specialType: 'none'
      },
      {
        text: 'أمتلك مزيجاً متوازناً من كل هذه الأنماط القيادية.',
        specialType: 'all'
      }
    ]
  },

  // 11. التحمل الجسدي والوقوف المطول
  {
    id: 11,
    category: 'الجهد البدني والتحمل',
    title: 'كيف تقيّم طاقتك ولياقتك للوقوف المستمر والجهد العضلي لساعات طويلة؟',
    description: 'بعض التخصصات تتطلب قوة عضلية ووقوفاً يمتد لأكثر من 6-8 ساعات يومياً:',
    allowMultiple: false,
    options: [
      {
        text: 'لدي طاقة بدنية عالية جداً وأستمتع بالوقوف في العمليات وممارسة جهد عضلي شاق بحماس.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 4 },
        metricWeights: { manual: 4, stress: 1 }
      },
      {
        text: 'طاقتي متوسطة؛ أستطيع إجراء عمليات دقيقة أو تدخلات قصيرة ولكن أفضل الجلوس معظم اليوم.',
        discWeights: { C: 2, S: 1 },
        birkmanWeights: { activity: 1 },
        metricWeights: { manual: 1, lifestyle: 1 }
      },
      {
        text: 'أفضل العمل المكتبي والجلوس أمام شاشة أو مكتب العيادة وأرفض الإجهاد العضلي والوقوف المطول.',
        discWeights: { S: 2, C: 2 },
        birkmanWeights: { activity: -3 },
        metricWeights: { manual: -4, lifestyle: 3 }
      }
    ]
  },

  // 12. التكنولوجيا والذكاء الاصطناعي والمناظير
  {
    id: 12,
    category: 'التكنولوجيا والابتكار الرقمي',
    title: 'ما مدى شغفك بالتعامل مع التكنولوجيا الحديثة، الروبوتات الطبية، والأنظمة الرقمية؟',
    description: 'الطب الحديث يندمج بقوة مع الرقمنة والذكاء الاصطناعي والروبوتات:',
    allowMultiple: true,
    options: [
      {
        text: 'أعشق الأجهزة الرقمية المتقدمة وتحليل الصور الطبية والذكاء الاصطناعي والتصوير ثلاثي الأبعاد.',
        subtext: 'مثل الأشعة التشخيصية، الطب النووي، القسطرة التداخلية.',
        discWeights: { C: 3 },
        birkmanWeights: { structure: 2, change: 2 },
        metricWeights: { intellectual: 3, lifestyle: 2 }
      },
      {
        text: 'أريد استخدام الروبوتات الجراحية (Da Vinci) والمناظير الدقيقة ثلاثية الأبعاد والليزر المتقدم.',
        subtext: 'مثل جراحة المسالك الروبوتية، جراحة العيون بالليزر، الأنف والأذن.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { activity: 2, structure: 2 },
        metricWeights: { manual: 3, income: 2 }
      },
      {
        text: 'أفضل الفحص السريري الإنساني الكلاسيكي وسماعة الطبيب وملاحظة تعابير الوجه ولغة الجسد.',
        subtext: 'مثل طب الأسرة، الطب النفسي، الباطنة العامة، طب الأطفال.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 3 },
        metricWeights: { contact: 3, manual: -1 }
      },
      {
        text: 'أهتم بالتقنيات الوراثية وتطبيقات تعديل الجينات CRISPR والعلاجات الجزيئية الموجهة.',
        subtext: 'مثل الوراثة الطبية، علم الأورام الجزيئي، أمراض الدم.',
        discWeights: { C: 3 },
        birkmanWeights: { structure: 2 },
        metricWeights: { research: 4, intellectual: 3 }
      },
      {
        text: 'ليس لدي شغف تقني خاص.',
        specialType: 'none'
      },
      {
        text: 'أجمع بين المهارة الإنسانية الكلاسيكية والتقنية الفائقة.',
        specialType: 'all'
      }
    ]
  },

  // 13. نمط مواجهة الحزن ونهاية الحياة
  {
    id: 13,
    category: 'المرونة النفسية ومواجهة الفقد',
    title: 'كيف تتعامل نفسياً مع الحالات الميؤوس منها والوفيات ومرافقة المرضى في مراحلهم الأخيرة؟',
    description: 'تأثير الصدمات والموت على الصحة النفسية للطبيب يختلف حسب التخصص:',
    allowMultiple: false,
    options: [
      {
        text: 'أمتلك قلباً رحيماً مستقراً وأرى شرفاً إنسانياً عظيماً في تخفيف عذاب مريض محتضر ودعم أسرته.',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, stress: 1, lifestyle: 1 }
      },
      {
        text: 'أشعر بالحزن الشديد والإحباط إذا لم أستطع شفاء المريض بالكامل؛ أريد تخصصاً نتائجه علاجية حاسمة.',
        discWeights: { D: 3 },
        birkmanWeights: { empathy: -1, advantage: 3 },
        metricWeights: { manual: 2, stress: 1 }
      },
      {
        text: 'أفضل التخصصات الوقائية والتجميلية الخالية تقريباً من الوفيات والأحزان والمشاهد المؤلمة.',
        discWeights: { I: 2, S: 2 },
        birkmanWeights: { empathy: -2, activity: -1 },
        metricWeights: { lifestyle: 4, stress: -4 }
      }
    ]
  },

  // 14. استقلالية القرار مقابل العمل الجماعي
  {
    id: 14,
    category: 'استقلالية العمل والتعاون المؤسسي',
    title: 'ما هو الشكل المفضل لك في تنظيم بيئة الفريق الطبي؟',
    description: 'بين القائد المستقل واللاعب الجماعي ضمن الفريق متعدد التخصصات:',
    allowMultiple: true,
    options: [
      {
        text: 'أحب قيادة غرفة العمليات كقبطان سفينة؛ كلمتي هي الفاصلة وأتحمل المسؤولية الكاملة عن النتيجة.',
        subtext: 'مثل الجراحة العامة، جراحة القلب، العظام.',
        discWeights: { D: 4 },
        birkmanWeights: { advantage: 3, activity: 2 },
        metricWeights: { stress: 2, manual: 2 }
      },
      {
        text: 'أستمتع بالعمل ضمن فريق استشاري واسع متناغم (طبيب، صيدلي إكلينيكي، أخصائي تغذية، علاج طبيعي).',
        subtext: 'مثل العناية المركزة، الأورام، التأهيل الطبي، كبار السن.',
        discWeights: { S: 2, I: 2, C: 1 },
        birkmanWeights: { empathy: 3, structure: 2 },
        metricWeights: { intellectual: 2, contact: 2 }
      },
      {
        text: 'أفضل الاستقلالية الفردية التامة في مكتبي وعيادتي دون الاعتماد على قرارات زملاء آخرين.',
        subtext: 'مثل الجلدية، العيون، الطب النفسي، عيادة طب الأسرة المستقلة.',
        discWeights: { C: 2, D: 1 },
        birkmanWeights: { structure: 2 },
        metricWeights: { lifestyle: 3, income: 1 }
      },
      {
        text: 'أحب دور الخبير المستشار الذي يأتيه الأطباء الآخرون لطلب الرأي والفصل التشخيصي.',
        subtext: 'مثل الأمراض المعدية، الأشعة، علم الأمراض، الوراثة.',
        discWeights: { C: 3, I: 1 },
        birkmanWeights: { structure: 3 },
        metricWeights: { intellectual: 3 }
      },
      {
        text: 'لا يهم؛ أتكيف مع مختلف بيئات العمل.',
        specialType: 'none'
      },
      {
        text: 'أجيد كافة هذه الأدوار بحسب الموقف.',
        specialType: 'all'
      }
    ]
  },

  // 15. التنافسية والقبول بالبورد السعودي
  {
    id: 15,
    category: 'الاستعداد للمنافسة وامتحان SMLE',
    title: 'ما هي استراتيجيتك الواقعية تجاه درجة اختبار الرخصة السعودية (SMLE) والتنافسية؟',
    description: 'تختلف التخصصات في حدة شروط القبول ونقاط المفاضلة بالهيئة:',
    allowMultiple: false,
    options: [
      {
        text: 'مستعد للمنافسة الشرسة وحصد درجة 85%+ في SMLE ونشر أبحاث متعددة لأجل المقاعد النخبوية الأكثر طلباً.',
        discWeights: { D: 3, C: 2 },
        birkmanWeights: { advantage: 4 },
        metricWeights: { income: 3, stress: 1 }
      },
      {
        text: 'أفضل تخصصاً ذو تنافسية معتدلة ومقاعد وفيرة تضمن لي القبول السلس دون تأخير أو ضغوط مهولة.',
        discWeights: { S: 3 },
        birkmanWeights: { structure: 3, advantage: -2 },
        metricWeights: { lifestyle: 2, stress: -2 }
      },
      {
        text: 'هدفي تخصص ذو قيمة وطنية واحتياج استراتيجي كبير تدعمه رؤية 2030 بغض النظر عن شهرته التقليدية.',
        discWeights: { I: 2, C: 2 },
        birkmanWeights: { empathy: 2, structure: 2 },
        metricWeights: { lifestyle: 2, research: 1 }
      }
    ]
  },

  // 16. الروتين والتكرار مقابل التنوع المستمر
  {
    id: 16,
    category: 'التنوع مقابل الروتين المتقن',
    title: 'هل تفضل تكرار إجراءات محددة والوصول فيها إلى درجة الإتقان الأسطوري، أم تفضل التنوع اليومي؟',
    description: 'طريقة تعامل عقلك مع المهام المتشابهة:',
    allowMultiple: false,
    options: [
      {
        text: 'أفضل إتقان عمليات وإجراءات محددة وتكرارها يومياً حتى أصبح من أسرع وأبرع من يجريها.',
        discWeights: { C: 3, S: 1 },
        birkmanWeights: { structure: 4, change: -3 },
        metricWeights: { manual: 3, lifestyle: 2, income: 2 }
      },
      {
        text: 'أشعر بالملل القاتل من التكرار؛ أريد كل يوم حالة مختلفة وقصة مرضية جديدة لا تشبه ما سبق.',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { change: 4, structure: -2 },
        metricWeights: { stress: 2, intellectual: 2 }
      },
      {
        text: 'أحب توازناً صحياً بين الروتين المريح والاستثناءات التشخيصية المشوقة.',
        discWeights: { S: 2, C: 2 },
        birkmanWeights: { structure: 2 },
        metricWeights: { lifestyle: 2 }
      }
    ]
  },

  // 17. التعامل مع الحرمان من النوم والمناوبات
  {
    id: 17,
    category: 'التحمل البيولوجي والمناوبات الليلية',
    title: 'كيف تتأثر قدرتك الذهنية والمزاجية عند السهر والحرمان من النوم؟',
    description: 'الساعة البيولوجية عامل حاسم في الرضا الوظيفي على مدى 30 عاماً:',
    allowMultiple: false,
    options: [
      {
        text: 'أستطيع البقاء يقظاً ومركزاً بكفاءة عالية حتى بعد 24 ساعة من العمل دون أن أفقد أعصابي.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3 },
        metricWeights: { stress: 2, lifestyle: -2 }
      },
      {
        text: 'السهر يسبب لي صداعاً وإرهاقاً شديداً ويفقدني صفاء الذهن؛ النوم المنتظم حاجة غير قابلة للتفاوض.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { activity: -3 },
        metricWeights: { lifestyle: 4, stress: -3 }
      },
      {
        text: 'أتحمل السهر إذا كان بنظام مناوبات ليلية محددة تعقبها أيام راحة واسترجاع كامل للطاقة.',
        discWeights: { D: 1, I: 2 },
        birkmanWeights: { change: 2 },
        metricWeights: { lifestyle: 1 }
      }
    ]
  },

  // 18. العلاقة بالمجتمع والوقاية والسياسات الصحية
  {
    id: 18,
    category: 'النطاق المجتمعي والسياسات',
    title: 'هل تفضل علاج مريض واحد في العيادة، أم صياغة برامج تحمي صحة الآلاف في المجتمع؟',
    description: 'مستوى التأثير الطبي الذي تطمح إليه:',
    allowMultiple: true,
    options: [
      {
        text: 'أفضل التأثير الفردي المباشر؛ أنظر في عيني المريض أمامي وأرى شكره وامتنانه الحار.',
        subtext: 'مثل كافة التخصصات الإكلينيكية والجراحية.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 3 },
        metricWeights: { contact: 3 }
      },
      {
        text: 'أهتم بالصورة الكبرى والوبائيات؛ حماية المجتمع من الأوبئة وتطوير أنظمة الرعاية والسياسات الوطنية.',
        subtext: 'مثل الطب الوقائي، الصحة العامة، إدارة المنظومات الصحية.',
        discWeights: { C: 3, I: 1 },
        birkmanWeights: { structure: 3 },
        metricWeights: { lifestyle: 3, research: 3 }
      },
      {
        text: 'أريد تخصصاً يجمع بين خدمة الفرد وتطوير برامج تعزيز الصحة العامة.',
        subtext: 'مثل طب الأسرة، الطب المهني، طب الأطفال.',
        discWeights: { S: 2, I: 2 },
        birkmanWeights: { empathy: 2, structure: 2 },
        metricWeights: { contact: 2, lifestyle: 2 }
      },
      {
        text: 'لا أملك توجهاً محدداً بين التأثيرين.',
        specialType: 'none'
      },
      {
        text: 'كلا المستويين يمثلان جزءاً لا يتجزأ من طموحي الطبي.',
        specialType: 'all'
      }
    ]
  },

  // 19. بيئة غرف العمليات والطقوس الجراحية
  {
    id: 19,
    category: 'بيئة العمليات والطقوس المعقمة',
    title: 'ما هو شعورك تجاه ارتداء الملابس الجراحية والتعقيم الصارم (Scrubbing) والوقوف في الـ OR؟',
    description: 'البيئة الجراحية لها طقوسها وثقافتها الخاصة:',
    allowMultiple: false,
    options: [
      {
        text: 'غرفة العمليات هي بيتي الثاني؛ الموسيقى، أجهزة التعقيم، الهدوء المركز، وفرحة انتهاء العملية.',
        discWeights: { D: 3, C: 1 },
        birkmanWeights: { activity: 3, structure: 2 },
        metricWeights: { manual: 4, income: 2 }
      },
      {
        text: 'أحب التواجد في العمليات ولكن كمسؤول عن فسيولوجيا المريض وسلامته وأدويته دون الجراحة بحد ذاتها.',
        subtext: 'مثل التخدير وعلاج الألم.',
        discWeights: { C: 3, D: 1 },
        birkmanWeights: { structure: 3 },
        metricWeights: { manual: 2, intellectual: 2, lifestyle: 1 }
      },
      {
        text: 'أشعر بالاختناق والملل من الروتين المعقم والوقوف المتصل وأفضل المعطف الأبيض والعيادة والمكتب.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { activity: -2 },
        metricWeights: { manual: -4, contact: 2, lifestyle: 2 }
      }
    ]
  },

  // 20. سرعة ظهور نتائج التدخل الطبي
  {
    id: 20,
    category: 'زمن ظهور نتائج العلاج',
    title: 'ما هي المدة الزمنية التي تفضل أن ترى فيها ثمرة وتأثير تدخلك الطبي على المريض؟',
    description: 'بين الإشباع الفوري (Instant Gratification) والصبر طويل الأمد:',
    allowMultiple: false,
    options: [
      {
        text: 'نتائج فورية في دقائق أو ساعات (استيقاظ من إغماء، إعادة نبض، تعديل خلع مفصل، تصحيح بصر بالليزر).',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3, advantage: 2 },
        metricWeights: { manual: 2, stress: 2 }
      },
      {
        text: 'نتائج متوسطة خلال أيام أو أسابيع من ضبط الأدوية والبروتوكولات (تعافي من التهاب حاد، استقرار ضغط).',
        discWeights: { C: 2, S: 2 },
        birkmanWeights: { structure: 2 },
        metricWeights: { intellectual: 2, lifestyle: 1 }
      },
      {
        text: 'ثمار طويلة الأمد تمتد لشهور وسنوات (تأهيل شلل، تعديل نمط حياة مريض سكر، جلسات علاج نفسي).',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 4, activity: -2 },
        metricWeights: { contact: 3, lifestyle: 2 }
      }
    ]
  },

  // 21. التواصل الاجتماعي والشهرة المهنية
  {
    id: 21,
    category: 'الحضور المجتمعي والشهرة',
    title: 'ما هو مدى اهتمامك بالحضور الإعلامي، التثقيف الصحي المجتمعي، والشهرة المهنية؟',
    description: 'بعض التخصصات تحظى باهتمام جماهيري واسع وتفاعل على وسائل التواصل:',
    allowMultiple: true,
    options: [
      {
        text: 'أحب الظهور الإعلامي والمجتمعي ونشر الوعي وتقديم الاستشارات التثقيفية عبر المنصات.',
        subtext: 'مثل الجلدية، جراحة التجميل، التغذية والسكري، الطب النفسي، طب الأسرة.',
        discWeights: { I: 4 },
        birkmanWeights: { empathy: 2, advantage: 3 },
        metricWeights: { income: 2, contact: 2 }
      },
      {
        text: 'أفضل أن أكون جندياً مجهولاً؛ أعمل بأعلى إتقان علمي داخل المستشفى والمختبر بعيداً عن الأضواء.',
        subtext: 'مثل الباثولوجي، الأشعة، العناية المركزة، التخدير، الجينات.',
        discWeights: { C: 3 },
        birkmanWeights: { empathy: -2, structure: 3 },
        metricWeights: { lifestyle: 2, intellectual: 2 }
      },
      {
        text: 'أريد الشهرة الأكاديمية بين أقراني الأطباء في المؤتمرات الدولية والمجلات العلمية العالمية المحكمة.',
        subtext: 'مثل أبحاث القلب، الأورام، جراحة الأعصاب، زراعة الأعضاء.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { advantage: 3 },
        metricWeights: { research: 4, intellectual: 2 }
      },
      {
        text: 'لا أبالي بموضوع الشهرة أو الظهور.',
        specialType: 'none'
      },
      {
        text: 'أرحب بكل أشكال التأثير المهني والمجتمعي المتزن.',
        specialType: 'all'
      }
    ]
  },

  // 22. التعامل مع الحالات غير المحددة والشكاوى الغامضة
  {
    id: 22,
    category: 'التعامل مع الشكاوى غير المحددة',
    title: 'عندما يأتيك مريض يشكو من أعراض عامة مبهمة (إرهاق، دوخة، آلام متفرقة) بدون نتائج مخبرية واضحة:',
    description: 'ردة فعلك تكشف طبيعة التفكير السريري الأنسب لك:',
    allowMultiple: false,
    options: [
      {
        text: 'أشعر بالانزعاج؛ أفضل الحالات الواضحة ذات المرض المحدد الذي يمكن استئصاله أو قياسه بدقة بالأرقام.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { structure: 3 },
        metricWeights: { manual: 2, intellectual: -1 }
      },
      {
        text: 'يستفزني الفضول العلمي؛ أبدأ بفحص كل الأنظمة وأخذ تاريخ مرضي مفصل واستبعاد الأسباب المناعية والنادرة.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 2 },
        metricWeights: { intellectual: 4, research: 2 }
      },
      {
        text: 'أركز على الجانب النفسي والاجتماعي وأسلوب الحياة؛ أستمع باهتمام لأن أغلب هذه الشكاوى سببها التوتر وضغوط الحياة.',
        discWeights: { S: 4, I: 1 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, lifestyle: 2 }
      }
    ]
  },

  // 23. تفضيل العلاجات الدوائية مقابل الفيزيائية والجراحية
  {
    id: 23,
    category: 'أداة العلاج المفضلة',
    title: 'ما هي الأداة العلاجية التي تشعر بأنها تمثل هويتك الطبية الحقيقية؟',
    description: 'السلاح الرئيسي الذي تعتمد عليه في شفاء المريض:',
    allowMultiple: true,
    options: [
      {
        text: 'المشرط والمقص وأجهزة الليزر والمناظير لإصلاح الخلل العضوي باليد مباشرة.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3 },
        metricWeights: { manual: 4 }
      },
      {
        text: 'علم الأدوية السريري (Pharmacology) والمضادات الحيوية والعلاجات المناعية الموجهة وضبط الجرعات.',
        discWeights: { C: 3 },
        birkmanWeights: { structure: 3 },
        metricWeights: { intellectual: 3 }
      },
      {
        text: 'الكلمة الطيبة والإرشاد النفسي والسلوكي وتغيير عادات النوم والغذاء ونمط الحياة.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, lifestyle: 2 }
      },
      {
        text: 'العلاج الطبيعي والتمارين التأهيلية والحقن التداخلي لإعادة الحركة والوظيفة للأطراف.',
        discWeights: { S: 2, C: 1 },
        birkmanWeights: { activity: 1, empathy: 2 },
        metricWeights: { manual: 2, contact: 2, lifestyle: 2 }
      },
      {
        text: 'ليس لدي أداة علاجية مفضلة بعينها.',
        specialType: 'none'
      },
      {
        text: 'أستعين بكل هذه الأدوات بتكامل وشمولية.',
        specialType: 'all'
      }
    ]
  },

  // 24. سنوات التدريب الإضافية والزمالات الدقيقة
  {
    id: 24,
    category: 'مدة التدريب والزمالات الدقيقة',
    title: 'كم عدد السنوات التي أنت مستعد لقضائها في التدريب والزمالات قبل أن تصبح استشارياً مستقلاً؟',
    description: 'مسار التدريب الطبي يمتد من 3 سنوات وحتى 8-9 سنوات:',
    allowMultiple: false,
    options: [
      {
        text: 'أريد أقصر مسار ممكن (3-4 سنوات) لأتخرج سريعاً وأبدأ حياتي العملية وعائلتي واستقراري.',
        subtext: 'مثل طب الأسرة (3 سنوات)، العيون (4 سنوات)، الجلدية (4 سنوات)، الطوارئ (4 سنوات).',
        discWeights: { S: 3, I: 1 },
        birkmanWeights: { structure: 2, advantage: -1 },
        metricWeights: { lifestyle: 3, stress: -2 }
      },
      {
        text: 'مستعد لمسار متوسط قياسي (4-5 سنوات) في تخصص عام أو جراحي متوازن.',
        subtext: 'مثل الجراحة العامة، الباطنة العامة، النساء والولادة، العظام، الأشعة.',
        discWeights: { C: 2, D: 2 },
        birkmanWeights: { structure: 2 },
        metricWeights: { intellectual: 1 }
      },
      {
        text: 'مستعد لقضاء 6 إلى 8 سنوات أو أكثر في زمالات دقيقة ومسارات متقدمة لأصل لقمة التخصصية.',
        subtext: 'مثل جراحة المخ والأعصاب، جراحة القلب، قسطرة القلب التداخلية، جراحة الأطفال.',
        discWeights: { D: 3, C: 2 },
        birkmanWeights: { advantage: 3, activity: 2 },
        metricWeights: { research: 2, income: 2, lifestyle: -2 }
      }
    ]
  },

  // 25. الأبعاد السلوكية لبيركمان: الحاجة للتنظيم والمستجدات
  {
    id: 25,
    category: 'أبعاد بيركمان (الهيكل والمرونة)',
    title: 'في أسلوب حياتك وتعلمك اليومي، كيف تصف حاجتك للأنظمة والقواعد المحددة؟',
    description: 'وفق مقياس بيركمان، يحدد هذا البعد مدى راحتك مع البروتوكولات الصارمة مقابل الابتكار الحر:',
    allowMultiple: false,
    options: [
      {
        text: 'أرتاح جداً للبروتوكولات الصارمة والمكتوبة خطوة بخطوة وأكره التخمين والارتجال العشوائي.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, change: -3 },
        metricWeights: { intellectual: 2, stress: -1 }
      },
      {
        text: 'أشعر بالضيق من القواعد الصارمة وأحب التفكير خارج الصندوق وابتكار حلول جديدة في كل موقف.',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { change: 4, structure: -3 },
        metricWeights: { research: 3, stress: 2 }
      },
      {
        text: 'أستخدم البروتوكول كدليل إرشادي استئناسي، لكنني أعتمد على حدسي السريري وخبرتي الفردية.',
        discWeights: { I: 2, S: 2 },
        birkmanWeights: { structure: 1, change: 1 },
        metricWeights: { lifestyle: 1 }
      }
    ]
  },

  // 26. البعد الختامي: الهدف الأسمى من ممارسة الطب
  {
    id: 26,
    category: 'الرؤية والرسالة المهنية الكبرى',
    title: 'في نهاية مسيرتك الطبية بعد 30 عاماً، ما هو الأثر الذي تريد أن تتذكره وأنت فخور بعطائك؟',
    description: 'الرؤية العميقة التي ستلهمك في أصعب أيامك التدريبية:',
    allowMultiple: true,
    options: [
      {
        text: 'أنني كنت جراحاً بارعاً أنقذت الآلاف من الموت والشلل والتشوه بفضل براعة يدي ودقتي.',
        discWeights: { D: 3, C: 1 },
        birkmanWeights: { activity: 3, advantage: 2 },
        metricWeights: { manual: 3, income: 2 }
      },
      {
        text: 'أنني كنت طبيباً حكيماً رحيماً استمعت لقلوب المرضى وخففت آلامهم ورافقتهم بإخلاص لا يتزعزع.',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, lifestyle: 1 }
      },
      {
        text: 'أنني تركت إرثاً علمياً وأبحاثاً غيرت طريقة علاج المرض ونشرت المعرفة للأجيال القادمة.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 3 },
        metricWeights: { research: 4, intellectual: 3 }
      },
      {
        text: 'أنني حققت نجاحاً مهنياً كبيراً وبنيت مركزاً خاصاً متميزاً وحافظت في الوقت نفسه على سعادة أسرتي وتوازني الشخصي.',
        discWeights: { I: 3, S: 1 },
        birkmanWeights: { advantage: 3, structure: 2 },
        metricWeights: { lifestyle: 3, income: 3 }
      },
      {
        text: 'ما زلت في مرحلة استكشاف أثري المنشود.',
        specialType: 'none'
      },
      {
        text: 'أطمح لأن أجمع كل هذه المعاني السامية في رحلتي الطبية.',
        specialType: 'all'
      }
    ]
  },

  // 27. التعامل مع عدم اليقين السريري والمخاطرة (Gerrity Tolerance of Ambiguity Scale / AAMC)
  {
    id: 27,
    category: 'التعامل مع عدم اليقين السريري والمخاطرة',
    title: 'كيف تصف قدرتك النفسية والمهنية على اتخاذ القرارات في ظل نقص المعلومات وعدم اليقين التشخيصي؟',
    description: 'معيار معتمد عالمياً في الإرشاد الطبي؛ مدى تحملك للمخاطرة السريرية مقابل اشتراط اليقين التام:',
    allowMultiple: false,
    options: [
      {
        text: 'أرتاح جداً للقرارات السريعة والحاسمة في ظل الغموض ونقص البيانات؛ فالانتظار في بيئتي قد يودي بحياة المريض.',
        subtext: 'مثل طب الطوارئ، العناية المركزة، جراحة الحوادث والإصابات، الإنعاش القلبي الرئوي.',
        discWeights: { D: 4, I: 1 },
        birkmanWeights: { change: 4, activity: 3 },
        metricWeights: { stress: 4, lifestyle: -2, manual: 1 }
      },
      {
        text: 'أفضل أن أبني كل خطوة علاجية على يقين علمي ومخبري وشعاعي مؤكد 100% لتفادي أدنى احتمالية للخطأ.',
        subtext: 'مثل علم الأمراض (الباثولوجي)، الأشعة التشخيصية، الأورام الجزيئية، زراعة النخاع.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, change: -3 },
        metricWeights: { intellectual: 4, stress: -2, lifestyle: 2 }
      },
      {
        text: 'أتقبل الشك السريري وأتعامل معه بتأنٍّ وحكمة؛ أختبر الفرضيات التشخيصية وأراقب استجابة المريض عبر الزمن بأمان.',
        subtext: 'مثل طب الأسرة، الباطنة العامة، الروماتيزم، الأمراض المعدية، الغدد الصماء.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { structure: 2, empathy: 3 },
        metricWeights: { contact: 3, intellectual: 2, lifestyle: 2 }
      }
    ]
  },

  // 28. الذكاء العاطفي وإيصال الأخبار الصادمة (CanMEDS Communicator / SPIKES Protocol)
  {
    id: 28,
    category: 'الذكاء العاطفي وإيصال الأخبار الصادمة',
    title: 'عندما تضطر لمواجهة عائلة مريض وإخبارهم بتشخيص مصيري أو وفاة مفاجئة، كيف تشعر تجاه هذا الدور؟',
    description: 'إيصال الأخبار الصادمة واحتواء الصدمات العاطفية ركن أساسي في التواصل الإكلينيكي العالمي:',
    allowMultiple: false,
    options: [
      {
        text: 'أمتلك صبراً وتعاطفاً استثنائياً؛ أرى في مواساة المكلومين واحتواء غضبهم أسمى واجب إنساني وأتحمل الثقل النفسي بثبات.',
        subtext: 'مثل طب الأورام، الرعاية التلطيفية، العناية المركزة، طوارئ الأطفال، الطب النفسي.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 4, stress: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل أن يقتصر دوري على الجانب الإجرائي والتقني والتشخيصي، مع تفويض إبلاغ الأخبار الصعبة للطبيب المعالج الأساسي.',
        subtext: 'مثل التخدير، الأشعة، علم الأمراض، الجراحات التداخلية المجدولة.',
        discWeights: { C: 3, D: 1 },
        birkmanWeights: { empathy: -3, structure: 3 },
        metricWeights: { contact: -4, lifestyle: 2 }
      },
      {
        text: 'أفضل التخصصات التي يكون فيها معظم الحوار مفعماً بالأمل، والتفاؤل بالشفاء، أو تحسين جودة الحياة والمظهر.',
        subtext: 'مثل جراحة التجميل، الجلدية، الطب الرياضي، تصحيح البصر، طب الأسرة الوقائي.',
        discWeights: { I: 4, D: 1 },
        birkmanWeights: { empathy: 2, advantage: 3 },
        metricWeights: { lifestyle: 3, income: 2, stress: -3 }
      }
    ]
  },

  // 29. الطب الدقيق والتقنيات المستقبلية ورؤية 2030 (Precision Medicine & Digital Health)
  {
    id: 29,
    category: 'الطب الدقيق والتقنيات الحديثة ورؤية 2030',
    title: 'أيٌّ من الاتجاهات الطبية المستقبلية الحديثة تشعر بأنه يمثل الشغف الأكبر لك في العقد القادم؟',
    description: 'انسجاماً مع نموذج الرعاية الصحية الحديث 2030 والتحول الرقمي والتقنيات الطبية المتقدمة:',
    allowMultiple: true,
    options: [
      {
        text: 'الطب الجزيئي والجينومي الدقيق (Genomics)؛ تصميم علاجات مناعية وجينات موجهة تناسب الشفرة الوراثية لكل مريض.',
        subtext: 'مثل الوراثة الطبية، علم أورام الدم الجزيئي، الصيدلة الجينية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 3 },
        metricWeights: { research: 4, intellectual: 4 }
      },
      {
        text: 'الروبوتات الجراحية الذكية، الطباعة ثلاثية الأبعاد للأعضاء، والواقع المعزز في مسرح العمليات.',
        subtext: 'مثل الجراحة الروبوتية المتقدمة، جراحة المخ التجسيمية، طب العيون التداخلي.',
        discWeights: { D: 3, C: 2 },
        birkmanWeights: { activity: 3, change: 3 },
        metricWeights: { manual: 4, research: 2, income: 2 }
      },
      {
        text: 'التطبيب عن بُعد (Telemedicine)، المستشفيات الافتراضية، وخوارزميات التنبؤ بصحة المجتمع.',
        subtext: 'مثل الطب الوقائي، الصحة الرقمية، مستشفى صحة الافتراضي، الرعاية الأولية الحديثة.',
        discWeights: { I: 3, S: 2 },
        birkmanWeights: { change: 3, structure: 2 },
        metricWeights: { lifestyle: 3, research: 2, contact: 2 }
      },
      {
        text: 'أفضل الطب السريري العيني المباشر وسماعة الفحص الكلاسيكية دون الانشغال المفرط بالتقنيات الافتراضية.',
        subtext: 'مثل الممارسة السريرية التقليدية في العيادات والأقسام العامة.',
        discWeights: { S: 3, C: 1 },
        birkmanWeights: { structure: 2, change: -2 },
        metricWeights: { contact: 2, lifestyle: 1 }
      },
      {
        text: 'لا أملك توجهاً تقنياً محدداً في الوقت الراهن.',
        specialType: 'none'
      },
      {
        text: 'أطمح للمزج بين كافة هذه الآفاق التقنية والعلمية المتقدمة.',
        specialType: 'all'
      }
    ]
  },

  // 30. التدريس الأكاديمي والإشراف العلمي (CanMEDS Scholar Role / SCFHS Mentorship)
  {
    id: 30,
    category: 'التدريس الأكاديمي والإشراف الإكلينيكي',
    title: 'ما هو موقع التدريس الإكلينيكي والإشراف على طلاب الطب والأطباء المقيمين في يومك الطبي المثالي؟',
    description: 'معيار الكفاءة العلمية (Scholar) المعتمد في البورد السعودي والكليات الملكية العالمية:',
    allowMultiple: false,
    options: [
      {
        text: 'أعتبر التعليم الطبي شغفي ورسالتي؛ أستمتع بالمرور السريري التعليمي ونقل الخبرة للأجيال في المدن الطبية والجامعات.',
        subtext: 'مثل الاستشاريين الأكاديميين في المراكز الطبية الجامعية والتخصصية الكبرى.',
        discWeights: { I: 3, C: 3 },
        birkmanWeights: { empathy: 3, structure: 3 },
        metricWeights: { intellectual: 3, research: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل التركيز الخالص على الكفاءة التشغيلية والإنتاجية السريرية المباشرة (علاج أكبر قدر من الحالات أو العمليات) دون تشتت بالتدريس.',
        subtext: 'مثل المستشفيات الطرفية المزدحمة، ومراكز جراحة اليوم الواحد، والقطاع الخاص الربحي.',
        discWeights: { D: 3 },
        birkmanWeights: { activity: 3, advantage: 3 },
        metricWeights: { manual: 2, income: 3 }
      },
      {
        text: 'أفضل أن ينصب دوري التثقيفي على توعية المريض وأسرته والمجتمع بأسلوب مبسط بدلاً من تدريس الأطباء.',
        subtext: 'مثل أطباء الرعاية الأولية، الصحة العامة، والتثقيف الإكلينيكي الوقائي.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 3, lifestyle: 2 }
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════════════
  // حزمة الأسئلة السلوكية المتقدمة وفق معايير AAMC و PVIPS (الأسئلة 31 – 40)
  // ══════════════════════════════════════════════════════════════════════════════════════

  // 31. الاستقلالية المهنية وحرية القرار الإكلينيكي (AAMC Autonomy & Locus of Control)
  {
    id: 31,
    category: 'الاستقلالية وحرية القرار الإكلينيكي',
    title: 'ما هي درجة الاستقلالية والسيادة الفردية التي تحتاجها في قراراتك وممارستك اليومية؟',
    description: 'معيار AAMC المهني للاستقلالية الذاتية ومستوى التبعية للفرق واللجان الطبية المشتركة:',
    allowMultiple: true,
    options: [
      {
        text: 'أفضل القيادة الفردية والسيادة المطلقة؛ أتخذ القرار النهائي بنفسي وأتحمل مسؤوليته الكاملة دون مراجعات مستمرة.',
        subtext: 'مثل الجراحة العامة، جراحة المخ والأعصاب، التوليد، جراحة العظام، الطب الشرعي.',
        discWeights: { D: 4 },
        birkmanWeights: { advantage: 3, activity: 2 },
        metricWeights: { stress: 3, income: 2, lifestyle: -1 }
      },
      {
        text: 'أشعر بالأمان والراحة في العمل المؤسسي التشاركي ضمن لجان استشارية متعددة التخصصات (Tumor Board / Multidisciplinary).',
        subtext: 'مثل الأورام، زراعة الأعضاء، الروماتيزم، العناية المركزة، الأمراض المعدية.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { structure: 3, empathy: 2 },
        metricWeights: { intellectual: 3, research: 2, lifestyle: 1 }
      },
      {
        text: 'أفضل دور المستشار الخبير غير المباشر؛ أقدم الاستشارة والرأي القطعي للطبيب المعالج دون الانغماس في إدارة الحالة.',
        subtext: 'مثل الأشعة التشخيصية، علم الأمراض (الباثولوجي)، الطب النووي، الصيدلة السريرية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 3, empathy: -2 },
        metricWeights: { intellectual: 3, contact: -4, lifestyle: 3 }
      },
      {
        text: 'أفضل الاستقلالية في بناء مشروعي الطبي الخاص وإدارة عيادتي وفق جدولي وتصوري المستقل.',
        subtext: 'مثل الجلدية والتجميل، الطب النفسي، طب الأسنان التخصصي، تصحيح البصر.',
        discWeights: { I: 3, D: 2 },
        birkmanWeights: { advantage: 4, structure: 2 },
        metricWeights: { lifestyle: 3, income: 4 }
      },
      {
        text: 'لا يشكل نمط الاستقلالية فارقاً حاسماً لدي حالياً.',
        specialType: 'none'
      },
      {
        text: 'أتكيف بمرونة مع الاستقلالية الفردية والعمل التشاركي بحسب المرحلة.',
        specialType: 'all'
      }
    ]
  },

  // 32. الإتقان التقني والمهاري الدقيق (PVIPS Technical Mastery & Micro-Precision)
  {
    id: 32,
    category: 'الإتقان التقني والمهاري الدقيق',
    title: 'ما هو موقفك من تكرار الإجراءات التقنية المعقدة والدقيقة للوصول إلى أعلى درجات الإتقان الحرفي؟',
    description: 'معيار مقياس القيم المهنية (PVIPS) للبراعة الحرفية وثبات اليد والإتقان المليمترية في الإجراءات التداخلية والجراحية:',
    allowMultiple: true,
    options: [
      {
        text: 'أعشق الإتقان الحرفي الدقيق؛ مستعد لقضاء مئات الساعات لتكرار خياطة شريان مجهري، أو زرع عدسة، أو زراعة قوقعة حتى تصبح حركاتي متناهية الكمال.',
        subtext: 'مثل جراحة العيون الدقيقة، جراحة اليد والأعصاب الطرفية المجهرية، جراحة التجميل الترميمية، جراحة قاع الجمجمة.',
        discWeights: { C: 4, D: 2 },
        birkmanWeights: { structure: 4, activity: 3 },
        metricWeights: { manual: 5, intellectual: 3, income: 3 }
      },
      {
        text: 'أفضل الإجراءات التقنية الموجهة بالقساطر والشاشات ثلاثية الأبعاد والأجهزة التداخلية المتقدمة.',
        subtext: 'مثل القسطرة القلبية التداخلية، الأشعة التداخلية، مناظير الجهاز الهضمي المتقدمة، قسطرة الأوعية الدماغية.',
        discWeights: { D: 3, C: 3 },
        birkmanWeights: { activity: 3, change: 2 },
        metricWeights: { manual: 4, intellectual: 3, stress: 2, income: 4 }
      },
      {
        text: 'أفضل أن يكون إتقاني في "الفكر السريري والتشخيص التحليلي" وتركيز مهارتي في الاستنتاج والاستماع بدلاً من الأدوات اليدوية المجهرية.',
        subtext: 'مثل الطب النفسي، أمراض الروماتيزم، الباطنة العامة، الأعصاب الإكلينيكية، الغدد الصماء.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { empathy: 4, structure: 3 },
        metricWeights: { intellectual: 5, contact: 4, manual: -4 }
      },
      {
        text: 'أحب التنوع الإجرائي العام الذي يحل مشاكل سريعة ومتكررة دون الحاجة لسنوات من التكرار المجهري الفائق.',
        subtext: 'مثل طب الأسرة، جراحة الطوارئ الصغرى، طب العناية الأولية.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { change: 2, empathy: 3 },
        metricWeights: { lifestyle: 3, contact: 3, manual: 2 }
      },
      {
        text: 'لا أملك توجهاً خاصاً نحو الإتقان التقني اليدوي مقارنة بباقي الجوانب.',
        specialType: 'none'
      },
      {
        text: 'أقدر كلاً من الإتقان التقني الحرفي والعمق المعرفي التشخيصي بتوازن متكامل.',
        specialType: 'all'
      }
    ]
  },

  // 33. القدرة على تحمل الضغط النفسي الأخلاقي والقانوني (AAMC Medico-Legal & Moral Resilience)
  {
    id: 33,
    category: 'الحصانة النفسية والمخاطر الطبية القانونية',
    title: 'كيف تتعامل مع وطأة المسؤولية القانونية والمضاعفات المحتملة غير المتوقعة؟',
    description: 'معيار تقييم الصمود النفسي ومواجهة النزاعات الطبية ومضاعفات الإجراءات الحرجة:',
    allowMultiple: false,
    options: [
      {
        text: 'أملك رباطة جأش عالية ومستعد لتحمل أعلى درجات المخاطرة الجراحية والإجرائية، ولا تفتر عزيمتي عند حدوث مضاعفة غير مقصودة.',
        subtext: 'مثل جراحة الأعصاب، جراحة القلب، النساء والتوليد، جراحة الحوادث، الإنعاش الحرِج.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 3, advantage: 3 },
        metricWeights: { stress: 4, manual: 3, lifestyle: -2 }
      },
      {
        text: 'أفضل التخصصات المنضبطة بروتوكولياً ومحدودة المضاعفات الطبية الحادة لحماية راحة بالي واستقراري النفسي.',
        subtext: 'مثل الأمراض الجلدية، الحساسية والمناعة، طب الأسرة، الطب الطبيعي والتأهيل، علم الأنسجة.',
        discWeights: { S: 3, C: 3 },
        birkmanWeights: { structure: 4, change: -3 },
        metricWeights: { stress: -4, lifestyle: 4 }
      },
      {
        text: 'أهتم بالجانب الإجرائي التشخيصي الدقيق الموثق بالأدلة الملموسة والتقارير المحكمة للحد من أي نزاع قضائي.',
        subtext: 'مثل الطب الشرعي، الأشعة التشخيصية، الطب المهني، التحاليل المخبرية والأمراض الجزيئية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 3, lifestyle: 2, contact: -3 }
      }
    ]
  },

  // 34. الفئة العمرية والاجتماعية المفضلة للمرضى (PVIPS Patient Demographics & Empathy Span)
  {
    id: 34,
    category: 'الفئة العمرية ونمط المستفيدين',
    title: 'ما هي الشريحة الأكثر انسجاماً مع طاقتك الإنسانية وصبرك العاطفي ومهاراتك السريرية؟',
    description: 'توزيع التخصصات الطبية يعتمد بنيوياً على المرحلة العمرية والخصائص السيكولوجية للمريض:',
    allowMultiple: true,
    options: [
      {
        text: 'الأطفال والرضع وحديثو الولادة؛ تجذبني براءتهم ومرونتهم الحيوية وأستمتع بتهدئة قلق والديهم.',
        subtext: 'مثل طب الأطفال العام، عناية حديثي الولادة (NICU)، جراحة الأطفال، قلب الأطفال.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 4, stress: 2, lifestyle: 1 }
      },
      {
        text: 'كبار السن والمسنون؛ أملك الصبر التام على تعدد أمراضهم، وبطء استجابتهم، وأستمتع بتقديرهم وخبرتهم الحياتية.',
        subtext: 'مثل طب كبار السن (Geriatrics)، الباطنة العامة، الروماتيزم، الطب التلطيفي.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { empathy: 4, structure: 2 },
        metricWeights: { contact: 4, intellectual: 2, lifestyle: 2 }
      },
      {
        text: 'الشباب والرياضيون والفئات المنتجة؛ حالاتهم حادة ومحددة، ولديهم حافز عالٍ للتعافي والعودة لنشاطهم الطبيعي.',
        subtext: 'مثل جراحة العظام وإصابات الملاعب، الطب الرياضي، جراحة التجميل، صحة المرأة الإنجابية.',
        discWeights: { D: 2, I: 3 },
        birkmanWeights: { activity: 3, advantage: 2 },
        metricWeights: { manual: 2, income: 3, lifestyle: 2 }
      },
      {
        text: 'المرضى المجهولون أو الفاقدون للوعي؛ أفضل تركيز جهدي على الفيزيولوجيا الحيوية والأجهزة دون عبء التواصل اللفظي.',
        subtext: 'مثل التخدير، العناية المركزة للبالغين، الأشعة التداخلية الطارئة، الطب الجنائي.',
        discWeights: { C: 3, D: 2 },
        birkmanWeights: { activity: 2, empathy: -3 },
        metricWeights: { contact: -4, stress: 3, intellectual: 2 }
      },
      {
        text: 'لا أملك تفضيلاً لفئة عمرية معينة دون غيرها.',
        specialType: 'none'
      },
      {
        text: 'أستمتع بعلاج كافة الفئات العمرية دون استثناء (من المهد إلى اللحد).',
        specialType: 'all'
      }
    ]
  },

  // 35. التفضيل الحركي وبيئة الجلوس الممتدة (AAMC Physical Demands & Ergonomics)
  {
    id: 35,
    category: 'الجهد الحركي والتأقلم الإرجونومي',
    title: 'ما هو النمط الحركي والجسدي الذي ترتاح له أثناء ساعات ممارستك الطويلة؟',
    description: 'معيار مواءمة الطاقة الحركية البدنية وتحمل المجهود الإرجونومي عبر سنوات المهنة:',
    allowMultiple: false,
    options: [
      {
        text: 'حركة مستمرة ووقوف على القدمين وعمل يدوي متواصل؛ الجلوس المكتبي الطويل يسبب لي الخمول والضيق.',
        subtext: 'مثل الجراحة العامة، العظام، التوليد، جراحة الأوعية، طب الطوارئ.',
        discWeights: { D: 3, I: 1 },
        birkmanWeights: { activity: 5 },
        metricWeights: { manual: 4, stress: 2, lifestyle: -2 }
      },
      {
        text: 'الجلوس المكتبي المريح وفحص المرضى بالعيادة والتنقل الخفيف، مع إيقاع متزن يحافظ على طاقتي البدنية.',
        subtext: 'مثل طب الأسرة، الباطنة العامة، الطب النفسي، الغدد، طب الأعصاب، الحساسية.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { activity: -2, structure: 3 },
        metricWeights: { lifestyle: 3, intellectual: 2, manual: -3 }
      },
      {
        text: 'الجلوس أمام الشاشات المتقدمة والميكروسكوبات في بيئة مكيفة ومحكمة هندسياً دون إرهاق جسدي عنيف.',
        subtext: 'مثل الأشعة التشخيصية، علم الأمراض، الطب النووي، قراءة التخطيط الدماغي والفسيولوجي.',
        discWeights: { C: 4 },
        birkmanWeights: { activity: -3, structure: 3 },
        metricWeights: { lifestyle: 4, intellectual: 3, manual: -2, contact: -3 }
      }
    ]
  },

  // 36. الاستقصاء الوبائي ومكافحة العدوى والجوائح (Outbreak Investigation & Biosecurity)
  {
    id: 36,
    category: 'الاستقصاء الوبائي ومكافحة العدوى',
    title: 'عند حدوث فاشية وبائية مفاجئة أو انتشار عدوى مستعصية داخل المستشفى أو المجتمع، كيف تتفاعل؟',
    description: 'معيار الاستجابة الميدانية للأوبئة وتتبع سلاسل الانتقال والتحقيقات البيولوجية (CanMEDS Medical Expert & Health Advocate):',
    allowMultiple: true,
    options: [
      {
        text: 'أتحمس للتحقيق الميداني وتتبع سلاسل العدوى، وعزل البؤر، وتحليل المنحنيات الوبائية لحماية المجتمع ككل.',
        subtext: 'مثل الطب الوقائي، الصحة العامة، علم الأوبئة الحقلي، وإدارة مكافحة العدوى والجوائح.',
        discWeights: { C: 3, I: 2 },
        birkmanWeights: { change: 3, structure: 3 },
        metricWeights: { lifestyle: 4, research: 4, contact: 2 }
      },
      {
        text: 'أركز على الميكروبيولوجيا الدقيقة والمقاومة الجينية للبكتيريا واختيار المضادات الحيوية النوعية لكل مريض.',
        subtext: 'مثل استشاريي الأمراض المعدية (Infectious Diseases)، والمختبرات الميكروبيولوجية الإكلينيكية.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4 },
        metricWeights: { intellectual: 5, research: 3, lifestyle: 2 }
      },
      {
        text: 'أفضل البقاء في خط الدفاع السريري الأول المباشر لإنعاش وعلاج الحالات المتدهورة تنفسياً في العزل والعناية.',
        subtext: 'مثل طب الطوارئ، العناية المركزة، وأمراض الصدر والحالات الحرجة.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4, change: 3 },
        metricWeights: { stress: 4, manual: 3, lifestyle: -2 }
      },
      {
        text: 'أفضل التخصصات البعيدة تماماً عن مواجهة الأوبئة المعدية والعدوى التنفسية الخطيرة.',
        subtext: 'مثل طب العيون، جراحة التجميل، الجلدية، الطب الطبيعي والتأهيل، جراحة العظام الاختيارية.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { structure: 3, activity: -2 },
        metricWeights: { lifestyle: 4, stress: -3, income: 2 }
      },
      {
        text: 'لا أملك توجهاً خاصاً حيال الاستجابة للأوبئة.',
        specialType: 'none'
      },
      {
        text: 'أرحب بالمساهمة في السيطرة على الفاشيات بشتى الطرق الوقائية والسريرية.',
        specialType: 'all'
      }
    ]
  },

  // 37. عمق التحقيق السريري وحل الألغاز (AAMC Intellectual Puzzle Solving & Detective Mindset)
  {
    id: 37,
    category: 'الألغاز التشخيصية والتفكير الاستقرائي',
    title: 'عندما تواجه مريضاً بأعراض غامضة لم يستطع 5 أطباء تفسيرها، ما هو شعورك الداخلي؟',
    description: 'معيار الفضول التحقيقي السريري (Diagnostic Detective Work) وعمق التحليل الطبي:',
    allowMultiple: false,
    options: [
      {
        text: 'أشعر بالحماس وشغف التحدي؛ أغوص في التاريخ الطبي وأراجع أحدث الأوراق العلمية وأربط الخيوط لأكشف التشخيص النادر.',
        subtext: 'مثل أمراض الروماتيزم، الأعصاب، الأمراض المعدية، الوراثة الإكلينيكية، الباطنة العامة.',
        discWeights: { C: 4, S: 1 },
        birkmanWeights: { structure: 3, change: 2 },
        metricWeights: { intellectual: 5, research: 3, lifestyle: 1 }
      },
      {
        text: 'أفضل الحالات التي يكون فيها سبب المشكلة واضحاً وجلياً (كسر، فتق، نزيف، كتلة) ويتطلب حلاً علاجياً ملموساً.',
        subtext: 'مثل الجراحة العامة، العظام، المسالك البولية، الأنف والأذن والحنجرة، إصابات الطوارئ.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 3, structure: 2 },
        metricWeights: { manual: 4, intellectual: -1, stress: 2 }
      },
      {
        text: 'أبحث عن الدليل الحسي المجهري أو الإشعاعي القاطع؛ لا أعتمد على التخمين بل على الصورة والنسيج الخلوي.',
        subtext: 'مثل علم الأمراض (الباثولوجي)، الأشعة، الطب المخبري الجزيئي.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, contact: -4, lifestyle: 3 }
      }
    ]
  },

  // 38. إدارة الألم التداخلي والمسكنات التخصصية (Interventional Pain & Neuromodulation)
  {
    id: 38,
    category: 'إدارة الألم التداخلي والمسكنات التخصصية',
    title: 'ما هو موقفك السريري من تخصصات إدارة الألم الحاد والمزمن (Pain Medicine) والتدخلات العصبية التسكينية؟',
    description: 'معيار الجمع بين الإجراءات التداخلية الدقيقة والبعد الإنساني لتسكين المعاناة المستعصية:',
    allowMultiple: true,
    options: [
      {
        text: 'يجذبني حقن المفاصل والأعصاب تحت الأشعة السينية، وتركيب مضخات المورفين ومحفزات الحبل الشوكي لإطفاء الألم.',
        subtext: 'مثل طب الألم التداخلي (Pain Medicine)، زمالة التخدير التداخلي، جراحة الأعصاب الوظيفية.',
        discWeights: { D: 3, C: 3 },
        birkmanWeights: { activity: 3, empathy: 3 },
        metricWeights: { manual: 4, income: 4, intellectual: 3 }
      },
      {
        text: 'أفضل علاج آلام الجهاز العضلي الهيكلي عبر التأهيل الحركي والتمارين الطبية وتصحيح الميكانيكا الحيوية.',
        subtext: 'مثل الطب الطبيعي والتأهيل (PM&R)، الطب الرياضي، روماتيزم المفاصل.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 4, structure: 2 },
        metricWeights: { contact: 4, lifestyle: 3, manual: 2 }
      },
      {
        text: 'أفضل أن أركز على استئصال سبب الألم جراحياً بشكل جذري بدلاً من تسكينه عبر مسكنات أو حُقن مهدئة.',
        subtext: 'مثل جراحة العظام والعمود الفقري، جراحة المخ والأعصاب، الجراحة العامة.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4, advantage: 2 },
        metricWeights: { manual: 5, stress: 3, income: 3 }
      },
      {
        text: 'أركز على التسكين التلطيفي الشامل لمرضى السرطان ونهاية الحياة دون إجراءات جراحية قاسية.',
        subtext: 'مثل الطب التلطيفي (Palliative Care)، أورام الحالات المتقدمة.',
        discWeights: { S: 5 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 5, lifestyle: 2, manual: -3 }
      },
      {
        text: 'لا أملك اهتماماً خاصاً بمجال علاج الألم التداخلي.',
        specialType: 'none'
      },
      {
        text: 'أهتم بكافة أوجه تسكين وتدبير الآلام المعقدة بوسائلها المتنوعة.',
        specialType: 'all'
      }
    ]
  },

  // 39. الطب التجديدي وزراعة الأعضاء والعلاجات الخلوية (Regenerative Medicine & Transplantation)
  {
    id: 39,
    category: 'الطب التجديدي وزراعة الأعضاء',
    title: 'إلى أي مدى يثير شغفك مجال زراعة الأعضاء الحيوية، وهندسة الأنسجة، والعلاجات الخلوية التجديدية؟',
    description: 'معيار الريادة في العمليات الجراحية والبيولوجية المتقدمة لإنقاذ الأعضاء المتوقفة (Transplantation & Stem Cells):',
    allowMultiple: false,
    options: [
      {
        text: 'شغف هائل؛ أريد خوض جراحات زراعة الكبد، الكلى، أو القلب، وإعادة التروية الدموية لعضو من متبرع متوفى دماغياً.',
        subtext: 'مثل جراحة زراعة الأعضاء (Transplant Surgery)، جراحة القلب والصدر، جراحة الأوعية الدموية الدقيقة.',
        discWeights: { D: 5, C: 2 },
        birkmanWeights: { activity: 5, advantage: 3 },
        metricWeights: { manual: 5, stress: 5, lifestyle: -4, income: 4 }
      },
      {
        text: 'يهمني الشق الباطني المناعي والخلوي؛ زراعة نخاع العظم، العلاج الجيني بالخلايا التائية (CAR-T)، ومثبطات المناعة الدقيقة.',
        subtext: 'مثل أمراض الدم وزراعة الخلايا الجذعية، أورام الدم، مناعة زراعة الأعضاء الباطنية، طب الكلى التخصصي.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, change: 2 },
        metricWeights: { intellectual: 5, research: 5, stress: 2 }
      },
      {
        text: 'أفضل التخصصات التقليدية المستقرة ذات الإجراءات الروتينية الخالية من التحديات الأخلاقية والجراحية المعقدة لزراعة الأعضاء.',
        subtext: 'مثل طب الأسرة، الجلدية، العيون، الأطفال العام، الأشعة التشخيصية.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { structure: 4, activity: -2 },
        metricWeights: { lifestyle: 4, stress: -3 }
      }
    ]
  },

  // 40. بيئة العمل المهنية وتوزيع المناوبات (AAMC Practice Setting & Shift Structure)
  {
    id: 40,
    category: 'بيئة الممارسة ونمط الشفتات',
    title: 'ما هو الهيكل التنظيمي للمناوبات والدوام الذي يتناغم مع طاقتك النفسية على المدى الطويل؟',
    description: 'معيار AAMC لتنظيم أوقات العمل: نظام النوبات المحددة المغلقة مقابل المسؤولية الممتدة للحالات:',
    allowMultiple: true,
    options: [
      {
        text: 'نظام مناوبات محددة البداية والنهاية (Shift Work)؛ أسلّم المرضى لزميلي وأغادر المستشفى بذهن صافٍ تماماً دون أي استدعاء.',
        subtext: 'مثل طب الطوارئ، التخدير، العناية المركزة (Intensivist Shifts)، الأشعة عن بُعد (Teleradiology).',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { change: 3, activity: 2 },
        metricWeights: { lifestyle: 3, stress: 2 }
      },
      {
        text: 'دوام عيادات منتظم من الصباح حتى المساء المبكر مع عطلات نهاية أسبوع ثابتة وخلو تام من نوبات الليل.',
        subtext: 'مثل الجلدية، العيون العيادية، طب الأسرة، الطب الوقائي، الباثولوجي، الطب المهني.',
        discWeights: { S: 3, C: 3 },
        birkmanWeights: { structure: 4, activity: -2 },
        metricWeights: { lifestyle: 5, stress: -3 }
      },
      {
        text: 'الارتباط الدائم بمرضاي وجراحاتي؛ لا أمانع الاستدعاء الطارئ ليلاً أو متابعة مريضي الخاص في العناية لأن ذلك واجبي المهني.',
        subtext: 'مثل جراحة القلب، جراحة المخ والأعصاب، التوليد، جراحة زراعة الأعضاء، أورام الأطفال.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4, advantage: 3 },
        metricWeights: { lifestyle: -4, stress: 3, income: 3 }
      },
      {
        text: 'دوام مرن يجمع بين التعليم الجامعي، والمختبر، والعيادة، والمؤتمرات الدولية.',
        subtext: 'مثل المراكز الطبية الجامعية والتخصصية الكبرى ومراكز الأبحاث.',
        discWeights: { C: 3, I: 2 },
        birkmanWeights: { change: 3, structure: 2 },
        metricWeights: { research: 4, intellectual: 4, lifestyle: 1 }
      },
      {
        text: 'لا أملك اشتراطات محددة بشأن المناوبات.',
        specialType: 'none'
      },
      {
        text: 'قادر على التكيف مع كافة أنظمة الدوام والورديات بحسب ما تقتضيه المصلحة.',
        specialType: 'all'
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════════════════════════════
  // حزمة الأسئلة السلوكية التخصصية المعمقة وفق معايير AAMC و PVIPS (الأسئلة 41 – 50)
  // التركيز المحوري: الاستقلالية، التدريس ونقل المعرفة، التوازن بين الحياة والعمل
  // ══════════════════════════════════════════════════════════════════════════════════════

  // 41. العمل الجماعي والتعاون متعدد التخصصات (PVIPS Interprofessional Teamwork & MDT)
  {
    id: 41,
    category: 'العمل الجماعي والتعاون متعدد التخصصات',
    title: 'ما هو موقعك المفضل في معادلة العمل الجماعي والتكاملي (Teamwork) مع الكوادر واللجان الطبية المشتركة؟',
    description: 'معيار CanMEDS و PVIPS للعمل الجماعي متعدد التخصصات ولجان الأورام والرعاية المتكاملة (Tumor Boards & MDTs):',
    allowMultiple: true,
    options: [
      {
        text: 'أفضل العمل ضمن لجان طبية مشتركة (Multidisciplinary Team) تضم جراحين، أطباء باطنة، أورام، أشعة، وتمريض لصياغة خطة علاج تكاملية.',
        subtext: 'مثل طب الأورام، جراحة الأورام، زراعة الأعضاء، طب الأعصاب، أمراض الروماتيزم، والرعاية التلطيفية.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 4, structure: 3 },
        metricWeights: { contact: 4, intellectual: 3, lifestyle: 2 }
      },
      {
        text: 'أفضل العمل الجماعي التفاعلي اللحظي عالي الوتيرة كفريق تدخل سريع أو طاقم غرفة عمليات متجانس متفاهم بالإشارة.',
        subtext: 'مثل جراحة الحوادث، طوارئ الحالات الحرجة، فريق التخدير والعمليات، قسطرة القلب الطارئة.',
        discWeights: { D: 4, I: 2 },
        birkmanWeights: { activity: 4, change: 2 },
        metricWeights: { stress: 3, manual: 3, lifestyle: -2 }
      },
      {
        text: 'أفضل الممارسة الفردية المستقلة في عيادتي الخاصة مع فريقي المساعد فقط، حيث أتخذ القرارات دون لجان مطولة.',
        subtext: 'مثل الجلدية والتجميل، طب العيون، الطب النفسي العيادي، طب الأسرة المستقل.',
        discWeights: { D: 3 },
        birkmanWeights: { advantage: 4, structure: 2 },
        metricWeights: { income: 4, lifestyle: 4, stress: -2 }
      },
      {
        text: 'أفضل موقع الخبير التشخيصي المرجعي المحايد الذي يستند إليه الفريق بكامله لبناء قراراته الطبية المصيرية.',
        subtext: 'مثل علم الأمراض (الباثولوجي)، الأشعة التخصصية، الوراثة الطبية، الأحياء الدقيقة.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, research: 3, lifestyle: 3, contact: -3 }
      },
      {
        text: 'لا أضع طبيعة الفريق معياراً فاصلاً لاختياري.',
        specialType: 'none'
      },
      {
        text: 'أستمتع بكافة أنماط العمل الفردي والجماعي المتكامل بحسب حاجة المريض.',
        specialType: 'all'
      }
    ]
  },

  // 42. استدامة الطاقة وتجنب الإنهاك الوظيفي (Physician Burnout & Sustainable Practice)
  {
    id: 42,
    category: 'استدامة الطاقة وتجنب الإنهاك الوظيفي',
    title: 'ما هي استراتيجيتك الواقعية لتجنب الاحتراق الوظيفي (Burnout) وضمان استدامة شغفك الإكلينيكي لعقود؟',
    description: 'معيار استدامة الطاقة والتحكم في عبء الممارسة السريرية (Controllable Lifestyle & Wellness):',
    allowMultiple: false,
    options: [
      {
        text: 'اختيار تخصص منضبط بساعات محددة وخالٍ من نوبات الطوارئ الليلية؛ حماية نومي وعائلتي هي صمام أمان استمراري.',
        subtext: 'تخصصات نمط الحياة القابل للتحكم: الجلدية، طب العيون، الأشعة التشخيصية، الطب المهني، علم الأمراض، طب الأسرة.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { structure: 4, activity: -2, advantage: -1 },
        metricWeights: { lifestyle: 5, stress: -4 }
      },
      {
        text: 'الإنهاك يتبدد عندي بمشاعر الإنجاز البطولي؛ إنقاذ الحالات المحتضرة يعيد شحن طاقتي النفسية حتى لو نمت 4 ساعات فقط.',
        subtext: 'تخصصات الإنجاز الحاد والضغط العالي: جراحة القلب، جراحة المخ والأعصاب، النساء والتوليد، جراحة الحوادث، العناية المركزة.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 4, advantage: 3, change: 2 },
        metricWeights: { lifestyle: -5, stress: 5, manual: 3, income: 3 }
      },
      {
        text: 'الاعتماد على نظام النوبات التكتلية (Block Shifts)؛ العمل بتركيز مكثف لأيام متبوعة بإجازات متصلة تفصلني تماماً عن بيئة العمل.',
        subtext: 'تخصصات بنظام الورديات المجمعة: طب الطوارئ، التخدير، طبيب المستشفى المقيم (Hospitalist)، العناية المركزة.',
        discWeights: { D: 2, I: 2 },
        birkmanWeights: { change: 4, activity: 2 },
        metricWeights: { lifestyle: 2, stress: 3 }
      }
    ]
  },

  // 43. الاستقلالية المهنية وحرية ممارسة الطب الخاص (PVIPS Professional Autonomy & Entrepreneurship)
  {
    id: 43,
    category: 'ريادة الأعمال والاستقلالية الإكلينيكية',
    title: 'ما هي رؤيتك المهنية حيال تأسيس عيادتك الخاصة واستقلالك المالي والإداري؟',
    description: 'معيار ريادة الأعمال والاستقلالية المهنية (Autonomy & Private Practice Viability):',
    allowMultiple: true,
    options: [
      {
        text: 'طموحي الأول هو الاستقلال في عيادتي أو مركزي الطبي الخاص؛ أتحكم في مواعيدي، أختار فريقي، وأبني علامتي المهنية المستقلة.',
        subtext: 'مثل الجلدية والتجميل، طب العيون وتصحيح البصر، الطب النفسي، عيادات الألم، جراحة اليوم الواحد.',
        discWeights: { D: 3, I: 3 },
        birkmanWeights: { advantage: 5, structure: 2 },
        metricWeights: { income: 5, lifestyle: 3, stress: -1 }
      },
      {
        text: 'أفضل أمان واستقرار المنظومات الصحية والمستشفيات الحكومية الكبرى؛ لا أريد صداع إدارة الأعمال والتسويق وتكاليف التأمين.',
        subtext: 'مثل التخصصات التي تعتمد على البنية التحتية الكبرى: جراحة القلب، زراعة الأعضاء، الأورام، حديثي الولادة، الأشعة.',
        discWeights: { S: 3, C: 3 },
        birkmanWeights: { structure: 4, advantage: -2 },
        metricWeights: { lifestyle: 2, intellectual: 3, income: 1 }
      },
      {
        text: 'أطمح للجمع بين ممارسة في مستشفى مرجعي وتقديم استشارات في مراكز القطاع الخاص المرموقة (Dual Practice).',
        subtext: 'مثل استشاريي الباطنة التخصصية، الغدد الصماء، أمراض الجهاز الهضمي والمناظير، وجراحة العظام.',
        discWeights: { D: 2, C: 2 },
        birkmanWeights: { advantage: 3, activity: 2 },
        metricWeights: { income: 4, intellectual: 2, lifestyle: 1 }
      },
      {
        text: 'استقلاليتي تنبع من كوني حكماً محايداً يقدم تقارير تشخيصية أو شرعية لا سلطان لأحد على رأيي الفني فيها.',
        subtext: 'مثل الطب الشرعي، الأشعة التشخيصية، الباثولوجي، واللجان الطبية التأهيلية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, contact: -4, lifestyle: 3 }
      },
      {
        text: 'لا أضع الاستقلالية أو القطاع الخاص في دائرة اهتمامي الحالية.',
        specialType: 'none'
      },
      {
        text: 'منفتح على جميع خيارات الممارسة المؤسسية والخاصة.',
        specialType: 'all'
      }
    ]
  },

  // 44. البحث العلمي والتجارب السريرية وتوليد المعرفة (AAMC Scholarship & Evidence Discovery)
  {
    id: 44,
    category: 'البحث العلمي وتوليد المعرفة',
    title: 'إلى أي مدى يمثل نشر الأبحاث والتجارب السريرية الدولية محفزاً شخصياً لك؟',
    description: 'معيار الكفاءة والتميز الأكاديمي وفق CanMEDS (Scholar Role) و AAMC:',
    allowMultiple: false,
    options: [
      {
        text: 'البحث العلمي شغفي الحقيقي؛ أريد قيادة تجارب سريرية، كتابة مقالات في المجلات العالمية (NEJM/Lancet)، وتطوير بروتوكولات جديدة.',
        subtext: 'مثل طب الأورام السريرية، أمراض الدم والأورام، الوراثة الطبية، جراحة الأعصاب الأكاديمية، أمراض المناعة.',
        discWeights: { C: 4, I: 1 },
        birkmanWeights: { structure: 3, change: 3 },
        metricWeights: { research: 5, intellectual: 4, lifestyle: 1 }
      },
      {
        text: 'أفضل أن أكون ممارساً بارعاً يعتمد على أحدث الأدلة (Evidence-Based Practitioner) دون الانخراط الشخصي في كتابة ونشر الأبحاث.',
        subtext: 'مثل طب الأسرة الميداني، الجراحة العامة في مستشفيات المناطق، الطوارئ، التخدير الإكلينيكي.',
        discWeights: { S: 3, D: 2 },
        birkmanWeights: { activity: 3, structure: 2 },
        metricWeights: { research: -3, manual: 2, contact: 2 }
      },
      {
        text: 'أهتم بالبحوث الميدانية التطبيقية لتحسين جودة الرعاية، ومكافحة العدوى، وسرعة دوران الأسرة في المستشفيات (Quality Improvement).',
        subtext: 'مثل الطب الوقائي، إدارة الجودة وسلامة المرضى، طب المستشفيات، والصحة السكانية.',
        discWeights: { C: 3, S: 2 },
        birkmanWeights: { structure: 4, empathy: 2 },
        metricWeights: { lifestyle: 3, research: 2, contact: 1 }
      }
    ]
  },

  // 45. الاستجابة للإنعاش القلبي الحاد وإدارة الأزمات الصادمة (Acute Resuscitation & Code Blue Dynamics)
  {
    id: 45,
    category: 'الاستجابة للإنعاش القلبي وإدارة الأزمات',
    title: 'عندما يطلق جهاز الإنذار في المستشفى (Code Blue) ويتوقف قلب المريض أمامك فجأة، كيف يعمل عقلك؟',
    description: 'معيار الصلابة الذهنية والهدوء العصبي أثناء إجراءات الإنعاش المتقدمة للحياة (ACLS):',
    allowMultiple: false,
    options: [
      {
        text: 'يتدفق الأدرينالين ويصبح تركيزي حاداً كالشفرة؛ أبدأ الضغطات، الصدمات الكهربائية، تأمين مجرى الهواء، وإدارة الفريق بثقة تامة.',
        subtext: 'مثل أطباء العناية المركزة، التخدير، طوارئ الحوادث والإصابات، أمراض القلب التداخلية.',
        discWeights: { D: 4, C: 1 },
        birkmanWeights: { activity: 4, change: 3 },
        metricWeights: { stress: 5, manual: 3, lifestyle: -2 }
      },
      {
        text: 'أشعر بضغط عصبي هائل في مثل هذه المواقف؛ أفضل التخصصات الوقائية والعلاجية الهادئة التي تخلو تماماً من إنذارات توقف القلب المفاجئ.',
        subtext: 'تخصصات آمنة من أزمات الإنعاش: الجلدية، العيون، علم الأمراض، الطب المهني، الحساسية، الطب الطبيعي والتأهيل.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { structure: 4, empathy: 3 },
        metricWeights: { stress: -5, lifestyle: 4 }
      },
      {
        text: 'أتعامل مع الحالات الحرجة برصانة بروتوكولية محسوبة، مع إعطاء الأولوية لاحترام رغبات المريض المسبقة ومنع المعاناة غير المجدية (DNR).',
        subtext: 'مثل الطب التلطيفي، طب كبار السن، الباطنة العامة وأمراض الكلى.',
        discWeights: { S: 4, C: 3 },
        birkmanWeights: { empathy: 5, structure: 3 },
        metricWeights: { contact: 4, stress: 1, lifestyle: 2 }
      }
    ]
  },

  // 46. الجراحة الروبوتية والملاحة ثلاثية الأبعاد (Robotic Surgery & Advanced Navigation)
  {
    id: 46,
    category: 'الجراحة الروبوتية والملاحة ثلاثية الأبعاد',
    title: 'ما مدى رغبتك في أن تكون الجراحة الروبوتية عن بُعد (Da Vinci) والملاحة ثلاثية الأبعاد أداتك التشغيلية الأساسية؟',
    description: 'معيار استخدام الروبوتات الجراحية المتقدمة والملاحة بالأشعة المقطعية أثناء العمليات:',
    allowMultiple: true,
    options: [
      {
        text: 'شغف مطلق؛ أريد الجلوس على منصة الروبوت، وتكبير الأنسجة 10 أضعاف، وتحريك الأذرع الآلية بدقة كسر المليمتر لاستئصال الأورام.',
        subtext: 'مثل جراحة المسالك البولية الروبوتية، جراحة القولون والمستقيم الروبوتية، جراحة الصدر وأورام الرئة، وجراحة النساء المتقدمة.',
        discWeights: { D: 3, C: 4 },
        birkmanWeights: { change: 3, activity: 3 },
        metricWeights: { manual: 4, intellectual: 4, income: 4 }
      },
      {
        text: 'أفضل الإحساس اللمسي المباشر بيدي وأصابعي (Tactile Feedback)؛ أحتاج لمس الأنسجة والشرايين بيدي العاريتين دون وسيط آلي.',
        subtext: 'مثل الجراحة العامة المفتوحة، جراحة القلب المفتوح، جراحة العظام الكلاسيكية، جراحة الحوادث والحروب.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4 },
        metricWeights: { manual: 5, stress: 3 }
      },
      {
        text: 'أفضل الذكاء الاصطناعي البرمجي والشاشات التشخيصية لتحليل الصور والبيانات بدلاً من الروبوتات الجراحية المادية.',
        subtext: 'مثل الأشعة الرقمية والذكاء الاصطناعي، الباثولوجي الرقمي، المعلوماتية الطبية.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, change: 2 },
        metricWeights: { intellectual: 4, research: 4, lifestyle: 3, contact: -3 }
      },
      {
        text: 'أفضل أن تبقى مهنتي معتمدة على الفحص السريري الحسي المباشر مع المريض دون أجهزة روبوتية معقدة تفصلني عنه.',
        subtext: 'مثل الطب النفسي، طب الأسرة، الباطنة العامة، طب الأطفال.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 5, manual: -3, lifestyle: 2 }
      },
      {
        text: 'لا أضع الروبوتات معياراً مفصلياً في اختياري.',
        specialType: 'none'
      },
      {
        text: 'أرحب بالجمع بين الجراحة الروبوتية المتقدمة والمهارة اليدوية الكلاسيكية.',
        specialType: 'all'
      }
    ]
  },

  // 47. القيادة السريرية الميدانية في غرف العمليات والعنايات (Clinical Crisis Leadership & Command)
  {
    id: 47,
    category: 'القيادة السريرية وإدارة الأزمات',
    title: 'في اللحظات الطبية الحرجة، ما هو نمطك المفضل في توجيه الكادر الصحي وقيادة الموقف؟',
    description: 'معيار CanMEDS للقيادة السريرية (Clinical Leader Role) ومقياس PVIPS لتوجيه الموارد الطبية:',
    allowMultiple: false,
    options: [
      {
        text: 'قائد الأوركسترا الحازم (Clear Incident Commander)؛ أصدر أوامر محددة ومباشرة للتمريض والفنيين والأطباء لإدارة الخطر دون تردد.',
        subtext: 'مثل الجراحين الرئيسيين، أطباء العناية المركزة، قادة فرق الإنعاش في الطوارئ، والتوليد.',
        discWeights: { D: 5 },
        birkmanWeights: { advantage: 4, activity: 3 },
        metricWeights: { stress: 3, manual: 3, income: 2 }
      },
      {
        text: 'المحاور التشاركي التداولي؛ أستمع لآراء الفريق من مختلف التخصصات والتمريض والعلاج الطبيعي للوصول لقرار جماعي متزن.',
        subtext: 'مثل طب التأهيل، الطب النفسي، الرعاية التلطيفية، طب كبار السن، طب الأسرة، وعلاج الأورام.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 4, structure: 2 },
        metricWeights: { contact: 4, lifestyle: 2 }
      },
      {
        text: 'المستشار العلمي الصامت والموثوق؛ يُرسل لي الطبيب الحالة أو العينة لأقدم تقريري الحاسم دون التدخل في قيادة وتوجيه الفرق.',
        subtext: 'مثل اختصاصيي الأشعة، الباثولوجي، الطب الشرعي، والاستشارات الدوائية والوراثية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, contact: -4, lifestyle: 3 }
      }
    ]
  },

  // 48. التفضيل بين العمل الوقائي الاستباقي والتدخل العلاجي التفاعلي (PVIPS Prevention vs. Intervention)
  {
    id: 48,
    category: 'الوقاية الاستباقية مقابل العلاج التفاعلي',
    title: 'أين تكمن المتعة الحقيقية في ممارستك الطبية؟',
    description: 'معيار المفاضلة بين استباق حدوث المرض والتدخل الجراحي/الدوائي بعد وقوعه:',
    allowMultiple: true,
    options: [
      {
        text: 'في الوقاية الاستباقية؛ منع حدوث الجلطات، واكتشاف الأورام في مراحلها الصفرية، وتعديل نمط الحياة والتغذية.',
        subtext: 'مثل طب الأسرة، الطب الوقائي، الصحة العامة، طب مكافحة السمنة، الفحص الدوري الشامل.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { empathy: 3, structure: 3 },
        metricWeights: { lifestyle: 4, contact: 3, research: 2 }
      },
      {
        text: 'في التدخل التفاعلي الحاسم؛ التعامل مع الكارثة عند وقوعها (انسداد شريان، انفجار زائدة، كسر مركب) وتصحيحها فوراً.',
        subtext: 'مثل الجراحة العامة، العظام، القسطرة التداخلية، جراحة الأوعية، طب الطوارئ.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4, advantage: 2 },
        metricWeights: { manual: 4, stress: 3, lifestyle: -2 }
      },
      {
        text: 'في الترميم وإعادة التأهيل وبناء الوظيفة المفقودة خطوة بخطوة بعد الإصابات أو الحروق أو السكتات الدماغية.',
        subtext: 'مثل جراحة التجميل والترميم، الطب الطبيعي وإعادة التأهيل، جراحة اليد، تأهيل النطق والبلع.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { empathy: 3, activity: 2 },
        metricWeights: { manual: 3, contact: 3, lifestyle: 2 }
      },
      {
        text: 'في المراقبة الوبائية وحماية الفئات العمالية والصناعية ومجابهة المخاطر الكيميائية والبيئية.',
        subtext: 'مثل الطب المهني، علم السموم، الطب البيئي، وصحة البيئة.',
        discWeights: { C: 3, S: 2 },
        birkmanWeights: { structure: 4 },
        metricWeights: { lifestyle: 4, research: 3, contact: -1 }
      },
      {
        text: 'لا أملك تحيزاً مسبقاً بين الوقاية والتدخل.',
        specialType: 'none'
      },
      {
        text: 'أستمتع بممارسة تجمع بين الوقاية الأولية والتدخل العلاجي التخصصي.',
        specialType: 'all'
      }
    ]
  },

  // 49. العلاقة مع السفر والمؤتمرات والتمثيل الدولي (AAMC Prestige & Global Medical Outreach)
  {
    id: 49,
    category: 'المكانة الدولية والتمثيل المهني الخارجي',
    title: 'إلى أي مدى يمثل الحضور في المؤتمرات الطبية الدولية والمكانة المهنية العالمية أولوية لك؟',
    description: 'معيار المكانة والسمعة الأكاديمية العالمية (Prestige & Global Recognition) وفق مقياس PVIPS:',
    allowMultiple: false,
    options: [
      {
        text: 'أولوية عظمى؛ أطمح لأكون متحدثاً رئيسياً في المؤتمرات العالمية، عضواً في الجمعيات الدولية، وأن أمثل بلادي في المحافل الطبية.',
        subtext: 'مثل قادة جراحة القلب، زراعة الأعضاء، الأورام، جراحة التجميل، والوراثة الطبية.',
        discWeights: { I: 4, D: 3 },
        birkmanWeights: { advantage: 4, change: 3 },
        metricWeights: { income: 4, research: 4, intellectual: 3 }
      },
      {
        text: 'أفضل التأثير الميداني الصامت؛ يكفيني رضا مرضاي ودعاؤهم في مستشفاي أو مركزي المحلي، ولا أهتم بأضواء المؤتمرات.',
        subtext: 'مثل أطباء الرعاية الأولية، العنايات المركزة، الطب التلطيفي، وأطباء المستشفيات العامة.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { empathy: 4, advantage: -3 },
        metricWeights: { contact: 4, lifestyle: 3, income: 1 }
      },
      {
        text: 'يهمني التميز التقني والعلمي الدقيق الذي يحترمه المتخصصون في الدوائر الضيقة دون حاجة لظهور إعلامي جماهيري.',
        subtext: 'مثل علماء الباثولوجي، اختصاصيي الأشعة العصبية، والفيزيائيين الطبيين.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, research: 3, lifestyle: 3 }
      }
    ]
  },

  // 50. فلسفة الممارسة الطبية: الإتقان التقني الميكانيكي مقابل الحكمة السريرية الشاملة (Technical Craftsmanship vs. Holistic Clinical Wisdom)
  {
    id: 50,
    category: 'فلسفة الممارسة والبوصلة المهنية',
    title: 'إذا خُيّرت بين أن تكون بارعاً في أدق تفصيلة ميكانيكية إجرائية، أو حكيماً يرى الصورة الكلية الشاملة للإنسان، ماذا تختار؟',
    description: 'المعيار الفلسفي الختامي للموازنة بين الإتقان الميكانيكي التقني والحكمة السريرية الوجدانية (PVIPS Master Dimension):',
    allowMultiple: true,
    options: [
      {
        text: 'الإتقان الميكانيكي والتقني الفائق؛ أريد أن أكون صانعاً ماهراً يغير التشريح بيديه بدقة الميكرون، تاركاً الصورة الباطنية لغيري.',
        subtext: 'يوافق: الجراحة العامة، جراحة القلب، المخ والأعصاب، جراحة العظام، التجميل المجهري، العيون.',
        discWeights: { D: 4, C: 2 },
        birkmanWeights: { activity: 4, advantage: 3 },
        metricWeights: { manual: 5, stress: 3, income: 3 }
      },
      {
        text: 'الحكمة السريرية الشاملة؛ أنظر للمريض كإنسان متكامل بظروفه النفسية والاجتماعية وفسيولوجيا جسده كاملاً دون تقطيع أعضاء.',
        subtext: 'يوافق: الباطنة العامة، طب الأسرة، الطب النفسي، طب الأطفال، الرعاية التلطيفية، طب كبار السن.',
        discWeights: { S: 5, I: 2 },
        birkmanWeights: { empathy: 5, structure: 3 },
        metricWeights: { intellectual: 5, contact: 5, lifestyle: 2 }
      },
      {
        text: 'الحكمة الاستقصائية والبحثية؛ فهم أسباب المرض على مستوى الجزيئات والجينات والبيانات الكبرى لتطوير العلم.',
        subtext: 'يوافق: علم الأمراض (الباثولوجي)، الوراثة الطبية، الطب الوقائي والوبائي، علم الأورام الجزيئي.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, change: 2 },
        metricWeights: { intellectual: 5, research: 5, contact: -3 }
      },
      {
        text: 'الممارسة الحكيمة المتوازنة التي تمنحني الاكتفاء المهني وتحفظ حياتي وسعادتي الأسرية.',
        subtext: 'يوافق: الجلدية، طب العيون العيادي، الطب المهني، الأشعة التشخيصية، طب الأسرة.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { structure: 3, activity: -2 },
        metricWeights: { lifestyle: 5, stress: -4, income: 2 }
      },
      {
        text: 'كل هذه المعاني تمثل غايات متكاملة في رحلتي المهنية والإنسانية.',
        specialType: 'all'
      }
    ]
  },

  // 51. التعامل مع الغموض السريري والمناطق الرمادية (AAMC Tolerance of Ambiguity / Budner Scale)
  {
    id: 51,
    category: 'الغموض السريري والمناطق الرمادية',
    title: 'الطب مليء بالحالات غير الواضحة؛ كيف تتفاعل عندما تجد نفسك في منطقة رمادية دون تشخيص قطعي فوري؟',
    description: 'معيار تقبل الغموض السريري وحسم القرارات تحت وطأة الاحتمالات غير المؤكدة (AAMC Tolerance of Ambiguity):',
    allowMultiple: false,
    options: [
      {
        text: 'أزدهر في المناطق الرمادية؛ أستمتع بمتابعة المريض استقرائياً وتجربة خطط علاجية ومراقبة الاستجابة مع مرور الوقت.',
        subtext: 'مثل: الباطنة العامة، الروماتيزم، الطب النفسي، طب الأعصاب، الحساسية والمناعة.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { empathy: 4, structure: 2 },
        metricWeights: { intellectual: 5, contact: 4, lifestyle: 1 }
      },
      {
        text: 'لا أتحمل الغموض؛ أريد دليلاً مخبرياً أو نسيجياً أو إشعاعياً حاسماً وقطعياً يفصل في الحالة بالأبيض والأسود.',
        subtext: 'مثل: علم الأمراض (الباثولوجي)، الطب المخبري، الأشعة التشخيصية، الطب النووي.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 5 },
        metricWeights: { intellectual: 4, contact: -3, lifestyle: 3 }
      },
      {
        text: 'أتعامل مع الغموض بالتدخل الجراحي الاستكشافي المباشر للرؤية بالعين المجردة وحسم المشكلة على طاولة العمليات.',
        subtext: 'مثل: الجراحة العامة، جراحة الطوارئ، جراحة الأوعية، المناظير الجراحية التداخلية.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 4 },
        metricWeights: { manual: 4, stress: 3, lifestyle: -2 }
      },
      {
        text: 'أطلب خوارزمية بروتوكولية استشارية سريعة لتوجيه الحالة إلى التخصص الأنسب دون إضاعة وقت المريض.',
        subtext: 'مثل: طب الأسرة، طب الطوارئ، الرعاية الأولية الشاملة.',
        discWeights: { S: 3, I: 2 },
        birkmanWeights: { structure: 4 },
        metricWeights: { lifestyle: 3, contact: 3 }
      }
    ]
  },

  // 52. التعامل مع الحالات الميؤوس منها والطب التلطيفي (AAMC End-of-Life Care & Palliative Competencies)
  {
    id: 52,
    category: 'التعامل مع نهاية الحياة والرعاية التلطيفية',
    title: 'عندما يبلغ المريض مرحلة متقدمة من مرض عضال لا أمل في شفائه، ما هو التوجه الأقرب لضميرك المهني؟',
    description: 'معيار AAMC لمواجهة الحالات الحرجة وأخلاقيات اتخاذ قرارات عدم الإنعاش (DNR) والاحتواء الإنساني الوجداني:',
    allowMultiple: false,
    options: [
      {
        text: 'أعتبر مرافقة المريض وتخفيف آلامه ودعم عائلته نفسياً في أيامه الأخيرة أعظم رسالة طبية سامية وذات أثر وجداني عميق.',
        subtext: 'مثل: الرعاية التلطيفية، طب الأورام، طب كبار السن، الباطنة العامة، طب الأسرة.',
        discWeights: { S: 5, I: 2 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 5, intellectual: 2, lifestyle: 2 }
      },
      {
        text: 'أرفض الاستسلام للموت؛ أقاتل حتى النفس الأخير بأجهزة الإنعاش والدعم الحيوي المتقدم وأدوية الصدمة لإنقاذ كل ثانية حياة ممكنة.',
        subtext: 'مثل: العناية المركزة، طب الطوارئ، جراحة الحوادث، تخدير الحالات الحرجة، جراحة القلب.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 4 },
        metricWeights: { stress: 5, manual: 3, lifestyle: -3 }
      },
      {
        text: 'أفضّل تخصصات لا يدخل في صميم ممارستها اليومية التعرض للموت أو الحالات الطرفية القاتلة.',
        subtext: 'مثل: طب الجلدية، جراحة التجميل، طب العيون، الطب الطبيعي والتأهيل، الجلدية التناسلية.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { structure: 3 },
        metricWeights: { lifestyle: 5, stress: -4, income: 2 }
      },
      {
        text: 'أنظر للأمر من زاوية علمية بحثية لتطوير علاجات جينية ومناعية مستقبلية تقضي على هذه الأمراض المستعصية.',
        subtext: 'مثل: علم الأورام الجزيئي، الوراثة الطبية، علم الأمراض، المناعة السريرية.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 3 },
        metricWeights: { research: 5, intellectual: 4, lifestyle: 2 }
      }
    ]
  },

  // 53. الابتكار التقني وتطوير الأجهزة الطبية وريادة الأعمال (PVIPS MedTech Innovation & Device Development)
  {
    id: 53,
    category: 'الابتكار التقني والأجهزة الطبية',
    title: 'هل يجذبك ابتكار وتطوير أجهزة ومستلزمات طبية حاصلة على براءات اختراع أو تأسيس شركات تقنية صحية؟',
    description: 'مقياس PVIPS لريادة الأعمال والابتكار في الهندسة الطبية الحيوية والتقنيات التداخلية المتطورة:',
    allowMultiple: true,
    options: [
      {
        text: 'نعم بشدة؛ أطمح لتطوير مفاصل صناعية، قساطر تداخلية ذكية، صمامات قلبية، أو أدوات جراحية ميكانيكية مبتكرة.',
        subtext: 'مثل: جراحة العظام، جراحة القلب، الأشعة والقسطرة التداخلية، جراحة المسالك، المخ والأعصاب.',
        discWeights: { D: 4, I: 2 },
        birkmanWeights: { activity: 4, advantage: 4 },
        metricWeights: { manual: 4, income: 4, research: 3 }
      },
      {
        text: 'نعم؛ في مجال البرمجيات الطبية والذكاء الاصطناعي وخوارزميات تحليل الصور الجينومية والشعاعية.',
        subtext: 'مثل: الأشعة، علم الأمراض الرقمي، المعلوماتية الصحية والطبية، التحليل الإحصائي السريري.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4 },
        metricWeights: { research: 5, intellectual: 4, lifestyle: 3, contact: -3 }
      },
      {
        text: 'أفضّل الممارسة السريرية الإنسانية الكلاسيكية، ولا يستهويني الانخراط في تصميم الأجهزة أو الاستثمارات التقنية.',
        subtext: 'مثل: طب الأسرة، الطب النفسي، طب الأطفال العام، الباطنة العامة، الطب التلطيفي.',
        discWeights: { S: 4 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 4, lifestyle: 2, manual: -2 }
      },
      {
        text: 'لا أضع الابتكار الصناعي التقني معياراً مفصلياً في اختياري المهني.',
        specialType: 'none'
      },
      {
        text: 'أرحب بالجمع بين الابتكار التقني الهندسي والممارسة السريرية الميدانية.',
        specialType: 'all'
      }
    ]
  },

  // 54. إدارة النزاعات الطبية الحادة والتفاوض الإكلينيكي (AAMC Conflict Negotiation & High-Stakes Communication)
  {
    id: 54,
    category: 'التفاوض وإدارة الشخصيات الصعبة',
    title: 'عند التعامل مع مريض شديد الغضب، أو عائلة متوترة تهدد بمقاضاة المستشفى، كيف تدير الموقف؟',
    description: 'كفاءات CanMEDS للتواصل والذكاء العاطفي والتفاوض الحرج (Communicator & Professional Role):',
    allowMultiple: false,
    options: [
      {
        text: 'أمتلك براعة في الاستماع النشط، وامتصاص الغضب، وتحليل الدوافع النفسية الكامنة، وتحويل النزاع إلى تحالف علاجي وثيق.',
        subtext: 'مثل: الطب النفسي، الرعاية التلطيفية، طب الأسرة، طب الأطفال، الباطنة العامة.',
        discWeights: { I: 4, S: 3 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 5, lifestyle: 2 }
      },
      {
        text: 'أضع حدوداً مهنية صارمة وواضحة جداً، مستنداً على البروتوكولات القانونية ونماذج الإقرار الطبي المستنير بدقة بالغة.',
        subtext: 'مثل: الجراحة العامة، التوليد والنساء، جراحة التجميل، الطب الشرعي، جراحة الإصابات.',
        discWeights: { D: 4, C: 2 },
        birkmanWeights: { structure: 4, advantage: 3 },
        metricWeights: { stress: 3, income: 2 }
      },
      {
        text: 'أفضل البيئات الطبية التي تندر فيها هذه الاحتكاكات المباشرة الحادة وتعتمد على التقارير الفنية الموثقة.',
        subtext: 'مثل: الأشعة التشخيصية، الباثولوجي، الطب النووي، التخدير، بنوك الدم.',
        discWeights: { C: 5 },
        birkmanWeights: { structure: 4, empathy: -2 },
        metricWeights: { intellectual: 4, contact: -4, lifestyle: 4 }
      }
    ]
  },

  // 55. عمق التخصص الدقيق مقابل الشمولية الإكلينيكية (AAMC Subspecialization vs. Broad Clinical Scope)
  {
    id: 55,
    category: 'نطاق الممارسة: التخصص الدقيق مقابل الشمولية',
    title: 'ما هو المسار المعرفي الذي ترى نفسك فيه بعد 10 سنوات من التخرج؟',
    description: 'معيار AAMC لتحديد مسار الممارسة: هل تفضل أن تكون المرجع الحصري في نطاق تشريحي ميكروي أم طبيباً شمولياً موسوعياً؟',
    allowMultiple: false,
    options: [
      {
        text: 'التخصص الدقيق جداً (Super-Subspecialist)؛ أكون المرجع الحصري في إقليم كامل لحالة أو إجراء نادر.',
        subtext: 'مثل: جراحة قاعدة الجمجمة، زراعة القرنية، أمراض كهربية القلب (EP)، جراحة اليد المجهرية.',
        discWeights: { C: 4, D: 3 },
        birkmanWeights: { advantage: 4, structure: 3 },
        metricWeights: { intellectual: 5, income: 4, manual: 3 }
      },
      {
        text: 'الطبيب الشامل المتمكن (Broad Master Generalist)؛ أتقن علاج مختلف الأمراض المزمنة والحادة عبر كافة الأجهزة الحيوية.',
        subtext: 'مثل: طب الأسرة، الباطنة العامة، طب الأطفال العام، طب الشيخوخة.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 5, lifestyle: 3, intellectual: 3 }
      },
      {
        text: 'الممارس التدخلي الشامل للطوارئ؛ أعالج أي مصاب يدخل الباب مهما كان نوع إصابته أو مرضه الحرج في الساعات الأولى.',
        subtext: 'مثل: طب الطوارئ، العناية المركزة، جراحة الإصابات والحوادث، الإنعاش الميداني.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 4, change: 4 },
        metricWeights: { stress: 4, manual: 3, lifestyle: -2 }
      }
    ]
  },

  // 56. سرعة دورة التشخيص والعلاج والإغلاق الذهني (AAMC Cognitive Closure & Case Turnover)
  {
    id: 56,
    category: 'سرعة دورة العلاج والإغلاق الذهني',
    title: 'ما هو الإيقاع الزمني المفضل لديك من لحظة مقابلة المريض حتى إتمام علاجه؟',
    description: 'مقياس الحاجة للإغلاق الذهني الفوري (Need for Cognitive Closure) في النمط الطبي العملي:',
    allowMultiple: false,
    options: [
      {
        text: 'إغلاق فوري وسريع (دقائق إلى ساعات)؛ أرى الحالة، أتدخل، يستقر وضعها أو أحيلها، وأبدأ حالة جديدة بصفحة بيضاء.',
        subtext: 'مثل: طب الطوارئ، التخدير، الأشعة التداخلية، عيادات الإجراءات السريعة، الطب التسكيني الطارئ.',
        discWeights: { D: 4, C: 2 },
        birkmanWeights: { activity: 4 },
        metricWeights: { stress: 3, lifestyle: 2, contact: -1 }
      },
      {
        text: 'دورة علاجية جراحية محددة (أيام إلى أسابيع)؛ تشخيص، عملية جراحية، متابعة تعافي التئام الجرح، ثم إغلاق الملف بنجاح.',
        subtext: 'مثل: الجراحة العامة، العظام، جراحة المسالك، العيون، التجميل، الأنف والأذن والحنجرة.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 3 },
        metricWeights: { manual: 5, income: 3, stress: 2 }
      },
      {
        text: 'رعاية تراكمية ممتدة (سنوات وعقود)؛ أستمتع بمتابعة تقدم الحالة المزمنة وتعديل الخطة عبر مراحل عمر المريض وبناء ألفة طويلة.',
        subtext: 'مثل: الغدد الصماء والسكري، الروماتيزم، الكلى، طب الأسرة، الطب النفسي، طب الأعصاب.',
        discWeights: { S: 5, I: 2 },
        birkmanWeights: { empathy: 4 },
        metricWeights: { contact: 5, intellectual: 3, lifestyle: 3 }
      }
    ]
  },

  // 57. الحساسية الحسية والتعامل مع السوائل الحيوية والروائح (AAMC Sensory Tolerance & Biohazard Exposure)
  {
    id: 57,
    category: 'التأقلم الحسي وسوائل الجسم',
    title: 'المهنة الطبية تشتمل على سوائل الجسم والروائح؛ ما هو مستوى تحملك الحسي والميداني في العمل اليومي؟',
    description: 'معيار المواءمة الفسيولوجية والحسية مع مسارح الجراحة وسوائل الجسم والإفرازات العضوية:',
    allowMultiple: false,
    options: [
      {
        text: 'لدي مناعة حسية تامة وتحمل فائق؛ لا أتأثر بالنزيف الغزير، أو فتح الخراجات المتقيحة، أو التعامل مع الأمعاء والغرغرينا.',
        subtext: 'مثل: الجراحة العامة، جراحة القولون والمستقيم، جراحة الحوادث، طب الطوارئ، التوليد والجراحة النسائية.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4 },
        metricWeights: { manual: 5, stress: 3 }
      },
      {
        text: 'أتحمل الفحص السريري المعتاد وسحب الدم، لكنني أفضل تجنب العمليات التي تغرق في السوائل والروائح الكريهة الشديدة لساعات.',
        subtext: 'مثل: الباطنة العامة، طب الأطفال، القلب، الأعصاب، الروماتيزم، الغدد الصماء.',
        discWeights: { S: 3, C: 2 },
        birkmanWeights: { structure: 3 },
        metricWeights: { intellectual: 3, contact: 3, lifestyle: 2 }
      },
      {
        text: 'أفضل بيئة عمل نظيفة، معقمة، جافة ومحكمة تقنياً دون تلامس مباشر مع سوائل حيوية أو روائح منفرة.',
        subtext: 'مثل: طب الجلدية، العيون، الطب النفسي، الأشعة، علم الأمراض الرقمي، الطب الطبيعي والتأهيل.',
        discWeights: { C: 4, S: 2 },
        birkmanWeights: { structure: 4 },
        metricWeights: { lifestyle: 5, stress: -3, income: 2 }
      }
    ]
  },

  // 58. التوثيق السريري والملفات الطبية والبيروقراطية (PVIPS Clinical Documentation & Regulatory Burden)
  {
    id: 58,
    category: 'التوثيق الطبي والمتطلبات النظامية',
    title: 'كيف تنظر إلى كتابة التقارير الطبية المفصلة، وإدخال السجلات الإلكترونية (EHR)، والتعامل مع الموافقات التأمينية؟',
    description: 'مقياس PVIPS لتحمل الأعباء الإدارية والتنظيمية في بيئة العمل الطبي الحديث:',
    allowMultiple: false,
    options: [
      {
        text: 'أعتبر التوثيق الدقيق وكتابة الحيثيات الطبية المعمقة ركيزة لحماية المريض ودليلاً قانونياً وبحثياً أستمتع بصياغته بدقة وإتقان.',
        subtext: 'مثل: الطب المهني، الطب الشرعي، الطب النفسي، إدارة الجودة وسلامة المرضى، طب الشيخوخة.',
        discWeights: { C: 5, S: 2 },
        birkmanWeights: { structure: 5 },
        metricWeights: { intellectual: 4, lifestyle: 3, research: 3 }
      },
      {
        text: 'أفضّل تخصصات يكون التوثيق فيها مختصراً أو نمطياً، حيث أقضي 85% من وقتي في العمل العملي أو الجراحي لا خلف الحاسوب.',
        subtext: 'مثل: التخدير، الجراحة العامة، جراحة العظام، طب الطوارئ، جراحة التجميل.',
        discWeights: { D: 4 },
        birkmanWeights: { activity: 4 },
        metricWeights: { manual: 4, lifestyle: -1, stress: 2 }
      },
      {
        text: 'أستخدم القوالب الجاهزة وأعتمد على التقارير المصورة والأرقام القياسية بدلاً من النصوص الطويلة المعقدة.',
        subtext: 'مثل: الأشعة، علم الأمراض، فسيولوجيا القلب والقسطرة، تخطيط المخ والأعصاب.',
        discWeights: { C: 4 },
        birkmanWeights: { structure: 4 },
        metricWeights: { lifestyle: 4, contact: -3 }
      }
    ]
  },

  // 59. المشاركة في الإغاثة الإنسانية والبعثات الطبية الميدانية (PVIPS Global Health & Humanitarian Relief)
  {
    id: 59,
    category: 'الإغاثة الإنسانية والطب الميداني',
    title: 'هل تستهويك فكرة التطوع في مناطق الكوارث الطبيعية، مخيمات اللجوء، أو المناطق النائية ذات الإمكانات المحدودة؟',
    description: 'معيار PVIPS للإيثار الدولي (Global Altruism) وممارسة الطب في البيئات منخفضة الموارد والحروب:',
    allowMultiple: true,
    options: [
      {
        text: 'نعم جداً؛ شغفي الحقيقي يكمن في إنقاذ الأرواح في الخطوط الأمامية والتعامل مع الإصابات والأوبئة بإمكانات ميدانية بسيطة.',
        subtext: 'مثل: طب الطوارئ، جراحة الإصابات والحروب، الأمراض المعدية، طب الأسرة الريفي، أطباء بلا حدود.',
        discWeights: { D: 4, S: 2 },
        birkmanWeights: { activity: 4, empathy: 5, change: 4 },
        metricWeights: { stress: 4, manual: 3 }
      },
      {
        text: 'نعم؛ من خلال حملات مكافحة سوء التغذية، التطعيمات، رعاية الحوامل والأطفال، وتعزيز شبكات المياه والوقاية الصحية.',
        subtext: 'مثل: طب الأطفال، التوليد والصحة الإنجابية، الطب الوقائي، الصحة العامة، طب المجتمع.',
        discWeights: { S: 4, I: 2 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 4, research: 3, lifestyle: 2 }
      },
      {
        text: 'أفضل العمل في المستشفيات المرجعية المجهزة بأعلى التقنيات والمختبرات المتقدمة؛ حيث لا يمكن الاستفادة من تخصصي في بيئات متواضعة.',
        subtext: 'مثل: جراحة المخ والأعصاب، زراعة الأعضاء، الأشعة التداخلية، الأورام الإشعاعية، الوراثة.',
        discWeights: { C: 4, D: 2 },
        birkmanWeights: { structure: 4, advantage: 3 },
        metricWeights: { intellectual: 4, income: 4 }
      },
      {
        text: 'لا أضع الطب الإغاثي في سلم أولوياتي المهنية المباشرة.',
        specialType: 'none'
      },
      {
        text: 'أرحب بالمساهمة الإنسانية الإغاثية متى ما سنحت الفرصة المناسبة.',
        specialType: 'all'
      }
    ]
  },

  // 60. البصمة المهنية والإرث الطبي المنشود (AAMC Capstone Professional Identity & Physician Legacy)
  {
    id: 60,
    category: 'البصمة المهنية والإرث الطبي',
    title: 'عند بلوغك سن التقاعد والنظر إلى مسيرتك الطبية كاملة، ما هو الأثر الذي تريد أن تذكره الأجيال عنك؟',
    description: 'المعيار الختامي المتكامل لتحديد الهوية المهنية الكبرى (AAMC Capstone Professional Identity):',
    allowMultiple: true,
    options: [
      {
        text: '«الطبيب الحكيم وملاذ القلوب» الذي رافق آلاف العائلات وخفف آلامهم وكان أباً ومرشداً حقيقياً لمرضاه عبر السنين.',
        subtext: 'يوافق: طب الأسرة، طب الأطفال، الباطنة العامة، الرعاية التلطيفية، الطب النفسي، طب كبار السن.',
        discWeights: { S: 5, I: 3 },
        birkmanWeights: { empathy: 5 },
        metricWeights: { contact: 5, lifestyle: 2 }
      },
      {
        text: '«الجراح الأسطوري المنقذ» الذي انتزع آلاف الأرواح من حافة الموت بعمليات جراحية معقدة تتطلب شجاعة فائقة ودقة متناهية.',
        subtext: 'يوافق: جراحة القلب، المخ والأعصاب، جراحة العظام، زراعة الأعضاء، جراحة الحوادث، الجراحة العامة.',
        discWeights: { D: 5 },
        birkmanWeights: { activity: 4, advantage: 4 },
        metricWeights: { manual: 5, income: 4, stress: 3 }
      },
      {
        text: '«العالم المبتكر» الذي أضاف للأدبيات الطبية اكتشافات نوعية أو تقنيات جديدة أو درّب أجيالاً من استشاريي المستقبل.',
        subtext: 'يوافق: الطب الأكاديمي، علم الأمراض، الوراثة الطبية، الأورام، جراحة التخصصات الدقيقة، الأبحاث الإكلينيكية.',
        discWeights: { C: 5, I: 2 },
        birkmanWeights: { structure: 4 },
        metricWeights: { research: 5, intellectual: 5, lifestyle: 2 }
      },
      {
        text: '«الرائد الاستراتيجي المتوازن» الذي بنى مسيرة مرموقة جمعت بين التفوق الإكلينيكي وجودة الحياة وعاش حياة أسرية هانئة.',
        subtext: 'يوافق: طب الجلدية، طب العيون، الأشعة التشخيصية، الطب المهني، مراكز جراحة اليوم الواحد، طب التأهيل.',
        discWeights: { S: 4, C: 2 },
        birkmanWeights: { structure: 3 },
        metricWeights: { lifestyle: 5, income: 3, stress: -4 }
      },
      {
        text: 'كل هذه المعاني تمثل غايات متكاملة في رؤيتي لمهنة الطب ورسالتي الخالدة.',
        specialType: 'all'
      }
    ]
  },

  // ═══════════════════════════════════════════
  // نمط التعلم والاستيعاب الطبي (Medical Learning & Revision Style)
  // ═══════════════════════════════════════════
  {
    id: 61,
    category: 'نمط التعلم والاستيعاب الطبي',
    title: 'كيف يستوعب عقلك المفاهيم الطبية والفسيولوجية المعقدة بأعلى كفاءة وسرعة استحضار؟',
    description: 'تحديد القناة الإدراكية الأساسية لاستقبال وحفظ المعلومات الإكلينيكية (VARK Medical Learning Model):',
    allowMultiple: false,
    options: [
      {
        text: 'بصرياً: عبر المخططات التشريحية الملونة، الرسوم البيانية، الجداول المقارنة، والخرائط الذهنية لربط الأعراض بالأمراض.',
        subtext: 'مثل: أطالس التشريح (Netter)، الرسوم التوضيحية (Sketchy/Osmosis)، الصور الإشعاعية، والترميز اللوني للملخصات.',
        learningStyleWeights: { visual: 8 },
        discWeights: { C: 2 }
      },
      {
        text: 'سمعياً: عبر الاستماع لشرح مفصل، مناقشة الحالات مع الزملاء، والبودكاست الطبي التفاعلي أثناء التنقل أو التمارين.',
        subtext: 'مثل: بودكاست Curbsiders، محاضرات الكلية المسجلة، ترديد الخوارزميات بصوت مسموع، ومناقشات المرور الصباحي.',
        learningStyleWeights: { auditory: 8 },
        discWeights: { I: 2 }
      },
      {
        text: 'عملياً وحركياً: عبر التدريب العملي المباشر، محاكاة المهارات اليدوية، وربط المعلومة بحالة مريض حقيقية فحصتها بنفسك.',
        subtext: 'مثل: معامل المهارات (Skill Labs)، المحاكاة الطبية، تركيب القساطر والجبائر، وفحص المرضى الإكلينيكي بجانب السرير.',
        learningStyleWeights: { kinesthetic: 8 },
        discWeights: { D: 2 }
      }
    ]
  },
  {
    id: 62,
    category: 'نمط التعلم والاستيعاب الطبي',
    title: 'ما هي استراتيجيتك الأكثر فاعلية أثناء التحضير لاختبارات البورد واختبار رخصة الممارسة (SMLE)؟',
    description: 'تحديد أسلوب المذاكرة والتحصيل الأنسب لك في الاختبارات المعيارية عالية التنافسية:',
    allowMultiple: false,
    options: [
      {
        text: 'بطاقات التكرار المتباعد المصورة (Anki with Images) وتخيل صفحات المراجع والمخططات التوضيحية في ذهني أثناء الحل.',
        subtext: 'يوافق: النمط البصري، التركيز على الصور السريرية، أشكال التفاعلات الدوائية، والشرائح المجهرية والأشعة.',
        learningStyleWeights: { visual: 8 },
        metricWeights: { intellectual: 2 }
      },
      {
        text: 'شرح الحالات لمجموعة دراسية (Study Group)، الاستماع لتسجيلات البنك والمراجعات الصوتية المركزة ومناقشة الخيارات.',
        subtext: 'يوافق: النمط السمعي، استرجاع نبرة المحاضر أو طريقة نطق الدواء لتذكر الآثار الجانبية والتشخيص التفريقي.',
        learningStyleWeights: { auditory: 8 },
        discWeights: { I: 2 }
      },
      {
        text: 'الحل المكثف لبنوك الأسئلة التفاعلية (Active Q-Banks) والممارسة العملية لسيناريوهات محطات الفحص السريري (OSCE).',
        subtext: 'يوافق: النمط العملي، التعلم من خلال الخطأ التجريبي المباشر والتدريب على سرعة الأداء وإدارة وقت المحطات.',
        learningStyleWeights: { kinesthetic: 8 },
        metricWeights: { manual: 2 }
      }
    ]
  },
  {
    id: 63,
    category: 'نمط التعلم والاستيعاب الطبي',
    title: 'عند مواجهة بروتوكول علاجي جديد أو خطوة إجرائية طبية لأول مرة في المستشفى، كيف تتقنها بأسرع وتيرة؟',
    description: 'طريقة ترسيخ الممارسة المهنية ونقل المعرفة من الكتب إلى الواقع السريري الفعلي:',
    allowMultiple: false,
    options: [
      {
        text: 'قراءة المخطط التدفقي (Flowchart) ومشاهدة فيديو عالي الجودة يصور الخطوات بزاوية رؤية جراحية مباشرة وواضحة.',
        subtext: 'يركز على: الخطوات المرئية، الرسوم البيانية لخوارزميات الإنعاش، وحفظ تسلسل الخطوات بالصور الدقيقة.',
        learningStyleWeights: { visual: 8 }
      },
      {
        text: 'طلب شرح شفهي من الاستشاري المشرف خطوة بخطوة، ثم تلخيص ما فهمته عليه صوتياً قبل البدء بالتطبيق.',
        subtext: 'يركز على: التعليمات اللفظية، النقاش السريري المباشر، والاستفسار عن الحالات الاستثنائية صوتياً.',
        learningStyleWeights: { auditory: 8 }
      },
      {
        text: 'البدء الفوري بالممارسة اليدوية خطوة بخطوة تحت إشراف الاستشاري (Hands-on Guidance) لضبط الإحساس الحركي.',
        subtext: 'يركز على: الإحساس باللمس، الممارسة الفعلية للأدوات، واكتساب الذاكرة العضلية الإجرائية (Muscle Memory).',
        learningStyleWeights: { kinesthetic: 8 }
      }
    ]
  }
];

