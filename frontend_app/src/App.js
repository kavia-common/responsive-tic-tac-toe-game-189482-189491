import React, { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { Board } from './components/Board';
import { StatusBar } from './components/StatusBar';
import { calculateWinner, isBoardFull, getNextPlayer } from './utils/game';

// PUBLIC_INTERFACE
function App() {
  /**
   * Main application component for the Tic Tac Toe game.
   * - Maintains game state: board (9 squares), and next player.
   * - Derives winner and draw state.
   * - Handles user interactions: clicking squares and resetting game.
   * - Preserves existing theme toggle via data-theme on documentElement.
   */
  const [theme, setTheme] = useState('light');
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  // Apply theme to the document element to keep any theme styles working.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Derived game metadata
  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const winner = winnerInfo?.winner ?? null;
  const winningLine = winnerInfo?.line ?? null;
  const isDraw = useMemo(() => !winner && isBoardFull(board), [board, winner]);
  const currentPlayer = useMemo(() => getNextPlayer(xIsNext), [xIsNext]);

  // PUBLIC_INTERFACE
  const toggleTheme = useCallback(() => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  // PUBLIC_INTERFACE
  const handleSquareClick = useCallback(
    (index) => {
      // Ignore clicks if square already filled or game over
      if (board[index] || winner) return;

      setBoard(prev => {
        const next = prev.slice();
        next[index] = xIsNext ? 'X' : 'O';
        return next;
      });
      setXIsNext(prev => !prev);
    },
    [board, winner, xIsNext]
  );

  // PUBLIC_INTERFACE
  const handleReset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <main className="tictactoe-container">
          <h1 className="app-title">Tic Tac Toe</h1>

          <StatusBar
            currentPlayer={currentPlayer}
            winner={winner}
            isDraw={isDraw}
          />

          <Board
            board={board}
            onSquareClick={handleSquareClick}
            winningLine={winningLine}
            gameOver={!!winner || isDraw}
          />

          <div className="controls">
            <button
              type="button"
              className="btn-reset"
              onClick={handleReset}
              aria-label="Reset the game"
            >
              Reset Game
            </button>
          </div>
        </main>
      </header>
    </div>
  );
}

export default App;
