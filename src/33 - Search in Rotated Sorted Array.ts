export {};

function search(nums: number[], target: number): number {
  let lower = 0;
  let upper = nums.length - 1;

  while (lower <= upper) {
    const middle_index = Math.floor((upper + lower) / 2);
    const middle_num = nums[middle_index];

    if (middle_num === target) {
      return middle_index;
    } else if (target < middle_num) {
      if (target >= nums[lower] || nums[upper] > middle_num) {
        upper = middle_index - 1;
      } else {
        lower = middle_index + 1;
      }
    } else {
      if (target <= nums[upper] || nums[lower] < middle_num) {
        lower = middle_index + 1;
      } else {
        upper = middle_index - 1;
      }
    }
  }

  return -1;
}
