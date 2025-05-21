export {}; // Necessary in order to avoid TS errors

const MODULO = 10 ** 9 + 7;

function checkRecord(n: number): number {
  const mulo = [1, 1, 1, 1, 1, 1];

  for (let i = 1; i <= n; i++) {
    const pMulo = [...mulo]; // clone array

    mulo[0] = (pMulo[0] + pMulo[3] + pMulo[1]) % MODULO;
    mulo[1] = (pMulo[0] + pMulo[3] + pMulo[2]) % MODULO;
    mulo[2] = (pMulo[0] + pMulo[3]) % MODULO;
    mulo[3] = (pMulo[3] + pMulo[4]) % MODULO;
    mulo[4] = (pMulo[3] + pMulo[5]) % MODULO;
    mulo[5] = pMulo[3] % MODULO;
  }

  return mulo[0];
}
