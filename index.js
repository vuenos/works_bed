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

const port = process.env.PORT || 5600;
const uri = process.env.ATLAS_URI;

app.listen(port, (req, res) => {
  console.log(
    `Server running in ${process.env.MODE_ENV} mode on port ${port}`.yellow.bold
  );
});

// MongoDB Connect
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connection Success!! 👏👏".blue.bold))
  .catch((error) => {
    console.log("MongoDB connection fail ❌: ".red.bold, error.message);
  });
