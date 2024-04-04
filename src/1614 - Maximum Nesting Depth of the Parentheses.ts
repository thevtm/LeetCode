export {}; // Necessary in order to avoid TS errors

function maxDepth(s: string): number {
  let depth = 0;
  let maxDepth = 0;

  for (const c of s) {
    if (c === "(") {
      depth++;
      maxDepth = Math.max(depth, maxDepth);
    } else if (c === ")") {
      depth--;
    }
  }

  return maxDepth;
}
