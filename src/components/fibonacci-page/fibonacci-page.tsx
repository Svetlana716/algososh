import styles from "./fibonacci.module.css";
import { FC, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { DELAY_IN_MS } from "../../constants/delays";
import { setDelay } from "../../utils/utils";

export const FibonacciPage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [symbols, setSymbols] = useState<number[]>();

  const getFibonacciNumber = async (n: number) => {
    setIsLoading(true);
    let a = 1;
    let b = 1;
    const result = n < 2 ? [1] : [1, 1];
    setSymbols(result);
    for (let i = 3; i <= n + 1; i++) {
      let c = a + b;
      a = b;
      b = c;
      await setDelay(DELAY_IN_MS);
      result.push(b);
      setSymbols([...result]);
    }
    setInput('');
    setIsLoading(false);
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      getFibonacciNumber(Number(input));
    }
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInput(e.target.value);
};

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
     <form className={styles.form} onSubmit={handleSubmit}>
        <Input 
        onChange={handleChange}
        value={input}
        isLimitText
        type={"number"}
        max={19}
        />

        <Button 
        text={'Рассчитать'}
        type={"submit"}
        isLoader={isLoading}
        disabled={!input || Number(input) > 19}
        />
      </form>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            return (
              <li key={index}>
                <Circle
                  letter={symbol.toString()}
                  isSmall={true}
                  index={index}
                />
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
