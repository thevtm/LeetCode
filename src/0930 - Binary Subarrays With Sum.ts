export {}; // Necessary in order to avoid TS errors

function numSubarraysWithSum(nums: number[], goal: number): number {
  let count = 0;
  let left = 0;
  let sum = 0;

  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];

    if (sum === goal) {
      console.log(`[${count}] ${left} -> ${right} = ${sum}`);
      count++;
    } else if (sum >= goal) {
      while (sum >= goal) {
        sum -= nums[left];
        left++;

        if (sum === goal) {
          console.log(`[${count}] ${left} -> ${right} = ${sum}`);
          count++;
        }
      }
    }
  }

  return count;
}
