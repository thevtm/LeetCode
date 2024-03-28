export {}; // Necessary in order to avoid TS errors

function maxSubarrayLength(nums: number[], k: number): number {
  const frequencies = new Map<number, number>();

  let left = 0;
  let longest = 0;

  frequencies.set(nums[left], 1);

  for (let right = 1; right < nums.length; right++) {
    const n = nums[right];
    frequencies.set(n, (frequencies.get(nums[right]) ?? 0) + 1);

    while (frequencies.get(n)! > k) {
      const ln = nums[left];
      frequencies.set(ln, frequencies.get(ln)! - 1);
      left++;
    }

    longest = Math.max(longest, right - left);
  }

  return longest + 1;
}
