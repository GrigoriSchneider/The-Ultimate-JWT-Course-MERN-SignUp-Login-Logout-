const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register User
router.post("/", async (req, res) => {
    const { email, name, password } = req.body;

    // Checking User
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    // Save User Into Database
    user = new User({ email, name, password });
    await user.save();

    // generate JWT token
    const jwtData = { _id: user._id, name: user.name };
    const token = jwt.sign(jwtData, process.env.JWTSECRET, { expiresIn: "2h" });

    res.send(token);
});

module.exports = router;
