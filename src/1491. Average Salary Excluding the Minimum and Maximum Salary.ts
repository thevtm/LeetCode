export {};

function average(salaries: number[]): number {
  let min = Infinity;
  let max = -Infinity;
  let sum = 0;

  for (const salary of salaries) {
    min = Math.min(min, salary);
    max = Math.max(max, salary);
    sum += salary;
  }

  return (sum - min - max) / (salaries.length - 2);
}
