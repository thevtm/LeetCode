export {}; // Necessary in order to avoid TS errors

function combine(n: number, k: number): number[][] {
  const nums = [...Array(n).keys()].map((x) => x + 1);

  // No allocations
  const acc: number[] = new Array(k).fill(NaN);
  let accLen = 0;

  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    if (accLen === k) {
      result.push([...acc]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      const n = nums[i];

      acc[accLen++] = n;
      backtrack(i + 1);
      accLen--;
    }
  };

  backtrack();

  return result;
}
