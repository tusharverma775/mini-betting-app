export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  startTime: string;
  odds: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

export interface BetSelection {
  matchId: string;
  outcome: 'homeWin' | 'draw' | 'awayWin';
  odd: number;
  matchName: string;
}

export interface BetSlipItem {
  selection: BetSelection;
  stake: number;
  potentialReturn: number;
}

export interface Balance {
  balance: number;
}

export interface PlaceBetRequest {
  stake: number;
  selection: BetSelection;
}

export interface PlaceBetResponse {
  status: 'success' | 'error';
  newBalance?: number;
  potentialReturn?: number;
  message?: string;
  newOdd?: number;
}