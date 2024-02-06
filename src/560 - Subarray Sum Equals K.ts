export {}; // Necessary in order to avoid TS errors

//        1 2 3
// presum 1 3 6
// result 2 => [1 2] [3]

//        1 2 1 2 1
// presum 1 3 4 6 7
// result 4 [1 2] [2 1] [1 2] [2 1]

function subarraySum(nums: number[], k: number): number {
  const presum = new Array(nums.length);
  const presum_map: Map<number, number[]> = new Map();

  for (const [i, n] of nums.entries()) {
    const presum_previous = presum[i - 1] ?? 0;
    presum[i] = presum_previous + n;

    const presum_value = presum_map.get(presum[i]);

    if (presum_value == null) {
      presum_map.set(presum[i], [i]);
    } else {
      presum_value.push(i);
    }
  }

  // console.log("presum", presum);
  // console.log("presum_map", presum_map);

  let count = 0;

  for (const [i, n] of presum.entries()) {
    const num = nums[i];
    const expected = n + k - num;
    const matches = presum_map.get(expected);

    // console.log("i", i, "num", num, "n", n, "expected", expected, "matches", matches);

    if (matches == null) {
      continue;
    }

    for (const m of matches) {
      if (m >= i) {
        count++;
      }
    }
  }

  return count;
  // return bruteforce_with_presum(presum_map, k);
}

// [[1 2 3] L] -> [[1 2] L] [[2 3] R]
// [[1 2] L]   -> [[1]   L] [[2]   R]
// [[2 3] R]   ->           [[3]   R]

function bruteforce_with_presum(
  presum: number[],
  k: number,
  start: number = 0,
  end: number = presum.length - 1,
  left: boolean = true
): number {
  // use presum hash to find the matching pair
  let subarray_count = 0;

  const presum_start = presum[start - 1] ?? 0;
  const presum_end = presum[end];

  const nums_sum = presum_end - presum_start;

  // console.log(nums, nums_sum);

  // console.log(
  //   "start",
  //   start,
  //   "end",
  //   end,
  //   "presum[start]",
  //   presum_start,
  //   "presum[end]",
  //   presum_end,
  //   "nums_sum",
  //   nums_sum
  // );

  if (nums_sum === k) {
    subarray_count += 1;
  }

  // Doesn't work when there are negative numbers
  // if (nums_sum < k) {
  //   return 0;
  // }

  if (end - start + 1 < 2) {
    return subarray_count;
  }

  if (left) {
    subarray_count += bruteforce_with_presum(presum, k, start, end - 1, true);
  }

  subarray_count += bruteforce_with_presum(presum, k, start + 1, end, false);

  return subarray_count;
}

function bruteforce(nums: number[], k: number, left: boolean = true): number {
  let subarray_count = 0;

  const nums_sum = sum(nums);

  // console.log(nums, nums_sum);

  if (nums_sum === k) {
    subarray_count += 1;
  }

  // Doesn't work when there are negative numbers
  // if (nums_sum < k) {
  //   return 0;
  // }

  if (nums.length < 2) {
    return subarray_count;
  }

  if (left) {
    subarray_count += bruteforce(nums.slice(0, nums.length - 1), k);
  }

  subarray_count += bruteforce(nums.slice(1, nums.length), k, false);

  return subarray_count;
}

function sum(arr: number[]): number {
  return arr.reduce((acc, el) => acc + el, 0);
}
