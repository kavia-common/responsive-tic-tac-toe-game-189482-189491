import React from 'react';

/**
 * Square component renders an individual Tic Tac Toe cell.
 * Accessible via native button semantics, with descriptive aria-labels and visible focus style.
 */
// PUBLIC_INTERFACE
export function Square({ value, onClick, index, isWinning, disabled }) {
  const symbol = value === 'X' ? 'X' : value === 'O' ? 'O' : '';
  const classes = [
    'square',
    value === 'X' ? 'x' : '',
    value === 'O' ? 'o' : '',
    isWinning ? 'winning' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;

  const label = value
    ? `Cell row ${row} column ${col}, ${symbol}`
    : `Cell row ${row} column ${col}, empty`;

  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      aria-label={label}
      aria-pressed={!!value}
      disabled={disabled}
    >
      {symbol}
    </button>
  );
}
