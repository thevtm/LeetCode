export {}; // Necessary in order to avoid TS errors

function permuteUnique(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);

  // No allocations
  const acc: number[] = new Array(nums.length).fill(NaN);
  let accLen: number = 0;

  const used: boolean[] = new Array(nums.length).fill(false);

  const result: number[][] = [];

  const backtrack = (): void => {
    if (accLen === nums.length) {
      result.push(acc.slice());
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const n = nums[i];

      if (used[i] === true) {
        continue;
      }

      if (used[i - 1] === true && n === nums[i - 1]) {
        continue;
      }

      used[i] = true;
      acc[accLen++] = n;

      backtrack();

      used[i] = false;
      accLen--;
    }
  };

  backtrack();

  return result;
}
