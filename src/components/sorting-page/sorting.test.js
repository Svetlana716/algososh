import { selectionSortAlgorithm, bubbleSortAlgorithm } from "./utils";
import { Direction } from "../../types/direction";

describe ('selection ascending sort algorithm test case', () => {
    test('empty array', () => {
        expect(selectionSortAlgorithm([])).toEqual([{currentArray: [], sortedElements: []}]);
    });

    test('one element array', () => {
        expect(selectionSortAlgorithm([1])).toEqual([{currentArray: [1], sortedElements: []}]);
    });

    test('array of several elements', () => {
        expect(selectionSortAlgorithm([3, 1, 2])).toEqual([
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [3, 1, 2], sortedElements: []},
            {firstCheckableElement: 0, secondCheckableElement: 2, currentArray: [3, 1, 2], sortedElements: [0]},
            {firstCheckableElement: 1, secondCheckableElement: 2, currentArray: [1, 3, 2], sortedElements: [0, 1]},
            {currentArray: [1, 2, 3], sortedElements: [0, 1]}]);
    });
});

describe ('selection descending sort algorithm test case', () => {
    test('empty array', () => {
        expect(selectionSortAlgorithm([])).toEqual([{currentArray: [], sortedElements: []}]);
    });

    test('one element array', () => {
        expect(selectionSortAlgorithm([1])).toEqual([{currentArray: [1], sortedElements: []}]);
    });

    test('array of several elements', () => {
        expect(selectionSortAlgorithm([3, 1, 2], Direction.Descending)).toEqual([
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [3, 1, 2], sortedElements: []},
            {firstCheckableElement: 0, secondCheckableElement: 2, currentArray: [3, 1, 2], sortedElements: [0]},
            {firstCheckableElement: 1, secondCheckableElement: 2, currentArray: [3, 1, 2], sortedElements: [0, 1]},
            {currentArray: [3, 2, 1], sortedElements: [0, 1]}]);
    });
});

describe ('bubble ascending sort algorithm test case', () => {
    test('empty array', () => {
        expect(bubbleSortAlgorithm([])).toEqual([{currentArray: [], sortedElements: []}]);
    });

    test('one element array', () => {
        expect(bubbleSortAlgorithm([1])).toEqual([{currentArray: [1], sortedElements: []}]);
    });

    test('array of several elements', () => {
        expect(bubbleSortAlgorithm([3, 1, 2])).toEqual([
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [3, 1, 2], sortedElements: []},
            {firstCheckableElement: 1, secondCheckableElement: 2, currentArray: [1, 3, 2], sortedElements: [2]},
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [1, 2, 3], sortedElements: [2, 1, 0]},
            {currentArray: [1, 2, 3], sortedElements: [2, 1, 0]}]);
    });
});

describe ('bubble descending sort algorithm test case', () => {
    test('empty array', () => {
        expect(bubbleSortAlgorithm([])).toEqual([{currentArray: [], sortedElements: []}]);
    });

    test('one element array', () => {
        expect(bubbleSortAlgorithm([1])).toEqual([{currentArray: [1], sortedElements: []}]);
    });

    test('array of several elements', () => {
        expect(bubbleSortAlgorithm([3, 1, 2], Direction.Descending)).toEqual([
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [3, 1, 2], sortedElements: []},
            {firstCheckableElement: 1, secondCheckableElement: 2, currentArray: [3, 1, 2], sortedElements: [2]},
            {firstCheckableElement: 0, secondCheckableElement: 1, currentArray: [3, 2, 1], sortedElements: [2, 1, 0]},
            {currentArray: [3, 2, 1], sortedElements: [2, 1, 0]}]);
    });
});