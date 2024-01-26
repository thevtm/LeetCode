export {}; // Necessary in order to avoid TS errors

function sortAscending<T>(arr: T[]): T[] {
  return arr.sort((a, b) => {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  });
}

function countOperations(num1: number, num2: number): number {
  let operations = 0;

  let nums = sortAscending([num1, num2]);

  while (nums[0] !== 0) {
    nums[1] = nums[1] - nums[0];
    nums = sortAscending(nums);
    operations += 1
  }

  return operations;
}
