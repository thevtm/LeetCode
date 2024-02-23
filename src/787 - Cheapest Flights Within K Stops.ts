export {}; // Necessary in order to avoid TS errors

function findCheapestPrice(
  n: number,
  flights: [number, number, number][],
  src: number,
  dst: number,
  k: number
): number {
  const flightsFromCity = Array.from({ length: n }, () => new Array<[number, number, number]>());

  for (const flight of flights) {
    flightsFromCity[flight[0]].push(flight);
  }

  const stack: [number, number, number][] = [[src, 0, 0]];
  const lowestPerCity = new Array(n).fill(Infinity);
  let lowestPrice = Infinity;

  while (stack.length > 0) {
    const [city, connections, accPrice] = stack.shift()!;

    for (const [from, to, price] of flightsFromCity[city]) {
      const newAccPrice = accPrice + price;

      if (to === dst) {
        lowestPrice = Math.min(lowestPrice, newAccPrice);
      } else if (newAccPrice < lowestPerCity[to] && newAccPrice < lowestPrice && connections < k) {
        lowestPerCity[to] = newAccPrice;
        stack.push([to, connections + 1, newAccPrice]);
      }
    }
  }

  return lowestPrice === Infinity ? -1 : lowestPrice;
}
