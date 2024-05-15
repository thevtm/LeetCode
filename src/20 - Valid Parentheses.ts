export {}; // Necessary in order to avoid TS errors

enum ParentsType {
  OPENING,
  CLOSING,
}

function isValid(s: string): boolean {
  const stack: string[] = [];
  const map = {
    "(": [ParentsType.OPENING, ")"],
    ")": [ParentsType.CLOSING, "("],
    "{": [ParentsType.OPENING, "}"],
    "}": [ParentsType.CLOSING, "{"],
    "[": [ParentsType.OPENING, "]"],
    "]": [ParentsType.CLOSING, "["],
  };

  for (const c of s) {
    const [type, match] = map[c];

    if (type === ParentsType.OPENING) {
      stack.push(c);
    } else if (stack[stack.length - 1] === match) {
      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}
