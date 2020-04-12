import { trackEvent } from "lib/gtag";
import { uniqArray } from "lib/util/array";
import { useCallback, useEffect, useState } from "react";

type StockInfo = { site: string; sym: string };

interface PriceHookResult {
  refreshPrice: () => void;
  prices: { [sym: string]: number };
  addStocks: (stocks: StockInfo[]) => void;
}

export function useStockPrices(): PriceHookResult {
  const [stocks, setStocks] = useState<Array<StockInfo>>([]);
  const [prices, setPrices] = useState<{ [sym: string]: number }>({});

  const fetchPrices = useCallback(() => {
    if (stocks.length === 0) {
      return;
    }
    trackEvent("fetch_stock_prices");

    const sinaSyms = stocks
      .map((s) => {
        return s.sym.length === 6 ? s.site + s.sym : "";
      })
      .filter((a) => a);

    const preScriptEle = document.getElementById("sina_stock_hq");
    if (preScriptEle != null) {
      preScriptEle.remove();
    }

    const scriptEle = document.createElement("script");
    scriptEle.id = "sina_stock_hq";
    scriptEle.async = true;
    scriptEle.src = "https://hq.sinajs.cn/?list=" + sinaSyms.join(",");
    scriptEle.onload = function () {
      setPrices((prices) => {
        // 人民币
        prices["CNY"] = 1;
        // A 股
        sinaSyms.forEach((sinaSym) => {
          const info = (window as any)[`hq_str_${sinaSym}`];
          if (info) {
            prices[sinaSym.substr(2)] = parseFloat(info.split(",")[3]);
          }
        });
        return { ...prices };
      });
    };
    document.body.appendChild(scriptEle);
  }, [stocks]);

  const addStocks = useCallback((newStocks: StockInfo[]) => {
    setStocks((stocks) =>
      uniqArray([...stocks, ...newStocks], (stock) => stock.site + stock.sym)
    );
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
