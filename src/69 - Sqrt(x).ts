export {}; // Necessary in order to avoid TS errors

function mySqrt(x: number): number {
  let i = 1;

  while (i * i <= x) {
    i++;
  }

  return i - 1;
}
