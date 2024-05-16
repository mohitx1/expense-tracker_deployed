
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  expenseamount: Number,
  category: String,
  description: String,
  // Reference to the User model based on userId
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
