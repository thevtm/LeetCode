export {};

function maxProduct(nums: number[]): number {
  let max = -Infinity;

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const product = (nums[i] - 1) * (nums[j] - 1);
      max = Math.max(max, product);
    }
  }

  return max;
}
