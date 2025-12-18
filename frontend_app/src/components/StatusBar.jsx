import React from 'react';

/**
 * StatusBar displays current player, winner, or draw status.
 * Uses ARIA live regions for accessible announcements.
 */
// PUBLIC_INTERFACE
export function StatusBar({ currentPlayer, winner, isDraw }) {
  const hasWinner = !!winner;
  const classes = ['status-bar', hasWinner ? 'win' : '', isDraw ? 'draw' : '']
    .filter(Boolean)
    .join(' ');

  // Winner uses assertive to announce immediately, otherwise polite.
  const liveMode = hasWinner ? 'assertive' : 'polite';

  let message = '';
  if (hasWinner) {
    message = `Winner: ${winner}`;
  } else if (isDraw) {
    message = 'Draw! No more moves left.';
  } else {
    message = `Next player: ${currentPlayer}`;
  }

  return (
    <div className={classes} role="status" aria-live={liveMode}>
      {hasWinner ? (
        <span>
          <span className="emph">{winner}</span> wins! 🎉
        </span>
      ) : isDraw ? (
        <span>It&apos;s a draw. Try again!</span>
      ) : (
        <span>
          Next: <span className="emph">{currentPlayer}</span>
        </span>
      )}
      {/* Visually hidden text for screen readers with exact message */}
      <span style={{ position: 'absolute', left: '-9999px' }}>{message}</span>
    </div>
  );
}
