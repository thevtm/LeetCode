export {}; // Necessary in order to avoid TS errors

function isPalindrome(s: string): boolean {
  s = s.toLocaleLowerCase().replace(/[^a-z0-9]/gi, "");

  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    if (s[i] !== s[j]) {
      return false;
    }
  }

  return true;
}
