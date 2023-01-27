const paypal = require('paypal-rest-sdk');

// Set up the PayPal SDK with your client ID and secret
paypal.configure({
  mode: 'sandbox', // or 'live' for production
  client_id: 'YOUR_CLIENT_ID',
  client_secret: 'YOUR_CLIENT_SECRET'
});

// Function to process a PayPal payment
const processPayment = (amount, currency, returnUrl, cancelUrl, callback) => {
  // Create a new PayPal payment object
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal'
    },
    redirect_urls: {
      return_url: returnUrl,
      cancel_url: cancelUrl
    },
    transactions: [{
      amount: {
        total: amount,
        currency: currency
      }
    }]
  };

  // Call the PayPal SDK to create the payment
  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      callback(error);
    } else {
      // Extract the approval URL from the PayPal response
      let approvalUrl = '';
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          approvalUrl = payment.links[i].href;
          break;
        }
      }

      // Pass the approval URL to the callback
      callback(null, approvalUrl);
    }
  });
}
