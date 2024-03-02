import { FC, useState } from "react";
import styles from "./sorting.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { getRandomNumber, generateArray } from "../../utils/utils";
import { ElementStates, SymbolType } from "../../types/element-states";
import { swap, setDelay } from "../../utils/utils";
import { DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: FC = () => {
  const [isLoading, setIsLoading] = useState({ ascending: false, descending: false });
  const [checked, setChecked] = useState('Выбор');

  const createArr = () => {
    const newArray = generateArray(getRandomNumber(3, 17), 100).map((el) => {
      return {
        data: el,
        state: ElementStates.Default
      }
    });
    return newArray;
  };

 const [symbols, setSymbols] = useState<SymbolType<number>[]>(createArr());
  const selectionSort = async (symbols: SymbolType<number>[], isReverse: boolean = false) => {
    isReverse ? setIsLoading({...isLoading, descending: true}) : setIsLoading({...isLoading, ascending: true});
    for (let i = 0; i < symbols.length - 1; i++) {
      let minInd = i;
      for (let j = i + 1; j < symbols.length; j++) {
        symbols[i].state = ElementStates.Changing;
        symbols[j].state = ElementStates.Changing;
        setSymbols([...symbols]);
        await setDelay(DELAY_IN_MS);
        const condition = isReverse ? symbols[minInd].data < symbols[j].data : symbols[minInd].data > symbols[j].data;
        if (condition) {
          minInd = j;
        }
        symbols[j].state = ElementStates.Default;
        setSymbols([...symbols]);
      }
      if (minInd !== i) {
        swap(symbols, minInd, i);
      }
      symbols[i].state = ElementStates.Modified;
      symbols[i + 1].state = ElementStates.Modified;
    }
    isReverse ? setIsLoading({...isLoading, descending: false}) : setIsLoading({...isLoading, ascending: false});
  };
  
  const bubbleSort = async (symbols: SymbolType<number>[], isReverse: boolean = false) => {
    isReverse ? setIsLoading({...isLoading, descending: true}) : setIsLoading({...isLoading, ascending: true});
    for (let i = 0; i < symbols.length; i++) {
      for (let j = 0; j < symbols.length - i - 1; j++) {
        symbols[j].state = ElementStates.Changing;
        symbols[j + 1].state = ElementStates.Changing;
        setSymbols([...symbols]);
        await setDelay(DELAY_IN_MS);
        const condition = isReverse ? symbols[j].data < symbols[j + 1].data : symbols[j].data > symbols[j + 1].data;
        if (condition) {
          swap(symbols, j, j + 1);
        }
        symbols[j].state = ElementStates.Default;
        setSymbols([...symbols]);
      }
      symbols[symbols.length - 1 - i].state = ElementStates.Modified;
    }
    isReverse ? setIsLoading({...isLoading, descending: false}) : setIsLoading({...isLoading, ascending: false});
  };

  const handleAscendingSort = () => {
    symbols && (checked === 'Выбор' ? selectionSort(symbols) : bubbleSort(symbols));
  };

  const handleDescendingSort = () => {
    symbols && (checked === 'Выбор' ? selectionSort(symbols, true) : bubbleSort(symbols, true));
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
            onClick={handleAscendingSort}
            isLoader={isLoading.ascending}
            extraClass={styles.button}
            disabled={isLoading.descending || !symbols}
          />
          <Button
            text={'По убыванию'}
            type={"submit"}
            sorting={Direction.Descending}
            onClick={handleDescendingSort}
            isLoader={isLoading.descending}
            extraClass={styles.button}
            disabled={isLoading.ascending || !symbols}
          />
        </div>
        <Button
          text={'Новый массив'}
          type={"button"}
          onClick={() => setSymbols(createArr())}
          extraClass={styles.button}
          disabled={isLoading.ascending || isLoading.descending}
        />
      </div>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            return (
              <li key={index}>
                <Column
                  index={symbol.data}
                  state={symbol.state}
                />
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
