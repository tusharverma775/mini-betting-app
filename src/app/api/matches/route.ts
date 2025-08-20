import { NextResponse } from 'next/server';
import { Match } from '@/app/types';


const mockMatches: Match[] = [
  {
    id: 'match_1',
    homeTeam: 'FC Barcelona',
    awayTeam: 'Real Madrid',
    startTime: '2025-08-20T18:00:00Z',
    odds: {
      homeWin: 2.1,
      draw: 3.4,
      awayWin: 2.9,
    },
  },
  {
    id: 'match_2',
    homeTeam: 'Manchester United',
    awayTeam: 'Liverpool',
    startTime: '2025-08-21T15:00:00Z',
    odds: {
      homeWin: 2.5,
      draw: 3.2,
      awayWin: 2.7,
    },
  },
  {
    id: 'match_3',
    homeTeam: 'Bayern Munich',
    awayTeam: 'Borussia Dortmund',
    startTime: '2025-08-22T17:30:00Z',
    odds: {
      homeWin: 1.8,
      draw: 3.6,
      awayWin: 4.2,
    },
  },
];

export async function GET() {
 
  await new Promise(resolve => setTimeout(resolve, 500));
  
 
  const matchesWithLiveOdds = mockMatches.map(match => ({
    ...match,
    odds: {
      homeWin: Math.max(1.1, match.odds.homeWin + (Math.random() - 0.5) * 0.2),
      draw: Math.max(1.1, match.odds.draw + (Math.random() - 0.5) * 0.2),
      awayWin: Math.max(1.1, match.odds.awayWin + (Math.random() - 0.5) * 0.2),
    },
  }));
  
  return NextResponse.json(matchesWithLiveOdds);
}