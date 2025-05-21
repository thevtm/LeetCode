export {}; // Necessary in order to avoid TS errors

function twoSum(nums: number[], target: number): number[] {
  for (let i = 0; i < nums.length; i++) {
    const x = nums[i];
    const tail = nums.slice(i + 1);

    for (let j = 0; j < tail.length; j++) {
      const y = tail[j];

      if (x + y == target) {
        return [i, j + i + 1];
      }
    }
  }

  return [];
}
