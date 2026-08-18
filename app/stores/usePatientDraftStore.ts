import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface PatientDraft {
  fullName: string;
  phone: string;
  medicalNotes: string[];
}

interface PatientDraftStore {
  step: number;
  draft: PatientDraft;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateDraft: (data: Partial<PatientDraft>) => void;
  resetDraft: () => void;
}

const initialDraft = {
  fullName: "",
  phone: "",
  medicalNotes: [],
};

export const usePatientDraftStore = create<PatientDraftStore>()(
  persist(
    (set) => ({
      step: 1,
      draft: initialDraft,

      setStep: (step: number) => set({ step }),
      nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 2) })),
      prevStep: () => set((state) => ({ step: Math.max(state.step - 1) })),
      resetDraft: () => set({ step: 1, draft: initialDraft }),
      updateDraft: (data: Partial<PatientDraft>) =>
        set((state) => ({
          draft: { ...state.draft, ...data },
        })),
    }),
    {
      name: "medidesk-patient-draft",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
