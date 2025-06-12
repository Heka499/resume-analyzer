import { create } from "zustand";

type Analysis = {
  skills: string[];
  summary: string;
  improvementTips: string;
  jobSearchTerms: string[];
};

type ResumeStore = {
  analysis: Analysis | null;
  setAnalysis: (data: Analysis) => void;
};

export const useResumeStore = create<ResumeStore>((set) => ({
  analysis: null,
  setAnalysis: (data) => set({ analysis: data }),
}));
