import { expect, test, describe } from "vitest";

function matchPlayersAndTrainers(players: number[], trainers: number[]): number {
  players.sort((a, b) => b - a);
  trainers.sort((a, b) => b - a);

  let count = 0;
  let j = 0;

  for (let i = 0; i < trainers.length; i++) {
    while (j < players.length && trainers[i] < players[j]) j++;
    if (j >= players.length) break;
    j++;
    count++;
  }

  return count;
}

type SolutionFunction = typeof matchPlayersAndTrainers;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [4, 7, 9],
      [8, 2, 5, 8],
    ],
    expected_result: 2,
  },
  { input: [[1, 1, 1], [10]], expected_result: 1 },
];

const solutions = [{ name: "best", fn: matchPlayersAndTrainers }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
