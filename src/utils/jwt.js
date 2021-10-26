const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const dotenv = require("dotenv");

dotenv.config();
const appSecret = process.env.APP_SECRET;

function signToken(user) {
  return jwt.sign({ user }, appSecret);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, appSecret, function (err, decoded) {
      if (err) {
        reject(err);
      }
      resolve(decoded.user);
    });
  });
}

module.exports = {
  signToken,
  verifyToken,
};
