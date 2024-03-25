interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T;
    unPeak: () => T;
    reset: () => void;
    getItems: () => T[];
    getSize: () => number;
    isEmpty: () => boolean;
  }
  
  export class Queue<T> implements IQueue<T> {
    private container: T[] = [];
    private head = 0;
    private tail = 0;
    private length: number = 0;
    private readonly size: number = 0;
    private item: T | null = null;
  
    constructor(size: number, item: T | null) {
      this.size = size;
      this.item = item;
      this.container = Array(size).fill(item);
    }
  
    enqueue = (item: T) => {
      if (this.length >= this.size) {
        throw new Error("Maximum length exceeded");
      }
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    };
  
    dequeue = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      delete this.container[this.head % this.size];
      this.head++;
      this.length--;
    };
  
    peak = () => {
      if (this.isEmpty()) {
        throw new Error("No elements in the queue");
      }
      return this.container[this.head % this.size];
    };

    unPeak = () => {
      if (this.length > this.size) {
        throw new Error("Maximum length exceeded");
      }
      return this.container[this.tail-1 % this.size];
    };

    reset = () => {
      this.container = Array(this.size);
      this.head = 0;
      this.tail = 0;
      this.length = 0;
    };

    getHead = () => this.head;

    getTail = () => this.tail;

    getSize = () => this.length;

    getItems = (): T[] => this.container;
  
    isEmpty = () => this.length === 0;
  }
  
  