import React from 'react';
import { Compass, Sliders, BookOpen, GitCompare, Bookmark, RotateCcw } from 'lucide-react';

interface HeaderProps {
  currentTab: 'welcome' | 'quiz' | 'results' | 'simulator' | 'guide';
  onSelectTab: (tab: 'welcome' | 'quiz' | 'results' | 'simulator' | 'guide') => void;
  favoritesCount: number;
  compareCount: number;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  onReset: () => void;
  hasCompletedQuiz: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  favoritesCount,
  compareCount,
  onOpenFavorites,
  onOpenCompare,
  onReset,
  hasCompletedQuiz
}) => {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#081021]/95 border-b border-slate-700/80 shadow-xl shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          id="btn-brand-home"
          onClick={() => onSelectTab('welcome')}
          className="flex items-center gap-3 text-right group cursor-pointer focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/30 group-hover:shadow-cyan-400/50 transition-shadow">
            <div className="w-full h-full bg-[#070e20] rounded-[10px] flex items-center justify-center">
              <Compass className="w-5 h-5 text-cyan-300 group-hover:rotate-45 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-cyan-300 via-sky-100 to-blue-300 bg-clip-text text-transparent">
                Guide Med
              </span>
              <span className="hidden sm:inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-700/70 text-cyan-300 shadow-sm shadow-cyan-950">
                Medical Platform
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
              دليل وتوجيه التخصصات الطبية والتقييم السريري
            </p>
          </div>
        </button>

        {/* Navigation Tabs (Desktop / Tablet) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            id="nav-tab-quiz"
            onClick={() => onSelectTab(hasCompletedQuiz ? 'results' : 'quiz')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'quiz' || currentTab === 'results'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-md shadow-cyan-950/50'
                : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4 text-cyan-400" />
            <span>{hasCompletedQuiz ? 'نتائج التقييم' : 'اختبار التقييم'}</span>
          </button>

          <button
            id="nav-tab-simulator"
            onClick={() => onSelectTab('simulator')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'simulator'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-md shadow-cyan-950/50'
                : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border border-transparent'
            }`}
          >
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>المحاكي التفاعلي</span>
          </button>

          <button
            id="nav-tab-guide"
            onClick={() => onSelectTab('guide')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              currentTab === 'guide'
                ? 'bg-cyan-500/25 text-cyan-200 border border-cyan-400/60 shadow-md shadow-cyan-950/50'
                : 'text-slate-200 hover:text-white hover:bg-slate-800/80 border border-transparent'
            }`}
          >
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>أطلس التخصصات</span>
          </button>
        </nav>

        {/* Action Badges & Reset (Desktop retains all, mobile shows Reset & Quick badges) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Comparison button (hidden on mobile, shown in bottom bar) */}
          <button
            id="btn-open-compare"
            onClick={onOpenCompare}
            title="مقارنة التخصصات"
            className={`hidden sm:flex relative p-2.5 rounded-xl border transition-all cursor-pointer ${
              compareCount > 0
                ? 'bg-indigo-950/80 border-indigo-500/80 text-indigo-200 hover:bg-indigo-900 shadow-md shadow-indigo-950/50'
                : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700/80'
            }`}
          >
            <GitCompare className="w-4 h-4" />
            {compareCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-indigo-500 text-white text-[11px] font-black flex items-center justify-center ring-2 ring-[#070e20]">
                {compareCount}
              </span>
            )}
          </button>

          {/* Favorites button (hidden on mobile, shown in bottom bar) */}
          <button
            id="btn-open-favorites"
            onClick={onOpenFavorites}
            title="المفضلة"
            className={`hidden sm:flex relative p-2.5 rounded-xl border transition-all cursor-pointer ${
              favoritesCount > 0
                ? 'bg-amber-950/80 border-amber-500/80 text-amber-200 hover:bg-amber-900 shadow-md shadow-amber-950/50'
                : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700/80'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-black flex items-center justify-center ring-2 ring-[#070e20]">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Reset option */}
          <button
            id="btn-header-reset"
            onClick={onReset}
            title="إعادة تعيين وبدء جديد"
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-rose-300 hover:border-rose-600/70 hover:bg-rose-950/30 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <RotateCcw className="w-4 h-4 text-slate-300" />
            <span className="hidden sm:inline">إعادة ضبط</span>
          </button>
        </div>
      </div>
    </header>
  );
};
