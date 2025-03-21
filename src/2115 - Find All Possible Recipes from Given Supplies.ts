export {};

function findAllRecipes(recipes: string[], ingredients: string[][], supplies: string[]): string[] {
  const dependents = new Map<string, string[]>();
  const missing_ingredients_count = new Map<string, number>();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];

    missing_ingredients_count.set(recipe, ingredients[i].length);

    for (const ingredient of ingredients[i]) {
      let foo = dependents.get(ingredient);

      if (foo === undefined) {
        foo = [recipe];
        dependents.set(ingredient, foo);
      } else {
        foo.push(recipe);
      }
    }
  }

  const result: string[] = [];

  const supply = (s: string) => {
    const ds = dependents.get(s);

    if (ds === undefined) return;

    for (const dependent of ds) {
      const count = missing_ingredients_count.get(dependent)!;

      if (count === 1) {
        missing_ingredients_count.delete(dependent);
        result.push(dependent);
        supply(dependent);
      } else {
        missing_ingredients_count.set(dependent, count - 1);
      }
    }
  };

  for (const s of supplies) {
    supply(s);
  }

  return result;
}
