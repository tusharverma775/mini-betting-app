'use client';

import React from 'react';
import { Match } from '@/app/types';
import { OddsButton } from './oddButton';

interface MatchCardProps {
  match: Match;
  onOddsSelect: (outcome: 'homeWin' | 'draw' | 'awayWin', odd: number, match: Match) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match, onOddsSelect }) => {
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{match.homeTeam} vs {match.awayTeam}</h3>
        <span className="text-gray-600">{formatTime(match.startTime)}</span>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <OddsButton
          outcome="homeWin"
          odd={match.odds.homeWin}
          label={match.homeTeam}
          onClick={() => onOddsSelect('homeWin', match.odds.homeWin, match)}
        />
        <OddsButton
          outcome="draw"
          odd={match.odds.draw}
          label="Draw"
          onClick={() => onOddsSelect('draw', match.odds.draw, match)}
        />
        <OddsButton
          outcome="awayWin"
          odd={match.odds.awayWin}
          label={match.awayTeam}
          onClick={() => onOddsSelect('awayWin', match.odds.awayWin, match)}
        />
      </div>
    </div>
  );
};