require("dotenv").config();
const express = require("express");
const app = express();

const stripe = require("stripe")(process.env.SK_TEST_KEY);

// Make a call to the API
app.get("/api", async (req, res) => {
  const { apiKey } = req.query;

  if (!apiKey) {
    res.sendStatus(400); // bad request
  }

  // TODO validate apiKey
  res.send({ data: "🔥🔥🔥🔥🔥🔥🔥🔥" });
});

// Reverse mapping of stripe to API key
// For modelling in preferred database
// db will contain two tables or collections: 
// customers - data about each customer's account and subscription 
// apiKeys - a mapping to match an API key to a user 
  
const customers = {
  // stripeCustomerId: data
  stripeCustomerId: {
    apiKey: "123xyz",
    active: false,
    itemId: "stripeSubscriptionItemId",
  },
};

const apiKeys = {
  // apiKey: customerData
  "123xyz": "stripeCustomerId",
};
