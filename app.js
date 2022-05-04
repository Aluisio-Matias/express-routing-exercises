const express = require('express');
const app = express();
app.use(express.json());
const ExpressError = require('./expressError');

const fs = require('fs');
const process = require('process');


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


/* Further Study - Provide special handling for an optional query key called save that can be set to true. 
This means the operation will write to a file. For example, /save-all?nums=1,3,5&save=true will return a json response 
and will write to a file called results.json. */

app.get('/save-all', (req, res, next) => {
    if (!req.query.nums) {
        throw new ExpressError("You must pass a query key of numbers with a comma-separated list of numbers.", 400)
    }
    let numsAsStrings = req.query.nums.split(',');
    //check if input of numbers were bad.
    let nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }
    
    let save = req.query.save == "true";

    let result = {
        operation: "all",
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums)
    }

    if (save == true) {
        fs.writeFile('results.json', `${JSON.stringify(result, null, 5)}\n`, {encoding: 'utf8', flag: 'a'}, err => {
            if (err) {
                console.log("ERROR!!!", err)
                process.kill(1)
              }
        } )
    }
    return res.json(result)
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