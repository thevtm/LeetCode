interface Array<T> {
  last(): T | -1;
}

(Array.prototype as any).last = function (this: any[]) {
  if (this.length === 0) return -1;
  return this[this.length - 1];
};
