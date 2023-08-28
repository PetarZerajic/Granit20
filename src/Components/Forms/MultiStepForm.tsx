import { ReactElement, useState } from "react";

export default function MultiStepform(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const next = () => {
    setCurrentStepIndex((i) => {
      if (i >= steps.length - 1) {
        return i;
      } else {
        return i + 1;
      }
    });
  };
  const back = () => {
    setCurrentStepIndex((i) => {
      if (i <= 0) {
        return i;
      } else {
        return i - 1;
      }
    });
  };

  return {
    currentStepIndex,
    steps,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
  };
}
