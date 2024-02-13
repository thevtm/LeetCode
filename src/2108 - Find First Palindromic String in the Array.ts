export {}; // Necessary in order to avoid TS errors

function firstPalindrome(words: string[]): string {
  for (const w of words) {
    let isPalindrome = true;

    for (let i = 0; i < Math.floor(w.length / 2); i++) {
      if (w[i] !== w[w.length - i - 1]) {
        isPalindrome = false;
        break;
      }
    }

    if (isPalindrome) {
      return w;
    }
  }

  return "";
}
