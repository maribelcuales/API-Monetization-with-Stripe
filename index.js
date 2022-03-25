import 'dotenv/config';
const express = require('express');
const app = express(); 

const stripe = require('stripe')(process.env.SK_TEST-KEY);

