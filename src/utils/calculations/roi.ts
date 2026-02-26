import { safeDivide } from './mathHelpers';

export interface ROIData {
  investment: number;
  initialCosts: number;
  monthlyBenefit: number;
  risk: number;
  discountRate: number;
}

export const calculateROI = (data: ROIData) => {
  const { investment, initialCosts, monthlyBenefit, risk, discountRate } = data;

  const totalInitial = investment + initialCosts;
  const annualDiscount = discountRate / 100;
  const monthlyDiscount = annualDiscount / 12;

  // Riziková úprava měsíčního přínosu
  const adjustedMonthly = monthlyBenefit * (1 - risk / 100);

  // NPV – horizont 5 let (60 měsíců)
  let npv = -totalInitial;

  for (let t = 1; t <= 60; t++) {
    npv += adjustedMonthly / Math.pow(1 + monthlyDiscount, t);
  }

  const roiPercent = totalInitial > 0 ? (npv / totalInitial) * 100 : 0;

  // Diskontovaná návratnost
  let cumulativeValue = -totalInitial;
  let discountedPaybackMonths: number | null = null;

  for (let t = 1; t <= 240; t++) {
    cumulativeValue += adjustedMonthly / Math.pow(1 + monthlyDiscount, t);
    if (cumulativeValue >= 0) {
      discountedPaybackMonths = t;
      break;
    }
  }

  const simplePaybackMonths =
    adjustedMonthly > 0 ? totalInitial / adjustedMonthly : Infinity;

  return {
    npv,
    roiPercent,
    simplePaybackMonths,
    discountedPaybackMonths
  };
};