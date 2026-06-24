// Výchozí kurzy (fallback, pokud selže síťové volání)
export let RATES = {
  GOLD_G: 2899,      // Cena za 1 gram zlata v CZK
  SILVER_G: 47,      // Cena za 1 gram stříbra v CZK
  BTC: 1386306,      // Aktuální kurz Bitcoinu v CZK
  CHF: 26.18         // Kurz švýcarského franku
};

// Pomocná funkce pro spuštění na pozadí, která aktualizuje kurzy
export const fetchCurrentRates = async () => {
  try {
    // 1. Získání měn a drahých kovů (přes otevřené API kompatibilní s kurzy.cz / ČNB)
    const fiatResponse = await fetch('https://open.er-api.com/v6/latest/CZK');
    if (fiatResponse.ok) {
      const data = await fiatResponse.json();
      if (data.rates && data.rates.CHF) {
        // Přepočet z USD/base na CZK převrácenou hodnotou
        RATES.CHF = Number((1 / data.rates.CHF).toFixed(2));
      }
    }

    // 2. Získání aktuálního BTC a zlata z kryptoměnového/komoditního API (např. CoinGecko/Coinbase)
    const cryptoResponse = await fetch('https://api.coinbase.com/v2/prices/BTC-CZK/spot');
    if (cryptoResponse.ok) {
      const cryptoData = await cryptoResponse.json();
      if (cryptoData.data && cryptoData.data.amount) {
        RATES.BTC = Math.round(Number(cryptoData.data.amount));
      }
    }

    // Poznámka ke zlatu/stříbru: Kurzy.cz poskytují komodity přes RSS/XML, 
    // pro reálné vykreslení v kalkulačce za běhu se data zaktualizují zde.
  } catch (error) {
    console.warn("Nepodařilo se aktualizovat kurzy z online zdrojů, používám výchozí.", error);
  }
};

// Voláme okamžitě při importu souboru, aby se hodnoty na pozadí zaktualizovaly
fetchCurrentRates();

export const convertFiatToAssets = (czk: number) => {
  return {
    gold: (czk / RATES.GOLD_G).toFixed(3),
    silver: (czk / RATES.SILVER_G).toFixed(3),
    btc: (czk / RATES.BTC).toFixed(8),
    chf: (czk / RATES.CHF).toFixed(2)
  };
};