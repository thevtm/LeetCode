import { expect, test, describe } from "vitest";

function numRabbits(answers: number[]): number {
  const nums_frequencies = new Map<number, number>();

  for (const answer of answers) {
    nums_frequencies.set(answer, (nums_frequencies.get(answer) ?? 0) + 1);
  }

  console.log("nums_frequencies", nums_frequencies);

  let count = 0;

  for (const [answer, frequency] of nums_frequencies.entries()) {
    count += Math.ceil(frequency / (answer + 1)) * (answer + 1);
  }

  return count;
}

type SolutionFunction = typeof numRabbits;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 1, 2]], expected_result: 5 },
  { input: [[10, 10, 10]], expected_result: 11 },
  { input: [[1, 0, 1, 0, 0]], expected_result: 5 },
  { input: [[0, 0, 1, 1, 1]], expected_result: 6 },
];

const solutions = [{ name: "best", fn: numRabbits }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
