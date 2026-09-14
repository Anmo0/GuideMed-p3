import { QUIZ_QUESTIONS } from '../src/data/quizQuestions';
import { SPECIALTIES_DB } from '../src/data/specialties';
import { SpecialtyMetrics } from '../src/types';

const METRIC_KEYS: (keyof SpecialtyMetrics)[] = ['manual', 'intellectual', 'lifestyle', 'contact', 'stress', 'income', 'research'];

console.log('=== بدء الفحص والتدقيق الشامل لبوصلة التخصصات الطبية ===\n');

let issuesFound = 0;

// 1. تدقيق بنك الأسئلة (60 سؤالاً)
console.log(`1. تدقيق بنك الأسئلة: عدد الأسئلة الإجمالي = ${QUIZ_QUESTIONS.length}`);
if (QUIZ_QUESTIONS.length !== 60) {
  console.error(`❌ خطأ: عدد الأسئلة ليس 60، العدد الحالي: ${QUIZ_QUESTIONS.length}`);
  issuesFound++;
} else {
  console.log(`✓ عدد الأسئلة مكتمل تماماً: 60 سؤالاً.`);
}

// فحص تسلسل المعرفات والتكرار
const idSet = new Set<number>();
const questionTitles = new Map<string, number>();

QUIZ_QUESTIONS.forEach((q, idx) => {
  const expectedId = idx + 1;
  if (q.id !== expectedId) {
    console.error(`❌ عدم تطابق معرف السؤال في الفهرس ${idx}: المتوقع ${expectedId}، الفعلي ${q.id}`);
    issuesFound++;
  }
  if (idSet.has(q.id)) {
    console.error(`❌ تكرار معرف السؤال: ${q.id}`);
    issuesFound++;
  }
  idSet.add(q.id);

  // فحص تكرار نص السؤال
  const cleanTitle = q.title.trim();
  if (questionTitles.has(cleanTitle)) {
    console.error(`❌ سؤال مكرر: السؤال #${q.id} يكرر نص السؤال #${questionTitles.get(cleanTitle)}`);
    issuesFound++;
  } else {
    questionTitles.set(cleanTitle, q.id);
  }

  // فحص الخيارات
  if (!q.options || q.options.length < 2) {
    console.error(`❌ السؤال #${q.id} يحتوي على أقل من خيارين!`);
    issuesFound++;
  }

  q.options.forEach((opt, optIdx) => {
    if (!opt.text || opt.text.trim().length === 0) {
      console.error(`❌ السؤال #${q.id} الخيار #${optIdx} بدون نص!`);
      issuesFound++;
    }

    // فحص سلامة الأوزان
    if (opt.metricWeights) {
      Object.entries(opt.metricWeights).forEach(([k, v]) => {
        if (!METRIC_KEYS.includes(k as any)) {
          console.error(`❌ السؤال #${q.id} الخيار #${optIdx} يحتوي على معيار غير معروف: ${k}`);
          issuesFound++;
        }
        if (typeof v !== 'number' || isNaN(v)) {
          console.error(`❌ السؤال #${q.id} الخيار #${optIdx} يحتوي على قيمة وزن غير رقمية: ${v}`);
          issuesFound++;
        }
      });
    }

    if (opt.discWeights) {
      Object.entries(opt.discWeights).forEach(([k, v]) => {
        if (!['D', 'I', 'S', 'C'].includes(k)) {
          console.error(`❌ السؤال #${q.id} الخيار #${optIdx} يحتوي على رمز DISC غير صالح: ${k}`);
          issuesFound++;
        }
        if (typeof v !== 'number' || isNaN(v)) {
          console.error(`❌ السؤال #${q.id} الخيار #${optIdx} يحتوي على قيمة DISC غير صالحة: ${v}`);
          issuesFound++;
        }
      });
    }

    if ((opt as any).pvipsWeights) {
      Object.entries((opt as any).pvipsWeights).forEach(([k, v]) => {
        if (typeof v !== 'number' || isNaN(v as any)) {
          console.error(`❌ السؤال #${q.id} الخيار #${optIdx} يحتوي على قيمة PVIPS غير صالحة: ${v}`);
          issuesFound++;
        }
      });
    }
  });
});

console.log(`✓ تدقيق بنك الأسئلة انتهى. الفحوصات سليمة.`);

// 2. تدقيق قاعدة بيانات التخصصات الطبية (56+ تخصصاً)
console.log(`\n2. تدقيق قاعدة بيانات التخصصات: عدد التخصصات = ${SPECIALTIES_DB.length}`);
const specialtyIds = new Set<string>();
const specialtyNames = new Set<string>();

SPECIALTIES_DB.forEach((s) => {
  if (specialtyIds.has(s.id)) {
    console.error(`❌ تكرار معرف تخصص: ${s.id}`);
    issuesFound++;
  }
  specialtyIds.add(s.id);

  if (specialtyNames.has(s.name)) {
    console.error(`❌ تكرار اسم تخصص: ${s.name}`);
    issuesFound++;
  }
  specialtyNames.add(s.name);

  // فحص المعايير
  METRIC_KEYS.forEach((k) => {
    const val = s.metrics[k];
    if (typeof val !== 'number' || isNaN(val) || val < 0 || val > 10) {
      console.error(`❌ التخصص ${s.name} (${s.id}) يحتوي على قيمة معيار غير صالحة لـ ${k}: ${val}`);
      issuesFound++;
    }
  });

  // فحص مصفوفة DISC
  if (!s.discAlignment || s.discAlignment.length === 0) {
    console.error(`❌ التخصص ${s.name} بدون مصفوفة DISC!`);
    issuesFound++;
  }
});

console.log(`✓ تدقيق التخصصات انتهى بنجاح.`);

console.log(`\n=== نتيجة الفحص النهائي: ${issuesFound === 0 ? '✓ كل البيانات والمعايير والأسئلة سليمة 100% بدون أي أخطاء!' : `❌ تم العثور على ${issuesFound} ملاحظات.`} ===`);
