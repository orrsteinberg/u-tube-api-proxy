const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

const apiProxy = require("./apiProxy");

// Middleware
app.use(morgan("dev"));
app.use(cors());

// Router
app.use("/api", apiProxy);

module.exports = app;
