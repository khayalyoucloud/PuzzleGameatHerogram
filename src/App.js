import React, { useState } from 'react';
import PuzzleGrid from './components/PuzzleGrid';
import Timer from './components/Timer';
import Leaderboard from './components/Leaderboard';
import { generatePuzzle } from './utils/puzzleGenerator';

const App = () => {
  const [difficulty, setDifficulty] = useState('easy');
  const [grid, setGrid] = useState(generatePuzzle(difficulty));
  const [timeUp, setTimeUp] = useState(false);
  const [invalidCells, setInvalidCells] = useState([]);
  const [correctCells, setCorrectCells] = useState([]);

  const isValidMove = (grid, row, col, value) => {
    if (grid[row].includes(value)) return false;

    for (let i = 0; i < 9; i++) {
      if (grid[i][col] === value) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (grid[i][j] === value) return false;
      }
    }

    return true;
  };

  const handleMove = (row, col, value) => {
    const newGrid = grid.map((r, rIndex) =>
      r.map((cell, cIndex) => {
        if (rIndex === row && cIndex === col) return value;
        return cell;
      })
    );

    if (isValidMove(newGrid, row, col, value)) {
      setGrid(newGrid);
      setCorrectCells([...correctCells, { row, col }]);
      setInvalidCells(invalidCells.filter(cell => cell.row !== row || cell.col !== col));
    } else {
      setInvalidCells([...invalidCells, { row, col }]);
    }
  };

  const isPuzzleComplete = () => {
    for (let row of grid) {
      if (row.includes(0)) return false;
    }
    return invalidCells.length === 0;
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
    setGrid(generatePuzzle(level));
    setInvalidCells([]);
    setCorrectCells([]);
  };

  return (
    <div>
      <h1>Puzzle Game</h1>
      <select onChange={(e) => handleDifficultyChange(e.target.value)} value={difficulty}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <Timer initialTime={difficulty === 'easy' ? 600 : difficulty === 'medium' ? 900 : 1200} onTimeUp={() => setTimeUp(true)} />
      {!timeUp && <PuzzleGrid grid={grid} correctCells={correctCells} invalidCells={invalidCells} onMove={handleMove} />}
      {isPuzzleComplete() && <div className="success-message">Congratulations! You've completed the puzzle!</div>}
      <Leaderboard difficulty={difficulty} />
    </div>
  );
};

export default App;
