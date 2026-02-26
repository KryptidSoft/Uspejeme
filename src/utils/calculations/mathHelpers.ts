export const safeNumber = (val: any): number => {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
};

export const clamp = (val: number, min: number, max: number): number => 
  Math.min(Math.max(val, min), max);

export const safeDivide = (a: number, b: number): number => 
  b === 0 ? 0 : a / b;

export const formatCZK = (val: number) => 
  new Intl.NumberFormat('cs-CZ', { style: 'currency', currency: 'CZK' }).format(val);