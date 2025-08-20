'use client';

import React, { useState } from 'react';
import { useBettingSlip } from '@/app/context/BetSlipContext';
import { useBalance } from '@/app/hooks/useBalance';
import { betsAPI } from '@/app/lib/api';

export const BettingSlip: React.FC = () => {
  const { items, removeSelection, updateStake, clearSlip, totalStake, totalPotentialReturn } = useBettingSlip();
  const { data: balance, refetch: refetchBalance } = useBalance();
  const [isPlacingBet, setIsPlacingBet] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStakeChange = (matchId: string, outcome: string, value: string) => {
    const stake = parseFloat(value) || 0;
    updateStake(matchId, outcome, stake);
  };

 const handlePlaceBet = async () => {
  if (items.length === 0) return;
  
  setIsPlacingBet(true);
  setError(null);
  
  try {
    
    for (const item of items) {
      if (item.stake <= 0) continue;
      
      const response = await betsAPI.placeBet({
        stake: item.stake,
        selection: item.selection,
      });
      
      if (response.status === 'error') {
        throw new Error(response.message || 'Failed to place bet');
      }
      
     
      if (response.newBalance !== undefined) {
        
        await fetch('/api/balance', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: response.newBalance }),
        });
      }
    }
    
   
    await refetchBalance();
    clearSlip();
    alert('Bet placed successfully!');
  } catch (err: any) {
    setError(err.message || 'Failed to place bet');
  } finally {
    setIsPlacingBet(false);
  }
};

  if (items.length === 0) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Betting Slip</h3>
        <p className="text-gray-500">No selections yet</p>
      </div>
    );
  }

  const hasSufficientBalance = balance && totalStake <= balance.balance;

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Betting Slip</h3>
        <button 
          onClick={clearSlip}
          className="text-sm text-red-600 hover:text-red-800"
        >
          Clear all
        </button>
      </div>

      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-3 mb-4">
        {items.map((item, index) => (
          <div key={index} className="p-3 bg-white rounded-md shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium">{item.selection.matchName}</h4>
                <p className="text-sm text-gray-600">
                  {item.selection.outcome === 'homeWin' ? 'Home Win' : 
                   item.selection.outcome === 'awayWin' ? 'Away Win' : 'Draw'}
                </p>
                <p className="text-sm">Odds: {item.selection.odd.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeSelection(item.selection.matchId, item.selection.outcome)}
                className="text-red-500 hover:text-red-700"
                aria-label="Remove selection"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center mt-2">
              <label className="mr-2 text-sm">Stake:</label>
              <input
                type="number"
                min="0"
                step="0.1"
                value={item.stake || ''}
                onChange={(e) => handleStakeChange(
                  item.selection.matchId, 
                  item.selection.outcome, 
                  e.target.value
                )}
                className="w-20 p-1 border rounded"
              />
              <span className="ml-2 text-sm">
                Return: ${item.potentialReturn.toFixed(2)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between mb-2">
          <span>Total Stake:</span>
          <span>${totalStake.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-4 font-semibold">
          <span>Potential Return:</span>
          <span>${totalPotentialReturn.toFixed(2)}</span>
        </div>
        
        {balance && (
          <div className="flex justify-between mb-4 text-sm">
            <span>Balance:</span>
            <span>${balance.balance.toFixed(2)}</span>
          </div>
        )}
        
        {!hasSufficientBalance && (
          <div className="text-red-600 text-sm mb-2">
            Insufficient balance
          </div>
        )}
        
        <button
          onClick={handlePlaceBet}
          disabled={isPlacingBet || totalStake <= 0 || !hasSufficientBalance}
          className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPlacingBet ? 'Placing Bet...' : 'Place Bet'}
        </button>
      </div>
    </div>
  );
};