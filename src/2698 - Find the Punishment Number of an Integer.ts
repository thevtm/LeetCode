export {};

function punishmentNumber(n: number): number {
  let total = 1;

  for (let i = 2; i <= n; i++) {
    const digits: number[] = [];
    const square = i * i;
    let remainder = square;

    while (remainder > 0) {
      digits.push(remainder % 10);
      remainder = Math.trunc(remainder / 10);
    }

    digits.reverse();

    let acc = 0;

    const backtrack = (index: number): boolean => {
      const max_len = digits.length - index + (index === 0 ? -1 : 0);

      for (let l = 1; l <= max_len; l++) {
        let s = 0;

        for (let j = 0; j < l; j++) {
          s *= 10;
          s += digits[index + j];
        }

        if (acc + s === i && l === max_len) {
          return true;
        } else if (acc + s <= i) {
          acc += s;
          if (backtrack(index + l)) return true;
          acc -= s;
        }
      }

      return false;
    };

    if (backtrack(0)) {
      total += square;
    }
  }

  return total;
}
