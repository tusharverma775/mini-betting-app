'use client';

import React from 'react';
import { useMatches } from '../hooks/useMatches';
import { useBettingSlip } from '../context/BetSlipContext'
import { MatchCard } from '../components/MatchCard';
import { BettingSlip } from '../components/BettingSlip';

export default function MatchesPage() {
  const { data: matches, isLoading, error } = useMatches();
  const { addSelection } = useBettingSlip();

  const handleOddsSelect = (
    outcome: 'homeWin' | 'draw' | 'awayWin', 
    odd: number, 
    match: any
  ) => {
    addSelection({
      matchId: match.id,
      outcome,
      odd,
      matchName: `${match.homeTeam} vs ${match.awayTeam}`,
    });
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Matches</h1>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-md"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Matches</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Failed to load matches. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Matches</h1>
      
      {/* Mobile view */}
      <div className="lg:hidden">
        <div className="mb-20"> {}
          <div className="grid gap-4">
            {matches?.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                onOddsSelect={(outcome, odd) => handleOddsSelect(outcome, odd, match)}
              />
            ))}
          </div>
        </div>
        
       
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <BettingSlip />
        </div>
      </div>
      
      {/* Desktop/Tablet view  */}
      <div className="hidden lg:flex gap-6">
        <div className="flex-1">
          <div className="grid gap-4">
            {matches?.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                onOddsSelect={(outcome, odd) => handleOddsSelect(outcome, odd, match)}
              />
            ))}
          </div>
        </div>
        
        <div className="w-80">
          <div className="sticky top-4">
            <BettingSlip />
          </div>
        </div>
      </div>
    </div>
  );
}