export const calculateEnergy = (watts: number, hoursPerDay: number, pricePerKWh: number) => {
  const dailyKWh = (watts * hoursPerDay) / 1000;
  const yearlyKWh = dailyKWh * 365;
  const baseCost = yearlyKWh * pricePerKWh;

  return {
    yearlyKWh,
    yearlyCost: baseCost,
    minCost: baseCost * 0.95, // -5% rozptyl
    maxCost: baseCost * 1.05  // +5% rozptyl
  };
};