import { swap } from "../../utils/utils";

//алгоритм разворота строки
export const reverseWordAlgorithm = (string: string): string[][] => { // принимает на вход строку из инпута. Напр "рука"
    const array = string.split(''); // делаем из строки массив
    let start = 0;
    let end = array.length - 1;
    const middle = Math.floor(array.length / 2);
    const res = [];
    while (start < middle) { // проходимся в цикле до середины  массива
        swap(array, start, end); // меняем местами элементы с начала и с конца массива
        res.push([...array]); // пушим в результирующий массив промежуточный результат работы алгоритма (нужно для анимации)
        start++;
        end--;
    };
    return res; // возвращает массив с массивами всех перестановок. Напр [['а', 'у', 'к', 'р'], ['а', 'к', 'у', 'р']]
};