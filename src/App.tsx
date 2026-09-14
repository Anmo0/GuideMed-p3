import React, { useState, useEffect, useMemo } from 'react';
import { Specialty, UserEvaluation } from './types';
import { SPECIALTIES_DB } from './data/specialties';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import { calculateEvaluation } from './utils/scoringEngine';

import { Header } from './components/Header';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { SimulatorScreen } from './components/SimulatorScreen';
import { GuideScreen } from './components/GuideScreen';
import { SpecialtyDetailModal } from './components/SpecialtyDetailModal';
import { ComparisonModal } from './components/ComparisonModal';
import { FavoritesDrawer } from './components/FavoritesDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'welcome' | 'quiz' | 'results' | 'simulator' | 'guide'>('welcome');
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number[]>>(() => {
    try {
      const saved = localStorage.getItem('medical_compass_quiz_answers');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [evaluation, setEvaluation] = useState<UserEvaluation | null>(null);

  // Favorites state (persisted in localStorage)
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('medical_compass_favs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Staged comparison items
  const [comparedSpecialties, setComparedSpecialties] = useState<Specialty[]>([]);

  // Modals & Drawers state
  const [activeDetailSpecialty, setActiveDetailSpecialty] = useState<Specialty | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState<boolean>(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // Save favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('medical_compass_favs', JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  // Handle Option selection in Quiz
  const handleSelectOption = (questionId: number, optionIndex: number) => {
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId);
    if (!question) return;

    setSelectedAnswers((prev) => {
      const currentList = prev[questionId] || [];
      const clickedOption = question.options[optionIndex];

      // If single choice question
      if (!question.allowMultiple) {
        return {
          ...prev,
          [questionId]: [optionIndex]
        };
      }

      // If special "none" clicked
      if (clickedOption.specialType === 'none') {
        if (currentList.includes(optionIndex)) {
          return { ...prev, [questionId]: [] };
        } else {
          return { ...prev, [questionId]: [optionIndex] };
        }
      }

      // If special "all" clicked
      if (clickedOption.specialType === 'all') {
        if (currentList.includes(optionIndex)) {
          return { ...prev, [questionId]: [] };
        } else {
          // Select all standard options
          const allStandardIndices = question.options
            .map((opt, i) => (opt.specialType ? -1 : i))
            .filter((i) => i >= 0);
          return { ...prev, [questionId]: [...allStandardIndices, optionIndex] };
        }
      }

      // Standard multi-select option
      let newList: number[];
      if (currentList.includes(optionIndex)) {
        newList = currentList.filter((idx) => idx !== optionIndex);
      } else {
        // Filter out any "none" option
        const cleaned = currentList.filter((idx) => {
          const opt = question.options[idx];
          return opt?.specialType !== 'none';
        });
        newList = [...cleaned, optionIndex];
      }

      return {
        ...prev,
        [questionId]: newList
      };
    });
  };

  // Complete Quiz & Compute Matches
  const handleFinishQuiz = () => {
    const evalResult = calculateEvaluation(selectedAnswers, SPECIALTIES_DB);
    setEvaluation(evalResult);
    setCurrentTab('results');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake Quiz
  const handleRetakeQuiz = () => {
    setCurrentTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear Quiz Progress
  const handleClearQuizProgress = () => {
    setSelectedAnswers({});
    try {
      localStorage.removeItem('medical_compass_quiz_answers');
      localStorage.removeItem('medical_compass_quiz_index');
      localStorage.removeItem('medical_compass_saved_at');
    } catch {
      // ignore
    }
  };

  // Full Reset
  const handleFullReset = () => {
    if (window.confirm('هل ترغب في إعادة ضبط الإجابات والبدء من جديد؟')) {
      handleClearQuizProgress();
      setEvaluation(null);
      setCurrentTab('welcome');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Favorite toggle helper
  const handleToggleFavorite = (specialtyId: string) => {
    setFavoriteIds((prev) =>
      prev.includes(specialtyId) ? prev.filter((id) => id !== specialtyId) : [...prev, specialtyId]
    );
  };

  const isFavorite = (specialtyId: string) => favoriteIds.includes(specialtyId);

  // Compare toggle helper
  const handleToggleCompare = (specialty: Specialty) => {
    setComparedSpecialties((prev) => {
      const exists = prev.some((s) => s.id === specialty.id);
      if (exists) {
        return prev.filter((s) => s.id !== specialty.id);
      } else {
        if (prev.length >= 2) {
          // Replace second or add up to 2
          return [prev[0], specialty];
        }
        return [...prev, specialty];
      }
    });
    setIsCompareModalOpen(true);
  };

  const isCompared = (specialtyId: string) =>
    comparedSpecialties.some((s) => s.id === specialtyId);

  const favoriteSpecialties = useMemo(() => {
    return SPECIALTIES_DB.filter((s) => favoriteIds.includes(s.id));
  }, [favoriteIds]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#070c19] via-[#081125] to-[#060a14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200" dir="rtl">
      {/* Top Fixed Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        favoritesCount={favoriteIds.length}
        compareCount={comparedSpecialties.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onReset={handleFullReset}
        hasCompletedQuiz={!!evaluation}
      />

      {/* Main Body Switcher */}
      <main className="flex-1 pb-24 md:pb-16">
        {currentTab === 'welcome' && (
          <WelcomeScreen
            onStartQuiz={() => {
              setCurrentTab('quiz');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenSimulator={() => {
              setCurrentTab('simulator');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenGuide={() => {
              setCurrentTab('guide');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            savedAnswerCount={
              Object.keys(selectedAnswers).filter(
                (key) => (selectedAnswers[parseInt(key, 10)] || []).length > 0
              ).length
            }
            onResetAnswers={handleClearQuizProgress}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizScreen
            questions={QUIZ_QUESTIONS}
            selectedAnswers={selectedAnswers}
            onSelectOption={handleSelectOption}
            onFinishQuiz={handleFinishQuiz}
            onBackToWelcome={() => setCurrentTab('welcome')}
            onClearAnswers={handleClearQuizProgress}
          />
        )}

        {currentTab === 'results' && evaluation && (
          <ResultsScreen
            evaluation={evaluation}
            onRetakeQuiz={handleRetakeQuiz}
            onOpenSimulator={() => setCurrentTab('simulator')}
            onOpenSpecialtyDetail={(spec) => setActiveDetailSpecialty(spec)}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            onToggleCompare={handleToggleCompare}
            isCompared={isCompared}
          />
        )}

        {currentTab === 'simulator' && (
          <SimulatorScreen
            specialties={SPECIALTIES_DB}
            initialMetrics={evaluation?.userMetrics}
            onOpenSpecialtyDetail={(spec) => setActiveDetailSpecialty(spec)}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            onToggleCompare={handleToggleCompare}
            isCompared={isCompared}
          />
        )}

        {currentTab === 'guide' && (
          <GuideScreen
            specialties={SPECIALTIES_DB}
            onOpenSpecialtyDetail={(spec) => setActiveDetailSpecialty(spec)}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
            onToggleCompare={handleToggleCompare}
            isCompared={isCompared}
          />
        )}
      </main>

      {/* Ergonomic Mobile Bottom Navigation */}
      <MobileBottomNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hasCompletedQuiz={!!evaluation}
        compareCount={comparedSpecialties.length}
        favoritesCount={favoriteIds.length}
        onOpenCompare={() => setIsCompareModalOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Modals and Drawers */}
      <SpecialtyDetailModal
        specialty={activeDetailSpecialty}
        onClose={() => setActiveDetailSpecialty(null)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        onToggleCompare={handleToggleCompare}
        isCompared={isCompared}
      />

      {isCompareModalOpen && (
        <ComparisonModal
          specialties={comparedSpecialties}
          onClose={() => setIsCompareModalOpen(false)}
          onRemoveSpecialty={(id) =>
            setComparedSpecialties((prev) => prev.filter((s) => s.id !== id))
          }
          onClearAll={() => setComparedSpecialties([])}
        />
      )}

      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favoriteSpecialties}
        onRemoveFavorite={handleToggleFavorite}
        onOpenSpecialtyDetail={(spec) => setActiveDetailSpecialty(spec)}
        onToggleCompare={handleToggleCompare}
        isCompared={isCompared}
      />
    </div>
  );
}
