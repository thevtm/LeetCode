export {};

function resultArray(nums: number[]): number[] {
  const arr1 = [nums[0]];
  const arr2 = [nums[1]];

  for (let i = 2; i < nums.length; i++) {
    const last_element_arr1 = arr1[arr1.length - 1];
    const last_element_arr2 = arr2[arr2.length - 1];

    if (last_element_arr1 > last_element_arr2) {
      arr1.push(nums[i]);
    } else {
      arr2.push(nums[i]);
    }
  }

  return arr1.concat(arr2);
}
