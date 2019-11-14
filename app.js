const express = require('express');
const app = express();

app.use(express.json());
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", '*');
//     res.header(
//         "Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );

//     if (req.method === 'OPTIONS') 
//         res.header("Access-Control-Allow-Methods", 'GET, POST, DELETE');
//     return res.status(200).json({});
// });

const getAuctionsApi = require('./api/get_auctions');
const auctionApis = require('./api/auction');
const userApis = require('./api/user');

app.use('/api/user', userApis);
app.use('/api/auctions', getAuctionsApi)
app.use('/api/auction', auctionApis);

module.exports = app;
