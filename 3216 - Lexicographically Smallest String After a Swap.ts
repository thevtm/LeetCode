export {};

const STR_TO_STR_MAP: Record<string, number> = {
  "0": 0,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
};

function getSmallestString(s: string): string {
  const arr = s.split("");

  for (let i = 0; i < s.length - 1; i++) {
    const [a, b] = [STR_TO_STR_MAP[s[i]], STR_TO_STR_MAP[s[i + 1]]];

    const has_same_parity = a % 2 === b % 2;

    if (!has_same_parity) {
      continue;
    }

    if (a > b) {
      [arr[i], arr[i + 1]] = [s[i + 1], s[i]];
      break;
    }
  }

  return arr.join("");
}
