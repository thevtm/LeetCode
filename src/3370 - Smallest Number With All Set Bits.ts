export {};

function smallestNumber(n: number): number {
  return Math.round(Math.pow(2, Math.trunc(Math.log2(n)) + 1)) - 1;
}
