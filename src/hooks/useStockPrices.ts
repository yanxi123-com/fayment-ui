import { trackEvent } from "lib/gtag";
import { uniqStrs } from "lib/util/array";
import { useCallback, useEffect, useState } from "react";

type StockInfo = Array<{ stockSite: string; stockSym: string }>;

interface PriceHookResult {
  refreshPrice: () => void;
  prices: { [sym: string]: number };
  addStocks: (trades: StockInfo) => void;
}

export function useStockPrices(): PriceHookResult {
  const [fullSyms, setFullSyms] = useState<Array<string>>([]);
  const [prices, setPrices] = useState<{ [sym: string]: number }>({});

  const fetchPrices = useCallback(() => {
    if (fullSyms.length === 0) {
      return;
    }
    trackEvent("fetch_stock_prices");

    const syms = fullSyms.join(",");

    const preScriptEle = document.getElementById("sina_stock_hq");
    if (preScriptEle != null) {
      preScriptEle.remove();
    }

    const scriptEle = document.createElement("script");
    scriptEle.id = "sina_stock_hq";
    scriptEle.async = true;
    scriptEle.src = "https://hq.sinajs.cn/?list=" + syms;
    scriptEle.onload = function () {
      setPrices((prices) => {
        const newPrices = prices;
        fullSyms.forEach((s) => {
          const info = (window as any)[`hq_str_${s}`];
          if (info) {
            newPrices[s.substr(2)] = parseFloat(info.split(",")[3]);
          }
        });
        return { ...newPrices };
      });
    };
    document.body.appendChild(scriptEle);
  }, [fullSyms]);

  const addStocks = useCallback((trades: StockInfo) => {
    const newSyms = trades.map(
      ({ stockSite, stockSym }) => `${stockSite}${stockSym}`
    );
    setFullSyms((fullSyms) => uniqStrs([...fullSyms, ...newSyms]));
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
    prices,
    addStocks,
  };
}
