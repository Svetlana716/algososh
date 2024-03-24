import { FC, useRef, useState } from "react";
import styles from "./sorting.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { SortingStep } from "../../types/element-states";
import { setDelay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";
import { getRandomArray, selectionSortAlgorithm, bubbleSortAlgorithm, getColumnState } from "./utils";

export const SortingPage: FC = () => {
  const [isLoading, setIsLoading] = useState({ ascending: false, descending: false });
  const [checked, setChecked] = useState('Выбор');
  const randomArray = useRef<number[]>(getRandomArray());
  const [steps, setSteps] = useState<SortingStep[]>([{currentArray: randomArray.current, sortedElements: []}]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleSort = async (direction: Direction) => {
    direction === Direction.Ascending ? setIsLoading({...isLoading, ascending: true}) : setIsLoading({...isLoading, descending: true});
    const sortSteps = (checked === 'Выбор' ? selectionSortAlgorithm : bubbleSortAlgorithm)(randomArray.current, direction);
    setSteps(sortSteps);
    for (let i = 0; i < sortSteps.length; i++) {
      await setDelay(DELAY_IN_MS);
      setCurrentStep(i);
    }
    direction === Direction.Ascending ? setIsLoading({...isLoading, ascending: false}) : setIsLoading({...isLoading, descending: false});
  };

  const createNewArray = () => {
    randomArray.current = getRandomArray();
    setSteps([{currentArray: randomArray.current, sortedElements: []}]);
    setCurrentStep(0);
  };
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.filterContainer}>
        <div className={styles.inputContainer}>
          <RadioInput
            label={'Выбор'}
            name={'sort'}
            defaultChecked
            value={'Выбор'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.value)}
          />
          <RadioInput
            label={'Пузырек'}
            name={'sort'}
            value={'Пузырек'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChecked(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <Button
            text={'По возрастанию'}
            type={"button"}
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={isLoading.ascending}
            extraClass={styles.button}
            disabled={isLoading.descending || !randomArray}
          />
          <Button
            text={'По убыванию'}
            type={"submit"}
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
            isLoader={isLoading.descending}
            extraClass={styles.button}
            disabled={isLoading.ascending || !randomArray}
          />
        </div>
        <Button
          text={'Новый массив'}
          type={"button"}
          onClick={createNewArray}
          extraClass={styles.button}
          disabled={isLoading.ascending || isLoading.descending}
        />
      </div>

        <ul className={styles.symbolContainer}>
          {steps.length > 0 && steps[currentStep].currentArray.map((symbol, index) => {
            return (
              <li key={index}>
                <Column
                  index={symbol}
                  state={getColumnState(index, steps[currentStep], currentStep, steps.length - 1)}
                />
              </li>
            )
          })}
        </ul>
    </SolutionLayout>
  );
};
