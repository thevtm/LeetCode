export {}; // Necessary in order to avoid TS errors

function xorOperation(n: number, start: number): number {
  let acc = start;

  for (let i = 1; i < n; i++) {
    acc ^= start + 2 * i;
  }

  return acc;
}
