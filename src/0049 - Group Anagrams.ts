export {}; // Necessary in order to avoid TS errors

function groupAnagrams(strs: string[]): string[][] {
  const map = new Map<string, string[]>();

  for (const str of strs) {
    const string_hash = str.split("").sort().join("");
    map.set(string_hash, [...(map.get(string_hash) ?? []), str]);
  }

  return Array.from(map.values());
}
