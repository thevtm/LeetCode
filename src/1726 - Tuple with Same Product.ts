export {};

function triangle_num(n: number): number {
  // Produces sequence 0, 1, 3, 6, 10, 15, 21...
  return (n * (n + 1)) / 2;
}

function tupleSameProduct(nums: number[]): number {
  // Multiply each pair of numbers once
  // and count the occurrences

  const frequencies = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const mul = nums[i] * nums[j];
      const freq = frequencies.get(mul) ?? 0;
      frequencies.set(mul, freq + 1);
    }
  }

  let count = 0;
  for (const [_, freq] of frequencies) {
    // freq | # of tuples
    //    0 |           0
    //    1 |           8
    //    2 |          24
    //    3 |          48
    //    4 |          80
    count += triangle_num(freq - 1) * 8;
  }

  return count;
}
