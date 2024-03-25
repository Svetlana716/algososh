import { reverseWordAlgorithm } from "./utils";

describe('reverse word algorithm test case', () => {
    test('with an even number of characters', () => {
        expect(reverseWordAlgorithm('123456')).toEqual([['6', '2', '3', '4', '5', '1'], ['6', '5', '3', '4', '2', '1'], ['6', '5', '4', '3', '2', '1']]);
    });

    test('with an odd number of characters', () => {
        expect(reverseWordAlgorithm('1234567')).toEqual([['7', '2', '3', '4', '5', '6', '1'], ['7', '6', '3', '4', '5', '2', '1'], ['7', '6', '5', '4', '3', '2', '1']]);
    });

    test('with one character', () => {
        expect(reverseWordAlgorithm('1')).toEqual([]);
    });

    test('with empty string', () => {
        expect(reverseWordAlgorithm('')).toEqual([]);
    });
})