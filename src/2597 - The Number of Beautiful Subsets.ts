export {}; // Necessary in order to avoid TS errors

function beautifulSubsets(nums: number[], k: number): number {
  const acc: number[] = [];

  let result: number = 0;

  const backtrack = (index: number = 0): void => {
    if (acc.length > 0) {
      // console.log("> Result", acc);
      result++;
    }

    for (let i = index; i < nums.length; i++) {
      const n = nums[i];

      if (acc.some((x) => Math.abs(x - n) === k)) {
        continue;
      }

      acc.push(n);
      backtrack(i + 1);
      acc.pop();
    }
  };

  backtrack();

  return result;
}
