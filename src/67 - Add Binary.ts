export {}; // Necessary in order to avoid TS errors

function addBinary(a: string, b: string): string {
  let carry = 0;
  const result: number[] = [];

  for (let i = 0; i < a.length || i < b.length; i++) {
    const ai = a[a.length - i - 1] ?? "0";
    const bi = b[b.length - i - 1] ?? "0";
    const ai_bi_sum = (ai === "1" ? 1 : 0) + (bi === "1" ? 1 : 0);
    const current_carry = carry % 2;
    carry = Math.floor(carry / 2);

    // console.log(
    //   `ai: ${ai} - bi: ${bi} - sum: ${ai_bi_sum} - current_carry: ${current_carry} - carry: ${carry} - result: ${result.join(
    //     ""
    //   )}`
    // );

    if (ai_bi_sum === 0) {
      result.push(current_carry);
    } else if (ai_bi_sum === 1) {
      if (current_carry === 1) {
        result.push(0);
        carry += 1;
      } else {
        result.push(1);
      }
    } else {
      // ai_bi_sum === 2

      if (current_carry === 0) {
        result.push(0);
        carry += 1;
      } else {
        result.push(1);
        carry = carry * 2 + 1;
      }
    }
  }

  // console.log(`carry: ${carry}`);

  while (carry > 0) {
    result.push(carry % 2);
    carry = Math.floor(carry / 2);
    // console.log(`> carry: ${carry}`);
  }

  // console.log(`carry: ${carry}`);

  return result.reverse().join("");
}
