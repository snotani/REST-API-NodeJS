const express = require('express');
const Joi = require('joi');
const router = express.Router();

const auctionData = [
    {
        id: 1,
        status: "available",
        name: "Alice in Wonderland by Lewis Caroll (Hardover)",
        firstBid: 0.99,
        sellerId: 20,
    }
];

// POST /api/auction - Add a new auction
router.post('/', (req, res, next) => {
    const { error }= validateAuctionInputData(req.body);
    
    // 400 status code for invalid input
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const newAuction = {
        id: auctionData.length + 1,
        status: "available",
        name: req.body.name,
        firstBid: req.body.firstBid,
        sellerId: req.body.sellerId,
    }
    auctionData.push(newAuction);
    res.status(200).send(newAuction)
});

// GET /api/auction/{auctionId} - Find auction by id
router.get('/:auctionId', (req, res, next) => {
    const idValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 400 status code for invalid id supplied
    if (isNaN(req.params.auctionId)) res.status(400).send("Invalid ID supplied");

    // 404 status code for auction not found
    if (!idValue) res.status(404).send("Auction not found");

    // 200 status code for success
    res.status(200).send(idValue);
});

// POST /api/auction/{auctionId} - Updates an auction in the store with form data
router.post('/:auctionId', (req, res, next) => {
    const idValue = auctionData.find(f => f.id === parseInt(req.params.auctionId));

    // 404 status code for auction not found
    if (!idValue) res.status(404).send("Auction not found");

    const { error } = validateAuctionInputData(req.body);
    // 400 status code for invalid input
    if (error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    idValue.name = req.body.name;
    idValue.firstBid = req.body.firstBid;
    idValue.sellerId = req.body.sellerId;
    res.status(200).send(idValue)
});

// DELETE /api/auction/{auctionId}
router.delete('/:auctionId', (req, res, next) => {
    
});

// Validate input form data for auction
function validateAuctionInputData(requestBody) {
    const auctionSchema = {
        name: Joi.string().required(),
        firstBid: Joi.number().required(),
        sellerId: Joi.number().integer().required()
    };
    return Joi.validate(requestBody, auctionSchema);
}

module.exports = router;
module.exports.auctionData = auctionData;
