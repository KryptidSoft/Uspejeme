export const RATES = {
  GOLD_G: 2908,     // Cena za 1 gram zlata v CZK (cca 90 454 Kč / trojská unce)
  SILVER_G: 46,     // Cena za 1 gram stříbra v CZK (cca 1 421 Kč / trojská unce)
  BTC: 1312914,     // Aktuální kurz Bitcoinu v CZK
  CHF: 26.30        // Kurz švýcarského franku podle ČNB / online středu
};

export const convertFiatToAssets = (czk: number) => {
  return {
    gold: (czk / RATES.GOLD_G).toFixed(3),
    silver: (czk / RATES.SILVER_G).toFixed(3),
    btc: (czk / RATES.BTC).toFixed(8),
    chf: (czk / RATES.CHF).toFixed(2)
  };
};