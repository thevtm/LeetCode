export {}; // Necessary in order to avoid TS errors

function isStrictlyIncreasing(nums: number[]): boolean {
  let previous_num = -Infinity;

  for (const num of nums) {
    if (num <= previous_num) {
      return false;
    }

    previous_num = num;
  }

  return true;
}

function canBeIncreasing(nums: number[]): boolean {
  if (isStrictlyIncreasing(nums)) {
    return true;
  }

  for (const [index] of nums.entries()) {
    if (
      isStrictlyIncreasing([...nums.slice(0, index), ...nums.slice(index + 1)])
    ) {
      return true;
    }
  }

  return false;
}
