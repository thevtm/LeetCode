export {}; // Necessary in order to avoid TS errors

function bagOfTokensScore(tokens: number[], power: number): number {
  tokens.sort((a, b) => a - b);

  let score = 0;
  let left = 0;
  let right = tokens.length - 1;

  while (left <= right) {
    console.log(`\\ [${left} - ${right}] ${power} ${score}`);

    if (tokens[left] <= power) {
      power -= tokens[left];
      score++;
      left++;
    } else if (score > 0 && right - left > 1) {
      power += tokens[right];
      score--;
      right--;
    } else {
      break;
    }

    console.log(`/ [${left} - ${right}] ${power} ${score}`);
  }

  return score;
}
