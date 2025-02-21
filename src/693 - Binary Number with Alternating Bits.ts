export {};

function hasAlternatingBits(n: number): boolean {
  let prev = n % 2;
  n = Math.trunc(n / 2);

  while (n > 0) {
    const x = n % 2;
    n = Math.trunc(n / 2);

    if (x === prev) {
      return false;
    }

    prev = x;
  }

  return true;
}
