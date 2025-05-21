export {};

function search(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length - 1;

  while (start <= end) {
    const middle_index = Math.floor((end + start) / 2);
    const middle_num = nums[middle_index];

    if (middle_num === target) return middle_index;
    else if (middle_num < target) start = middle_index + 1;
    else end = middle_index - 1;
  }

  return -1;
}
