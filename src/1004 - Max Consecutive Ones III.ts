export {};

function longestOnes(nums: number[], k: number): number {
  let left = 0;
  let right = 0;
  let zeros = 0;
  let max = 0;

  while (right < nums.length && left <= right) {
    if (zeros <= k) {
      max = Math.max(max, right - left);
      if (nums[right] === 0) zeros++;
      right++;
    } else {
      if (nums[left] === 0) zeros--;
      left++;
    }
  }

  if (zeros <= k) {
    max = Math.max(max, right - left);
  }

  return max;
}
