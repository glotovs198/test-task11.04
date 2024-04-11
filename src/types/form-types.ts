export type Question = {
  type: "single_choice" | "multiple_choice" | "short_answer" | "full_answer";
  text: string;
  options: string[];
  symbolsLimit?: number;
};

export type Questions = {
  timeLimitSeconds?: number;
  questions: Question[];
};
