import { expect, test, describe } from "vitest";

// There are 4 possible outcomes
// 0 = Initial Domino
// - = Dominos match (no need to flip)
// F = Flip in order to match
// ! = No match (no need to check row anymore)

// Example 1:
// 2 1 2 4 2 2
// 5 2 6 2 3 2
// 0 F - F - -
// 0 !

// Example 2:
// 3 5 1 2 3
// 3 6 3 3 4
// 0 !
// 0 !

function minDominoRotations(tops: number[], bottoms: number[]): number {
  const n = tops.length;

  let doubles = 0;
  let topRotations = 0;
  let bottomRotations = 0;
  let matchingTop = true;
  let matchingBottom = true;

  if (tops[0] === bottoms[0]) {
    doubles++;
  }

  for (let i = 1; i < n; i++) {
    if (tops[i] === bottoms[i]) {
      doubles++;
    }

    if (matchingTop) {
      if (tops[0] === tops[i]) {
        null;
      } else if (tops[0] === bottoms[i]) {
        topRotations++;
      } else if (matchingBottom) {
        matchingTop = false;
      } else {
        return -1;
      }
    }

    if (matchingBottom) {
      if (bottoms[0] === bottoms[i]) {
        null;
      } else if (bottoms[0] === tops[i]) {
        bottomRotations++;
      } else if (matchingTop) {
        matchingBottom = false;
      } else {
        return -1;
      }
    }

    // console.log("it", i, "top", tops[i], "bottom", bottoms[i], "matching", [matchingTop, matchingBottom], "rotations", [
    //   topRotations,
    //   bottomRotations,
    // ]);
  }

  // n - doubles - rotations = rotations if the first domino was flipped

  return Math.min(
    !matchingTop ? Infinity : topRotations,
    !matchingTop ? Infinity : n - doubles - topRotations,
    !matchingBottom ? Infinity : bottomRotations,
    !matchingBottom ? Infinity : n - doubles - bottomRotations
  );
}

type SolutionFunction = typeof minDominoRotations;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  {
    input: [
      [2, 1, 2, 4, 2, 2],
      [5, 2, 6, 2, 3, 2],
    ],
    expected_result: 2,
  },
  {
    input: [
      [3, 5, 1, 2, 3],
      [3, 6, 3, 3, 4],
    ],
    expected_result: -1,
  },
];

const solutions = [{ name: "best", fn: minDominoRotations }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
