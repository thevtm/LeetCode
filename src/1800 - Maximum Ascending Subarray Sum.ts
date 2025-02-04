export {};

function maxAscendingSum(nums: number[]): number {
  let max_sum = nums[0];
  let curr_sum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) {
      curr_sum += nums[i];
    } else {
      max_sum = Math.max(max_sum, curr_sum);
      curr_sum = nums[i];
    }
  }

  max_sum = Math.max(max_sum, curr_sum);

  return max_sum;
}
