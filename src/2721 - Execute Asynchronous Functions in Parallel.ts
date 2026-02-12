type Fn<T> = () => Promise<T>;

function promiseAll<T>(functions: Fn<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const result = new Array(functions.length);
    let resolved_count = 0;

    for (const [i, fn] of functions.entries()) {
      fn()
        .then((val) => {
          result[i] = val;
          resolved_count++;
          if (resolved_count === functions.length) resolve(result);
        })
        .catch((err) => reject(err));
    }
  });
}

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
