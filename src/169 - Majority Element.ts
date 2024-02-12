export {}; // Necessary in order to avoid TS errors

function majorityElement(nums: number[]): number {
  let mostFrequentNum: number = nums[0];
  let mostFrequentNumCount = 1;

  for (let i = 1; i < nums.length; i++) {
    const n = nums[i];

    if (mostFrequentNumCount === 0) {
      mostFrequentNum = n;
      mostFrequentNumCount = 1;
      continue;
    }

    if (mostFrequentNum === n) {
      mostFrequentNumCount++;
    } else {
      mostFrequentNumCount--;
    }
  }

  return mostFrequentNum;
}

function majorityElementSmart(nums: number[]): number {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
}
