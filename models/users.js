
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  ispremiumuser: {
    type: Boolean,
    default: false, // Set the default value to false if needed
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
