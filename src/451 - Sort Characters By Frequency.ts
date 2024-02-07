export {}; // Necessary in order to avoid TS errors

function frequencySort(str: string): string {
  const frequencyMap = new Map<string, number>();

  for (const s of str) {
    frequencyMap.set(s, (frequencyMap.get(s) ?? 0) + 1);
  }

  const entries = Array.from(frequencyMap.entries());
  entries.sort((a, b) => b[1] - a[1]);

  return entries.reduce((acc, [s, n]) => acc + s.repeat(n), "");
}
