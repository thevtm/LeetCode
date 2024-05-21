export {}; // Necessary in order to avoid TS errors

function combinationSum3(k: number, n: number): number[][] {
  const target = n;
  const targetLen = k;

  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((x) => x <= target);

  const acc: number[] = [];
  let sum: number = 0;
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    if (acc.length === targetLen) {
      if (sum === target) {
        result.push([...acc]);
      }

      return;
    }

    if (sum > target) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      if (i > index && candidates[i] === candidates[i - 1]) {
        continue;
      }

      const n = candidates[i];

      sum += n;
      acc.push(n);

      backtrack(i + 1);

      acc.pop();
      sum -= n;
    }
  };

  backtrack();

  return result;
}
