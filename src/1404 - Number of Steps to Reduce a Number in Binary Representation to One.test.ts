import _ from "lodash";

import { expect, test, describe } from "vitest";

function numSteps(s: string): number {
  const str = s.split("");

  let steps = 0;

  while (str.length > 1) {
    const last_index = str.length - 1;

    if (str[last_index] === "0") {
      steps++;
      str.pop();
    } else {
      steps++;
      str[last_index] = "0";

      let i = last_index - 1;

      while (i >= 0) {
        if (str[i] === "0") {
          str[i] = "1";
          break;
        } else {
          str[i] = "0";
          i--;
        }
      }

      if (i === -1) str.unshift("1");
    }
  }

  return steps;
}

function numSteps_old(s: string): number {
  const str = s.split("");

  let steps = 0;
  let endIndex = str.length - 1;

  while (endIndex >= 1) {
    // console.log(`>`, `s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);

    if (str[endIndex] === "1") {
      steps++;
      str[endIndex] = "0";

      let i = endIndex - 1;

      while (str[i] === "1") {
        str[i] = "0";
        i--;
        // console.log(`>>`, `+`, `s=${str.slice(0, endIndex + 1).join("")}`, `i=${i}`);
      }

      if (i === -1) {
        str.unshift("1");
        endIndex++;
      } else {
        str[i] = "1";
      }

      // console.log(
      //   `>`,
      //   `+`,
      //   `s=${str.slice(0, endIndex + 1).join("")}`,
      //   `i=${i}`,
      //   `steps=${steps}`,
      //   `endIndex=${endIndex}`,
      // );
    } else {
      steps++;
      endIndex--;
      // console.log(`>`, `/`, `s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);
    }
  }

  // console.log(`s=${str.slice(0, endIndex + 1).join("")}`, `steps=${steps}`, `endIndex=${endIndex}`);

  return steps;
}

type SolutionFunction = typeof numSteps_old;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["1101"], expected_result: 6 },
  { input: ["10"], expected_result: 1 },
  { input: ["1"], expected_result: 0 },
];

const solutions = [
  { name: "best", fn: numSteps },
  { name: "old", fn: numSteps_old },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
