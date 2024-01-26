export {}; // Necessary in order to avoid TS errors

function frequencyMap<T>(arr: T[]): Map<T, number> {
  return arr.reduce(
    (acc, el) => acc.set(el, (acc.get(el) ?? 0) + 1),
    new Map()
  );
}

function isUnique<T>(arr: T[]): boolean {
  const set = new Set(arr);
  return arr.length === set.size;
}

function uniqueOccurrences(arr: number[]): boolean {
  const frequency_map = frequencyMap(arr);
  return isUnique(Array.from(frequency_map.values()));
}
