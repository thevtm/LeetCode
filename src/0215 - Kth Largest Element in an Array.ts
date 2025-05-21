export {}; // Necessary in order to avoid TS errors

function findKthLargest(nums: number[], k: number): number {
  const parent = (n: number) => Math.floor(n / 2);
  const left = (n: number) => (n + 1) * 2 - 1;
  const right = (n: number) => left(n) + 1;
  const depth = (size: number) => Math.ceil(Math.log2(size + 2));
  const depthLength = (depth: number) => depth * depth;
  const insert = (pq: number[], n: number) => {
    const newDepth = depth(pq.length + 1)
    const prevDepth = depthLength(newDepth - 1)

  }

  return 0;
}

// [0, 1, 2, 3, ]

// 0 -> 1L [0, 0] => 0
// 1 -> 2L [0, 0] => 1
// 2 -> 2L [1, 0] => 2
// 3 -> 3L [1, 1] => 3
// 4 -> 3L [2, 1] => 5
// 5 -> 3L [2, 2] => 4
// 6 -> 3L [3, 2] => 6
// 7 -> 4L []0
