export {}; // Necessary in order to avoid TS errors

function appendCharacters(s: string, t: string): number {
  let j = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === t[j]) {
      j++;
    }
  }

  return t.length - j;
}
