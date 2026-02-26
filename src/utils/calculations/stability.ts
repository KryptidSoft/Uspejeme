import { clamp } from './mathHelpers';

export interface StabilityInputs {
  reservesMonths: number;      // 1-12
  incomeSustainability: number; // 0-100%
  workload: number;            // 0-100% (vytíženost)
  roiEfficiency: number;       // 0-100%
  expenseStability: number;    // 0-100%
}

export const calculateStability = (inputs: StabilityInputs) => {
  // 1. Normalizace rezerv (1-12 měsíců -> 0-1)
  const normReserves = clamp((inputs.reservesMonths - 1) / 11, 0, 1);
  
  // 2. Nelineární posílení (Sigmoid)
  // x_nonlinear = 1 / (1 + e^(-6 * (x - 0.5)))
  const sigmoid = (x: number) => 1 / (1 + Math.exp(-6 * (x - 0.5)));

  const factors = {
    reserves: sigmoid(normReserves) * 100,
    sustainability: sigmoid(inputs.incomeSustainability / 100) * 100,
    workload: (100 - inputs.workload), // Nižší vytíženost = vyšší stabilita (méně stresu)
    roi: inputs.roiEfficiency,
    expenses: inputs.expenseStability
  };

  // 3. Vážený průměr podle zadání
  const totalScore = 
    (factors.reserves * 0.30) +
    (factors.sustainability * 0.25) +
    (factors.workload * 0.20) +
    (factors.roi * 0.15) +
    (factors.expenses * 0.10);

  let label = "";
  if (totalScore < 40) label = "Vysoké riziko";
  else if (totalScore < 60) label = "Nestabilní";
  else if (totalScore < 80) label = "Stabilní";
  else label = "Velmi stabilní";

  return {
    score: Math.round(totalScore),
    label,
    factors
  };
};