export {};

function minOperations(nums: number[], k: number): number {
  let operations = 0;

  const queue = new MinPriorityQueue({ priority: (num) => num });
  nums.forEach((num) => queue.enqueue(num));

  while (queue.size() >= 2) {
    const x = queue.dequeue().element;
    const y = queue.dequeue().element;

    if (x >= k) {
      break;
    }

    const newVal = Math.min(x, y) * 2 + Math.max(x, y);
    queue.enqueue(newVal);
    operations++;
  }

  return operations;
}
