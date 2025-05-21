export {};

function coinChange(coins: number[], amount: number): number {
  if (amount === 0) {
    return 0;
  }

  let dp = new Map<number, number>();
  dp[0] = Infinity;

  const stack = [[0, amount]];

  while (stack.length > 0) {
    const [c, a] = stack.pop()!;

    for (const coin of coins) {
      const new_amount = a - coin;
      const new_coins = c + 1;

      if (new_amount < 0) {
        continue;
      }

      if ((dp[new_amount] ?? Infinity) <= new_coins) {
        continue;
      }

      dp[new_amount] = new_coins;

      if (new_amount === 0) {
        continue;
      }

      stack.push([new_coins, new_amount]);
    }
  }

  if (dp[0] === Infinity) {
    return -1;
  }

  return dp[0];
}
