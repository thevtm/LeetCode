export {};

function constructDistancedSequence(n: number): number[] {
  const sequence = new Array<number>(n * 2 - 1);
  const taken = new Set<number>();

  const backtrack = (index: number = 0): boolean => {
    if (sequence[index] !== undefined) return backtrack(index + 1);

    for (let i = n; i > 0; i--) {
      if (taken.has(i)) continue;
      if (i !== 1 && sequence[index + i] !== undefined) continue;
      if (i !== 1 && index + i >= sequence.length) return false;

      taken.add(i);

      sequence[index] = i;
      if (i !== 1) sequence[index + i] = i;

      if (taken.size === n) return true;

      if (backtrack(index + 1)) return true;

      taken.delete(i);

      delete sequence[index];
      if (i !== 1) delete sequence[index + i];
    }

    return false;
  };

  backtrack();

  return sequence;
}
