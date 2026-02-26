const RATES = {
  GOLD_G: 3471,
  SILVER_G: 55,
  BTC: 1385000
};

export const convertFiatToAssets = (czk: number) => {
  return {
    gold: (czk / RATES.GOLD_G).toFixed(3),
    silver: (czk / RATES.SILVER_G).toFixed(3),
    btc: (czk / RATES.BTC).toFixed(8)
  };
};