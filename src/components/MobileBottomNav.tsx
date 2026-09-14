import React from 'react';
import { Compass, Sliders, BookOpen, GitCompare, Bookmark } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  hasCompletedQuiz: boolean;
  compareCount: number;
  favoritesCount: number;
  onOpenCompare: () => void;
  onOpenFavorites: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  onSelectTab,
  hasCompletedQuiz,
  compareCount,
  favoritesCount,
  onOpenCompare,
  onOpenFavorites
}) => {
  const isQuizOrResultsActive = currentTab === 'quiz' || currentTab === 'results';

  return (
    <nav
      id="mobile-bottom-navigation"
      aria-label="التنقل الرئيسي للهاتف"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#081021]/95 backdrop-blur-xl border-t border-slate-700/90 shadow-[0_-8px_30px_rgba(0,0,0,0.7)] px-2 py-1.5 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {/* Quiz / Results Tab */}
        <button
          id="mobile-nav-quiz"
          onClick={() => onSelectTab(hasCompletedQuiz ? 'results' : 'quiz')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            isQuizOrResultsActive
              ? 'text-cyan-300 font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-all ${
              isQuizOrResultsActive ? 'bg-cyan-500/25 ring-1 ring-cyan-400/60 shadow-sm shadow-cyan-950' : ''
            }`}
          >
            <Compass className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold">
            {hasCompletedQuiz ? 'النتائج' : 'التقييم'}
          </span>
        </button>

        {/* Simulator Tab */}
        <button
          id="mobile-nav-simulator"
          onClick={() => onSelectTab('simulator')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            currentTab === 'simulator'
              ? 'text-cyan-300 font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-all ${
              currentTab === 'simulator' ? 'bg-cyan-500/25 ring-1 ring-cyan-400/60 shadow-sm shadow-cyan-950' : ''
            }`}
          >
            <Sliders className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold">المحاكي</span>
        </button>

        {/* Atlas / Guide Tab */}
        <button
          id="mobile-nav-guide"
          onClick={() => onSelectTab('guide')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer min-w-[56px] ${
            currentTab === 'guide'
              ? 'text-cyan-300 font-extrabold'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-all ${
              currentTab === 'guide' ? 'bg-cyan-500/25 ring-1 ring-cyan-400/60 shadow-sm shadow-cyan-950' : ''
            }`}
          >
            <BookOpen className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold">الأطلس</span>
        </button>

        {/* Compare Action */}
        <button
          id="mobile-nav-compare"
          onClick={onOpenCompare}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer min-w-[56px] relative"
        >
          <div className="p-1 rounded-lg relative">
            <GitCompare className="w-5 h-5 text-slate-200" />
            {compareCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-indigo-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-[#081021]">
                {compareCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold">المقارنة</span>
        </button>

        {/* Favorites Action */}
        <button
          id="mobile-nav-favorites"
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-slate-300 hover:text-white transition-all cursor-pointer min-w-[56px] relative"
        >
          <div className="p-1 rounded-lg relative">
            <Bookmark className="w-5 h-5 text-slate-200" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-amber-500 text-white text-[9px] font-black flex items-center justify-center ring-2 ring-[#081021]">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-bold">المفضلة</span>
        </button>
      </div>
    </nav>
  );
};
