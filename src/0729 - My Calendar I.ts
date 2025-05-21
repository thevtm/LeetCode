export {};

function do_lines_overlap(a: [number, number], b: [number, number]): boolean {
  const [a_start, a_end] = a;
  const [b_start, b_end] = b;

  return (
    (a_start >= b_start && a_start < b_end) ||
    (a_end > b_start && a_end < b_end) ||
    (b_start >= a_start && b_start < a_end) ||
    (b_end > a_start && b_end < a_end)
  );
}

class MyCalendar {
  bookings: [number, number][] = [];

  constructor() {}

  book(new_booking_start_time: number, new_booking_end_time: number): boolean {
    const new_booking: [number, number] = [new_booking_start_time, new_booking_end_time];

    for (const booking of this.bookings) {
      if (do_lines_overlap(booking, new_booking)) {
        return false;
      }
    }

    this.bookings.push(new_booking);

    return true;
  }
}
