export {};

function clearDigits(s: string): string {
  const DIGITS = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);

  let i = s.length - 1;
  while (i >= 0) {
    let digits = 0;
    let chars = 0;

    while (i >= 0 && chars <= digits) {
      if (DIGITS.has(s[i])) {
        digits++;
      } else {
        chars++;
      }

      i--;
    }

    console.log(i, digits, chars, s);

    if (digits > 0) {
      const start_index = digits === chars ? i + 1 : i + 2;
      s = s.substring(0, start_index) + s.substring(start_index + digits + digits);
    }
  }

  return s;
}
