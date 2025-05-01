import { expect, test, describe } from "vitest";

function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  potions.sort((a, b) => a - b);

  const spells_with_index_sorted = Array.from(spells.entries()).sort((a, b) => b[1] - a[1]);

  const result = new Array<number>(spells.length);
  let potions_it = 0;

  for (let spells_it = 0; spells_it < spells.length; spells_it++) {
    const [spell_index, spell_value] = spells_with_index_sorted[spells_it];

    while (potions_it < potions.length && potions[potions_it] * spell_value < success) potions_it++;

    result[spell_index] = potions.length - potions_it;
  }

  return result;
}

type SolutionFunction = typeof successfulPairs;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[5, 1, 3], [1, 2, 3, 4, 5], 7], expected_result: [4, 0, 3] },
  { input: [[3, 1, 2], [8, 5, 8], 16], expected_result: [2, 0, 2] },
];

const solutions = [{ name: "best", fn: successfulPairs }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
