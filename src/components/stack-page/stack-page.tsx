import { FC, useMemo, useState } from "react";
import styles from './stack.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, SymbolType } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { Stack } from "./Stack";

export const StackPage: FC = () => {
  const [isLoading, setIsLoading] = useState({add: false, delete: false, reset: false});
  const [input, setInput] = useState('');
  const [symbols, setSymbols] = useState<SymbolType<String | number>[]>([]);


  const stack = useMemo(() => new Stack<SymbolType<String | number>>(), []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddItem = async (input: string) => {
    setIsLoading({...isLoading, add: true});
    const symbol = {
        data: input,
        state: ElementStates.Changing,
    };
    stack.push(symbol);
    setSymbols([...stack.getItems()]);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.peak()!.state = ElementStates.Default;
    setSymbols([...stack.getItems()]);
    setInput('');
    setIsLoading({...isLoading, add: false});
  };

  const handleDeleteItem = async () => {
    setIsLoading({...isLoading, delete: true});
    if (stack.peak()) {
     stack.peak()!.state = ElementStates.Changing; 
    };
    setSymbols([...stack.getItems()]);
    await setDelay(SHORT_DELAY_IN_MS);
    stack.pop();
    setSymbols([...stack.getItems()]);
    setIsLoading({...isLoading, delete: false});
  };

  const handleResetStack = () => {
    setIsLoading({...isLoading, reset: true});
    stack.setEmpty();
    setSymbols([...stack.getItems()]);
    setIsLoading({...isLoading, reset: false});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
      handleAddItem(input);
  };

  const head = (index: number) => symbols.length - 1 === index ? 'top' : null;

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
        extraClass={styles.input}
          onChange={handleChange}
          value={input}
          isLimitText={true}
          maxLength={4}
          max={4}
        />

        <Button
          text={'Добавить'}
          type={"submit"}
          isLoader={isLoading.add}
          disabled={!input}
        />

        <Button
          text={'Удалить'}
          type={"button"}
          onClick={handleDeleteItem}
          isLoader={isLoading.delete}
          disabled={!symbols.length}
        />

        <Button
          extraClass={styles.resetButton}
          text={'Очистить'}
          type={"button"}
          onClick={handleResetStack}
          isLoader={isLoading.reset}
          disabled={!symbols.length}
        />
      </form>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={symbol.data.toString()}
                  state={symbol.state}
                  isSmall={true}
                  index={index}
                  head={head(index)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
