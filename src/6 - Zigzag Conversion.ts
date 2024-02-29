export {}; // Necessary in order to avoid TS errors

//  P  A  Y  P  A  L  I
// 00 04 11 05 01 06 12

// 00    01    02    03
// 04 05 06 07 08 09 10
// 11    12    13

// 00       01       02
// 03    04 05    06 07
// 08 09    10 11
// 12       13

// A
// B   F
// C E
// D

function convert(s: string, numRows: number): string {
  if (numRows === 1) {
    return s;
  }

  const len = s.length,
    nMiddle = numRows - 2,
    nPerCol = numRows + nMiddle,
    nCol = Math.ceil(len / nPerCol),
    nFullCol = Math.floor(len / nPerCol),
    nLastCol = len % nPerCol;

  const rowLength = (rowIndex: number): number => {
    if (rowIndex === 0) {
      return nCol;
    }

    const zig = rowIndex < nLastCol ? 1 : 0;

    if (rowIndex === numRows - 1) {
      return nFullCol + zig;
    }

    const zag = nLastCol > numRows + (nMiddle - rowIndex) ? 1 : 0;

    return nFullCol + nFullCol + zig + zag;
  };

  const rowStartIndexCache = new Array<number>(numRows);

  const rowStartIndex = (rowIndex: number) => {
    if (rowIndex < 1) {
      return 0;
    }

    return (rowStartIndexCache[rowIndex] ??= rowStartIndex(rowIndex - 1) + rowLength(rowIndex - 1));
  };

  // console.log({ len, nMiddle, nCol, nFullCol, nLastCol });

  // for (let r = 0; r < numRows; r++) {
  //   console.log(`Row`, r, `rowLength`, rowLength(r), `rowStartIndex`, rowStartIndex(r));
  // }

  const result = new Array<string>(s.length);

  for (const [i, l] of s.split("").entries()) {
    const col = Math.floor(i / nPerCol);
    const rem = i % nPerCol;
    const isZig = rem < numRows;
    const isEdge = rem === 0 || rem === numRows - 1;
    const elPerCol = isEdge ? 1 : 2;
    const row = isZig ? rem : nMiddle - (rem - numRows);
    const zagOffset = isZig ? 0 : 1;

    const index = rowStartIndex(row) + col * elPerCol + zagOffset;
    result[index] = l;

    // console.log(l, index.toString().padStart(2, "0"), row, result.join(""));
  }

  return result.join("");
}
