const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const middleware = require("./middleware");
const apiProxy = require("./apiProxy");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// Router
app.use("/api", apiProxy);

// More middleware
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
