export {}; // Necessary in order to avoid TS errors

function rearrangeArray(nums: number[]): number[] {
  const n = nums.length;

  let nextPositiveIndex = 0;
  let nextNegativeIndex = 1;

  const r = new Array<number>(n);

  for (const num of nums) {
    if (num > 0) {
      r[nextPositiveIndex] = num;
      nextPositiveIndex += 2;
    } else {
      r[nextNegativeIndex] = num;
      nextNegativeIndex += 2;
    }
  }

  return r;
}
