import React from 'react';
import { Square } from './Square';

/**
 * Board component to render a 3x3 grid of squares.
 * Highlights a winning line and disables interaction when game is over.
 */
// PUBLIC_INTERFACE
export function Board({ board, onSquareClick, winningLine = null, gameOver = false }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, index) => {
        const isWinning = Array.isArray(winningLine) && winningLine.includes(index);
        return (
          <Square
            key={index}
            value={value}
            index={index}
            onClick={() => onSquareClick(index)}
            isWinning={isWinning}
            disabled={gameOver || !!value}
          />
        );
      })}
    </div>
  );
}
