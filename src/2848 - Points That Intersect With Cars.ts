export {};

function numberOfPoints(nums: number[][]): number {
  nums.sort((a, b) => a[0] - b[0]);

  let intersecting_points = 0;
  let current = nums[0];

  for (let i = 1; i < nums.length; i++) {
    const next = nums[i];
    const is_overlapping = next[0] <= current[1];

    if (is_overlapping) {
      if (next[1] > current[1]) {
        current[1] = next[1];
      }
    } else {
      intersecting_points += current[1] - current[0] + 1;
      current = next;
    }
  }

  intersecting_points += current[1] - current[0] + 1;

  return intersecting_points;
}
