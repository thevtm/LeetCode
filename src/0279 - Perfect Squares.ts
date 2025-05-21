export {}; // Necessary in order to avoid TS errors

function numSquares(n: number): number {
  // 1. Generate list of perfect squares smaller than `n`
  // (push and reverse is faster then unshift)
  const perfect_squares: number[] = [];

  for (let i = 1, ps = 1; ps <= n; i++, ps = i * i) {
    perfect_squares.push(ps);
  }

  perfect_squares.reverse();

  // 2. Depth first search
  const stack: [number, number, number][] = [[0, n, 0]];
  let lowest = n;

  while (stack.length > 0) {
    const [nth, rem, i] = stack.shift()!;

    // console.log(nth, rem, i, lowest);

    if (nth + 1 >= lowest) {
      continue;
    }

    for (let psi = i; psi < perfect_squares.length; psi++) {
      const ps = perfect_squares[psi];

      if (ps > rem) {
        continue;
      }

      const newNth = nth + Math.floor(rem / ps);
      const newRem = rem % ps;

      if (newRem === 0) {
        lowest = Math.min(lowest, newNth);
        break;
      }

      if (newNth + 1 >= lowest) {
        break;
      }

      stack.push([newNth, newRem, psi + 1]);
    }
  }

  return lowest;
}
