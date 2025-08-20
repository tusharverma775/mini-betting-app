import { NextResponse } from 'next/server';
import { PlaceBetRequest, PlaceBetResponse } from '@/app/types';
import { deductFromBalance, getBalance } from '@/app/lib/balanceStore';

export async function POST(request: Request) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const betData: PlaceBetRequest = await request.json();
  
  if (Math.random() < 0.2) {
    const response: PlaceBetResponse = {
      status: 'error',
      message: 'Odds changed',
      newOdd: betData.selection.odd - 0.1,
    };
    return NextResponse.json(response, { status: 400 });
  }
  
  
  if (getBalance() < betData.stake) {
    const response: PlaceBetResponse = {
      status: 'error',
      message: 'Insufficient funds',
    };
    return NextResponse.json(response, { status: 400 });
  }
  
  try {
    // Process the bet - deduct from shared balance store
    const newBalance = deductFromBalance(betData.stake);
    const potentialReturn = betData.stake * betData.selection.odd;
    
    const response: PlaceBetResponse = {
      status: 'success',
      newBalance,
      potentialReturn,
    };
    
    return NextResponse.json(response);
  } catch (error: any) {
    const response: PlaceBetResponse = {
      status: 'error',
      message: error.message,
    };
    return NextResponse.json(response, { status: 400 });
  }
}