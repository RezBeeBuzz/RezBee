require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const managerRoutes = require('./routes/manager');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/user', userRoutes);
app.use('/api/manager', managerRoutes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server running on port ${port}`));
