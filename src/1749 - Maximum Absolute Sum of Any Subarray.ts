export {};

function maxAbsoluteSum(nums: number[]): number {
  // Kanade Algorithm
  let max = Math.abs(nums[0]);
  let cur_pos = nums[0];
  let cur_neg = nums[0];

  for (let i = 1; i < nums.length; i++) {
    if (cur_pos < 0) {
      cur_pos = nums[i];
    } else {
      cur_pos += nums[i];
    }

    if (cur_neg > 0) {
      cur_neg = nums[i];
    } else {
      cur_neg += nums[i];
    }

    max = Math.max(max, Math.abs(cur_pos), Math.abs(cur_neg));
  }

  return max;
}
