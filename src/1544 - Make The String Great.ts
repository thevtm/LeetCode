export {}; // Necessary in order to avoid TS errors

function makeGood(s: string): string {
  for (let i = 0; i < s.length; i++) {
    if (i < 0) {
      // console.log(`[${i}]`);
      i = -1;
      continue;
    }

    const c = s[i];
    const cLower = c.toLowerCase();
    const isUpperCase = c !== cLower;

    // console.log(`[${i}] ${c} - ${s}`);

    if (!isUpperCase) {
      continue;
    }

    if (s[i - 1] === cLower) {
      // console.log(`cut previous`);
      s = s.slice(0, i - 1) + s.slice(i + 1);
      i -= 3;
    } else if (s[i + 1] === cLower) {
      // console.log(`cut next`);
      s = s.slice(0, i) + s.slice(i + 2);
      i -= 2;
    }
  }

  return s;
}
