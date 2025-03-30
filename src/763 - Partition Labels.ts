export {};

function partitionLabels(s: string): number[] {
  const letter_to_interval = new Map<number, [number, number]>();

  for (let i = 0; i < s.length; i++) {
    const char_code = s.charCodeAt(i);
    const interval = letter_to_interval.get(char_code);

    if (interval === undefined) {
      letter_to_interval.set(char_code, [i, i]);
    } else {
      interval[1] = i;
    }
  }

  // console.log("first", letter_to_interval);

  //////////////////////////////////////////////////////////////////////////////

  const intervals: [number, number][] = Array.from(letter_to_interval.values());

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

  // console.log("merged_intervals", merged_intervals);

  return merged_intervals.map(([start, end]) => end - start + 1);
}
