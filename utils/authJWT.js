const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Change this in production

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(403).send("Access denied");

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return res.status(403).send("Invalid token");
    req.user = user;
    next();
  });
};

module.exports = authenticateJWT;
