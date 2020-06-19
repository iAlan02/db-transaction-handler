const express = require('express');

const routePostDbData = require('./postDbData');

const routeIndex = express.Router();

const initialize = () => {
    const postDbData = routePostDbData.initialize();
    routeIndex.use('/postDb', postDbData);
    return routeIndex;
};
module.exports.initialize = initialize;
