const Joi = require('joi');

// Validate input form data for auction
function validateAuctionInputData(requestBody) {
    const auctionSchema = {
        name: Joi.string().required(),
        firstBid: Joi.number().required(),
        sellerId: Joi.number().integer().required()
    };
    return Joi.validate(requestBody, auctionSchema);
}

// Validate input form data for bids
function validateBidInputData(requestBody) {
    const bidSchema = {
        bidAmount: Joi.number().required(),
        bidderId: Joi.number().integer().required()
    };
    return Joi.validate(requestBody, bidSchema);
}

// Validate input form data for user registration and login
function validateUserInputData(requestBody) {
    const userSchema = {
        username: Joi.string().required(),
        password: Joi.string().required(),
    };
    return Joi.validate(requestBody, userSchema);
}


module.exports.validateAuctionInputData = validateAuctionInputData;
module.exports.validateBidInputData = validateBidInputData;
module.exports.validateUserInputData = validateUserInputData;
