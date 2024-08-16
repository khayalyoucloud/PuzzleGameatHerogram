const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

router.post('/save', async (req, res) => {
  const { username, time, difficulty } = req.body;
  try {
    const newScore = new Score({ username, time, difficulty });
    await newScore.save();
    res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

router.get('/leaderboard', async (req, res) => {
  const { difficulty } = req.query;
  try {
    const scores = await Score.find({ difficulty }).sort({ time: 1 }).limit(10);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

module.exports = router;
