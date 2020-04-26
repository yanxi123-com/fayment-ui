import { showError } from "comps/popup";
import { httpGet } from "lib/apiClient";
import { trackEvent } from "lib/gtag";
import { useCallback, useEffect, useState } from "react";

interface PriceHookResult {
  refreshPrice: () => void;
  pricesByBTC: { [sym: string]: number };
  baseCoin: string;
  setBaseCoin: (sym: string) => void;
  getBaseCoinPrice: (sym: string) => number | undefined;
}

export function usePrices(defaultBaseCoin?: string): PriceHookResult {
  const [baseCoin, setBaseCoin] = useState(defaultBaseCoin || "BTC");
  const [pricesByBTC, setPricesByBTC] = useState<{ [sym: string]: number }>({});

  const fetchPrices = useCallback(() => {
    trackEvent("fetch_prices");
    httpGet("listPricesByBTC")
      .then((data) => {
        setPricesByBTC(data);
      })
      .catch(showError);
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      fetchPrices();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  function getPriceByBTC(sym: string): number | undefined {
    let priceByBTC = pricesByBTC[sym];
    if (priceByBTC) {
      return priceByBTC;
    }

    return undefined;
  }

  function getBaseCoinPrice(sym: string): number | undefined {
    const coinPriceByBTC = getPriceByBTC(sym);
    const baseCoinPriceByBTC = getPriceByBTC(baseCoin);

    if (coinPriceByBTC == null || baseCoinPriceByBTC == null) {
      return undefined;
    }

    return coinPriceByBTC / baseCoinPriceByBTC;
  }

  return {
    refreshPrice: fetchPrices,
    pricesByBTC,
    baseCoin,
    setBaseCoin,
    getBaseCoinPrice,
  };
}
