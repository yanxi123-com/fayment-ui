import { trackEvent } from "lib/gtag";
import { uniqStrs } from "lib/util/array";
import { useCallback, useEffect, useState } from "react";

type ContractInfo = string;

interface PriceHookResult {
  refreshPrice: () => void;
  prices: { [sym: string]: number };
  addContracts: (contracts: ContractInfo[]) => void;
}

export function useContractPrices(): PriceHookResult {
  const [contracts, setContracts] = useState<Array<ContractInfo>>([]);
  const [prices, setPrices] = useState<{ [sym: string]: number }>({});

  const fetchPrices = useCallback(() => {
    if (contracts.length === 0) {
      return;
    }
    trackEvent("fetch_contract_prices");

    const preScriptEle = document.getElementById("sina_contract_hq");
    if (preScriptEle != null) {
      preScriptEle.remove();
    }

    const scriptEle = document.createElement("script");
    scriptEle.id = "sina_contract_hq";
    scriptEle.async = true;
    scriptEle.src = "https://hq.sinajs.cn/?list=" + contracts.join(",");
    scriptEle.onload = function () {
      setPrices((prices) => {
        contracts.forEach((sinaSym) => {
          const info = (window as any)[`hq_str_${sinaSym}`];
          if (info) {
            prices[sinaSym] = parseFloat(info.split(",")[8]);
          }
        });
        return { ...prices };
      });
    };
    document.body.appendChild(scriptEle);
  }, [contracts]);

  const addContracts = useCallback((newContracts: ContractInfo[]) => {
    setContracts((contracts) => uniqStrs([...contracts, ...newContracts]));
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
    addContracts,
  };
}
