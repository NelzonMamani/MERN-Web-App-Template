const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      error: 'Access denied. No token provided.'
    });
  }
  const token = authorization.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      error: 'Invalid token'
    });
  }
};

exports.authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }
    next();
  };
};
