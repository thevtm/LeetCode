// import _ from "lodash";

export {};

function canPartition(nums: number[]): boolean {
  const sum = _.sum(nums);
  const half = sum / 2;

  if (sum % 2 === 1) return false;

  const dp = _.memoize(
    (index: number, remainder: number): boolean => {
      if (remainder === 0) return true;
      if (remainder < 0) return false;
      if (index >= nums.length) return false;

      return dp(index + 1, remainder - nums[index]) || dp(index + 1, remainder);
    },
    (index, remainder) => `${index} - ${remainder}`
  );

  return dp(0, half);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
import { OrderedSet } from "js-sdsl";

function canPartition_ordered_set(nums: number[]): boolean {
  const sum = _.sum(nums);
  const half = sum / 2;

  if (sum % 2 === 1) return false;

  const foboar = new OrderedSet<number>([0]);

  for (const num of nums) {
    const nums_to_add: number[] = [];

    for (let it = foboar.begin(); !it.equals(foboar.end()) && it.pointer + num <= half; it.next()) {
      nums_to_add.push(it.pointer + num);
    }
  }

  return foboar.find(half) !== foboar.end();
}

const inputs: [number[], boolean][] = [
  [[1, 5, 11, 5], true],
  [[1, 2, 3, 5], false],
  [
    [
      39, 68, 6, 73, 8, 81, 90, 12, 60, 87, 20, 84, 83, 8, 55, 62, 97, 8, 77, 51, 71, 96, 3, 29, 90, 63, 2, 14, 38, 60,
      33, 34, 79, 41, 83, 32, 17, 67, 63, 97, 23, 16, 19, 8, 95, 57, 56, 96, 31, 85, 47, 19, 86, 60, 68, 11, 84, 5, 70,
      87, 70, 49, 30, 86, 63, 90, 73, 70, 86, 49, 98, 91, 57, 48, 98, 35, 22, 23, 78, 40, 96, 82, 94, 14, 78, 49, 43,
      12, 53, 23, 22, 90, 87, 92, 1, 39, 24, 7, 54, 84,
    ],
    true,
  ],
  [
    [
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
      100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 99, 97,
    ],
    false,
  ],
];

for (const [input, expected_result] of inputs) {
  const solutions: [string, (nums: number[]) => boolean][] = [
    ["memoize", canPartition],
    ["OrderedSet", canPartition_ordered_set],
  ];

  console.log(`input: ${input}`);

  for (const [name, fn] of solutions) {
    const timer_start = new Date();
    const result = fn(input);
    const timer_end = new Date();

    const result_emoji = result === expected_result ? "✔️" : "❌";

    console.log(`\t${result_emoji} ${name} => ${result} in ${timer_end.getTime() - timer_start.getTime()}ms`);
  }
}
*/
