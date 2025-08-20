
'use client';

import React from 'react';

interface OddsButtonProps {
  outcome: 'homeWin' | 'draw' | 'awayWin';
  odd: number;
  label: string;
  onClick: () => void;
}

export const OddsButton: React.FC<OddsButtonProps> = ({ outcome, odd, label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        py-2 px-3 rounded-md text-center transition-colors
        ${outcome === 'homeWin' ? 'bg-blue-100 hover:bg-blue-200' : ''}
        ${outcome === 'draw' ? 'bg-gray-100 hover:bg-gray-200' : ''}
        ${outcome === 'awayWin' ? 'bg-red-100 hover:bg-red-200' : ''}
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${outcome === 'homeWin' ? 'focus:ring-blue-500' : ''}
        ${outcome === 'draw' ? 'focus:ring-gray-500' : ''}
        ${outcome === 'awayWin' ? 'focus:ring-red-500' : ''}
      `}
      aria-label={`Bet on ${label} with odds ${odd}`}
    >
      <div className="font-semibold text-sm">{label}</div>
      <div className="text-lg font-bold">{odd.toFixed(2)}</div>
    </button>
  );
};