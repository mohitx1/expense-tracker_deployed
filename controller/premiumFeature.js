
const User = require('../models/users'); // Replace with your Mongoose User model
const Expense = require('../models/expenses'); // Replace with your Mongoose Expense model

const getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardofusers = await User.aggregate([
            {
                $lookup: {
                    from: 'expenses', // Assuming your expenses collection name is 'expenses'
                    localField: '_id',
                    foreignField: 'userId',
                    as: 'expenses',
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    total_cost: { $sum: '$expenses.expenseamount' },
                },
            },
            { $sort: { total_cost: -1 } },
        ]);

        res.status(200).json(leaderboardofusers);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = {
    getUserLeaderBoard,
};

