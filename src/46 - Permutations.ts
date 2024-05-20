export {}; // Necessary in order to avoid TS errors

function permute(nums: number[]): number[][] {
  const taken: number[] = [];
  const left: number[] = nums.slice();
  const result: number[][] = [];

  const backtrack = (): void => {
    if (left.length === 1) {
      result.push([...taken, ...left]);
      return;
    }

    for (let i = 0; i < left.length; i++) {
      const n = left.splice(i, 1)[0];
      taken.push(n);
      backtrack();
      taken.pop();
      left.splice(i, 0, n);
    }
  };

  backtrack();

  return result;
}
