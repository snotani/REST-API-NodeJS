const express = require('express');
const router = express.Router();

const auctionData = require('./auction').auctionData;
const helper = require("./../helper");

const bidData = [
    [
        {
            id: 1,
            auctionId: "1",
            bidAmount: "2.99",
            bidderId: "30",
        }
    ], [], [], [], []
];

// POST api/auction/{auctionId}/bid - Place a bid for an auction
router.post('/:auctionId/bid', (req, res) => {
    // Find the auction I want to bid for in auction data array
    const auctionIdValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 404 status code for auction not found
    if (!auctionIdValue) return res.status(404).send("Auction not found");

    // 400 status code for invalid input
    const { error } = helper.validateBidInputData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newBid = {
        id: bidData[auctionIdValue.id-1].length + 1,
        auctionId: auctionIdValue.id,
        bidAmount: req.body.bidAmount,
        bidderId: req.body.bidderId,
    }

    bidData[auctionIdValue.id-1].push(newBid);
    res.status(200).send(newBid);
});

// GET api/auction/{auctionId}/bids - List bids for a particular auction
router.get('/:auctionId/bids', (req, res) => {
    const idValue = bidData[req.params.auctionId-1].find(f => f.auctionId === parseInt(req.params.auctionId));

    // 400 status code for auction not found
    if (!idValue) return res.status(400).send("Auction not found");

    res.status(200).send(bidData[idValue.auctionId-1]);
});

module.exports = router;
