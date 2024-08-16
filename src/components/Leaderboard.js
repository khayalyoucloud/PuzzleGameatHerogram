import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = ({ difficulty }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    axios.get(`/api/scores/leaderboard?difficulty=${difficulty}`)
      .then(response => {
        const data = response.data;

        if (Array.isArray(data) && data.length > 0) {
          setScores(data);
        } else {
          setScores([
            { username: 'Player 1', time: 0 },
            { username: 'Player 2', time: 0 },
            { username: 'Player 3', time: 0 },
          ]);
        }
      })
      .catch(error => {
        console.error('Error fetching leaderboard:', error);
        setScores([
          { username: 'Player 1', time: 0 },
          { username: 'Player 2', time: 0 },
          { username: 'Player 3', time: 0 },
        ]);
      });
  }, [difficulty]);

  return (
    <div>
      <h2>Leaderboard - {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={index}>{score.username} - {score.time}s</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
