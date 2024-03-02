export {}; // Necessary in order to avoid TS errors

function sortedSquares(nums: number[]): number[] {
  return _.map(nums, (x) => x * x).sort((a, b) => a - b);
}
