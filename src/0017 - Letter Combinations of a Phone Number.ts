export {}; // Necessary in order to avoid TS errors

const NUMBER_TO_LETTERS_MAP = [
  ,
  ,
  ["a", "b", "c"],
  ["d", "e", "f"],
  ["g", "h", "i"],
  ["j", "k", "l"],
  ["m", "n", "o"],
  ["p", "q", "r", "s"],
  ["t", "u", "v"],
  ["w", "x", "y", "z"],
];

function letterCombinations(digits: string): string[] {
  if (digits.length === 0) {
    return [];
  }

  const numbers: number[] = digits.split("").map((x) => parseInt(x));

  const acc: string[] = [];
  const result: string[] = [];

  const backtrack = (index: number = 0): void => {
    if (acc.length === digits.length) {
      result.push(acc.join(""));
      return;
    }

    for (let i = index; i < numbers.length; i++) {
      for (const c of NUMBER_TO_LETTERS_MAP[numbers[i]]!) {
        acc.push(c);
        backtrack(i + 1);
        acc.pop();
      }
    }
  };

  backtrack();

  return result;
}
