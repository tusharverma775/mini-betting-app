'use client';

import { useQuery } from '@tanstack/react-query';
import { matchesAPI } from '@/app/lib/api';
import { Match } from '@/app/types';

export const useMatches = () => {
  return useQuery<Match[], Error>({
    queryKey: ['matches'],
    queryFn: matchesAPI.getMatches,
    refetchInterval: 15000, 
    staleTime: 1000 * 30,
  });
};