import styles from "./string.module.css";
import { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates, SymbolType } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { reverseWordAlgorithm } from "./utils";

export const StringComponent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [symbols, setSymbols] = useState<SymbolType<string>[]>();

  //визуализация разворота строки
  const reverseWord = async () => {
    setIsLoading(true);
    let arr = input.split('').map((el) => { // введеное в инпут значение преобразуем в массив объектов в данными и состоянием
      return {
        data: el,
        state: ElementStates.Default,
      }
    });
    setSymbols([...arr]); // записываем исходный массив в  стейт
    await setDelay(DELAY_IN_MS);
    const mid = Math.floor((input.length) / 2); // находим середину строки

    const arrays = reverseWordAlgorithm(input); // вызываем функцию разворота строки, которая вернет массивы изменения строки в процессе переворачивания

    for (let i = 0; i < mid; i++) { // проходимся в цикле по элементам массива
      let start = i;
      let end = input.length - 1 - i;

      arr[start].state = ElementStates.Changing; //меняем состояние элементов исходного массива
      arr[end].state = ElementStates.Changing;
      setSymbols([...arr]); // записываем в стейт изменения

      await setDelay(DELAY_IN_MS);

      arr = [...arrays[i].map((el, index) => ({ // меняем исходный массив, на массивы которая вернула функю reverseWordAlgorithm 
        data: el,
        state: index <= start || index >= end ? ElementStates.Modified : ElementStates.Default // окрашиваем зеленым уже отсортированные элементы
      }))]
      setSymbols([...arr]);
    };
    arr[mid].state = ElementStates.Modified; // если строка с нечетным кол-вом символов отдельно откашиваем центральный элемент 
    setInput('');
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      reverseWord();
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  
  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          onChange={handleChange}
          value={input}
          isLimitText
          maxLength={19}
          max={19}
        />

        <Button
          text={'Развернуть'}
          type={"submit"}
          isLoader={isLoading}
          disabled={isLoading || !input}
        />
      </form>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={symbol.data}
                  state={symbol.state}
                  isSmall={true}
                />
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
