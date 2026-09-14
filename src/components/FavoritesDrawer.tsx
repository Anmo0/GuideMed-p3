import React from 'react';
import { Specialty } from '../types';
import { X, Bookmark, Trash2, Eye, GitCompare, ArrowLeft } from 'lucide-react';

interface FavoritesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: Specialty[];
  onRemoveFavorite: (specialtyId: string) => void;
  onOpenSpecialtyDetail: (specialty: Specialty) => void;
  onToggleCompare: (specialty: Specialty) => void;
  isCompared: (specialtyId: string) => boolean;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onOpenSpecialtyDetail,
  onToggleCompare,
  isCompared
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-start bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#080d1e] border-l border-slate-800 h-full p-6 flex flex-col justify-between shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Bookmark className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-bold text-white">التخصصات المفضلة ({favorites.length})</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {favorites.length === 0 ? (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-slate-600" />
              <p className="text-sm font-semibold">لم تقم بحفظ أي تخصص في المفضلة بعد</p>
              <p className="text-xs">
                انقر على أيقونة الإشارة المرجعية بجانب أي تخصص للوصول السريع إليه هنا.
              </p>
            </div>
          ) : (
            favorites.map((spec) => (
              <div
                key={spec.id}
                className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                      {spec.category}
                    </span>
                    <h3 className="font-bold text-white text-base mt-1">{spec.name}</h3>
                    <p className="text-xs font-mono text-slate-400">{spec.englishName}</p>
                  </div>

                  <button
                    onClick={() => onRemoveFavorite(spec.id)}
                    className="text-slate-500 hover:text-rose-400 p-1 transition-colors cursor-pointer"
                    title="حذف من المفضلة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span>مدة البورد: {spec.duration}</span>
                  <span className="text-cyan-400 font-semibold">SMLE: {spec.smleRange}</span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      onOpenSpecialtyDetail(spec);
                      onClose();
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>التفاصيل</span>
                  </button>

                  <button
                    onClick={() => onToggleCompare(spec)}
                    className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                      isCompared(spec.id)
                        ? 'bg-indigo-950 border-indigo-600 text-indigo-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                    title="مقارنة"
                  >
                    <GitCompare className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            إغلاق القائمة
          </button>
        </div>
      </div>
    </div>
  );
};
