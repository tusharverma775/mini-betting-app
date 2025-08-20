import { useQuery } from '@tanstack/react-query';
import { matchesAPI } from '../lib/api';

export const useMatches = () => {
  return useQuery({
    queryKey: ['matches'],
    queryFn: matchesAPI.getMatches,
    refetchInterval: 15000, 
  });
};