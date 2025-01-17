export {};

function carPooling(trips: number[][], capacity: number): boolean {
  const delta_passengers: number[] = [];

  for (const [passengers, from, to] of trips) {
    delta_passengers[from] = (delta_passengers[from] ?? 0) + passengers;
    delta_passengers[to] = (delta_passengers[to] ?? 0) - passengers;
  }

  let passengers_on_vehicle = 0;

  for (let i = 0; i < delta_passengers.length; i++) {
    if (delta_passengers[i] === undefined) {
      continue;
    }

    passengers_on_vehicle += delta_passengers[i];

    if (passengers_on_vehicle > capacity) {
      return false;
    }
  }

  return true;
}
