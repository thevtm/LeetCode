export {}; // Necessary in order to avoid TS errors

function subsetXORSum(nums: number[]): number {
  const acc: number[] = [];
  let result: number = 0;

  const backtrack = (index: number = 0): void => {
    result += acc.reduce((a, x) => a ^ x, 0);

    for (let i = index; i < nums.length; i++) {
      const n = nums[i];
      acc.push(n);
      backtrack(i + 1);
      acc.pop();
    }
  };

  backtrack();

  return result;
}
