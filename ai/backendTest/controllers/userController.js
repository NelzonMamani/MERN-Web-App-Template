const User = require('../models/User');

exports.createUser = (req, res) => {
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Email already exists"
      });
    }
    res.json({ user });
  });
};

exports.getUsers = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: "No users found"
      });
    }
    res.json(users);
  });
};

exports.getUser = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    res.json(user);
  });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User not found"
        });
      }
      res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found"
      });
    }
    res.json({ message: "User deleted successfully" });
  });
};
