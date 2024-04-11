import { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export function SingleChoice({
  question,
  options,
  onSelect,
}: {
  question: string;
  options: string[];
  onSelect: (option: string) => void;
}) {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <div className="flex flex-col items-start gap-3">
      <h3 className="font-bold text-xl mb-3">{question}</h3>
      <RadioGroup>
        {options.map((option, idx) => (
          <div
            onClick={() => setSelectedOption(option)}
            key={idx}
            className="flex items-center space-x-2"
          >
            <RadioGroupItem value={option} id={option + idx} />
            <Label htmlFor={option + idx}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button
        disabled={selectedOption === ""}
        onClick={() => onSelect(selectedOption)}
      >
        Далее
      </Button>
    </div>
  );
}
