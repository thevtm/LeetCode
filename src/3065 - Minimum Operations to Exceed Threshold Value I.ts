export {};

function minOperations(nums: number[], k: number): number {
  let lower_nums = 0;

  for (const num of nums) {
    if (num < k) {
      lower_nums++;
    }
  }

  return lower_nums;
}
