export {}; // Necessary in order to avoid TS errors

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
