export {}; // Necessary in order to avoid TS errors

const cache = [0, 1, 1];

function tribonacci(n: number): number {
  return (cache[n] ??= tribonacci(n - 1) + tribonacci(n - 2) + tribonacci(n - 3));
}
