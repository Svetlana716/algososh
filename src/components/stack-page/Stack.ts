interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getItems: () => T[];
    setEmpty: () => T[];
  }
  
  export class Stack<T> implements IStack<T> {
    private container: T[] = [];
  
    push = (item: T): void => {
      this.container.push(item);
    };
  
    pop = () => {
      if (this.getSize() > 0) {
        this.container.pop();
      }
    };
  
    peak = () => {
      if (this.getSize() !== 0) {
        return this.container[this.getSize() - 1];
      }
      return null;
    };
  
    getSize = () => this.container.length;

    getItems = () => this.container;

    setEmpty = () =>  this.container = [];
  };