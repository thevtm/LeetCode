export {};

function numberOfAlternatingGroups(colors: number[]): number {
  let count = 0;

  for (let i = 0; i < colors.length; i++) {
    const before = colors[i - 1] ?? colors[colors.length - 1];
    const current = colors[i];
    const after = colors[i + 1] ?? colors[0];

    if (before !== current && after !== current) {
      count++;
    }
  }

  return count;
}
