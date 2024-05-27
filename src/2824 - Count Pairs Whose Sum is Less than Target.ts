export {}; // Necessary in order to avoid TS errors

function countPairs(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);

  console.log("nums", nums.join(", "));

  let left = 0;

  let result = 0;

  while (left < nums.length - 1 && nums[left] + nums[left] < target) {
    let right = left + 1;

    console.log(">", `[[${left}]${nums[left]} - [${right}]${nums[right]}]`, `result=${result}`);

    while (right < nums.length && nums[right] + nums[left] < target) {
      result++;
      console.log(">>", `[[${left}]${nums[left]} - [${right}]${nums[right]}]`, `result=${result}`);
      right++;
    }

    left++;
  }

  return result;
}
