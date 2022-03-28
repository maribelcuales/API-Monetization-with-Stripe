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

// POST http://localhost:8080/checkout
// Create a Stripe Checkout Session to create a customer and subscribe them to a plan
// Stripe Checkout allows redirect a user to a hosted webpage where they can securely enter their payment information.
app.post("/checkout", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1KiLEuDM88ZaOJ5kmVzTsKk8",
      },
    ],
    success_url:
      "http://localhost:5000/dashboard?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "http://localhost:5000/error",
  });
  res.send(session);
});
