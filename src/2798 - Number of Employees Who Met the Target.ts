export {};

function numberOfEmployeesWhoMetTarget(hours: number[], target: number): number {
  let good_workers = 0;

  for (const hour of hours) {
    if (hour >= target) {
      good_workers++;
    }
  }

  return good_workers;
}
