export {};

function maximumTripletValue(nums: number[]): number {
  let max = 0;

  for (let i = 0; i < nums.length - 2; i++) {
    for (let j = i + 1; j < nums.length - 1; j++) {
      for (let k = j + 1; k < nums.length; k++) {
        max = Math.max(max, (nums[i] - nums[j]) * nums[k]);
      }
    }
  }

  return max;
}
