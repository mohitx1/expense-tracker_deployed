
const express = require('express');
const router = express.Router();
const PurchaseController = require('../controller/purchase'); // Import your purchase controller
const Authenticatemiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define routes for purchasing premium membership and updating transaction status
router.get('/premiummembership', Authenticatemiddleware.authenticate, PurchaseController.purchasePremium);
router.post('/updatetransactionstatus', Authenticatemiddleware.authenticate, PurchaseController.updateTransactionStatus);

module.exports = router;
