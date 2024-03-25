export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
};

export type SymbolType<T> = {
  data: T;
  state: ElementStates;
};

export type ExtraCircleType = {
  index: number;
  data: string | number | undefined;
  position: 'top' | 'bottom' | undefined;
};

export type SortingStep = {
  firstCheckableElement?: number;
  secondCheckableElement?: number;
  currentArray: number[];
  sortedElements: number[];
};