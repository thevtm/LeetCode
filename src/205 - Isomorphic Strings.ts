export {}; // Necessary in order to avoid TS errors

function isIsomorphic(s: string, t: string): boolean {
  const sMap = new Map<string, number>();
  const tMap = new Map<string, number>();

  let n = 0;

  for (let i = 0; i < s.length; i++) {
    // console.log(i, sMap, tMap);

    if (sMap.has(s[i])) {
      if (sMap.get(s[i]) !== tMap.get(t[i])) {
        return false;
      }
    } else {
      if (tMap.has(t[i])) {
        return false;
      }

      sMap.set(s[i], n);
      tMap.set(t[i], n);
      n++;
    }
  }

  return true;
}
