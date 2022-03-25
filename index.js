import "dotenv/config";
const express = require("express");
const app = express();

const stripe = require("stripe")(process.env.SK_TEST - KEY);

// Make a call to the API
app.get('/api', async (req, res) => {
  const { apiKey } = req.query;

  if (!apiKey) {
    res.sendStatus(400); // bad request
  }

  // TODO validate apiKey
  res.send({ data: "🔥🔥🔥🔥🔥🔥🔥🔥" });
});
