export {};

function minZeroArray(nums: number[], queries: [number, number, number][]): number {
  let lower_bound = -1;
  let upper_bound = queries.length - 1;
  let min = Infinity;

  const diff_array = new Array(nums.length + 1).fill(0);
  let diff_array_index = -1;

  while (lower_bound <= upper_bound) {
    const middle_index = Math.floor((lower_bound + upper_bound) / 2);

    // Move `diff_arr` forward
    while (diff_array_index < middle_index) {
      const [l, r, v] = queries[++diff_array_index];
      diff_array[l] += v;
      diff_array[r + 1] += -v;
    }

    // Move `diff_arr` backwards
    while (diff_array_index > middle_index) {
      const [l, r, v] = queries[diff_array_index--];
      diff_array[l] -= v;
      diff_array[r + 1] -= -v;
    }

    // Check if we are in the upper / lower side
    let is_above = true;
    let diff_acc = 0;

    for (let i = 0; i < nums.length; i++) {
      diff_acc += diff_array[i];

      if (nums[i] > diff_acc) {
        is_above = false;
        break;
      }
    }

    if (is_above) {
      min = Math.min(min, middle_index + 1);
      upper_bound = middle_index - 1;
    } else {
      lower_bound = middle_index + 1;
    }
  }

  if (min === Infinity) {
    return -1;
  }

  return min;
}
