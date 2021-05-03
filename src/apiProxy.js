const axios = require("axios");
const router = require("express").Router();

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: process.env.YT_API_KEY,
  },
});

// Proxy incoming requests to YouTube's API

router.get("/:path", async (req, res, next) => {
  try {
    // Extract query params
    const path = req.params.path;
    const options = {
      params: req.query,
    };

    // Add authorization headers if they're included in the req
    if (req.headers.authorization) {
      options.headers = {
        Authorization: req.headers.authorization,
      };
    }

    // Return response from YouTube API
    const ytResponse = await request(path, options);
    return res.json(ytResponse.data);
  } catch (err) {
    next(err);
  }
});

router.post("/:path", async (req, res, next) => {
  try {
    const path = req.params.path;
    const options = {
      method: "POST",
      data: req.body,
      params: req.query,
      headers: {
        Authorization: req.headers.authorization,
      },
    };

    const ytResponse = await request(path, options);
    return res.json(ytResponse.data);
  } catch (err) {
    next(err);
  }
});

router.delete("/:path", async (req, res, next) => {
  try {
    const path = req.params.path;
    const options = {
      method: "DELETE",
      params: req.query,
      headers: {
        Authorization: req.headers.authorization,
      },
    };

    const ytResponse = await request(path, options);
    return res.json(ytResponse.data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
