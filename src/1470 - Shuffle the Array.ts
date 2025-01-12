export {};

function shuffle(nums: number[], n: number): number[] {
  const arr = new Array<number>(nums.length);

  for (let i = 0; i < n; i++) {
    arr[i * 2] = nums[i];
    arr[i * 2 + 1] = nums[n + i];
  }

  return arr;
}
