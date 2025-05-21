export {}; // Necessary in order to avoid TS errors

function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);

  const acc: number[] = [];
  let sum: number = 0;
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    if (sum === target) {
      result.push([...acc]);
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

      sum -= n;
      acc.pop();
    }
  };

  backtrack();

  return result;
}
