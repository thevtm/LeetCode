export {}; // Necessary in order to avoid TS errors

function findPoisonedDuration(timeSeries: number[], duration: number): number {
  let total = 0;

  for (const [index, time] of timeSeries.entries()) {
    const next_time = timeSeries[index + 1];

    if (next_time == null) {
      total += duration;
    } else {
      total += Math.min(duration, next_time - time);
    }
  }

  return total;
}
