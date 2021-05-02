const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const apiProxy = require("./apiProxy");

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Router
app.use("/api", apiProxy);

module.exports = app;
