export {}; // Necessary in order to avoid TS errors

function isPalindrome(x: number): boolean {
  if (x < 0) {
    return false;
  }

  const digits: number[] = [];
  while (x > 0) {
    digits.unshift(x % 10);
    x = Math.floor(x / 10);
  }

  const halfwayPoint = Math.floor(digits.length / 2);

  for (let i = 0; i <= halfwayPoint; i++) {
    if (digits[i] !== digits[digits.length - i - 1]) {
      return false;
    }
  }

  return true;
}
