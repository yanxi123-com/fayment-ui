export function uniqStrs(strs: string[]): string[] {
  const strMap: { [key: string]: boolean } = {};
  const result: string[] = [];
  strs.forEach(str => {
    if (strMap[str] == null) {
      strMap[str] = true;
      result.push(str);
    }
  });
  return result;
}
