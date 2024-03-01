export {}; // Necessary in order to avoid TS errors

// LeetCode provides the JavaScript environment with 2 packages from NPM to
// assist with data structures, datastructures-js/priority-queue and
// datastructures-js/queue.

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
  const diffs: number[] = [];
  const pq: number[] = [];

  const pqInsert = (value: number) => {
    if (pq.length === 0) {
      pq.push(value);
      return;
    }

    if (value > pq[pq.length - 1]) {
      pq.push(value);
      if (pq.length > ladders) {
        pq.unshift();
      }
      return;
    }

    if (value < pq[0]) {
      if (pq.length === ladders) {
        return;
      } else {
        pq.unshift(value);
        return;
      }
    }

    for (let i = 0; i < pq.length; i++) {
      if (pq[i] > value) {
        pq.splice(i, 0, value);
        break;
      }
    }

    if (pq.length > ladders) {
      pq.unshift();
    }
  };

  for (let i = 1; i < heights.length; i++) {
    const diff = Math.max(0, heights[i] - heights[i - 1]);

    if (diff === 0) {
      // console.log(i, diff, bricks, pq);
      continue;
    }

    bricks -= diff;

    pqInsert(diff);

    // console.log(i, diff, bricks, pq);

    if (bricks < 0) {
      if (ladders === 0) {
        return i - 1;
      }

      bricks += pq.pop()!;
      ladders--;
    }
  }

  return heights.length - 1;
}
