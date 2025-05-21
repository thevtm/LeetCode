export {}; // Necessary in order to avoid TS errors

//         7 1 5 3 6 4
// lowest  7 1 1 1 1 1
// profit  0 0 4 2 5 3

function maxProfit(prices: number[]): number {
  const lowest = new Int32Array(prices.length);
  const profit = new Int32Array(prices.length);

  for (const [i, n] of prices.entries()) {
    lowest[i] = Math.min(n, lowest[i - 1] ?? n);
    profit[i] = n - lowest[i];
  }

  // console.log(lowest);
  // console.log(profit);

  return Math.max(...profit);
}
