export {};

function longestNiceSubarray(nums: number[]): number {
  let left = 0;
  let acc = nums[0];
  let longest = 1;

  for (let right = 1; right < nums.length; right++) {
    while (left < right && (acc & nums[right]) !== 0) {
      acc = acc ^ nums[left++];
    }

    acc = acc | nums[right];
    longest = Math.max(longest, right - left + 1);
  }

  return longest;
}
