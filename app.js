
const path = require('path');
const express = require('express');
const cors = require('cors');

const connectDB = require('./util/database');
const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumFeatureRoutes = require('./routes/premiumFeature');

const app = express();
const dotenv = require('dotenv');

// get config vars
dotenv.config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectDB();

app.use('/user', userRoutes);
app.use('/expense', expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumFeatureRoutes);


app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', 'error.html'));
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
