export {};

function halveArray(nums: number[]): number {
  const heap = new MaxPriorityQueue();
  let sum = 0;

  for (const n of nums) {
    sum += n;
    heap.enqueue(n);
  }

  let half_total_sum = sum / 2;
  let operations = 0;

  while (sum > half_total_sum) {
    const n = heap.dequeue().element / 2;
    sum -= n;
    heap.enqueue(n);
    operations++;
  }

  return operations;
}
