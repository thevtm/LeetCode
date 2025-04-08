export {};

function minimumOperations(nums: number[]): number {
  const last_num_indexes = new Set<number>();

  for (let i = nums.length - 1; i >= 0; i--) {
    if (last_num_indexes.has(nums[i])) return Math.ceil((i + 1) / 3);
    last_num_indexes.add(nums[i]);
  }

  return 0;
}
