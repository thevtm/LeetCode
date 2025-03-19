export {};

function flip(n: number) {
  return n === 0 ? 1 : 0;
}

function minOperations(nums: number[]): number {
  let operations_count = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    if (nums[i] === 1) continue;

    nums[i] = flip(nums[i]);
    nums[i + 1] = flip(nums[i + 1]);
    nums[i + 2] = flip(nums[i + 2]);

    operations_count++;
  }

  if (nums[nums.length - 1] === 0 || nums[nums.length - 2] === 0) return -1;

  return operations_count;
}
