export {};

function checkPowersOfThree(n: number): boolean {
  while (n > 0) {
    if (n % 3 === 2) return false;
    n = Math.trunc(n / 3);
  }

  return true;
}
