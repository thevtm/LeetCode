export {}; // Necessary in order to avoid TS errors

function countSubarrays(nums: number[], k: number): number {
  const frequencies = new Map<number, number>();
  let count = 0;
  let left = 0;

  for (let right = 0; right < nums.length; right++) {
    const n = nums[right];

    frequencies.set(n, (frequencies.get(n) ?? 0) + 1);

    // console.log(frequencies);
    // console.log(_.max(Array.from(frequencies.values())));

    if (
      frequencies.get(
        _.max(
          _.map(
            _.filter(Array.from(frequencies.entries()), ([k, v]) => v !== 0),
            ([k, v]) => k
          )
        )
      )! >= k
    ) {
      count += left;
    }

    while (
      frequencies.get(
        _.max(
          _.map(
            _.filter(Array.from(frequencies.entries()), ([k, v]) => v !== 0),
            ([k, v]) => k
          )
        )
      )! >= k
    ) {
      console.log(frequencies);
      console.log(`${left} => ${right}`);

      const ln = nums[left];
      frequencies.set(ln, frequencies.get(ln)! - 1);
      left++;
      count++;
    }

    // longest = Math.max(longest, right - left);
  }

  console.log(frequencies);

  return count;
}

// [1] 3 2 3 3
// [1 3] 2 3 3
// [1 3 2] 3 3
// [1 3 2 3] 3 +
// 1 [3 2 3] 3 +
// 1 3 [2 3] 3
// 1 3 2 [3] 3
// 1 3 2 [3 3] +
// 1 3 [2 3 3] +
