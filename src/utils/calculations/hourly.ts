import { safeDivide } from './mathHelpers';

export interface HourlyInputs {
  grossIncome: number;
  billableHours: number;
  nonBillableHours: number;
  costs: {
    taxes: number;
    overhead: number;
    material: number;
    reserves: number;
  };
}

export const calculateHourlyRate = (inputs: HourlyInputs) => {
  const totalCosts = inputs.costs.taxes + inputs.costs.overhead + inputs.costs.material + inputs.costs.reserves;
  const totalNeeded = inputs.grossIncome + totalCosts;
  const totalHours = inputs.billableHours + inputs.nonBillableHours;

  return {
    totalCosts,
    totalHours,
    billableRate: safeDivide(totalNeeded, inputs.billableHours),
    effectiveRate: safeDivide(totalNeeded, totalHours),
    utilization: safeDivide(inputs.billableHours, totalHours) * 100
  };
};