const express = require('express');
const app = express();
const ExpressError = require('./expressError');

const {
    findMode,
    convertAndValidateNumsArray,
    findMean,
    findMedian
} = require('./functions')

app.get('/mean', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("You must pass a query key of numbers with a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    //check if input of numbers were bad.
    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mean",
        result: findMean(nums)
    }

    return res.send(result);
});


app.get('/median', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("You must pass a query key of numbers with a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    //check if input of numbers were bad.
    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "median",
        result: findMedian(nums)
    }

    return res.send(result);
});


app.get('/mode', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("You must pass a query key of numbers with a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    //check if input of numbers were bad.
    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "mode",
        result: findMode(nums)
    }

    return res.send(result);
});


//Further study - make a route called /all that does all three operations at the same time.
app.get('/all', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("You must pass a query key of numbers with a comma-separated list of numbers.", 400)
    }

    let numsAsStrings = req.query.nums.split(',');
    //check if input of numbers were bad.
    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let result = {
        operation: "all",
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums)
    }

    return res.send(result);
});


//General error handlers

app.use((req, res, next) => {
    const err = new ExpressError("Not found", 404)
    return next(err);
});

app.use((req, res, next) => {
    res.status(err.status || 500);

    return res.json({
        error: err,
        message: err.message
    });
});


app.listen(3000, function () {
    console.log(`Server starting on port 3000`);
});