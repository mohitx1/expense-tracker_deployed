
const express = require('express');
const router = express.Router();
const ExpenseController = require('../controller/expense'); // Import your expense controller
const AuthenticateMiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define routes for adding, getting, and deleting expenses
router.post('/addexpense', AuthenticateMiddleware.authenticate, ExpenseController.addExpense);
router.get('/getexpenses', AuthenticateMiddleware.authenticate, ExpenseController.getExpenses);
router.delete('/deleteexpense/:expenseid', AuthenticateMiddleware.authenticate, ExpenseController.deleteExpense);

module.exports = router
