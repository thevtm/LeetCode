export {}; // Necessary in order to avoid TS errors

function searchInsert(nums: number[], target: number): number {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const midpoint = Math.floor((right - left) / 2 + left);

    // console.log(`l: ${left} - r: ${right} - m: [${midpoint}]${nums[midpoint]}`);

    if (target === nums[midpoint]) {
      return midpoint;
    } else if (target < nums[midpoint]) {
      right = midpoint - 1;
    } else {
      left = midpoint + 1;
    }
  }

  return left;
}
