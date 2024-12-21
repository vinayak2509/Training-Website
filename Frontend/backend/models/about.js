const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
  name: String,
  location: String,
  education: String,
  job: String,
  hobbies: [String],
});

module.exports = mongoose.model("About", aboutSchema);
