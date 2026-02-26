export const calculateReserves = (monthlyExpenses: number, targetMonths: number, savingMonths: number) => {
  const targetAmount = monthlyExpenses * targetMonths;
  const monthlySavingNeeded = targetAmount / savingMonths;

  return {
    targetAmount,
    monthlySavingNeeded
  };
};