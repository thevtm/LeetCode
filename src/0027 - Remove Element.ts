export {}; // Necessary in order to avoid TS errors

function removeElement(nums: number[], val: number): number {
  let k = 0;

  for (let i = 0; i < nums.length - k; i++) {
    if (nums[i] === val) {
      for (let j = i; j < nums.length - k - 1; j++) {
        nums[j] = nums[j + 1];
      }

      k++;
      i--;
    }
  }

  return nums.length - k;
}
