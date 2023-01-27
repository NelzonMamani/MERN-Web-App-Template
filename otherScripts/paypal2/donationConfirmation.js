const express = require('express');
const router = express.Router();

// function to handle donation confirmation
router.post('/donationConfirmation', async (req, res) => {
  // get the confirmation details from the request body
  const { donationId, payerId } = req.body;

  // execute the payment using the paypal sdk
  const payment = await paypal.payment.execute(donationId, { payer_id: payerId });

  // check if the payment is successful
  if (payment.state === 'approved') {
    // save the donation details to the database
    await saveDonationToDatabase(payment);
    // redirect the user to the thank you page
    res.redirect('/thankYou');
  } else {
    // redirect the user to the unable to donate page
    res.redirect('/notAbleToDonate');
  }
});

module.exports = router;
