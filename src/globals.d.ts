import * as _ from "lodash";
import { Queue as QueueImported } from "@datastructures-js/queue";
import {
  PriorityQueue as PriorityQueueImported,
  MinPriorityQueue as MinPriorityQueueImported,
  MaxPriorityQueue as MaxPriorityQueueImported,
  // PriorityQueueOptions as PriorityQueueOptionsImported, // queue options interface
  // PriorityQueueItem as PriorityQueueItemImported, // queue item interface for min/max queue
} from "@datastructures-js/priority-queue";

declare global {
  // lodash
  const _: typeof _;

  // @datastructures-js/queue
  class Queue<T> extends QueueImported<T> {}

  // @datastructures-js/priority-queue
  class PriorityQueue<T> extends PriorityQueueImported<T> {}
  class MinPriorityQueue<T> extends MinPriorityQueueImported<T> {}
  class MaxPriorityQueue<T> extends MaxPriorityQueueImported<T> {}
}
