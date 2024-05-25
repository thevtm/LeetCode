export {}; // Necessary in order to avoid TS errors

function wordBreak(s: string, wordDict: string[]): string[] {
  // 1. Identify which words are valid for each index in the string
  const cache = new Map<number, string[]>();

  const validWords = (index: number): string[] => {
    if (cache.has(index)) {
      return cache.get(index)!;
    }

    const r = wordDict.filter((word) => {
      if (word.length > s.length - index + 1) {
        return false;
      }

      let i = 0;

      while (i < word.length && s[index + i] === word[i]) {
        i++;
      }

      return i === word.length;
    });

    cache.set(index, r);
    return r;
  };

  // 2. Use backtracking to check all combinations of valid words
  const acc: string[] = [];
  const result: string[] = [];

  const backtrack = (index: number = 0): void => {
    if (index === s.length) {
      result.push(acc.join(" "));
      return;
    }

    for (const word of validWords(index)) {
      acc.push(word);
      backtrack(index + word.length);
      acc.pop();
    }
  };

  backtrack();

  return result;
}
