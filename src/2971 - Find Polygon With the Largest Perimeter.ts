export {}; // Necessary in order to avoid TS errors

function largestPerimeter(nums: number[]): number {
  nums.sort((a, b) => b - a);

  let sum = nums.reduce((acc, n) => acc + n);

  for (const [i, num] of nums.slice(0, -2).entries()) {
    sum -= num;

    if (num < sum) {
      return sum + num;
    }
  }

  return -1;
}
