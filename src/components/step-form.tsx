import { Questions } from "@/types/form-types";
import { FullAnswer } from "./form/full-answer";
import { MultipleChoice } from "./form/multiple-choice";
import { SingleChoice } from "./form/single-choice";
import { ShortAnswer } from "./form/short-answer";
import useTestStore from "./store/test-store";
import { FormDone } from "./form/form-done";
import { StepIndicator } from "./form/steps-indicator";
import { useEffect, useState } from "react";

export function StepForm({ questions, timeLimitSeconds }: Questions) {
  const currentStep = useTestStore((state) => state.currentStep);
  const nextStep = useTestStore((state) => state.nextStep);
  const setAnswer = useTestStore((state) => state.setAnswer);
  const setTimeLimitSeconds = useTestStore(
    (state) => state.setTimeLimitSeconds
  );

  const storedTimeLimitSeconds = useTestStore(
    (state) => state.timeLimitSeconds
  ); // П

  const [currentTime, setCurrentTime] = useState<number | null>(
    storedTimeLimitSeconds || timeLimitSeconds || null
  );

  function formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formatNumber = (num: number): string => {
      return num < 10 ? `0${num}` : `${num}`;
    };

    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(
      remainingSeconds
    )}`;
  }

  useEffect(() => {
    if (timeLimitSeconds && !storedTimeLimitSeconds) {
      setTimeLimitSeconds(timeLimitSeconds);
    }
  }, [timeLimitSeconds, storedTimeLimitSeconds, setTimeLimitSeconds]);

  useEffect(() => {
    let timerId: ReturnType<typeof setInterval>;

    if (!storedTimeLimitSeconds && timeLimitSeconds) {
      setTimeLimitSeconds(timeLimitSeconds);
    }

    if (currentTime !== null && currentTime > 0) {
      timerId = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime && prevTime > 0) {
            setTimeLimitSeconds(prevTime);
            return prevTime - 1;
          } else {
            clearInterval(timerId!);
            return null;
          }
        });
      }, 1000);
    }

    if (currentStep >= questions.length) {
      clearInterval(timerId!);
    }

    return () => {
      clearInterval(timerId!);
    };
  }, [
    currentTime,
    setTimeLimitSeconds,
    storedTimeLimitSeconds,
    timeLimitSeconds,
    currentStep,
    questions.length,
  ]);

  const handleAnswer = (answer: string | string[]) => {
    if (Array.isArray(answer)) {
      setAnswer(answer);
    } else {
      setAnswer([answer]);
    }
    console.log(answer);
    nextStep();
  };

  return (
    <>
      {currentStep < questions.length ? (
        <>
          <div className="flex items-end gap-3">
            <StepIndicator
              totalSteps={questions.length}
              currentStep={currentStep}
            />
            {timeLimitSeconds && (
              <div className="border px-4 py-2">
                {<div>{formatTime(currentTime || 0)}</div>}
              </div>
            )}
          </div>

          {questions.map((question, idx) => (
            <div
              key={idx}
              style={{ display: idx === currentStep ? "block" : "none" }}
            >
              {question.type === "single_choice" && (
                <SingleChoice
                  question={question.text}
                  options={question.options || []}
                  onSelect={(option) => handleAnswer(option)}
                />
              )}
              {question.type === "multiple_choice" && (
                <MultipleChoice
                  question={question.text}
                  options={question.options || []}
                  onSelect={(options) => handleAnswer(options)}
                />
              )}
              {question.type === "short_answer" && (
                <ShortAnswer
                  question={question.text}
                  onAnswer={(answer) => handleAnswer(answer)}
                />
              )}
              {question.type === "full_answer" && (
                <FullAnswer
                  question={question.text}
                  onAnswer={(answer) => handleAnswer(answer)}
                />
              )}
            </div>
          ))}
        </>
      ) : (
        <FormDone />
      )}
    </>
  );
}
