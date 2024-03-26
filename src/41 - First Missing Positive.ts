export {}; // Necessary in order to avoid TS errors

function firstMissingPositive(nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] <= 0 || nums[i] > nums.length) {
      nums[i] = Infinity;
    }
  }

  // console.log(nums);

  for (let i = 0; i < nums.length; i++) {
    const n = Math.abs(nums[i]);

    if (n !== Infinity && nums[n - 1] > 0) {
      nums[n - 1] *= -1;
    }
  }

  // console.log(nums);

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) {
      return i + 1;
    }
  }

  return nums.length + 1;
}
