export const useFilter = (_recipes, _tags, _filteredIngredients, _filteredAppliances, _filteredUstensils) => {
    console.log(_recipes)
    const filterRecipesByInput = (searchValue) => {
        return _recipes.filter(
            (recipe) =>
                recipe.name.toLowerCase().includes(searchValue) ||
                recipe.description.toLowerCase().includes(searchValue) ||
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(searchValue)
                )
        );
    };

    const filterRecipesByTag = (tags = _tags, recipes = _recipes) => {
        let result = recipes;
        tags.ingredients.forEach((_ingredient) => {
            result = result.filter((recipe) =>
                recipe.ingredients.some((ingredient) =>
                    ingredient.ingredient.toLowerCase().includes(_ingredient)
                )
            );
        });
        tags.appliances.forEach((_appliance) => {
            result = result.filter((recipe) =>
                recipe.appliance.toLowerCase() === _appliance
            );
        });
        tags.ustensils.forEach((_ustensil) => {
            result = result.filter((recipe) =>
                recipe.ustensils.some((ustensil) =>
                    ustensil.toLowerCase().includes(_ustensil)
                )
            );
        });
        return result;
    };

    const filterIngredientTagsByInput = (searchValue) => {
        return _filteredIngredients.filter(
            (ingredient) => {
                const isIncluded = ingredient.toLowerCase().includes(searchValue)
                if(!isIncluded) return
                return ingredient
            }
        )
    }

    const filterApplianceTagsByInput = (searchValue) => {
        return _filteredAppliances.filter(
            (appliance) => {
                const isIncluded = appliance.toLowerCase().includes(searchValue)
                if(!isIncluded) return
                return appliance
            }
        )
    }

    const filterUstensilTagsByInput = (searchValue) => {
        return _filteredUstensils.filter(
            (ustensil) => {
                const isIncluded = ustensil.toLowerCase().includes(searchValue)
                if(!isIncluded) return
                return ustensil
            }
        )
    }

    return {
        filterRecipesByInput,
        filterRecipesByTag,
        filterIngredientTagsByInput,
        filterApplianceTagsByInput,
        filterUstensilTagsByInput
    }
}
