export {}; // Necessary in order to avoid TS errors

function timeRequiredToBuy(tickets: number[], k: number): number {
  let seconds = 0;

  while (true) {
    // console.log(tickets, k);

    for (let i = 0; i < tickets.length; i++) {
      seconds++;

      if (tickets[i] === 1) {
        tickets.splice(i, 1);

        if (i === k) {
          return seconds;
        } else if (i < k) {
          k--;
        }

        i--;
      } else {
        tickets[i]--;
      }
    }
  }

  return -1;
}
