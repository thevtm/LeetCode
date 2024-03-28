export {}; // Necessary in order to avoid TS errors

function numSubarrayProductLessThanK(nums: number[], k: number): number {
  // const cumProd = [nums[0]];

  // for (let i = 1; i < nums.length; i++) {
  //   cumProd[i] = nums[i] * cumProd[i - 1];
  // }

  // console.log(cumProd);

  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] < k) {
      count++;
    } else {
      continue;
    }

    let acc = nums[i];

    for (let j = i + 1; j < nums.length; j++) {
      // if (cumProd[j] / (cumProd[i - 1] ?? 1) >= k) {
      //   break;
      // }

      // console.log(`[${i}]${cumProd[i]} -> [${j}]${cumProd[j]}`);
      acc *= nums[j];

      if (acc >= k) {
        break;
      }

      count++;
    }
  }

  return count;
}
