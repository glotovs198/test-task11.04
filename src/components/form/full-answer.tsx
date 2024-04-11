import { useState } from "react";
import { Button } from "../ui/button";

export function FullAnswer({
  question,
  onAnswer,
}: {
  question: string;
  onAnswer: (answer: string) => void;
}) {
  const [fullAnswer, setFullAnswer] = useState("");

  const handleFullAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFullAnswer(e.target.value);
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="font-bold text-xl mb-3">{question}</h3>
      <div className="relative">
        <textarea
          value={fullAnswer}
          onChange={handleFullAnswerChange}
          className="border border-gray-300 rounded-md p-2 mb-3 min-w-[300px] min-h-[250px]"
        />
      </div>

      <Button disabled={fullAnswer === ""} onClick={() => onAnswer(fullAnswer)}>
        Далее
      </Button>
    </div>
  );
}
