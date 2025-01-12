export {};

function runningSum(nums: number[]): number[] {
  const running_sum = new Array<number>(nums.length);
  running_sum[0] = nums[0];

  for (let i = 1; i < nums.length; i++) {
    running_sum[i] = running_sum[i - 1] + nums[i];
  }

  return running_sum;
}
