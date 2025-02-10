export {};

function checkPossibility(nums: number[]): boolean {
  let has_swapped = false;

  for (let i = 0; i < nums.length - 1; i++) {
    const curr = nums[i];
    const next = nums[i + 1];

    const is_next_lg = (next ?? Infinity) >= curr;

    if (is_next_lg) continue;

    if (has_swapped) return false;
    has_swapped = true;

    const prev = nums[i - 1];

    if (prev !== undefined && prev > next) {
      nums[i + 1] = curr;
    } else {
      nums[i] = next;
    }
  }

  return true;
}
