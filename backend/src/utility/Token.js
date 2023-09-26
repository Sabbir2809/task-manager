const jwt = require("jsonwebtoken");

// jwt encoded
exports.encodedToken = (email, user_id) => {
  return jwt.sign({ email, id: user_id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
};

// jwt decoded
exports.decodedToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET_KEY);
};
