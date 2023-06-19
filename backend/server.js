import path from "path";
import express from "express";
import * as dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";

const app = express();

dotenv.config();

connectDB();

if (process.env.MODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// use Routes
app.use("/api/users", userRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.MODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html")),
  );
} else {
  app.get("/", (req, res) => {
    res.send(`<h1>Running Works API Server... 🚀</h1>`);
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.MODE_ENV} mode on port ${PORT}`.yellow
      .bold,
  );
});
