export {};

function longestMonotonicSubarray(nums: number[]): number {
  let count = 1;
  let max_count = 0;
  let direction = NaN;

  for (let i = 0; i < nums.length - 1; i++) {
    const new_direction = Math.sign(nums[i + 1] - nums[i]);
    const is_equal = new_direction === 0;
    const has_changed_direction = direction !== new_direction;

    if (is_equal || has_changed_direction) {
      max_count = Math.max(count, max_count);
      direction = new_direction;
      count = is_equal ? 1 : 2;
    } else {
      count++;
    }
  }

  max_count = Math.max(count, max_count);

  return max_count;
}
