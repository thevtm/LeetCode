export {};

function sortString(s: string): string {
  const ss = s.split("");
  const result: string[] = [];

  const remove_character = (index: number) => result.push(ss.splice(index, 1)[0]);
  const find_optimal_index = (fn: (curr: string, c: string) => Boolean): number => {
    let index = 0;
    for (let i = 1; i < ss.length; i++) if (fn(ss[index], ss[i])) index = i;
    return index;
  };

  while (ss.length > 0) {
    // Step 1
    let smallest_index = find_optimal_index((curr, c) => c < curr);
    remove_character(smallest_index);
    if (ss.length === 0) break;

    // Step 2, 3
    while (ss.length > 0) {
      const last = result[result.length - 1];
      let smallest_than_last_index: number | null = null;

      for (let i = 0; i < ss.length; i++) {
        if (ss[i] <= last) continue;

        if (smallest_than_last_index === null || ss[i] < ss[smallest_than_last_index]) {
          smallest_than_last_index = i;
        }
      }

      if (smallest_than_last_index === null) break;

      remove_character(smallest_than_last_index);
    }

    if (ss.length === 0) break;

    // Step 4
    let largest_index = find_optimal_index((curr, c) => c > curr);
    remove_character(largest_index);
    if (ss.length === 0) break;

    // Step 5, 6
    while (ss.length > 0) {
      const last = result[result.length - 1];
      let largest_than_last_index: number | null = null;

      for (let i = 0; i < ss.length; i++) {
        if (ss[i] >= last) continue;

        if (largest_than_last_index === null || ss[i] > ss[largest_than_last_index]) {
          largest_than_last_index = i;
        }
      }

      if (largest_than_last_index === null) break;

      remove_character(largest_than_last_index);
    }

    if (ss.length === 0) break;
  }

  return result.join("");
}
