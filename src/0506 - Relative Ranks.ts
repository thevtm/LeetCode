export {}; // Necessary in order to avoid TS errors

function findRelativeRanks(scores: number[]): string[] {
  const heap = MaxPriorityQueue.from(Array.from(scores.entries()));
  const result: string[] = new Array(scores.length);

  const placements = function* (): Generator<string> {
    yield "Gold Medal";
    yield "Silver Medal";
    yield "Bronze Medal";

    for (let i = 4; ; i++) {
      yield i.toString();
    }
  };

  const gen = placements();

  while (!heap.isEmpty()) {
    result[heap.dequeue().element] = gen.next().value;
  }

  return result;
}
