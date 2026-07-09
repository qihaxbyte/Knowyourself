import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Gender, GuideMatch, QuizAnswers } from "../flow";
import type { AllResults } from "../scoring";

interface AppState {
  cats: string[];
  isQuick: boolean | null;
  gender: Gender | null;
  guide: string | null;
  guideMatches: GuideMatch[];
  answers: QuizAnswers;
  categoryResults: AllResults;
  
  // Actions
  setCats: (cats: string[]) => void;
  setIsQuick: (isQuick: boolean | null) => void;
  setGender: (gender: Gender | null) => void;
  setGuide: (guide: string | null) => void;
  setGuideMatches: (matches: GuideMatch[]) => void;
  setAnswers: (answers: QuizAnswers) => void;
  setCategoryResults: (results: AllResults) => void;
  resetAll: () => void;
}

// Migration logic to preserve existing user data from previous localStorage keys
const migrateLegacyData = () => {
  if (typeof window === "undefined") return {};
  
  const getOld = (key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch {
      return undefined;
    }
  };

  const hasLegacy = window.localStorage.getItem("ky_cats") !== null;
  if (!hasLegacy) return {};

  const legacyData = {
    cats: getOld("ky_cats") ?? [],
    isQuick: getOld("ky_isQuick") ?? null,
    gender: getOld("ky_gender") ?? null,
    guide: getOld("ky_guide") ?? null,
    guideMatches: getOld("ky_guideMatches") ?? [],
    answers: getOld("ky_answers") ?? [],
    categoryResults: getOld("ky_categoryResults") ?? {},
  };

  // Clear legacy keys after migration
  ['ky_cats', 'ky_isQuick', 'ky_gender', 'ky_guide', 'ky_guideMatches', 'ky_answers', 'ky_categoryResults'].forEach(k => window.localStorage.removeItem(k));

  return legacyData;
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      cats: [],
      isQuick: null,
      gender: null,
      guide: null,
      guideMatches: [],
      answers: [],
      categoryResults: {},

      ...migrateLegacyData(),

      setCats: (cats) => set({ cats }),
      setIsQuick: (isQuick) => set({ isQuick }),
      setGender: (gender) => set({ gender }),
      setGuide: (guide) => set({ guide }),
      setGuideMatches: (guideMatches) => set({ guideMatches }),
      setAnswers: (answers) => set({ answers }),
      setCategoryResults: (categoryResults) => set({ categoryResults }),
      resetAll: () => set({
        cats: [],
        gender: null,
        guide: null,
        guideMatches: [],
        answers: [],
        categoryResults: {}
      })
    }),
    {
      name: "ky_app_state",
    }
  )
);
