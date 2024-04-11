import "./App.css";
import { StepForm } from "./components/step-form";
import { Questions } from "./types/form-types";

function App() {
  const questions: Questions = {
    timeLimitSeconds: 600,
    questions: [
      {
        type: "full_answer",
        options: [],
        text: "full answer",
        symbolsLimit: 100,
      },
      {
        type: "multiple_choice",
        options: ["chioce1", "choice2"],
        text: "multiple choice",
      },
      {
        type: "single_choice",
        options: ["choice1", "choice2", "choice3"],
        text: "single choice",
      },
      {
        type: "short_answer",
        options: ["choice1", "choice2", "choice3"],
        text: "Short answer",
      },
      {
        type: "full_answer",
        options: ["opr"],
        text: "full answer",
        symbolsLimit: 100,
      },
      {
        type: "multiple_choice",
        options: ["chioce1", "choice2"],
        text: "multiple choice",
      },
      {
        type: "single_choice",
        options: ["choice1", "choice2", "choice3"],
        text: "single choice",
      },
      {
        type: "short_answer",
        options: ["choice1", "choice2", "choice3"],
        text: "Short answer",
      },
    ],
  };
  return (
    <>
      <StepForm
        questions={questions.questions}
        timeLimitSeconds={questions.timeLimitSeconds}
      />
    </>
  );
}

export default App;
