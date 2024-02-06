export {}; // Necessary in order to avoid TS errors

function minProcessingTime(processorTimes: number[], tasks: number[]): number {
  const n = processorTimes.length;

  processorTimes.sort((a, b) => a - b);
  tasks.sort((a, b) => a - b);

  let result = -Infinity;

  for (let i = 0; i < n; i++) {
    const processorTime = processorTimes[i];
    const maxTaskLength = tasks[((n - i) * 4 - 1)];

    result = Math.max(result, processorTime + maxTaskLength);
  }

  return result;
}
