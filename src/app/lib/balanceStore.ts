
let userBalance = 100.0;

export const getBalance = (): number => userBalance;

export const updateBalance = (amount: number): number => {
  userBalance = amount;
  return userBalance;
};

export const deductFromBalance = (amount: number): number => {
  if (userBalance >= amount) {
    userBalance -= amount;
    return userBalance;
  }
  throw new Error('Insufficient funds');
};