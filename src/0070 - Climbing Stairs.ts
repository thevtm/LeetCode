export {}; // Necessary in order to avoid TS errors

// 1 -> 1 [1]
// 2 -> 2 [1 2]
// 3 -> 3 [1 2 3]
// 4 -> 3 [1 2 3 5]

function climbStairs(n: number): number {
  return fib(n + 1);
}

function fib(n: number): number {
  if (n === 0) {
    return 0;
  }

  let previous = 0;
  let current = 1;

  for (let i = 0; i < n - 1; i++) {
    const new_current = current + previous;
    previous = current;
    current = new_current;
  }

  return current;
}
