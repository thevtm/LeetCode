export {}; // Necessary in order to avoid TS errors

function isPowerOfTwo(n: number): boolean {
  if (n === 0) {
    return false;
  }

  n = Math.log2(n);
  return Math.trunc(n) === n;
}
