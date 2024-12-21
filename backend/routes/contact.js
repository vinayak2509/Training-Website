const express = require("express");
const { validationRules } = require("../middleware/validation");
const { body, validationResult } = require("express-validator");
const Contact = require("../models/contact");
const router = express.Router();

router.post("/contact", validationRules, async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log("Validation errors:", JSON.stringify(errors.array(), null, 2));
    return res.status(400).json({ errors: errors.array() });
  }

  const formData = req.body;

  try {
    const newContact = new Contact(formData);
    await newContact.save();
    console.log("Form submitted:", formData);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error saving contact data:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
