class ProductOfNumbers {
  prefix_products: number[] = [];

  add(num: number): void {
    if (num === 0) {
      this.prefix_products = [];
      return;
    }

    if (this.prefix_products.length === 0) {
      this.prefix_products.push(num);
      return;
    }

    const last_el = this.prefix_products[this.prefix_products.length - 1];
    this.prefix_products.push(num * last_el);
  }

  getProduct(k: number): number {
    const pp_len = this.prefix_products.length;

    if (k > pp_len) {
      return 0;
    }

    const last_num = this.prefix_products[pp_len - 1];
    const kth_num = this.prefix_products[pp_len - k - 1] ?? 1;

    return last_num / kth_num;
  }
}
