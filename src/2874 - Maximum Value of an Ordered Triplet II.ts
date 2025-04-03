export {};

function maximumTripletValue(nums: number[]): number {
  const prefix_max = new Array<number>(nums.length);
  const suffix_max = new Array<number>(nums.length);

  prefix_max[0] = nums[0];
  suffix_max[nums.length - 1] = nums[nums.length - 1];

  for (let i = 1; i < nums.length; i++) {
    const j = nums.length - 1 - i;

    prefix_max[i] = Math.max(prefix_max[i - 1], nums[i]);
    suffix_max[j] = Math.max(suffix_max[j + 1], nums[j]);
  }

  // console.log("prefix_max", prefix_max);
  // console.log("suffix_max", suffix_max);

  let max = 0;

  for (let i = 1; i < nums.length - 1; i++) {
    max = Math.max(max, (prefix_max[i - 1] - nums[i]) * suffix_max[i + 1]);
  }

  return max;
}
