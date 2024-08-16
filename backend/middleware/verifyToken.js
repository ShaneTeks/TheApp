const jwt = require('jsonwebtoken');

// Middleware to verify JWT tokens
module.exports = function verifyToken(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const secretKey = process.env.JWT_SECRET || 'default-jwt-secret';
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
