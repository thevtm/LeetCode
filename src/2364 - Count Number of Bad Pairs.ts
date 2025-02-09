export {};

function triangle_num(n: number): number {
  // Produces sequence 0 => 0, 1 => 1, 2 => 3, 3 => 6, 4 => 10, 5 => 15, 6 => 21
  return (n * (n + 1)) / 2;
}

function countBadPairs(nums: number[]): number {
  const freq = nums.reduce((acc, v, i) => {
    const delta = v - i;
    const curr = acc.get(delta) ?? 0;
    acc.set(delta, curr + 1);
    return acc;
  }, new Map<number, number>());

  let result = triangle_num(nums.length - 1);

  for (const [_, v] of freq.entries()) {
    result -= triangle_num(v - 1);
  }

  return result;
}
