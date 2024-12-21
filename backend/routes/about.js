const express = require("express");
const About = require("../models/about");
const router = express.Router();

router.get("/about", async (req, res) => {
  try {
    const aboutMeData = await About.findOne();
    res.status(200).json(aboutMeData);
  } catch (error) {
    console.error("Error fetching About Me data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/about", async (req, res) => {
  const newData = req.body;

  if (
    !newData.name ||
    !newData.location ||
    !newData.education ||
    !newData.job ||
    !Array.isArray(newData.hobbies)
  ) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const existingData = await About.findOne();
    if (existingData) {
      existingData.name = newData.name;
      existingData.location = newData.location;
      existingData.education = newData.education;
      existingData.job = newData.job;
      existingData.hobbies = newData.hobbies;
      await existingData.save();
    } else {
      const newAbout = new About(newData);
      await newAbout.save();
    }
    res.status(200).json({ message: "About Me details updated successfully!" });
  } catch (error) {
    console.error("Error updating About Me data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
