export {}; // Necessary in order to avoid TS errors

function findDuplicates(nums: number[]): number[] {
  const set = new Set();
  const result: number[] = [];

  for (const n of nums) {
    if (set.has(n)) {
      result.push(n);
    }

    set.add(n);
  }

  return result;
}
