export {}; // Necessary in order to avoid TS errors

// ()
// ()() (())
// ()()() (()()) ()(()) (())() ((()))

const cache = new Map<number, string[]>();

function generateParenthesis(n: number): string[] {
  if (n === 1) {
    return ["()"];
  }

  const r = new Set<string>();

  for (const p of (cache[n - 1] ??= generateParenthesis(n - 1))) {
    r.add(`(${p})`);
  }

  for (let i = n - 1; i > 0; i--) {
    const psi = (cache[i] ??= generateParenthesis(i));

    for (const p of (cache[n - i] ??= generateParenthesis(n - i))) {
      for (const ip of psi) {
        r.add(`${ip}${p}`);
      }
    }
  }

  return Array.from(r);
}

function foo(n: number): number[][] {
  if (n === 1) {
    return [[1]];
  }

  const r: number[][] = [[n]];

  for (let i = n - 1; i > 0; i--) {
    for (const x of foo(n - i)) {
      r.push([i, ...x]);
    }
  }

  return r;
}

// 4
// 3 1
// 2 1 1
// 2 2
// 1 1 1 1
// 1 2 1
// 1 3
