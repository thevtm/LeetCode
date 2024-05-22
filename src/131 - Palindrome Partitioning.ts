export {}; // Necessary in order to avoid TS errors

function partition(s: string): string[][] {
  const acc: string[] = [];

  const result: string[][] = [];

  const isPalindrome = (s: string): boolean => {
    for (let i = 0, j = s.length - 1; i < j; i++, j--) {
      if (s[i] !== s[j]) {
        return false;
      }
    }

    return true;
  };

  const backtrack = (index: number = 0): void => {
    // console.log(index, acc, result);

    if (index === s.length) {
      // console.log("push", acc);
      result.push([...acc]);
      return;
    }

    for (let i = index; i < s.length; i++) {
      const ss = s.substring(index, i + 1);

      // console.log("index", index, "i", i, "len", len, "ss", ss, isPalindrome(ss), acc);

      if (!isPalindrome(ss)) {
        continue;
      }

      acc.push(ss);
      backtrack(i + 1);
      acc.pop();
    }
  };

  backtrack();

  return result;
}
