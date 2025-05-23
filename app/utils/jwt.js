require('dotenv').config();

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

function generateAccessToken(email) {
  return jwt.sign( { data: email }, process.env.TOKEN_SECRET);
}

module.exports = {
  authenticateToken,
  generateAccessToken,
};
