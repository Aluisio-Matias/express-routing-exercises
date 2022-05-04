const {
    findMean,
    findMedian,
    findMode
} = require('./functions');

describe('#findMean', () => {
    test('Finds the average of a an empty array', () => {
        expect(findMean([])).toEqual(0)
    })
    test('Finds the average of an array of numbers.', () => {
        expect(findMean([2, 1, 4, -2, 3])).toEqual(1.6)
    });
});

describe('#findMedian', () => {
    test('Finds the median of an odd set of numbers.', () => {
        expect(findMedian([1, 2, -1, 3, 5])).toEqual(2)
    })
    test('Finds the median of an even set of numbers.', () => {
        expect(findMedian([1, -1, 3, 4, 8, 7])).toEqual(3.5)
    });
});

describe('#findMode', () => {
    test('Finds the most frequent number in a set of numbers.', () => {
        expect(findMode([1, 2, 3, 4, 4, 5, 6, 7, 8])).toEqual(4)
    });
});