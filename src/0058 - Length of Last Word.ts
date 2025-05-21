export {}; // Necessary in order to avoid TS errors

function lengthOfLastWord(s: string): number {
  let i = s.length - 1;

  // 1. Skip spaces from the back
  while (s[i] === " " && i >= 0) {
    i--;
  }

  // 2. Count chars
  let count = 0;
  while (s[i] !== " " && i >= 0) {
    count++;
    i--;
  }

  return count;
}

function lengthOfLastWordOLD(s: string): number {
  let count = 0;
  let space = false;

  for (const c of s) {
    if (c === " ") {
      space = true;
    } else {
      if (space) {
        count = 0;
        space = false;
      }

      count++;
    }
  }

  return count;
}
