const fs = require("fs");

const backend = "backendRentalsForAllOccasions";

const config = "config";
const controllers = "controllers";
const middleware = "middleware";
const models = "models";
const routes = "routes";

fs.mkdirSync(backend);
fs.mkdirSync(`${backend}/${config}`);
fs.mkdirSync(`${backend}/${controllers}`);
fs.mkdirSync(`${backend}/${middleware}`);
fs.mkdirSync(`${backend}/${models}`);
fs.mkdirSync(`${backend}/${routes}`);

const modelsArr = [
  "Listing",
  "Booking",
  "User",
  "Review",
  "Amenities",
  "Location",
  "Calendar",
  "Payment",
  "CreditCard",
  "Promotion",
  "Message",
  "Notification",
  "Search",
  "Category",
  "Reservation",
  "Host",
  "Guest",
  "HouseRule",
  "CancellationPolicy",
  "Tax",
  "Transaction",
  "Support",
  "Feedback",
];

modelsArr.forEach((model) => {
  fs.writeFileSync(`${backend}/${models}/${model}.js`, "");
  fs.writeFileSync(
    `${backend}/${controllers}/${model.toLowerCase()}Controller.js`,
    ""
  );
  fs.writeFileSync(`${backend}/${routes}/${model.toLowerCase()}Routes.js`, "");
});

fs.writeFileSync(`${backend}/${config}/passport.js`, "");
fs.writeFileSync(`${backend}/${config}/db.js`, "");
fs.writeFileSync(`${backend}/${config}/jwtConfig.js`, "");
fs.writeFileSync(`${backend}/${config}/env.js`, "");
fs.writeFileSync(`${backend}/server.js`, "");
fs.writeFileSync(`.env`, "");
fs.writeFileSync(`.gitignore`, "");
fs.writeFileSync(`sendRequest.rest`, "");
fs.writeFileSync(`authServer.js`, "");
