export {};

function coloredCells(n: number): number {
  n -= 1;
  const triangle_number = (n * (n + 1)) / 2;
  return 1 + triangle_number * 4;
}

/*
1 = 1
2 += 4
3 += 4 + 4
4 += 4 + 4 + 4
5 += 4 + 4 + 4 + 4
1 5 13 25 41

0 04 12 24 40
0 01 03 06 10
*/
