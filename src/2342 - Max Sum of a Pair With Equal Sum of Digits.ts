export {};

function maximumSum(nums: number[]): number {
  const top_in_group = new Map<number, number>();
  let max_sum = -1;

  for (let i = 0; i < nums.length; i++) {
    let n = nums[i];
    let sum = 0;

    while (n > 0) {
      sum += n % 10;
      n = Math.trunc(n / 10);
    }

    const curr_top = top_in_group.get(sum);

    if (curr_top === undefined) {
      top_in_group.set(sum, nums[i]);
      continue;
    }

    max_sum = Math.max(max_sum, nums[i] + curr_top);
    top_in_group.set(sum, Math.max(curr_top, nums[i]));
  }

  return max_sum;
}
