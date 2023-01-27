const express = require('express');
const router = express.Router();
const paypal = require('paypal-rest-sdk');
const { validateDonation } = require('../middlewares/validation');
const { createDonation, executePayment } = require('../controllers/donationController');

// configure paypal with client_id and secret
paypal.configure({
  'mode': 'sandbox', // or 'live' for production
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});

// route to create a new donation
router.post('/', validateDonation, createDonation);

// route to execute a payment
router.post('/execute', executePayment);

module.exports = router;
