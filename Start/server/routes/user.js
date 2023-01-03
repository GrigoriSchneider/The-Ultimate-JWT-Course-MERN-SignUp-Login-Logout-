const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Register User
router.post("/", async (req, res) => {
    const { email, name, password } = req.body;

    // Checking User
    let user = await User.findOne({ email });
    if (user) return res.status(400).send("User already exists");

    // Save User Into Database
    user = new User({ email, name, password });
    await user.save();

    res.send(user);
});

module.exports = router;
