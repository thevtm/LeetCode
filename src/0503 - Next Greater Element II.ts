export {}; // Necessary in order to avoid TS errors

function nextGreaterElements(nums: number[]): number[] {
  const greatest = new Array(nums.length).fill(-1);
  const stack = new Array<[number, number]>();

  for (let i = 0; i < nums.length * 2; i++) {
    const numsIndex = i % nums.length;
    const n = nums[numsIndex];

    while (stack.length !== 0 && stack[0][1] < n) {
      const [si, sn] = stack.shift()!;
      greatest[si] = n;
    }

    if (stack.length === 0 && i >= nums.length) {
      break;
    }

    if (i < nums.length) {
      stack.unshift([i, n]);
    }
  }

  return greatest;
}
