export {}; // Necessary in order to avoid TS errors

function mySqrt(x: number): number {
  let lower = 0;
  let upper = x;
  let result = 0;

  while (lower <= upper) {
    const middle = Math.floor((upper + lower) / 2);
    const middle_square = middle * middle;

    if (middle_square === x) {
      return middle;
    } else if (middle_square < x) {
      result = Math.max(result, middle);
      lower = middle + 1;
    } else {
      upper = middle - 1;
    }
  }

  return result;
}
