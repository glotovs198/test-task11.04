import useTestStore from "../store/test-store";
import { Button } from "../ui/button";

export function FormDone() {
  const answers = useTestStore((state) => state.answers);
  return (
    <div className="flex flex-col items-start gap-3">
      <h1 className="font-bold text-xl mb-5">Тест пройден!</h1>
      <h3 className="font-bold text-xl mb-5">Ваши ответы</h3>
      <div className="flex items-start flex-col">
        {answers.map((answer, idx) => (
          <div key={idx}>
            {idx + 1}: {answer}
          </div>
        ))}
      </div>

      <Button
        onClick={() => {
          localStorage.removeItem("test-storage");
          location.reload();
        }}
      >
        На главную
      </Button>
    </div>
  );
}
