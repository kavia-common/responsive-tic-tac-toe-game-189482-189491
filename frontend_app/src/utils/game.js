 /**
  * Game utility functions for Tic Tac Toe.
  * Provides winner calculation, board fullness check, and next player derivation.
  */

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

// PUBLIC_INTERFACE
export function calculateWinner(squares) {
  /**
   * Determine the winner and winning line given a 9-length array of squares.
   * Returns: { winner: 'X' | 'O', line: number[] } or null if no winner.
   */
  for (let i = 0; i < LINES.length; i += 1) {
    const [a, b, c] = LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

// PUBLIC_INTERFACE
export function isBoardFull(squares) {
  /**
   * Returns true if there are no null/empty squares left.
   */
  return squares.every(cell => cell === 'X' || cell === 'O');
}

// PUBLIC_INTERFACE
export function getNextPlayer(xIsNext) {
  /**
   * Returns 'X' or 'O' for the next player based on xIsNext boolean.
   */
  return xIsNext ? 'X' : 'O';
}
