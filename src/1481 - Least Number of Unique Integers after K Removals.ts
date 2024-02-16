export {}; // Necessary in order to avoid TS errors

function findLeastNumOfUniqueInts(arr: number[], k: number): number {
  const frequency = arr.reduce((acc, el) => acc.set(el, (acc.get(el) ?? 0) + 1), new Map<number, number>());
  const sortedFrequencies = Array.from(frequency.entries()).sort((a, b) => a[1] - b[1]);

  let i = 0;
  do {
    k -= sortedFrequencies[i][1];
    i++;
  } while (k > 0);

  return sortedFrequencies.length - (i - (k === 0 ? 0 : 1));
}
