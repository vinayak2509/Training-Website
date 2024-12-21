const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const contactRoutes = require("./routes/contact");
const userRoutes = require("./routes/user");
const aboutRoutes = require("./routes/about");
const signUpRoutes = require("./routes/signUp");
const notificationsRoutes = require("./routes/notifications");
const userUpdateRoutes = require("./routes/userUpdate");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(
  cors({
    origin: [
      "http://localhost:4000", 
      "https://training-website.onrender.com",
    ],
    methods: "GET, POST, DELETE, PUT, PATCH, OPTIONS",
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);



app.options("*", cors());


app.use(bodyParser.json());


mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


app.use((req, res, next) => {
  console.log("Request origin:", req.headers.origin);
  console.log("Request method:", req.method);
  next();
});


app.use("/api", contactRoutes);
app.use("/api", userRoutes);
app.use("/api", aboutRoutes);
app.use("/api", signUpRoutes);
app.use("/api", notificationsRoutes);
app.use("/api", userUpdateRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
