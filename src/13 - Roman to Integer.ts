export {}; // Necessary in order to avoid TS errors

function romanToInt(s: string): number {
  const symbols = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let result = 0;

  for (let i = 0; i < s.length; i++) {
    const value = symbols[s[i]];
    const valueNext = i + 1 < s.length ? symbols[s[i + 1]] : -Infinity;

    if (valueNext <= value) {
      result += value;
    } else {
      result -= value;
    }
  }

  return result;
}
