export {};

class NumberContainers {
  containers = new Map<number, number>();
  smallest_indexes = new Map<number, number>();

  change(index: number, number: number): void {
    const curr_num_in_container = this.containers.get(index);

    if (curr_num_in_container === number) {
      return;
    }

    this.containers.set(index, number);

    if (curr_num_in_container !== undefined && this.smallest_indexes.get(curr_num_in_container) === index) {
      // Find new lowest index
      let new_lowest_index = Infinity;

      for (const [i, n] of this.containers.entries()) {
        if (curr_num_in_container !== n) continue;
        new_lowest_index = Math.min(i, new_lowest_index);
      }

      if (new_lowest_index === Infinity) {
        this.smallest_indexes.delete(curr_num_in_container);
      } else {
        this.smallest_indexes.set(curr_num_in_container, new_lowest_index);
      }
    }

    const smallest_index_for_new_number = this.smallest_indexes.get(number);
    if (smallest_index_for_new_number === undefined || smallest_index_for_new_number > index) {
      this.smallest_indexes.set(number, index);
    }
  }

  find(number: number): number {
    return this.smallest_indexes.get(number) ?? -1;
  }
}
