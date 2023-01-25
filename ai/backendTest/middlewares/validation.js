const User = require('../models/User');

exports.validateUserData = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
        error: "Email and password are required"
    });
  }
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }
    next();
  });
};

exports.validatePost = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({
        error: "Title and content are required"
    });
  }
  next();
};

exports.validateComment = (req, res, next) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({
        error: "Comment text is required"
    });
  }
  next();
};
