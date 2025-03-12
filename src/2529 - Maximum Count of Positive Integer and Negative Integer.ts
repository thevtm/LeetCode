export {};

function maximumCount(nums: number[]): number {
  let negative_end = 0;
  while (negative_end < nums.length && nums[negative_end] < 0) negative_end++;

  let positive_start = negative_end;
  while (positive_start < nums.length && nums[positive_start] === 0) positive_start++;

  return Math.max(negative_end, nums.length - positive_start);
}
