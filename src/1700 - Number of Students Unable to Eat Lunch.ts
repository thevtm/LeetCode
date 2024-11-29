export {}; // Necessary in order to avoid TS errors

function countStudents(students: number[], sandwiches: number[]): number {
  let students0Count = 0;
  let students1Count = 0;
  let sandwiches0Count = 0;
  let sandwiches1Count = 0;

  for (let i = 0; i < students.length; i++) {
    if (students[i] === 0) {
      students0Count++;
    } else {
      students1Count++;
    }

    if (sandwiches[i] === 0) {
      sandwiches0Count++;
    } else {
      sandwiches1Count++;
    }

    console.log(
      students0Count,
      sandwiches0Count,
      sandwiches0Count - students0Count,
      students1Count,
      sandwiches1Count,
      sandwiches1Count - students1Count
    );
  }

  console.log({ students0Count, students1Count, sandwiches0Count, sandwiches1Count });

  // return Math.max(0, students0Count - sandwiches0Count) + Math.max(0, students1Count - sandwiches1Count);
  return Math.max(sandwiches0Count - students0Count, sandwiches1Count - students1Count);
}
