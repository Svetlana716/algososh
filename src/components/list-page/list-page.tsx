import { FC, useMemo, useState } from "react";
import styles from './list.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { ElementStates, SymbolType, ExtraCircleType } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { setDelay } from "../../utils/utils";
import { LinkedList } from "./LinkedList";
import { useForm } from "../../hooks/useForm";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { generateArray } from "../../utils/utils";

export const ListPage: FC = () => {
  const [isLoading, setIsLoading] = useState({
    addInHead: false,
    addInTail: false,
    deleteFromHead: false,
    deleteFromTail: false,
    addByIndex: false,
    deleteByIndex: false,
  });

  const { values, handleChange, setValues } = useForm({ value: '', index: '' });
  const { value, index } = values;

  const defaultSymbol: SymbolType<string | number> = {
    data: '',
    state: ElementStates.Default
  };

  const list = useMemo(() => new LinkedList<SymbolType<string | number>>(generateArray(4, 9999).map(item => {
    return {... defaultSymbol, data: item};
  })), []);

  const [symbols, setSymbols] = useState<SymbolType<string | number>[]>(list.toArray());
  const [extraCircle, setExtraCircle] = useState<ExtraCircleType>({ index: -1, data: undefined, position: undefined });

  const handleAddInHeadItem = async () => {
    setIsLoading({ ...isLoading, addInHead: true });
    setExtraCircle({ index: 0, data: value, position: 'top' });
    await setDelay(SHORT_DELAY_IN_MS);
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    list.prepend({ ... defaultSymbol, data: value, state: ElementStates.Modified });
    setValues({ value: '', index: '' });
    setSymbols([...list.toArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.getHead()!.value.state = ElementStates.Default;
    setIsLoading({ ...isLoading, addInHead: false });
  };

  const handleAddInTailItem = async () => {
    setIsLoading({ ...isLoading, addInTail: true });
    setExtraCircle({ index: symbols.length - 1, data: value, position: 'top' });
    await setDelay(SHORT_DELAY_IN_MS);
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    list.append({ ... defaultSymbol, data: value, state: ElementStates.Modified });
    setValues({ value: '', index: '' });
    setSymbols([...list.toArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.getTail()!.value.state = ElementStates.Default;
    setIsLoading({ ...isLoading, addInTail: false });
  };

  const handleDeleteFromHeadItem = async () => {
    setIsLoading({ ...isLoading, deleteFromHead: true });
    setExtraCircle({ index: 0, data: list.getHead()?.value.data, position: 'bottom' });
    list.getHead()!.value.data = '';
    await setDelay(SHORT_DELAY_IN_MS);
    list.deleteHead();
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    setSymbols([...list.toArray()]);
    setIsLoading({ ...isLoading, deleteFromHead: false });
  };

  const handleDeleteFromTailItem = async () => {
    setIsLoading({ ...isLoading, deleteFromTail: true });
    setExtraCircle({ index: symbols.length - 1, data: list.getTail()?.value.data, position: 'bottom' });
    list.getTail()!.value.data = '';
    await setDelay(SHORT_DELAY_IN_MS);
    list.deleteTail();
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    setSymbols([...list.toArray()]);
    setIsLoading({ ...isLoading, deleteFromTail: false });
  };

  const handleAddItemToIndex = async () => {
    setIsLoading({ ...isLoading, addByIndex: true });
    for (let i = 0; i < Number(index); i++) {
      setExtraCircle({ index: i, data: value, position: 'top' });
      list.findByIndex(Number(i))!.state = ElementStates.Changing;
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    list.insertAt({ ... defaultSymbol, data: value, state: ElementStates.Modified }, Number(index));
    setValues({ value: '', index: '' });
    setSymbols([...list.toArray()]);
    for (let i = 0; i < Number(index); i++) {
      list.findByIndex(Number(i))!.state = ElementStates.Default;
    }
    setSymbols([...list.toArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.findByIndex(Number(index))!.state = ElementStates.Default;
    setIsLoading({ ...isLoading, addByIndex: false });
  };

  const handleDeleteItemFromIndex = async () => {
    setIsLoading({ ...isLoading, deleteByIndex: true });
    for (let i = 0; i <= Number(index); i++) {
      list.findByIndex(Number(i))!.state = ElementStates.Changing;
      setSymbols([...list.toArray()]);
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setExtraCircle({ index: Number(index), data: list.findByIndex(Number(index))!.data, position: 'bottom' });
    list.findByIndex(Number(index))!.state = ElementStates.Default;
    list.findByIndex(Number(index))!.data = '';
    setSymbols([...list.toArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    list.deleteFromIndex(Number(index));
    setValues({ value: '', index: '' });
    setExtraCircle({ index: -1, data: undefined, position: undefined });
    for (let i = 0; i <= Number(index) - 1; i++) {
      list.findByIndex(Number(i))!.state = ElementStates.Default;
    }
    setSymbols([...list.toArray()]);
    setIsLoading({ ...isLoading, deleteByIndex: false });
  };

  const extraCircleStyles = extraCircle.position === 'top' ? styles.extraCircleTop : styles.extraCircleBottom;

  const head = (index: number) => {
    if (extraCircle.index === index && extraCircle.position === 'top') {
      return <Circle letter={extraCircle.data?.toString()} state={ElementStates.Changing} isSmall extraClass={extraCircleStyles}/>
    } else if (index === 0) {
      return 'head';
    } else {
      return null;
    }
  };

  const tail = (index: number) => {
    if (extraCircle.index === index && extraCircle.position === 'bottom') {
      return <Circle letter={extraCircle.data?.toString()} state={ElementStates.Changing} isSmall extraClass={extraCircleStyles}/>
    } else if (index === symbols.length - 1) {
      return 'tail';
    } else {
      return null;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <div className={styles.formElement}>
          <Input
            extraClass={styles.input}
            placeholder={'Введите значение'}
            onChange={handleChange}
            value={value}
            name={'value'}
            isLimitText={true}
            maxLength={4}
            max={4}
          />
          <Button
            text={'Добавить в head'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleAddInHeadItem}
            isLoader={isLoading.addInHead}
            disabled={!value || isLoading.addByIndex || isLoading.deleteByIndex}
          />
          <Button
            text={'Добавить в tail'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleAddInTailItem}
            isLoader={isLoading.addInTail}
            disabled={!value || isLoading.addByIndex || isLoading.deleteByIndex}
          />
          <Button
            text={'Удалить из head'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleDeleteFromHeadItem}
            isLoader={isLoading.deleteFromHead}
            disabled={!symbols.length || isLoading.addByIndex || isLoading.deleteByIndex}
          />
          <Button
            text={'Удалить из tail'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleDeleteFromTailItem}
            isLoader={isLoading.deleteFromTail}
            disabled={!symbols.length || isLoading.addByIndex || isLoading.deleteByIndex}
          />
        </div>

        <div className={styles.formElement}>
          <Input
            extraClass={styles.input}
            type="number"
            placeholder={'Введите индекс'}
            onChange={handleChange}
            value={index}
            name={'index'}
          />
          <Button
            text={'Добавить по индексу'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleAddItemToIndex}
            isLoader={isLoading.addByIndex}
            disabled={!value || !index || Number(index) > list.getSize()}
          />
          <Button
            text={'Удалить по индексу'}
            extraClass={styles.button}
            type={"button"}
            onClick={handleDeleteItemFromIndex}
            isLoader={isLoading.deleteByIndex}
            disabled={!index || !symbols.length || Number(index) >= list.getSize()}
          />
        </div>
      </form>

      {symbols && (
        <ul className={styles.symbolContainer}>
          {symbols?.map((symbol, index) => {
            return (
              <li key={index} className={styles.symbol}>
                <Circle
                  letter={symbol.data.toString()}
                  state={symbol.state}
                  index={index}
                  head={head(index)}
                  tail={tail(index)}
                />
                { symbols.length > 1 && <ArrowIcon/>}
              </li>
            )
          })}
        </ul>
      )}
    </SolutionLayout>
  );
};
