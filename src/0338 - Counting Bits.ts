export {}; // Necessary in order to avoid TS errors

// n    00 01 02 03 04 05 06 07 08 09 10 11 12 13 14 15
// n%2  00 01 00 01 00 01 00 01 00 01 00 01 00 01 00 01 00 01 00 01
// n%4  00 01 02 03 00 01 02 03 00 01 02 03 00 01 02 03 00 01 02 03
// log2 00 00 01 01 02 02 02 02 03 03 03 03 03 03 03 03 04 04 04 04
// =    00 01 01 02 01 02 02 03 01 02 02 03 02 03 03 04

// 0 [01]    1
// 1 [02-03] 1 2
// 2 [04-07] 1 2 2 3
// 3 [08-15] 1 2 2 3 2 3 3 4

function countBits(n: number): number[] {
  if (n === 0) {
    return [0];
  }

  const r = new Array(n + 1);
  const l = Math.floor(Math.log2(n));

  r[0] = 0;
  r[1] = 1;

  for (let i = 1; i <= l; i++) {
    const section_size = Math.pow(2, i);
    const section_start_index = section_size;
    const section_midpoint_index = section_start_index + section_size / 2;

    const previous_section_start_size = section_size / 2;
    const previous_section_start_index = previous_section_start_size;

    for (let j = 0; j < previous_section_start_size && section_start_index + j <= n; j++) {
      // console.log(["1", j, section_start_index + j, previous_section_start_index + j]);
      r[section_start_index + j] = r[previous_section_start_index + j];
    }

    for (let j = 0; j < previous_section_start_size && section_midpoint_index + j <= n; j++) {
      r[section_midpoint_index + j] = r[previous_section_start_index + j] + 1;
    }

    // console.log({
    //   i,
    //   section_size,
    //   section_start_index,
    //   section_midpoint_index,
    //   previous_section_start_size,
    //   previous_section_start_index,
    //   r,
    // });
  }

  // console.log(r);

  return r;
}
