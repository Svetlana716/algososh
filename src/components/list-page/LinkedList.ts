class Node<T> {
    value: T
    next: Node<T> | null

    constructor(value: T, next: Node<T> | null = null) {
        this.value = value;
        this.next = next;
    }
}

interface ILinkedList<T> {
    append: (element: T) => this;
    prepend: (element: T) => this;
    deleteHead: () => void;
    deleteTail: () => void;
    getHead: () => Node<T> | null;
    getTail: () => Node<T> | null;
    insertAt: (element: T, index: number) => void;
    deleteFromIndex: (index: number) => void;
    findByIndex: (index: number) => T | undefined;
    toArray: () => T[];
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    private size: number;

    constructor(arr: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0;
        arr.forEach(item => this.append(item));
    }

    append(element: T) {
        const node = new Node(element);
        if (!this.head || !this.tail) {
            this.head = node;
            this.tail = node;
            this.size++;
            return this;
        }

        this.tail.next = node;
        this.tail = node;
        this.size++;
        return this;
    };

    prepend(element: T) {
        const node = new Node(element, this.head);
        this.head = node;

        if (!this.tail) {
            this.tail = node;
        }
        this.size++;
        return this;
    };

    deleteHead() {
        if (!this.head) {
            return;
        };

        this.head = this.head.next;
        this.size--;
    };

    getHead() {
        return this.head;
    };

    deleteTail() {
        if (!this.tail) {
            return;
        };

        if (this.head === this.tail) {
            this.head = null;
            this.tail = null;
        }

        let current = this.head;

        while (current?.next) {
            if (!current.next.next) {
                current.next = null;
            } else {
                current = current.next;
            }
        }
        this.tail = current;
        this.size--;
    };

    getTail() {
        return this.tail;
    };

    insertAt(element: T, index: number) {
        if (index >= 0 && index <= this.size) {
            const node = new Node(element);
            let current = this.head;
            let currentIndex = 0;
            let previous = null;
    
            if (!this.head) {
                this.head = node;
            }
            else {
                if (index === 0) {
                    this.head = node;
                    node.next = current;
                }
                else {
                    while (currentIndex < index) {
                        previous = current;
                        current = current!.next;
                        currentIndex++;
                    }
                    previous!.next = node;
                    node.next = current;
                }
            }
            this.size++;
        }
        else {
            throw new Error('Enter a valid index');
        }
    };

    deleteFromIndex (index: number) {
        if (index >= 0 && index <= this.size) {
            let current = this.head;
            let currentIndex = 0;
            let previous = null;

            if (index === 0) {
                this.head = current!.next
            } else {
                while (currentIndex < index) {
                    previous = current;
                    current = current!.next;
                    currentIndex++;
                }
                previous!.next = current!.next
            }
            this.size--;
        } else {
            throw new Error('Enter a valid index');
        }
    };

    findByIndex (index: number) {
        if (index >= 0 && index <= this.size) {
            let current = this.head;
            let currentIndex = 0;
            while(currentIndex < index) {
                current = current!.next;
                currentIndex++;
            }
            return current?.value;
        } else {
            throw new Error('Enter a valid index');
        }
    };

    toArray() {
        let current = this.head;
        const array = [];

        while (current) {
            array.push(current.value);
            current = current.next;
        };
        return array;
    };
    
    getSize() {
        return this.size;
    };
};