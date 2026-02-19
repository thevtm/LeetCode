import _ from "lodash";

import { expect, test, describe } from "vitest";

function closestCost(baseCosts: number[], toppingCosts: number[], target: number): number {
  let closest = Infinity;
  let closest_delta = Infinity;

  const backtrack = (cost: number, index: number = 0) => {
    const delta = Math.abs(target - cost);

    if (delta < closest_delta) {
      closest = cost;
      closest_delta = delta;
    } else if (delta === closest_delta) {
      closest = Math.min(closest, cost);
    }

    if (index >= toppingCosts.length) return;

    backtrack(cost, index + 1);
    backtrack(cost + toppingCosts[index], index + 1);
    backtrack(cost + 2 * toppingCosts[index], index + 1);
  };

  for (const base of baseCosts) backtrack(base);

  return closest;
}

function closestCost_tle(baseCosts: number[], toppingCosts: number[], target: number): number {
  toppingCosts.sort((a, b) => a - b);

  let closest = Infinity;
  let closest_delta = Infinity;

  let cost = 0;

  const new_cost_found = () => {
    const delta = Math.abs(target - cost);

    if (delta < closest_delta) {
      closest = cost;
      closest_delta = delta;
    } else if (delta === closest_delta) {
      closest = Math.min(closest, cost);
    }
  };

  const backtrack = () => {
    for (let i = 0; i < toppingCosts.length; i++) {
      if (toppingCosts[i] < 0) continue;

      const topping_cost = toppingCosts[i];

      toppingCosts[i] *= -1; // Mark as used

      // One serving
      cost += topping_cost;
      new_cost_found();
      if (cost < target) backtrack();

      // Two servings
      cost += topping_cost;
      new_cost_found();
      if (cost < target) backtrack();

      cost -= 2 * topping_cost;

      toppingCosts[i] *= -1;

      if (topping_cost + cost > target) break;
    }
  };

  for (const base of baseCosts) {
    cost += base;
    new_cost_found();

    backtrack();

    cost -= base;
  }

  return closest;
}

type SolutionFunction = typeof closestCost;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [[1, 7], [3, 4], 10], expected_result: 10 },
  { input: [[2, 3], [4, 5, 100], 18], expected_result: 17 },
  { input: [[3, 10], [2, 5], 9], expected_result: 8 },
];

const solutions = [
  { name: "best", fn: closestCost },
  { name: "tle", fn: closestCost_tle },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
