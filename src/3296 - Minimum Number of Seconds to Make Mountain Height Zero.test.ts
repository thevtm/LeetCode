import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import _ from "lodash";

import { expect, test, describe } from "vitest";

type Worker = { cost: number; count: number; time: number };

function minNumberOfSeconds(mountainHeight: number, workerTimes: number[]): number {
  const work = (w: Worker): void => {
    w.cost += w.time * (w.count + 1);
    w.count++;
  };

  const queue = new MinPriorityQueue<Worker>((v) => v.cost);

  for (const wt of workerTimes) {
    queue.enqueue({ cost: wt, count: 1, time: wt });
  }

  for (let i = 0; i < mountainHeight; i++) {
    const w = queue.dequeue()!;

    if (i === mountainHeight - 1) return w.cost;

    work(w);
    queue.enqueue(w);
  }

  throw "Unreachable!";
}

function minNumberOfSeconds_tle(mountainHeight: number, workerTimes: number[]): number {
  const worker_count = new Array<number>(workerTimes.length).fill(0);
  const worker_time = new Array<number>(workerTimes.length).fill(0);

  for (let i = 0; i < mountainHeight; i++) {
    let selected_worker_index = -1;
    let selected_worker_time = Infinity;

    for (let j = 0; j < workerTimes.length; j++) {
      const next_time = worker_time[j] + workerTimes[j] * (worker_count[j] + 1);

      if (next_time < selected_worker_time) {
        selected_worker_index = j;
        selected_worker_time = next_time;
      }
    }

    worker_count[selected_worker_index]++;
    worker_time[selected_worker_index] = selected_worker_time;
  }

  return Math.max(...worker_time);
}

type SolutionFunction = typeof minNumberOfSeconds;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: [4, [2, 1, 1]], expected_result: 3 },
  { input: [10, [3, 2, 2, 4]], expected_result: 12 },
  { input: [5, [1]], expected_result: 15 },
];

const solutions = [
  { name: "best", fn: minNumberOfSeconds },
  { name: "tle", fn: minNumberOfSeconds_tle },
];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
