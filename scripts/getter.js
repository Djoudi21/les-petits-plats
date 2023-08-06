export const useGetter = (_recipes) => {
    const getAllIngredients = (recipes = _recipes) => {
        const _ingredients = [];

        recipes.map((recipe) => {
            recipe.ingredients.map((ingredient) => {
                if (!_ingredients.includes(ingredient.ingredient.toLowerCase())) {
                    _ingredients.push(ingredient.ingredient.toLowerCase());
                }
            });
        });

        return _ingredients;
    };

    const getAllAppliances = (recipes = _recipes) => {
        const _appliances = [];

        recipes.map((recipe) => {
            if (!_appliances.includes(recipe.appliance.toLowerCase())) {
                _appliances.push(recipe.appliance.toLowerCase());
            }
        })
        return _appliances;
    };

    const getAllUstensils = (recipes = _recipes) => {
        const _ustensils = [];

        recipes.map((recipe) => {
            recipe.ustensils.map((ustensil) => {
                if (!_ustensils.includes(ustensil.toLowerCase())) {
                    _ustensils.push(ustensil.toLowerCase());
                }
            });
        });
        return _ustensils;
    };

    return {
        getAllIngredients,
        getAllAppliances,
        getAllUstensils,
    }
}
