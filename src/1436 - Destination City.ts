export {};

function destCity(paths: string[][]): string {
  const departing_cities = new Set<string>();
  const arriving_cities = new Set<string>();

  for (const [departing_city, arriving_city] of paths) {
    departing_cities.add(departing_city);
    arriving_cities.add(arriving_city);
  }

  const result = subtractSets(arriving_cities, departing_cities);
  return result.values().next().value;
}

function subtractSets<T>(setA: Set<T>, setB: Set<T>): Set<T> {
  let resultSet = new Set(setA);
  for (let elem of setB) {
    resultSet.delete(elem);
  }
  return resultSet;
}
