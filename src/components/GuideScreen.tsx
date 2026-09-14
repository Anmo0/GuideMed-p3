import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Specialty, SpecialtyCategory } from '../types';
import {
  Search,
  Filter,
  Bookmark,
  GitCompare,
  Eye,
  SlidersHorizontal,
  Sparkles,
  ArrowUpDown,
  BookOpen
} from 'lucide-react';

interface GuideScreenProps {
  specialties: Specialty[];
  onOpenSpecialtyDetail: (specialty: Specialty) => void;
  onToggleFavorite: (specialtyId: string) => void;
  isFavorite: (specialtyId: string) => boolean;
  onToggleCompare: (specialty: Specialty) => void;
  isCompared: (specialtyId: string) => boolean;
  filterFavoritesOnly?: boolean;
}

export const GuideScreen: React.FC<GuideScreenProps> = ({
  specialties,
  onOpenSpecialtyDetail,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  isCompared,
  filterFavoritesOnly = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'lifestyle' | 'income' | 'manual' | 'smle' | 'duration'>('default');
  const [onlyFavorites, setOnlyFavorites] = useState(filterFavoritesOnly);

  const categories = useMemo(() => {
    return Array.from(new Set(specialties.map((s) => s.category)));
  }, [specialties]);

  const filteredAndSorted = useMemo(() => {
    let result = specialties.filter((spec) => {
      if (onlyFavorites && !isFavorite(spec.id)) {
        return false;
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        spec.name.toLowerCase().includes(q) ||
        spec.englishName.toLowerCase().includes(q) ||
        spec.tags.some((t) => t.toLowerCase().includes(q)) ||
        spec.boardDetails.toLowerCase().includes(q);

      const matchesCat = selectedCategory === 'all' || spec.category === selectedCategory;

      return matchesSearch && matchesCat;
    });

    // Sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'lifestyle':
          return b.metrics.lifestyle - a.metrics.lifestyle;
        case 'income':
          return b.metrics.income - a.metrics.income;
        case 'manual':
          return b.metrics.manual - a.metrics.manual;
        case 'smle':
          return parseInt(b.smleRange, 10) - parseInt(a.smleRange, 10);
        case 'duration':
          return parseInt(a.duration, 10) - parseInt(b.duration, 10);
        default:
          return 0;
      }
    });

    return result;
  }, [specialties, searchQuery, selectedCategory, sortBy, onlyFavorites, isFavorite]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6" dir="rtl">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 text-xs font-bold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>قاعدة بيانات التخصصات الطبية بالهيئة السعودية 2025</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            أطلس التخصصات الطبية
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            دليل شامل يغطي {specialties.length} تخصصاً مع تفاصيل التدريب، القبول، جودة الحياة، والمردود المهني.
          </p>
        </div>

        {/* Favorite toggle switch */}
        <button
          id="btn-toggle-fav-filter"
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-colors flex items-center gap-2 cursor-pointer self-start sm:self-center ${
            onlyFavorites
              ? 'bg-amber-950 border-amber-600 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>المفضلة فقط</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="input-guide-search"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث بالاسم العربي، الإنجليزي، الكلمات المفتاحية (مثل: مناظير، طوارئ، ليزر)..."
              className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              id="select-guide-sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="default">الترتيب الافتراضي</option>
              <option value="lifestyle">الأعلى في جودة الحياة</option>
              <option value="income">الأعلى في الدخل المالي</option>
              <option value="manual">الأعلى في العمليات والجراحة</option>
              <option value="smle">الأعلى في درجة SMLE المطلوبة</option>
              <option value="duration">الأقصر في مدة البورد</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold'
                : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            جميع التصنيفات ({specialties.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Specialty Cards */}
      {filteredAndSorted.length === 0 ? (
        <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">لم يتم العثور على تخصصات مطابقة</h3>
          <p className="text-xs text-slate-400">جرب تعديل كلمة البحث أو إزالة بعض معايير التصفية.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAndSorted.map((spec) => (
            <motion.div
              key={spec.id}
              id={`guide-card-${spec.id}`}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-cyan-950/20 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Category & Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-300">
                    {spec.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {spec.duration}
                  </span>
                </div>

                {/* Names */}
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {spec.name}
                </h3>
                <p className="text-xs font-mono text-slate-400 mb-3">{spec.englishName}</p>

                {/* Metrics Mini-Grid */}
                <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] font-semibold mb-3">
                  <div className="p-1 rounded bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400">جودة الحياة</div>
                    <div className="text-cyan-400 font-bold">{spec.metrics.lifestyle}/10</div>
                  </div>
                  <div className="p-1 rounded bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400">الدخل</div>
                    <div className="text-emerald-400 font-bold">{spec.metrics.income}/10</div>
                  </div>
                  <div className="p-1 rounded bg-slate-950/60 border border-slate-800/80">
                    <div className="text-slate-400">المهارة اليدوية</div>
                    <div className="text-amber-400 font-bold">{spec.metrics.manual}/10</div>
                  </div>
                </div>

                {/* Short lifestyle snippet */}
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
                  {spec.lifestyle}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {spec.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
                <button
                  id={`btn-guide-detail-${spec.id}`}
                  onClick={() => onOpenSpecialtyDetail(spec)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer min-h-[40px]"
                >
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span>التفاصيل الكاملة</span>
                </button>

                <button
                  id={`btn-guide-compare-${spec.id}`}
                  onClick={() => onToggleCompare(spec)}
                  className={`p-2 rounded-xl border text-xs cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                    isCompared(spec.id)
                      ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  title="إضافة للمقارنة"
                >
                  <GitCompare className="w-3.5 h-3.5" />
                </button>

                <button
                  id={`btn-guide-fav-${spec.id}`}
                  onClick={() => onToggleFavorite(spec.id)}
                  className={`p-2 rounded-xl border text-xs cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center ${
                    isFavorite(spec.id)
                      ? 'bg-amber-950 border-amber-600 text-amber-300'
                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                  title="حفظ في المفضلة"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
