export {}; // Necessary in order to avoid TS errors

function permute(nums: number[]): number[][] {
  const recursive = (arr: number[]): number[][] => {
    if (arr.length === 1) {
      return [arr];
    }

    const result: number[][] = [];

    for (let i = 0; i < arr.length; i++) {
      const rest = arr.slice();
      const head = rest.splice(i, 1);

      for (const a of recursive(rest)) {
        result.push([...head, ...a]);
      }
    }

    return result;
  };

  return recursive(nums);
}
