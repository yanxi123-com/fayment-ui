import { showError } from "comps/popup";
import { httpGet } from "lib/apiClient";
import { trackEvent } from "lib/gtag";
import { useCallback, useEffect } from "react";

interface PriceHookResult {
  refreshPrice: () => void;
  prices: { [sym: string]: number };
}

export function useStockPrices(defaultBaseCoin?: string): PriceHookResult {
  const fetchPrices = useCallback(() => {
    trackEvent("fetch_stock_prices");
    httpGet("listPricesByBTC")
      .then((data) => {})
      .catch(showError);
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => {
      fetchPrices();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, [fetchPrices]);

  return {
    refreshPrice: fetchPrices,
    prices: {},
  };
}
