export {}; // Necessary in order to avoid TS errors

//  (  )  (  )  (  (  (  (  )  )  )  )
// [1, 1, 1, 1, 1, 2, 3, 4, 4, 3, 2, 1]
// [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1]

//  (  )  (  )  (  (  (  )  )  )
// [1, 1, 1, 1, 1, 2, 3, 3, 2, 1]
// [0, 0, 0, 0, 0, 0, 1, 0, 0, 1]

function maxDepthAfterSplit(seq: string): number[] {
  const depths = new Array(seq.length);
  let depth = 0;
  let maxDepth = 0;

  for (let i = 0; i < seq.length; i++) {
    const c = seq[i];

    if (c === "(") {
      depth++;
      depths[i] = depth;
      maxDepth = Math.max(maxDepth, depth);
    } else if (c === ")") {
      depths[i] = depth;
      depth--;
    }
  }

  const result = new Array(depths.length);
  const midpoint = Math.ceil(maxDepth / 2);

  // Could be done using `depth % 2` instead in a single loop

  for (let i = 0; i < result.length; i++) {
    const d = depths[i];

    result[i] = d <= midpoint ? 0 : 1;
  }

  return result;
}
