export {}; // Necessary in order to avoid TS errors

function rangeBitwiseAnd(left: number, right: number): number {
  let result = left;

  for (let i = left + 1; i <= right && result !== 0; i++) {
    result = result & i;
  }

  return result;
}
