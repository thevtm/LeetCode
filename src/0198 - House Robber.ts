export {}; // Necessary in order to avoid TS errors

function rob(nums: number[]): number {
  const dp = new Array(nums.length).fill(0);

  for (const [i, n] of nums.entries()) {
    dp[i] = Math.max((dp[i - 2] ?? 0) + n, dp[i - 1] ?? 0);
  }

  // console.log(dp);

  return dp[nums.length - 1];
}
