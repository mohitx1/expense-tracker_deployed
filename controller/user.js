
const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { secretKey } = require('../config'); // Import your secret key from a configuration file

function isStringInvalid(string) {
  return string === undefined || string.length === 0;
}

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (isStringInvalid(name) || isStringInvalid(email) || isStringInvalid(password)) {
      return res.status(400).json({ err: "Bad parameters. Something is missing" });
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ err: "Email already in use. Please use a different email." });
    }

    const saltrounds = 10;

    // Hash the password
    const hash = await bcrypt.hash(password, saltrounds);

    // Create a new user only if the email is not already in use
    const newUser = new User({ name, email, password: hash });
    await newUser.save();

    res.status(201).json({ message: 'Successfully created a new user' });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const generateAccessToken = (id, name, ispremiumuser) => {
  return jwt.sign({ userId: id, name, ispremiumuser }, "secretKey");
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (isStringInvalid(email) || isStringInvalid(password)) {
      return res.status(400).json({ message: 'Email or password is missing', success: false });
    }

    // Find the user by email in MongoDB
    const user = await User.findOne({ email });

    if (user) {
      // Compare the provided password with the hashed password in MongoDB
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return res.status(200).json({
          success: true,
          message: "User logged in successfully",
          token: generateAccessToken(user.id, user.name, user.ispremiumuser),
        });
      } else {
        return res.status(400).json({ success: false, message: 'Password is incorrect' });
      }
    } else {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

module.exports = {
  signup,
  login,
  generateAccessToken,
};
