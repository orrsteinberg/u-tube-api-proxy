const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const middleware = require("./middleware");
const apiProxy = require("./apiProxy");

const app = express();

const rateLimit = require("express-rate-limit");

// (for rate limiter) Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set("trust proxy", 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    message: "Too many requests, please try again later.",
  },
});

// Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(limiter);
app.use(bodyParser.json());

// Router
app.use("/api", apiProxy);

// More middleware
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
