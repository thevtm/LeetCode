export {}; // Necessary in order to avoid TS errors

/* BINARY SEARCH */

function specialArray(nums: number[]): number {
  nums.sort((a, b) => a - b);

  console.log("nums", nums.join(", "));

  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    const middleIndex = Math.floor((right - left) / 2 + left);
    const x = nums.length - middleIndex;
    const numMiddle = nums[middleIndex];
    const numBeforeMiddle = nums[middleIndex - 1] ?? -Infinity;

    console.log(">", `[${left} - ${right}]`, `middle=[${middleIndex}]${numMiddle}`, `x=${x}`);

    if (numMiddle >= x && numBeforeMiddle < x) {
      console.log(">", "found", `x=${x}`);
      return x;
    }

    if (x >= numMiddle) {
      left = middleIndex + 1;
    } else {
      right = middleIndex - 1;
    }
  }

  console.log("not found");

  return -1;
}
