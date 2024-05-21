export {}; // Necessary in order to avoid TS errors

function subsets(nums: number[]): number[][] {
  const acc: number[] = [];
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    result.push([...acc]);

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
