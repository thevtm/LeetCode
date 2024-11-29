export {}; // Necessary in order to avoid TS errors

function combinationSum4(nums: number[], target: number): number {
  let sum: number = 0;
  let result: number = 0;

  const backtrack = (): void => {
    if (sum === target) {
      result++;
      return;
    }

    if (sum > target) {
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const n = nums[i];

      sum += n;
      backtrack();
      sum -= n;
    }
  };

  backtrack();

  return result;
}
