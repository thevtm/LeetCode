export {}; // Necessary in order to avoid TS errors

interface Node {
  person: number;
  meeting: [number, number, number];
  meetingWith: Node[];
  next?: Node;
  visited: boolean;
}

function findAllPeople(n: number, meetings: [number, number, number][], firstPerson: number): number[] {
  meetings.sort((a, b) => a[2] - b[2]);

  const nodeIdentity = (num: number, time: number): number => num * 100000 + time;
  const nodesIndex: { [id: number]: Node } = {};
  const previousNode = new Array<Node | undefined>(n);
  const firstMeetings: [Node?, Node?] = [undefined, undefined];

  for (const m of meetings) {
    const [aNum, bNum, time] = m;

    const a = (nodesIndex[nodeIdentity(aNum, time)] ??= { person: aNum, meeting: m, meetingWith: [], visited: false });
    const b = (nodesIndex[nodeIdentity(bNum, time)] ??= { person: bNum, meeting: m, meetingWith: [], visited: false });

    a.meetingWith.push(b);
    b.meetingWith.push(a);

    if (previousNode[aNum] == null) {
      previousNode[aNum] = a;
    } else if (previousNode[aNum]!.meeting[2] < time) {
      previousNode[aNum]!.next = a;
      previousNode[aNum] = a;
    }

    if (previousNode[bNum] == null) {
      previousNode[bNum] = b;
    } else if (previousNode[bNum]!.meeting[2] < time) {
      previousNode[bNum]!.next = b;
      previousNode[bNum] = b;
    }

    if (firstMeetings[0] == null) {
      if (aNum === 0) {
        firstMeetings[0] = a;
      } else if (bNum === 0) {
        firstMeetings[0] = b;
      }
    }

    if (firstMeetings[1] == null) {
      if (aNum === firstPerson) {
        firstMeetings[1] = a;
        a.visited = true;
      } else if (bNum === firstPerson) {
        firstMeetings[1] = b;
        b.visited = true;
      }
    }
  }

  // console.log(firstMeetings);
  // console.log(previousNode);
  // console.log(nodesIndex);

  const knowSecret = new Set<number>([0, firstPerson]);

  const stack: Node[] = firstMeetings.filter((x) => x != null) as Node[];

  while (stack.length > 0) {
    const node = stack.shift()!;

    // console.log(node);

    for (const participantNode of node.meetingWith) {
      if (participantNode.visited) {
        continue;
      }

      participantNode.visited = true;
      knowSecret.add(participantNode.person);
      stack.push(participantNode);
    }

    if (node.next != null && !node.next!.visited) {
      node.next!.visited = true;
      stack.push(node.next!);
    }
  }

  return Array.from(knowSecret.values());
}
