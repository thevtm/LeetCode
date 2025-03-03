export {};

function pivotArray(nums: number[], pivot: number): number[] {
  let equal = 0;
  let lower = 0;

  for (const num of nums) {
    if (num === pivot) equal++;
    else if (num < pivot) lower++;
  }

  const result = new Array(nums.length);

  let lower_idx = 0;
  let equal_idx = lower;
  let higher_idx = lower + equal;

  for (const num of nums) {
    if (num === pivot) result[equal_idx++] = num;
    else if (num < pivot) result[lower_idx++] = num;
    else result[higher_idx++] = num;
  }

  return result;
}
