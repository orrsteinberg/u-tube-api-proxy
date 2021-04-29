const axios = require("axios");
const router = require("express").Router();

const request = axios.create({
  baseURL: "https://youtube.googleapis.com/youtube/v3/",
  params: {
    key: process.env.YT_API_KEY,
  },
});

router.get("/:path", async (req, res) => {
  try {
    const path = req.params.path;
    const options = {
      params: req.query,
    };

    if (req.headers.authorization) {
      options.headers = {
        Authorization: req.headers.authorization,
      };
    }

    const ytResponse = await request(path, options);
    return res.json(ytResponse.data);
  } catch (err) {
    const error = err.response.data.error;
    return res.status(error.code).json({ message: error.message });
  }
});

module.exports = router;
