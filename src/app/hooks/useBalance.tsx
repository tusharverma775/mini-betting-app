'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { balanceAPI } from '@/app/lib/api';
import { Balance } from '@/app/types';

export const useBalance = () => {
  return useQuery<Balance, Error>({
    queryKey: ['balance'],
    queryFn: balanceAPI.getBalance,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useUpdateBalance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newBalance: number) => 
      fetch('/api/balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: newBalance }),
      }).then(res => res.json()),
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['balance'] });
    },
  });
};
