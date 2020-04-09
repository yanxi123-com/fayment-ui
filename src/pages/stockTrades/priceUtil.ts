const symOrder = ["USD", "BTC", "ETH", "BNB", "HT", "EOS"];

function compareSymBuilder(symPriceMap: {
  [sym: string]: number;
}): (s1: string, s2: string) => number {
  return function compareSym(s1: string, s2: string) {
    // 法币优先
    if (s1.indexOf("USD") > -1) {
      return -1;
    }

    if (s2.indexOf("USD") > -1) {
      return 1;
    }

    // 按照 symOrder 的顺序
    const s1order = symOrder.indexOf(s1);
    const s2order = symOrder.indexOf(s2);
    if (s1order > -1 && s2order > -1) {
      return s1order - s2order;
    }
    if (s1order > -1) {
      return -1;
    }
    if (s2order > -1) {
      return 1;
    }

    // 按照价格
    const s1price = symPriceMap[s1];
    const s2price = symPriceMap[s2];
    if (s1price && s2price) {
      return symPriceMap[s2] - symPriceMap[s1];
    }
    if (s1price) {
      return -1;
    }
    if (s2price) {
      return 1;
    }
    return 0;
  };
}

export function getBaseSym(
  symPriceMap: { [sym: string]: number },
  ...syms: string[]
) {
  return syms.sort(compareSymBuilder(symPriceMap))[0];
}
