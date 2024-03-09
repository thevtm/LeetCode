export {}; // Necessary in order to avoid TS errors

function maxFrequencyElements(nums: number[]): number {
  const frequencies = _.countBy(nums);
  const top = _.max(_.values(frequencies));
  const total = _.sumBy(_.values(frequencies), (x) => (x === top ? x : 0));

  // console.log(frequencies, top, total);

  return total
}
