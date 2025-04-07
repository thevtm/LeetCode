export {};

function splitNum(num: number): number {
  let remainder = num;
  const digits: number[] = [];

  while (remainder > 0) {
    digits.push(remainder % 10);
    remainder = Math.floor(remainder / 10);
  }

  // console.log("digits", digits);

  //////////////////////////////////////////////////////////////////////////////

  digits.sort((a, b) => a - b);

  // console.log("digits", digits);

  let num1 = 0;
  let num2 = 0;

  // Even numbers belong to num1
  for (let i = 0; i < digits.length; i += 2) {
    num1 = num1 * 10 + digits[i];
  }

  // Odd numbers belong to num2
  for (let i = 1; i < digits.length; i += 2) {
    num2 = num2 * 10 + digits[i];
  }

  // console.log("num1", num1, "num2", num2);

  return num1 + num2;
}
