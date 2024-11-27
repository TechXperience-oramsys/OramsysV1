const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config");

function decodeToken(token) {
  return jwt.decode(token.replace("Bearer ", ""));

}

function verifyJWTToken(token) {
  return jwt.verify(token, jwtSecret);
}

function getJWTToken(data) {
  const token = `Bearer ${jwt.sign(data, jwtSecret, { expiresIn: '1h' })}`;
  return token;
}

module.exports = { decodeToken, getJWTToken, verifyJWTToken };
