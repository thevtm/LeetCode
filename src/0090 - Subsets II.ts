export {}; // Necessary in order to avoid TS errors

function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  const acc: number[] = [];
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    result.push([...acc]);

    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) {
        continue;
      }

      const n = nums[i];

      acc.push(n);
      backtrack(i + 1);
      acc.pop();
    }
  };

  backtrack();

  return result;
}
