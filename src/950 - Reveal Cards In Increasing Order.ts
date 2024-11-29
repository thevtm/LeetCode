export {}; // Necessary in order to avoid TS errors

function deckRevealedIncreasing(deck: number[]): number[] {
  deck.sort((a, b) => a - b);

  const result = new Array();
  const order: number[] = _.range(0, deck.length);

  for (let i = 0; i < deck.length; i++) {
    const top = order.shift()!;
    result[top] = deck[i];
    order.push(order.shift()!);

    // console.log(i, top, result, order);
  }

  return result;
}
