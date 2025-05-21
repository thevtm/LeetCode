export {};

function guessNumber(n: number): number {
  let min = 1;
  let max = n;

  while (true) {
    const new_guess = Math.floor((max - min) / 2) + min;

    switch (guess(new_guess)) {
      case -1:
        max = new_guess - 1;
        break;
      case 0:
        return new_guess;
      case 1:
        min = new_guess + 1;
        break;
    }
  }
}
