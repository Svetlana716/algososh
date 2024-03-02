type arrType = { data: string | number };

export const swap = (arr: arrType[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex]?.data;
    arr[firstIndex].data = arr[secondIndex].data;
    arr[secondIndex].data = temp;
};

export const setDelay = (ms: number) => {
    return new Promise((res) => setTimeout(res, ms));
};

export const getRandomNumber = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateArray = (length: number, max: number) => (
    [...new Array(length)]
        .map(() => Math.round(Math.random() * max))
);