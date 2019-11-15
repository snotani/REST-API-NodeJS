const express = require('express');
const router = express.Router();

const helper = require("./../helper");

const auctionData = [
    {
        id: 1,
        status: "available",
        name: "Alice in Wonderland by Lewis Caroll (Hardover)",
        firstBid: "0.99",
        sellerId: "20"
    }
];

// POST /api/auction - Add a new auction
router.post('/', (req, res) => {
    // 400 status code for invalid input
    const { error } = helper.validateAuctionInputData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newAuction = {
        id: auctionData.length + 1,
        status: "available",
        name: req.body.name,
        firstBid: req.body.firstBid,
        sellerId: req.body.sellerId,
    }
    auctionData.push(newAuction);
    res.status(200).send(newAuction);
});

// GET /api/auction/{auctionId} - Find auction by id
router.get('/:auctionId', (req, res) => {
    const idValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 400 status code for invalid id supplied
    if (isNaN(req.params.auctionId)) return res.status(400).send("Invalid ID supplied");

    // 404 status code for auction not found
    if (!idValue) return res.status(404).send("Auction not found");

    // 200 status code for success
    res.status(200).send(idValue);
});

// POST /api/auction/{auctionId} - Updates an auction in the store with form data
router.post('/:auctionId', (req, res) => {
    const idValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 404 status code for auction not found
    if (!idValue) return res.status(404).send("Auction not found");

    // 400 status code for invalid input
    const { error } = helper.validateAuctionInputData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    idValue.name = req.body.name;
    idValue.firstBid = req.body.firstBid;
    idValue.sellerId = req.body.sellerId;
    res.status(200).send(idValue);
});

// DELETE /api/auction/{auctionId} - Deletes an auction
router.delete('/:auctionId', (req, res) => {
    const idValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 400 status code for invalid id supplied
    if (isNaN(req.params.auctionId)) return res.status(400).send("Invalid ID supplied");

    // 404 status code for auction not found
    if (!idValue) return res.status(404).send("Auction not found");

    // 200 status code for success on delete
    const index = auctionData.indexOf(idValue);
    auctionData.splice(index, 1);
    res.status(200).send(idValue);
});

module.exports = router;
module.exports.auctionData = auctionData;
