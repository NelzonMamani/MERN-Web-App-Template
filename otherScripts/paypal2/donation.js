// donation.html - This file contains the form that users will fill out to make a donation. It includes fields for the user's name, email, and donation amount, as well as a button to submit the form.

const paypal = require('paypal-rest-sdk');
const nodemailer = require('nodemailer');
const {donationAmount, email} = require('./donation.html');

// configure paypal with sandbox client_id and secret
paypal.configure({
  'mode': 'sandbox', //sandbox or live
  'client_id': 'YOUR_CLIENT_ID',
  'client_secret': 'YOUR_SECRET'
});

// function to create a new payment
function createPayment(amount) {
  return new Promise((resolve, reject) => {
    const create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/success",
          "cancel_url": "http://localhost:3000/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": "Donation",
                  "sku": "001",
                  "price": amount,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": amount
          },
          "description": "Donation to XYZ Charity"
      }]
    };

    // call the create Pay method
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            reject(error);
        } else {
            resolve(payment);
        }
    });
  });
}

// function to execute a payment
function executePayment(paymentId, payerId) {
    return new Promise((resolve, reject) => {
        // configure the request
        const executePaymentJson = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": "USD",
                    "total": donationAmount
                }
            }]
        };

        paypal.payment.execute(paymentId, executePaymentJson, function (error, payment) {
            if (error) {
                console.log(error.response);
                reject(error);
            } else {
                console.log("Get Payment Response");
                console.log(JSON.stringify(payment));
                resolve(payment);
            }
        });
    });
}


