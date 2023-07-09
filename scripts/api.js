export const getAllRecipes = async () => {
  try {
    const data = await fetch("./data/recipes.json");
    const json = await data.json();
    if (!json || !json.recipes) {
      return [];
    }
    return json.recipes;
  } catch (error) {
    console.log(error);
    return [];
  }
};
