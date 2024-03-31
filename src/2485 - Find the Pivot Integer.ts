export {}; // Necessary in order to avoid TS errors

function pivotInteger(n: number): number {
  const pivot = Math.sqrt((n * (n + 1)) / 2);

  if (_.isInteger(pivot)) {
    return pivot;
  }

  return -1;
}
