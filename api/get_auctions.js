const express = require('express');
const Joi = require('joi');
const router = express.Router();

const auctionData = require('./auction').auctionData;

// GET api/auctions - List all auctions
router.get('/', (req, res, next) => {
    res.status(200).send(auctionData);
});

module.exports = router;
