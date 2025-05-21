export {};

function dailyTemperatures(temperatures: number[]): number[] {
  const stack: number[] = [];
  const result = new Array<number>(temperatures.length);

  for (let i = temperatures.length - 1; i >= 0; i--) {
    const temp = temperatures[i];

    while (stack.length > 0 && temperatures[stack[stack.length - 1]] <= temp) stack.pop()!;

    result[i] = (stack[stack.length - 1] ?? i) - i;
    stack.push(i);
  }

  return result;
}
