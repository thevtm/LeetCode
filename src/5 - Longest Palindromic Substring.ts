export {}; // Necessary in order to avoid TS errors

function longestPalindrome(s: string): string {
  const cache = new Map<number, boolean>(); // Could be a number[][]
  const cacheKey = (left: number, right: number) => left + 1000 * right;

  const isPalindrome = (left: number, right: number): boolean => {
    if (right - left <= 1) {
      // console.log(left, right, "right - left", right - left);
      return true;
    }

    if (s[left] !== s[right - 1]) {
      // console.log(left, right, "s[left] !== s[right - 1]", s[left], s[right - 1]);
      return false;
    }

    const innerLeft = left + 1;
    const innerRight = right - 1;
    const innerIsPalindrome = (cache[cacheKey(innerLeft, innerRight)] ??= isPalindrome(innerLeft, innerRight));

    // console.log(left, right, "innerIsPalindrome", innerIsPalindrome);

    return innerIsPalindrome;
  };

  for (let i = 0; i < s.length - 1; i++) {
    for (let j = 0; j < i + 1; j++) {
      const left = j;
      const right = left + s.length - i;

      // console.log([left, right], right - left, isPalindrome(left, right));

      if (isPalindrome(left, right)) {
        return s.substring(left, right);
      }
    }
  }

  return s.substring(0, 1);
}

// 0 5 = 5

// 0 4 = 4
// 1 5 = 4

// 0 3 = 3
// 1 4 = 3
// 2 5 = 3

// 0 2 = 2
// 1 3 = 2
// 2 4 = 2
// 3 5 = 2

// 0 1 = 1
// 1 2 = 1
// 2 3 = 1
// 3 4 = 1
// 4 5 = 1
