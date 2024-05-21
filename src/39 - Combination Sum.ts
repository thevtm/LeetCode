export {}; // Necessary in order to avoid TS errors

function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);

  const acc: number[] = [];
  let sum: number = 0;
  const result: number[][] = [];

  const backtrack = (index: number = 0): void => {
    if (sum === target) {
      result.push([...acc]);
      return;
    } else if (sum > target) {
      return;
    }

    for (let i = index; i < candidates.length; i++) {
      const n = candidates[i];

      sum += n;
      acc.push(n);

      backtrack(i);

      sum -= n;
      acc.pop();
    }
  };

  backtrack();

  return result;
}
