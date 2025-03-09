export {};

function numberOfAlternatingGroups(colors: number[], k: number): number {
  let groups_count = 0;
  let alternating_count = 1;

  for (let i = 0; i < colors.length + k - 2; i++) {
    const prev_index = (i - 1 + colors.length) % colors.length;
    const curr_index = (i + colors.length) % colors.length;

    if (colors[prev_index] === colors[curr_index]) {
      alternating_count = 1;
      continue;
    }

    alternating_count++;
    if (alternating_count >= k) {
      groups_count++;
    }
  }

  return groups_count;
}
