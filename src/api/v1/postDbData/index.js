const express = require('express');

const postDbDataController = require('./postDbData.controller');

const router = express.Router();

const initialize = () => {
    router.route('/runQuery').post(postDbDataController.runQuery);
    return router;
}

module.exports.initialize = initialize;
