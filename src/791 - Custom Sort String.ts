export {}; // Necessary in order to avoid TS errors

function customSortString(order: string, s: string): string {
  const map = _.reduce(order, (acc, x, i) => acc.set(x, i), new Map<string, number>());

  return _.chain(s)
    .split("")
    .sortBy((x) => map.get(x))
    .join("")
    .value();
}
