export {};

function findDifferentBinaryString(nums: string[]): string {
  const n = nums[0].length;
  const set = new Set(nums);

  const acc: number[] = [];

  const backtracking = (): boolean => {
    if (acc.length === n) {
      return !set.has(acc.join(""));
    }

    acc.push(0);

    if (backtracking()) return true;

    acc[acc.length - 1] = 1;

    if (backtracking()) return true;

    acc.pop();

    return false;
  };

  backtracking();

  return acc.join("");
}
