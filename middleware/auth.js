
const jwt = require('jsonwebtoken');
const User = require('../models/users'); // Import your MongoDB User model
// const secretKey = require('../config').secretKey;

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      throw new Error('Authorization token missing');
    }

    // Verify the JWT token using the secret key
    const decoded = jwt.verify(token, "secretKey");

    // Find the user in MongoDB using the decoded user ID from the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }

    // Attach the user information to the request object
    req.user = user;
    next();
  } catch (err) {
    err.statusCode = 401; // Set the status code for unauthorized
    next(err);
  }
};

module.exports = {
  authenticate,
};
