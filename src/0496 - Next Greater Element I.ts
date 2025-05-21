export {}; // Necessary in order to avoid TS errors

function nextGreaterElement(nums1: number[], nums2: number[]): number[] {
  const greatest = new Map<number, number>();
  const stack = new Array<number>();

  for (const [i, n] of nums2.entries()) {
    while (stack.length !== 0 && stack[0] < n) {
      greatest.set(stack[0], n);

      stack.shift();
    }

    stack.unshift(n);
  }

  return nums1.map((n) => greatest.get(n) ?? -1);
}
