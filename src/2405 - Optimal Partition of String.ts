export {};

function partitionString(s: string): number {
  const set = new Set<string>();

  let left = 0;
  let right = 0;

  let partitions = 0;

  while (true) {
    if (right === s.length) {
      partitions++;
      break;
    } else if (set.has(s[right])) {
      set.clear();
      set.add(s[right]);
      left = right;
      right++;
      partitions++;
    } else {
      set.add(s[right]);
      right++;
    }
  }

  return partitions;
}
