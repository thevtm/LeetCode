export {}; // Necessary in order to avoid TS errors

function missingNumber(nums: number[]): number {
  const n = nums.length;
  const expected_sum = (n * (n + 1)) / 2;
  const sum = nums.reduce((acc, x) => acc + x);

  return expected_sum - sum;
}
