const express = require("express");
const router = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const { authenticate, authorize } = require("../config/middleware");
//const { verifyToken, authorize } = require('../config/middleware');

// The register route creates a new user in the database and then
// generates a JSON Web Token (JWT) for the user.
router.post("/register", (req, res) => {
  let newUser = new User({
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  });
  newUser.save((err, user) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // generate a JSON Web Token (JWT) for the user
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.status(200).send({ token });
    }
  });
});

// The login route checks the user's email and password and then
// generates a JWT if the credentials are valid.
router.post("/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(500).send(err);
    } else if (!user) {
      res.status(404).send("user not found");
    } else {
      if (user.verifyPassword(req.body.password)) {
        // generate a JSON Web Token (JWT) for the user
        const token = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
        res.status(200).send({ token });
      } else {
        res.status(401).send("unauthorized");
      }
    }
  });
});

// The protected route is protected by the verifyToken and authorize middleware functions,
// which check if the user has a valid JWT and if they are authorized to access the route.

router.get("/admin", authenticate, authorize, (req, res) => {
  res.send("Protected Route");
});

// authenticate is a middleware function that verifies the user's token and
// authorize is a middleware function that checks the user's role or permissions to see if they are allowed to access this resource.
router.get("/", authenticate, authorize, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
