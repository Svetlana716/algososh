import { FC, useMemo, useState } from "react";
import styles from './queue.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, SymbolType } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { Queue } from "./Queue";

export const QueuePage: FC = () => {
  const [isLoading, setIsLoading] = useState({ add: false, delete: false, reset: false });
  const [input, setInput] = useState('');
  const defaultSymbol = {
    data: '',
    state: ElementStates.Default,
  };
  const queueSize = 7;
  const queue = useMemo(() => new Queue<SymbolType<String | number>>(queueSize, defaultSymbol), []);
  const [symbols, setSymbols] = useState<SymbolType<String | number>[]>(queue.getItems());
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleAddItem = async (input: string) => {
    setIsLoading({ ...isLoading, add: true });
    defaultSymbol.data = input;
    defaultSymbol.state = ElementStates.Changing;
    queue.enqueue(defaultSymbol);
    setSymbols([...queue.getItems()]);
    await setDelay(SHORT_DELAY_IN_MS);
    queue.unPeak()!.state = ElementStates.Default;
    setSymbols([...queue.getItems()]);
    setInput('');
    setIsLoading({ ...isLoading, add: false });
  };

  const handleDeleteItem = async () => {
    setIsLoading({ ...isLoading, delete: true });
    if (queue.peak()) {
      queue.peak()!.state = ElementStates.Changing;
    };
    setSymbols([...queue.getItems()]);
    await setDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setSymbols([...queue.getItems()]);
    setIsLoading({ ...isLoading, delete: false });
  };

  const handleResetQueue = () => {
    setIsLoading({ ...isLoading, reset: true });
    queue.reset();
    setSymbols([...queue.getItems()]);
    setInput('');
    setIsLoading({ ...isLoading, reset: false });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddItem(input);
  };

  const head = (index: number) => queue.getHead() === index && queue.getSize() > 0 ? 'head' : '';
  const tail = (index: number) => queue.getTail() - 1 === index ? 'tail' : '';
  const limit = queueSize === queue.getSize() || queue.getTail() === queueSize;
  return (
    <SolutionLayout title="Очередь">
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
          disabled={limit || !input}
        />

        <Button
          text={'Удалить'}
          type={"button"}
          onClick={handleDeleteItem}
          isLoader={isLoading.delete}
          disabled={queue.isEmpty()}
        />

        <Button
          extraClass={styles.resetButton}
          text={'Очистить'}
          type={"button"}
          onClick={handleResetQueue}
          isLoader={isLoading.reset}
        />
      </form>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            if (symbol === undefined) {
              symbol = defaultSymbol;
            }
            return (
              <li key={index}>
                <Circle
                  letter={symbol.data.toString()}
                  state={symbol.state}
                  isSmall={true}
                  index={index}
                  head={head(index)}
                  tail={tail(index)}
                />
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
