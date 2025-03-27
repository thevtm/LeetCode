export {};

function minimumIndex(nums: number[]): number {
  // Boyer-Moore Majority Vote Algorithm
  let candidate = nums[0];
  let count = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === candidate) {
      count++;
    } else {
      if (count === 1) {
        candidate = nums[i];
        count = 1;
      } else {
        count--;
      }
    }
  }

  // console.log("candidate", candidate, "count", count);

  //////////////////////////////////////////////////////////////////////////////

  const dominant = candidate;
  count = nums.reduce((acc, num) => (num === dominant ? acc + 1 : acc), 0);

  // console.log("count", count);

  if (count < nums.length / 2) return -1;

  //////////////////////////////////////////////////////////////////////////////

  const dominant_count = count;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === dominant) count--;

    const left_length = i + 1;
    const right_length = nums.length - left_length;

    const right_dominant_count = count;
    const left_dominant_count = dominant_count - right_dominant_count;

    const is_left_side_valid = left_dominant_count > left_length / 2;
    const is_right_side_valid = right_dominant_count > right_length / 2;

    if (is_left_side_valid && is_right_side_valid) return i;
  }

  return -1;
}
