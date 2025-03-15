export {};

function rob(nums: number[]): number {
  const n = nums.length;

  if (n < 4) return Math.max(...nums);

  let dp = new Array<number>(n);
  dp[n - 1] = nums[n - 1];
  dp[n - 2] = Math.max(dp[n - 1], nums[n - 2]);

  for (let i = n - 3; i > 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }

  const a = dp[1];

  console.log(dp);

  dp[n - 1] = 0;
  dp[n - 2] = nums[n - 2];

  for (let i = n - 3; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }

  const b = dp[0];

  console.log(dp);

  return Math.max(a, b);
}
