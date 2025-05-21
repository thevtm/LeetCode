export {}; // Necessary in order to avoid TS errors

function wordBreak(s: string, wordDict: string[]): boolean {
  const cache = new Map<number, boolean>();

  const dfs = (index: number = 0): boolean => {
    if (cache.has(index)) {
      return cache.get(index)!;
    }

    if (index === s.length) {
      return true;
    }

    for (const word of wordDict) {
      if (word.length > s.length - index + 1) {
        continue;
      }

      let i = 0;

      while (i < word.length && s[index + i] === word[i]) {
        i++;
      }

      if (i !== word.length) {
        continue;
      }

      if (dfs(index + i)) {
        cache.set(index, true);
        return true;
      }
    }

    cache.set(index, false);
    return false;
  };

  return dfs();
}
