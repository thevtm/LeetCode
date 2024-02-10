export {}; // Necessary in order to avoid TS errors

function countSubstrings(s: string): number {
  const countPalindrome = (start: number, end: number): number => {
    let count = 0;

    for (; start >= 0 && end < s.length && s[start] === s[end]; start--, end++) {
      count++;
    }

    return count;
  };

  let count = 0;

  for (let i = 0; i < s.length - 1; i++) {
    count += countPalindrome(i, i) + countPalindrome(i, i + 1);
  }

  // countPalindrome(last, last) === 1
  count += 1;

  return count;
}
