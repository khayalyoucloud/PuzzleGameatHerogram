const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/puzzle-game', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.json());
app.use(cors());

// Routes
const scoresRouter = require('./routes/scores');
app.use('/api/scores', scoresRouter);

app.listen(5000, () => console.log('Server running on port 5000'));
