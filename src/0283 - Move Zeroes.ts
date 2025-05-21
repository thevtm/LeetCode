export {};

/**
 Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums: number[]): void {
  let zeroes_count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      zeroes_count++;
    } else {
      nums[i - zeroes_count] = nums[i];
    }
  }

  for (let i = nums.length - zeroes_count; i < nums.length; i++) {
    nums[i] = 0;
  }
}
