export {}; // Necessary in order to avoid TS errors

function largestDivisibleSubset(nums: number[]): number[] {
  nums.sort((a, b) => b - a);

  const cache = new Array<number[]>(nums.length);

  const recursive = (index: number = 0): number[] => {
    const n = nums[index];
    let top = [n];

    for (let i = index + 1; i < nums.length; i++) {
      if (n % nums[i] !== 0) {
        continue;
      }

      const r = (cache[i] ??= recursive(i));

      if (r.length + 1 > top.length) {
        top = [...r, n];
      }
    }

    return top;
  };

  return nums.map((n, i) => recursive(i)).reduce((acc, ns) => (acc.length > ns.length ? acc : ns));
}
