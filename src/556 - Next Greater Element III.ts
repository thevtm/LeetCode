export {}; // Necessary in order to avoid TS errors

function nextGreaterElement(num: number): number {
  const MAX = Math.pow(2, 31) - 1;
  const decimals = numberToDecimalList(num);

  let dropIndex: number = -1;
  for (let i = decimals.length - 2; i >= 0; i--) {
    if (decimals[i] < decimals[i + 1]) {
      dropIndex = i;
      break;
    }
  }

  if (dropIndex === -1) {
    return -1;
  }

  // Find the
  let bumpIndex = decimals.length - 1;
  for (let i = dropIndex + 1; i < decimals.length; i++) {
    if (decimals[i] <= decimals[dropIndex]) {
      bumpIndex = i - 1;
      break;
    }
  }

  console.log("drop", dropIndex, decimals[dropIndex], "bump", bumpIndex, decimals[bumpIndex]);

  // Swap
  const tmp = decimals[dropIndex];
  decimals[dropIndex] = decimals[bumpIndex];
  decimals[bumpIndex] = tmp;

  // Sort tail
  const sortedTail = decimals.slice(dropIndex + 1).sort((a, b) => a - b);

  console.log("decimals", decimals, "sortedTail", sortedTail);

  const result = decimalsToNumber([...decimals.slice(0, dropIndex + 1), ...sortedTail]);

  console.log("result", result, result > MAX);

  if (result > MAX) {
    return -1;
  }

  return result;
}

function numberToDecimalList(num: number): number[] {
  let decimals: number[] = [];

  while (num > 0) {
    decimals.unshift(num % 10);
    num = Math.floor(num / 10);
  }

  return decimals;
}

function decimalsToNumber(decimals: number[]): number {
  return decimals.reduce((acc, digit) => acc * 10 + digit, 0);
}
