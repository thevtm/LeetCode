export {}; // Necessary in order to avoid TS errors

function maximumOddBinaryNumber(s: string): string {
  const r: string[] = [];

  for (const c of s) {
    if (c === "0") {
      r.push(c);
    } else {
      r.unshift(c);
    }
  }

  r.push(r.shift()!);

  return r.join("");
}
