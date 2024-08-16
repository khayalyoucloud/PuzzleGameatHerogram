import React from 'react';
import './PuzzleGrid.css';

const PuzzleGrid = ({ grid, correctCells, invalidCells, onMove }) => {
  const handleCellClick = (row, col) => {
    if (grid[row][col] !== 0) return; // Prevent changing pre-filled numbers
    const userValue = prompt('Enter a number:');
    if (userValue && !isNaN(userValue) && userValue >= 1 && userValue <= 9) {
      onMove(row, col, parseInt(userValue, 10));
    } else {
      alert('Please enter a valid number between 1 and 9');
    }
  };

  const isInvalidCell = (row, col) => {
    return invalidCells.some(cell => cell.row === row && cell.col === col);
  };

  const isCorrectCell = (row, col) => {
    return correctCells.some(cell => cell.row === row && cell.col === col);
  };

  return (
    <div className="puzzle-grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="puzzle-row">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className={`puzzle-cell ${
                isInvalidCell(rowIndex, colIndex) ? 'invalid' : isCorrectCell(rowIndex, colIndex) ? 'correct' : ''
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
            >
              {cell !== 0 ? cell : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PuzzleGrid;
