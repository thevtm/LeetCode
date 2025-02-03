export {};

function check(nums: number[]): boolean {
  let directions_changed_already = false;

  for (let i = 0; i < nums.length; i++) {
    const direction = Math.sign(nums[(i + 1) % nums.length] - nums[i]);

    if (direction === -1) {
      if (directions_changed_already) {
        return false;
      } else {
        directions_changed_already = true;
      }
    }
  }

  return true;
}
