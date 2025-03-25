export {};

function merge_intervals(intervals: [number, number][]): [number, number][] {
  intervals.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const merged_intervals: [number, number][] = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const [interval_start, interval_end] = intervals[i];
    const last_interval = merged_intervals[merged_intervals.length - 1];
    const [last_interval_start, last_interval_end] = last_interval;

    if (interval_start >= last_interval_start && interval_start < last_interval_end) {
      last_interval[1] = Math.max(interval_end, last_interval_end);
    } else {
      merged_intervals.push(intervals[i]);
    }
  }

  return merged_intervals;
}

function checkValidCuts(n: number, rectangles: [number, number, number, number][]): boolean {
  const horizontal_intervals: [number, number][] = rectangles.map((rect) => [rect[0], rect[2]]);
  const merged_horizontal_intervals = merge_intervals(horizontal_intervals);

  // console.log("horizontal_intervals", merge_intervals(horizontal_intervals));

  if (merged_horizontal_intervals.length >= 3) return true;

  const vertical_intervals: [number, number][] = rectangles.map((rect) => [rect[1], rect[3]]);
  const merged_vertical_intervals = merge_intervals(vertical_intervals);

  // console.log("vertical_intervals", merge_intervals(vertical_intervals));

  return merged_vertical_intervals.length >= 3;
}
