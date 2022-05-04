/** Frequency counter object from an array
@param {Array} arr 
*/
function frequencyCounter(arr) {
    return arr.reduce((num, next) => {
        num[next] = (num[next] || 0) + 1;
        return num;
    }, {});
}


/** Get the most frequent element in the array
@param {Array} arr 
*/
function findMode(arr) {
    let freqCounter = frequencyCounter(arr);
    let count = 0;
    let mostFreq;

    for (let key in freqCounter) {
        if (freqCounter[key] > count) {
            mostFreq = key;
            count = freqCounter[key];
        }
    }
    return +mostFreq;
}


/** Convert an array of strings to an array of numbers
@param {Array} numsAsStrings array of strings
@returns {Array|Error} return an array or an error obj.
*/
function convertAndValidateNumsArray(numsAsStrings) {
    let res = [];

    for (let i = 0; i < numsAsStrings.length; i++) {
        let valToNum = Number(numsAsStrings[i]);

        if (Number.isNaN(valToNum)) {
            return new Error(
                `The value "${numsAsStrings[i]}" at index ${i} is not a valid number.`
            );
        }
        res.push(valToNum);
    }
    return res;
}


// Find the average from an array of numbers.
function findMean(nums) {
    if (nums.length === 0) return 0;
    return nums.reduce((acc, cur) => {
        return acc + cur;
    }) / nums.length
}


// Sort and Find the midpoint from an array of numbers.
function findMedian(nums) {

    nums.sort((a, b) => a - b);

    let midIndex = Math.floor(nums.length / 2);
    let median;

    if (nums.length % 2 === 0) {
        median = (nums[midIndex] + nums[midIndex - 1]) / 2;
    } else {
        median = nums[midIndex];
    }
    return median;
}


module.exports = {
    frequencyCounter,
    findMode,
    convertAndValidateNumsArray,
    findMean,
    findMedian
};