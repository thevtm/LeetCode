export {};

function countDays(days: number, meetings: [number, number][]): number {
  meetings.sort((a, b) => a[0] - b[0]);

  // console.log("meetings", meetings);

  //////////////////////////////////////////////////////////////////////////////

  const merged_meetings: [number, number][] = [meetings[0]];

  for (let i = 1; i < meetings.length; i++) {
    const [meeting_start, meeting_end] = meetings[i];
    const last_meeting = merged_meetings[merged_meetings.length - 1];
    const [last_meeting_start, last_meeting_end] = last_meeting;

    if (meeting_start >= last_meeting_start && meeting_start <= last_meeting_end) {
      last_meeting[1] = Math.max(meeting_end, last_meeting_end);
    } else {
      merged_meetings.push(meetings[i]);
    }
  }

  // console.log("merged_meetings", merged_meetings);

  //////////////////////////////////////////////////////////////////////////////

  let result = days;

  for (const merged_meeting of merged_meetings) {
    result -= merged_meeting[1] + 1 - merged_meeting[0];
  }

  return result;
}
