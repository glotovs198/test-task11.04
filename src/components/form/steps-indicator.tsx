export function StepIndicator({
  totalSteps,
  currentStep,
}: {
  totalSteps: number;
  currentStep: number;
}) {
  return (
    <div className="flex w-full justify-center mb-5">
      {[...Array(totalSteps)].map((_, index) => (
        <div
          className="flex-1 h-1"
          key={index}
          style={{
            backgroundColor: index < currentStep ? "green" : "gray",
            margin: "0 5px",
          }}
        />
      ))}
    </div>
  );
}
