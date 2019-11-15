const express = require('express');
const router = express.Router();

const helper = require("./../helper");

const userData = [
    {
        id: 1,
        username: "admin",
        password: "admin"
    }
];

// POST /api/user - Create user
router.post('/', (req, res) => {
    // 400 status code for invalid input
    const { error } = helper.validateUserInputData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const newUser = {
        id: userData.length + 1,
        username: req.body.username,
        password: req.body.password
    }
    userData.push(newUser);
    res.status(200).send("Registration Successful");
});

// POST /api/user/login - Logs user into the system
router.post('/login', (req, res) => {
    // 400 status code for invalid input
    const { error } = helper.validateUserInputData(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if username and password that user entered exist or not.
    const usernameValue = userData.find(f => f.username === req.body.username);

    // 400 status code for user not found
    if (!usernameValue) return res.status(400).send("Invalid username/password");

    // 400 status code for not matching password
    if (usernameValue.password !== req.body.password) return res.status(400).send("Invalid username/password");

    res.status(200).send("Login Successful");
});

module.exports = router;
