import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  currentStep: number;
  answers: string[];
  timeLimitSeconds: number | null;
};

type Actions = {
  nextStep: () => void;
  setAnswer: (answer: string | string[]) => void;
  setTimeLimitSeconds: (time: number) => void;
};

export const useTestStore = create(
  persist<State & Actions>(
    (set) => ({
      currentStep: 0,
      answers: [],
      timeLimitSeconds: null,

      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      setAnswer: (answer) => {
        set((state) => ({
          answers: Array.isArray(answer)
            ? [...state.answers, ...answer]
            : [...state.answers, answer],
        }));
      },

      setTimeLimitSeconds: (time) =>
        set(() => ({
          timeLimitSeconds: time,
        })),
    }),
    {
      name: "test-storage",
    }
  )
);

export default useTestStore;
