
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { BetSlipItem, BetSelection } from '@/app/types';

interface BettingSlipContextType {
  items: BetSlipItem[];
  addSelection: (selection: BetSelection) => void;
  removeSelection: (matchId: string, outcome: string) => void;
  updateStake: (matchId: string, outcome: string, stake: number) => void;
  clearSlip: () => void;
  totalStake: number;
  totalPotentialReturn: number;
}

const BettingSlipContext = createContext<BettingSlipContextType | undefined>(undefined);

export const BettingSlipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BetSlipItem[]>([]);

 
  useEffect(() => {
    const saved = localStorage.getItem('bettingSlip');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bettingSlip', JSON.stringify(items));
  }, [items]);

  const addSelection = (selection: BetSelection) => {
    setItems(prev => {
      const exists = prev.some(item => 
        item.selection.matchId === selection.matchId && 
        item.selection.outcome === selection.outcome
      );
      
      if (exists) return prev;
      
      return [...prev, { selection, stake: 0, potentialReturn: 0 }];
    });
  };

  const removeSelection = (matchId: string, outcome: string) => {
    setItems(prev => prev.filter(item => 
      !(item.selection.matchId === matchId && item.selection.outcome === outcome)
    ));
  };

  const updateStake = (matchId: string, outcome: string, stake: number) => {
    setItems(prev => prev.map(item => {
      if (item.selection.matchId === matchId && item.selection.outcome === outcome) {
        const potentialReturn = stake * item.selection.odd;
        return { ...item, stake, potentialReturn };
      }
      return item;
    }));
  };

  const clearSlip = () => setItems([]);

  const totalStake = items.reduce((sum, item) => sum + item.stake, 0);
  const totalPotentialReturn = items.reduce((sum, item) => sum + item.potentialReturn, 0);

  return (
    <BettingSlipContext.Provider value={{
      items,
      addSelection,
      removeSelection,
      updateStake,
      clearSlip,
      totalStake,
      totalPotentialReturn,
    }}>
      {children}
    </BettingSlipContext.Provider>
  );
};

export const useBettingSlip = () => {
  const context = useContext(BettingSlipContext);
  if (context === undefined) {
    throw new Error('useBettingSlip must be used within a BettingSlipProvider');
  }
  return context;
};