// Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const hpp = require("hpp");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const morgan = require("morgan");
const router = require("./src/routes/api");

// Middleware
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(mongoSanitize());
const limiter = rateLimit({ windowMs: 1 * 60 * 1000, max: 30 });
app.use(limiter);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("dev"));

// Health API
app.get("/", (req, res) => {
  res.status(200).send("Task Manager API: All is Well");
});

// Routes
app.use("/api", router);

// Exports
module.exports = app;
