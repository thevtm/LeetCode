export {}; // Necessary in order to avoid TS errors

function canTraverseAllPairs(nums: number[]): boolean {
  if (nums.length === 1) {
    return true;
  }

  if (nums.find((x) => x == 1) != null) {
    return false;
  }

  const PRIMES = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109,
    113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239,
    241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367,
  ];

  const primeFactors = function* (n: number): Generator<number> {
    for (const prime of PRIMES) {
      if (prime * prime > n) {
        break;
      }

      if (n % prime === 0) {
        n /= prime;

        while (n % prime === 0) {
          n /= prime;
        }

        yield prime;
      }
    }

    if (n >= 2) {
      yield n;
    }
  };

  const getRoot = (n: number) => {
    while (n != map.get(n)) {
      n = map.get(n)!;
    }

    return n;
  };

  const map = new Map<number, number>();

  for (const n of nums) {
    const factors = Array.from(primeFactors(n));

    const roots = new Set<number | undefined>(factors.map((x) => getRoot(x)));
    roots.delete(undefined);

    const rootsIt = roots.values();
    let root: number = rootsIt.next().value ?? factors[0];

    for (const r of rootsIt) {
      map.set(r!, root);
    }

    for (const factor of factors) {
      map.set(factor, root);
    }

    // console.log(n, factors, map);
  }

  if (map.size === 0) {
    return false;
  }

  if (map.size === 1) {
    return true;
  }

  const gen = map.values();
  const root = getRoot(gen.next()!.value);

  for (let r of gen) {
    if (getRoot(r) !== root) {
      return false;
    }
  }

  return true;
}
