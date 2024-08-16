const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
  username: String,
  time: Number,
  difficulty: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Score = mongoose.model('Score', scoreSchema);
module.exports = Score;
