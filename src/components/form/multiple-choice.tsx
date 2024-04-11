import { useState } from "react";
import { Button } from "../ui/button";

export function MultipleChoice({
  question,
  options,
  onSelect,
}: {
  question: string;
  options: string[];
  onSelect: (options: string) => void;
}) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="flex flex-col items-start gap-3">
      <h3>{question}</h3>
      {options.map((option, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <input
            type="checkbox"
            onChange={() => handleCheckboxChange(option)}
            id={option + idx}
          />
          <label
            htmlFor={option + idx}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option}
          </label>
        </div>
      ))}
      <Button
        disabled={selectedOptions.length === 0}
        onClick={() => onSelect(selectedOptions.join(", "))}
      >
        Далее
      </Button>
    </div>
  );
}
