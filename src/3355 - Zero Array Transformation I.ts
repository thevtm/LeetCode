export {};

function isZeroArray(nums: number[], queries: [number, number][]): boolean {
  const prefix_sum = new Array(nums.length + 1).fill(0);

  for (const [l, r] of queries) {
    prefix_sum[l]++;
    prefix_sum[r + 1]--;
  }

  if (prefix_sum[0] < nums[0]) return false;

  for (let i = 1; i < prefix_sum.length; i++) {
    prefix_sum[i] += prefix_sum[i - 1];

    if (prefix_sum[i] < nums[i]) return false;
  }

  return true;
}
