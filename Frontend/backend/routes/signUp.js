const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  console.log("received");

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      role: newUser.role,
    });
  } catch (error) {
    console.error("Error signing up user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

module.exports = router;
