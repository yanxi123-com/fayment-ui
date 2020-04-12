export function uniqStrs(strs: string[]): string[] {
  const strMap: { [key: string]: boolean } = {};
  const result: string[] = [];
  strs.forEach((str) => {
    if (strMap[str] == null) {
      strMap[str] = true;
      result.push(str);
    }
  });
  return result;
}

export function uniqArray<T>(array: T[], toString: (element: T) => string) {
  const strMap: { [key: string]: boolean } = {};
  const result: T[] = [];
  array.forEach((element) => {
    const str = toString(element);
    if (strMap[str] == null) {
      strMap[str] = true;
      result.push(element);
    }
  });
  return result;
}
