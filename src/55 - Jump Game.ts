export {}; // Necessary in order to avoid TS errors

function canJump(nums: number[]): boolean {
  const last = nums.length - 1;
  let max = 0;

  for (const [i, n] of nums.entries()) {
    if (i > max) {
      return false;
    }

    max = Math.max(max, i + n);

    if (max >= last) {
      return true;
    }
  }

  return true;
}
