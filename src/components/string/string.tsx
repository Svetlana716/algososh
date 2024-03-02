import styles from "./string.module.css";
import { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { ElementStates, SymbolType } from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { swap, setDelay } from "../../utils/utils";

export const StringComponent: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [symbols, setSymbols] = useState<SymbolType<string>[]>();

  const reverseWord = async (string: string) => {
    setIsLoading(true);
    const arr = string.split('').map((el) => {
      return {
        data: el,
        state: ElementStates.Default,
      }
    });
    setSymbols(arr)
    let start = 0;
    let end = arr.length - 1;
    let mid = Math.floor((start + end) / 2);
    while (start < end) {
      arr[start].state = ElementStates.Changing;
      arr[end].state = ElementStates.Changing;
      setSymbols([...arr]);
      await setDelay(DELAY_IN_MS);
      swap(arr, start, end);
      arr[start++].state = ElementStates.Modified;
      arr[end--].state = ElementStates.Modified;
      setSymbols([...arr]);
    }
    arr[mid].state = ElementStates.Modified;
    setInput('');
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      reverseWord(input);
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
