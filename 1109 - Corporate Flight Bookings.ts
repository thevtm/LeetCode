export {};

function corpFlightBookings(bookings: number[][], n: number): number[] {
  const booked_seats: number[] = new Array(n).fill(0);

  for (const [first, last, seats] of bookings) {
    for (let i = first - 1; i < last; i++) {
      booked_seats[i] += seats;
    }
  }

  return booked_seats;
}
