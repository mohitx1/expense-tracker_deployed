
const Expense = require('../models/expenses'); // Import your Mongoose Expense model

const addExpense = async (req, res) => {
  try {
    const { expenseamount, description, category } = req.body;
    
    // console.log('printing user...')
    // console.log(req.user._id)
    if (!expenseamount) {
      return res.status(400).json({ success: false, message: 'Expense amount is missing' });
    }

    // Create a new expense document using the Expense model
    const newExpense = new Expense({
      expenseamount,
      description,
      category,
      userId: req.user._id, // Assuming you store user IDs in _id field after using Mongoose
    });

    // Save the new expense document to MongoDB
    await newExpense.save();

    return res.status(201).json({ expense: newExpense, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    // Find expenses for the authenticated user based on the userId field
    // console.log('we are fetching expenses')
    // console.log(req.user._id )
    const expenses = await Expense.find({userId: req.user._id});

    return res.status(200).json({ expenses, success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseid = req.params.expenseid;

    if (!expenseid) {
      return res.status(400).json({ success: false, message: 'Expense ID is missing' });
    }

    // Delete the expense document by ID and userId to ensure it belongs to the user
    const deletedExpense = await Expense.findOneAndRemove({userId: req.user._id});
    // const deletedExpense = await Expense.findOneAndDelete({ _id: expenseid, userId: req.user._id });

    if (!deletedExpense) {
      return res.status(404).json({ success: false, message: 'Expense does not belong to the user' });
    }

    return res.status(200).json({ success: true, message: 'Expense deleted successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  deleteExpense,
  getExpenses,
  addExpense,
};
