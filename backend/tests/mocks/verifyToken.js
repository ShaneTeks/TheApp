module.exports = (req, res, next) => {
  req.user = {
    id: 1,
    username: 'testuser',
    email: 'test@example.com'
  }; // Mock user
  next();
};
