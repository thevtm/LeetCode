export {};

const MODULO = 10 ** 9 + 7;

function reverse_number(n: number): number {
  let reversed_number = 0;

  while (n > 0) {
    reversed_number = reversed_number * 10 + (n % 10);
    n = (n - (n % 10)) / 10;
  }

  return reversed_number;
}

function countNicePairs(nums: number[]): number {
  const m = new Map<number, number>();
  let count = 0;

  for (const n of nums) {
    const delta = n - reverse_number(n);
    const curr = m.get(delta);

    if (curr === undefined) {
      m.set(delta, 1);
    } else {
      count = (count + curr) % MODULO;
      m.set(delta, curr + 1);
    }
  }

  return count;
}
