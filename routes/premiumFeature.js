
const express = require('express');
const router = express.Router();
const PremiumFeatureController = require('../controller/premiumFeature'); // Import your premium feature controller
const AuthenticateMiddleware = require('../middleware/auth'); // Import your authentication middleware

// Define a route for showing the leaderboard of premium users
router.get('/showLeaderBoard', AuthenticateMiddleware.authenticate, PremiumFeatureController.getUserLeaderBoard);

module.exports = router;
