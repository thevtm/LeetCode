export {}; // Necessary in order to avoid TS errors

function plusOne(digits: number[]): number[] {
  if (digits[digits.length - 1] !== 9) {
    digits[digits.length - 1] += 1;
    return digits;
  }

  let nines_index = digits.length - 1;

  for (; digits[nines_index] === 9; nines_index--) {
    digits[nines_index] = 0;
  }

  if (nines_index === -1) {
    digits.unshift(1);
  } else {
    digits[nines_index] += 1;
  }

  return digits;
}
