import { ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { swap } from "../../utils/utils";
import { SortingStep } from "../../types/element-states";
import { getRandomNumber, generateArray } from "../../utils/utils";

export const getRandomArray = (): number[] => {
  return generateArray(getRandomNumber(3, 17), 100);
};

export const selectionSortAlgorithm = (array: number[], direction: Direction = Direction.Ascending): SortingStep[] => {
  const steps: SortingStep[] = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minInd = i;
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        firstCheckableElement: i,
        secondCheckableElement: j,
        currentArray: [...array],
        sortedElements: [...(steps[steps.length - 1]?.sortedElements || [])],
      });

      if (direction === Direction.Ascending ? array[minInd] > array[j] : array[minInd] < array[j]) {
        minInd = j;
      }
    };
    if (minInd !== i) {
      swap(array, minInd, i);
    };

    steps[steps.length - 1]?.sortedElements.push(i);
  };

  steps.push({
    currentArray: [...array],
    sortedElements: [...(steps[steps.length - 1]?.sortedElements || [])],
  });

  return steps;
};

export const bubbleSortAlgorithm = (array: number[], direction: Direction = Direction.Ascending): SortingStep[] => {
  const steps: SortingStep[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      steps.push({
        firstCheckableElement: j,
        secondCheckableElement: j + 1,
        currentArray: [...array],
        sortedElements: [...(steps[steps.length - 1]?.sortedElements || [])],
      });
      
      if (direction === Direction.Ascending ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
        swap(array, j, j + 1);
      };
      
    };
    steps[steps.length - 1]?.sortedElements.push(array.length - 1 - i);
  };

  steps.push({
    currentArray: [...array],
    sortedElements: [...(steps[steps.length - 1]?.sortedElements || [])],
  });

  return steps;
};

export const getColumnState = (index: number, currentStep: SortingStep, currentStepNumber: number, maxIndex: number) => {
  if (currentStep.firstCheckableElement === index || currentStep.secondCheckableElement === index) {
    return ElementStates.Changing;
  };

  if (currentStep.sortedElements.includes(index) || currentStepNumber === maxIndex && maxIndex > 0) {
    return ElementStates.Modified;
  }

  return ElementStates.Default;
}