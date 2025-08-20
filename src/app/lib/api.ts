import axios from 'axios';
import { Match, Balance, PlaceBetRequest, PlaceBetResponse } from '@/app/types/index';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const matchesAPI = {
  getMatches: (): Promise<Match[]> => 
    apiClient.get('/matches').then(res => res.data),
};

export const balanceAPI = {
  getBalance: (): Promise<Balance> => 
    apiClient.get('/balance').then(res => res.data),
};

export const betsAPI = {
  placeBet: (bet: PlaceBetRequest): Promise<PlaceBetResponse> => 
    apiClient.post('/bets', bet).then(res => res.data),
};