export {};

function merge(intervals: [number, number][]): [number, number][] {
  intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged_intervals: [number, number][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [interval_start, interval_end] = intervals[i];
    const last_interval = merged_intervals[merged_intervals.length - 1];
    const [last_interval_start, last_interval_end] = last_interval;

    if (interval_start >= last_interval_start && interval_start <= last_interval_end) {
      last_interval[1] = Math.max(interval_end, last_interval_end);
    } else {
      merged_intervals.push(intervals[i]);
    }
  }

  return merged_intervals;
}
