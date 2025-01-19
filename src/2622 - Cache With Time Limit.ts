export {};

class TimeLimitedCache {
  data = new Map<number, { duration: number; value: number; timeout_ref: NodeJS.Timeout }>();

  constructor() {}

  set(key: number, value: number, duration: number): boolean {
    const cached_entry = this.data.get(key);

    if (cached_entry !== undefined && cached_entry.duration === duration && cached_entry.value === value) {
      return true;
    }

    if (cached_entry !== undefined) {
      clearTimeout(cached_entry.timeout_ref);
    }

    const timeout_ref = setTimeout(() => this.data.delete(key), duration);
    this.data.set(key, { value, duration, timeout_ref });

    return cached_entry !== undefined;
  }

  get(key: number): number {
    return this.data.get(key)?.value ?? -1;
  }

  count(): number {
    return this.data.size;
  }
}
