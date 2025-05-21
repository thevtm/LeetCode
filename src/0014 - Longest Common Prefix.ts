export {}; // Necessary in order to avoid TS errors

function longestCommonPrefix(strs: string[]): string {
  let prefix = "";

  for (let i = 0; i < strs[0].length; i++) {
    const expectedLetter = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      if (strs[j][i] !== expectedLetter) {
        return prefix;
      }
    }
    prefix += expectedLetter;
  }

  return prefix;
}
