export {};

function assignTasks(servers: number[], tasks: number[]): number[] {
  let time = 0;
  let current_task_index = 0;

  const answer = Array.from({ length: tasks.length }, () => -1);
  const servers_busy_until = Array.from({ length: servers.length }, () => 0);

  const available_queue = new MinPriorityQueue({
    compare: (a: number, b: number): number => {
      const weight_comparison = servers[a] - servers[b];
      if (weight_comparison !== 0) {
        return weight_comparison;
      }

      return a - b;
    },
  });

  const unavailable_queue = new MinPriorityQueue({
    compare: (a: number, b: number): number => {
      const busier_comparison = servers_busy_until[a] - servers_busy_until[b];
      if (busier_comparison !== 0) {
        return busier_comparison;
      }

      const weight_comparison = servers[a] - servers[b];
      if (weight_comparison !== 0) {
        return weight_comparison;
      }

      return a - b;
    },
  });

  for (let i = 0; i < servers.length; i++) {
    available_queue.enqueue(i);
  }

  while (current_task_index < tasks.length) {
    if (available_queue.size() === 0) {
      time = servers_busy_until[unavailable_queue.front()];
    }

    while (true) {
      const top_busy_server = unavailable_queue.front();
      const is_top_busy_server_free = servers_busy_until[top_busy_server] <= time;

      if (is_top_busy_server_free) {
        available_queue.enqueue(unavailable_queue.dequeue());
      } else {
        break;
      }
    }

    const picked_server = available_queue.dequeue();
    const time_when_available = servers_busy_until[picked_server];

    answer[current_task_index] = picked_server;
    servers_busy_until[picked_server] = Math.max(time, time_when_available) + tasks[current_task_index];
    unavailable_queue.enqueue(picked_server);

    current_task_index++;
    time = Math.max(time, current_task_index, time_when_available);
  }

  return answer;
}
