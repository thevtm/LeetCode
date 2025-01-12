export {};

function finalPrices(prices: number[]): number[] {
  const answer = new Array<number>(prices.length);

  outer: for (let i = 0; i < prices.length; i++) {
    for (let j = i + 1; j < prices.length; j++) {
      if (prices[j] <= prices[i]) {
        answer[i] = prices[i] - prices[j];
        continue outer;
      }
    }

    answer[i] = prices[i];
  }

  return answer;
}
