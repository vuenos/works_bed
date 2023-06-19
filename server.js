const express = require("express");
const cors = require("cors");
const colors = require("colors");

const mongoose = require("mongoose");

const userRoute = require("./Routes/userRoutes");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoute);

app.get("/", (req, res) => {
  res.send(`<h1>Works Running Works APIs... 🚀</h1>`);
});

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

app.listen(PORT, (req, res) => {
  console.log(
    `Server running in ${process.env.MODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// MongoDB Connect
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("MongoDB Connection Success!! 👏👏".blue.bold))
  .catch((error) => {
    console.log("MongoDB connection fail ❌: ".red.bold, error.message);
  });
