export {};

// Knuth-Morris-Pratt Algorithm (KMP)
// Longest Prefix Suffix
// Prefix Suffix Table
function longestPrefix(s: string): string {
  if (s.length === 1) {
    return "";
  }

  const lps = new Array<number>(s.length);
  lps[0] = 0;

  let i = 1;
  let j = 0;

  while (i < s.length) {
    if (s[i] === s[j]) {
      j++;
      lps[i] = j;
      i++;
    } else {
      if (j !== 0) {
        j = lps[j - 1];
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return s.slice(0, lps[lps.length - 1]);
}
