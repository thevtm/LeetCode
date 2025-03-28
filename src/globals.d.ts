import * as lodash_ from "lodash";
import { Queue as QueueImported } from "@datastructures-js/queue";
import { Deque as DequeImported } from "@datastructures-js/deque";
import {
  PriorityQueue as PriorityQueueImported,
  MinPriorityQueue as MinPriorityQueueImported,
  MaxPriorityQueue as MaxPriorityQueueImported,
  // PriorityQueueOptions as PriorityQueueOptionsImported, // queue options interface
  // PriorityQueueItem as PriorityQueueItemImported, // queue item interface for min/max queue
} from "@datastructures-js/priority-queue";

declare global {
  // lodash
  const _: typeof lodash_;

  // @datastructures-js/queue
  class Queue<T> extends QueueImported<T> {}

  // @datastructures-js/deque
  class Deque<T> extends DequeImported<T> {}

  // @datastructures-js/priority-queue
  class PriorityQueue<T> extends PriorityQueueImported<T> {}
  class MinPriorityQueue<T> extends MinPriorityQueueImported<T> {}
  class MaxPriorityQueue<T> extends MaxPriorityQueueImported<T> {}
}
