import { NextResponse } from 'next/server';
import { getBalance, updateBalance } from '@/app/lib/balanceStore';

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 300));
  return NextResponse.json({ balance: getBalance() });
}

export async function POST(request: Request) {
  const { amount } = await request.json();
  
  if (typeof amount === 'number') {
    updateBalance(amount);
  }
  
  return NextResponse.json({ balance: getBalance() });
}