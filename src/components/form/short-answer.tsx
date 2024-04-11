import { useState } from "react";
import { Button } from "../ui/button";

export function ShortAnswer({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: (answer: string) => void;
}) {
  const [shortAnswer, setShortAnswer] = useState("");

  const handleShortAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShortAnswer(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="font-bold text-xl mb-3">{question}</h3>
      <label htmlFor={question}>Ваш ответ</label>
      <input
        id={question}
        type="text"
        value={shortAnswer}
        onChange={handleShortAnswerChange}
        className="border border-gray-300 rounded-md p-2 mb-3"
      />
      <Button
        disabled={shortAnswer === ""}
        onClick={() => onAnswer(shortAnswer)}
      >
        Далее
      </Button>
    </div>
  );
}
