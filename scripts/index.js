import {getAllRecipes} from "./api.js";

const recipesFactory = (recipes) => {
  const _recipes = recipes;

  const _tags = { ingredients: [], appliances: [], ustensils: [] };
  let _filteredIngredients = []
  let _filteredAppliances = []
  let _filteredUstensils = []


  /* FILTERS */
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

  const filterRecipesByTag = (tags = _tags) => {
    let result = _recipes;
    /* filter by ingredients */
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

  // ---------------   GET ALL  ----------------->
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
  // ---------------   GET ALL  ----------------->


  /* HANDLERS */
  const onInputChange = (e) => {
    const value = e.target.value;
    const closeIcon  = document.getElementById('close-icon-main-input')
    if(value.length) {
      closeIcon.classList.remove('hidden')
      closeIcon.classList.add('visible')
    } else {
      closeIcon.classList.remove('visible')
      closeIcon.classList.add('hidden')
    }
    const result = filterRecipesByInput(value.toLowerCase());
    buildRecipes(result);
  };

  const onIngredientsInputChange = (e) => {
    const value = e.target.value;
    const result = filterIngredientTagsByInput(value.toLowerCase());
    buildIngredientsTagsByFilteredTags(result)
  };

  const onAppliancesInputChange = (e) => {
    const value = e.target.value;
    const result = filterApplianceTagsByInput(value.toLowerCase());
    buildAppliancesTagsByFilteredTags(result)
  };

  const onUstensilsInputChange = (e) => {
    const value = e.target.value;
    const result = filterUstensilTagsByInput(value.toLowerCase());
    buildUstensilsTagsByFilteredTags(result)
  }

  // ---------------   TAGS EVENT HANDLER ----------------->
  const onIngredientTagClick = (e, ingredient) => {
    _tags.ingredients.push(ingredient);
    const result = filterRecipesByTag();
    buildRecipes(result);
    buildIngredientsTagsByRecipes(result);
    buildTagUi();
  };

  const onApplianceTagClick = (e, appliance) => {
    _tags.appliances.push(appliance);
    const result = filterRecipesByTag();
    buildRecipes(result);
    buildAppliancesTagsByRecipes(result);
    buildTagUi();
  };

  const onUstetnsilTagClick = (e, ustensil) => {
    _tags.ustensils.push(ustensil);
    const result = filterRecipesByTag();
    buildRecipes(result);
    buildUstensilsTagsByRecipes(result);
    buildTagUi();
  };

  const onRemoveTag = (type, value) => {
    _tags[type] = _tags[type].filter((tag) => tag !== value);
    buildTagUi();
    const result = filterRecipesByTag();
    if (type === "ingredients") {
      buildIngredientsTagsByRecipes();
    } else if(type === "appliances") {
      buildAppliancesTagsByRecipes();
    } else {
      buildUstensilsTagsByRecipes();
    }
    buildRecipes(result);
  };

  const onSettingInputValue = () => {
    const mainInput = document.getElementById('main-search-input')
    mainInput.value = ''
  }
  // ---------------   TAGS EVENT HANDLER ----------------->


  /* RENDER */
  // ---------------   INGREDIENTS/APPLIANCES/USTENSILS LISTS ----------------->
  const buildTagUi = () => {
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.innerHTML = "";
    _tags.ingredients.forEach((ingredient) => {
      const tag = document.createElement("div");
      const closingIcon = document.createElement('span')
      closingIcon.innerText = 'tu'
      closingIcon.classList.add('closing-icon')
      closingIcon.addEventListener("click", () =>
              onRemoveTag("ingredients", ingredient)
          );
      tag.classList.add("tag");
      tag.textContent = ingredient;
      tag.append(closingIcon)
      tagsContainer.append(tag);
    });

    _tags.appliances.forEach((appliance) => {
      const tag = document.createElement("div");
      const closingIcon = document.createElement('span')
      closingIcon.innerText = 'tu'
      closingIcon.classList.add('closing-icon')
      closingIcon.addEventListener("click", () =>
          onRemoveTag("appliances", appliance)
      );
      tag.classList.add("tag");
      tag.textContent = appliance;
      tag.append(closingIcon)
      tagsContainer.append(tag);
    });

    _tags.ustensils.forEach((ustensil) => {
      const tag = document.createElement("div");
      const closingIcon = document.createElement('span')
      closingIcon.innerText = 'tu'
      closingIcon.classList.add('closing-icon')
      closingIcon.addEventListener("click", () =>
          onRemoveTag("ustensils", ustensil)
      );
      tag.classList.add("tag");
      tag.textContent = ustensil;
      tag.append(closingIcon)
      tagsContainer.append(tag);
    });
  };

  const buildIngredientsTagsByRecipes = (recipes = _recipes) => {
    let ingredients = getAllIngredients(recipes);
    _filteredIngredients = ingredients
    const tagsElement = document.getElementById("tags-ingredients");
    tagsElement.innerHTML = "";
    ingredients.forEach((ingredient) => {
      tagsElement.append(
        buildTag("ingredients", ingredient, (e) =>
          onIngredientTagClick(e, ingredient)
        )
      );
    });
  };

  const buildIngredientsTagsByFilteredTags = (filteredIngredients = _filteredIngredients) => {
    const tagsElement = document.getElementById("tags-ingredients");
    tagsElement.innerHTML = "";
    filteredIngredients.forEach((ingredient) => {
      tagsElement.append(
          buildTag("ingredients", ingredient, (e) =>
              onIngredientTagClick(e, ingredient)
          )
      );
    });
  };

  const buildAppliancesTagsByRecipes = (recipes = _recipes) => {
    let appliances = getAllAppliances(recipes);
    _filteredAppliances = appliances
    const tagsElement = document.getElementById("tags-appliances");
    tagsElement.innerHTML = "";
    appliances.forEach((appliance) => {
      tagsElement.append(
          buildTag("appliances", appliance, (e) =>
              onApplianceTagClick(e, appliance)
          )
      );
    });
  };

  const buildAppliancesTagsByFilteredTags = (filteredAppliances = _filteredAppliances) => {
    const tagsElement = document.getElementById("tags-appliances");
    tagsElement.innerHTML = "";
    filteredAppliances.forEach((appliance) => {
      tagsElement.append(
          buildTag("appliances", appliance, (e) =>
              onApplianceTagClick(e, appliance)
          )
      );
    });
  };

  const buildUstensilsTagsByFilteredTags = (filteredUstensils = _filteredUstensils) => {
    const tagsElement = document.getElementById("tags-ustensils");
    tagsElement.innerHTML = "";
    filteredUstensils.forEach((ustensil) => {
      tagsElement.append(
          buildTag("ustensils", ustensil, (e) =>
              onApplianceTagClick(e, ustensil)
          )
      );
    });
  };


  const buildUstensilsTagsByRecipes = (recipes = _recipes) => {
    let ustensils = getAllUstensils(recipes);
    const tagsElement = document.getElementById("tags-ustensils");
    tagsElement.innerHTML = "";
    ustensils.forEach((ustensil) => {
      tagsElement.append(
          buildTag("ustensils", ustensil, (e) =>
              onUstetnsilTagClick(e, ustensil)
          )
      );
    });
  };

  const buildTag = (type, content, onClick) => {
    if (_tags[type].includes(content)) {
      return
    }
    const tagContainer = document.createElement("li");
    const tagElement = document.createElement("a");
    tagElement.classList.add(`dropdown-item-${type}`);
    tagElement.textContent = content;
    tagElement.addEventListener("click", onClick);
    tagContainer.appendChild(tagElement);
    return tagContainer;
  };
  // ---------------   INGREDIENTS/APPLIANCES/USTENSILS LISTS ----------------->

  const buildRecipesNumber = (recipes) => {
    const tagsListContainer = document.getElementById('tags-list-container')
    const recipesNumber = document.getElementById('recipes-length')
    if(recipesNumber === null) {
      const initialRecipesNumber = document.createElement('div')
      initialRecipesNumber.setAttribute('id', 'recipes-length')
      initialRecipesNumber.classList.add('recipes-number')
      if(recipes.length === 0 ) {
        initialRecipesNumber.innerHTML = `0 recette`
      } else if(recipes.length === 1) {
        initialRecipesNumber.innerHTML = `${recipes.length} recette`
      } else {
        initialRecipesNumber.innerHTML = `${recipes.length} recettes`

      }
      tagsListContainer.append(initialRecipesNumber)
    } else {
      recipesNumber.innerText = ''
      if(recipes.length === 0 ) {
        recipesNumber.innerHTML = `0 recette`
      } else if(recipes.length === 1) {
        recipesNumber.innerHTML = `${recipes.length} recette`
      } else {
        recipesNumber.innerHTML = `${recipes.length} recettes`
      }
      tagsListContainer.append(recipesNumber)
    }
  }

  const buildRecipes = (recipes = _recipes) => {
    const recipeContainer = document.getElementById("recipes-container");
    recipeContainer.innerHTML = "";

    let rowContainer = document.createElement("div");
    rowContainer.classList.add("row", "row-cols-3", "g-5");
    let div = document.createElement("div");
    div.classList.add("container-fluid", "text-center");
    div.appendChild(rowContainer);
    recipes.forEach((recipe) => {
      const recipeContainer = document.createElement("div");
      recipeContainer.classList.add("col");
      recipeContainer.innerHTML = `
            <div class="recipe-item">
              <div class="img-container">
                <img class="recipe-item-image" src="${recipe.image}" alt="recipe">
                <div class="img-badge">${recipe.time} min</div>
              </div>
                <div class="toto">
                    <h3>${recipe.name}</h3>
                    <div class="text-left">
                      <div style="margin-bottom: 15px">
                         <h6>RECETTE</h6>
                         <p class="clamped-content">${recipe.description}</p>
                      </div>
                      <div>
                        <h6>INGREDIENTS</h6>
                         ${recipe.ingredients
                        .map(
                            (ingredient) =>
                                `<div class="ingredient">
                                  <p class="tata">${ingredient.ingredient}</p> 
                                  <div class="quantity">
                                    <p class="titi">${ingredient.quantity || ""}</p>
                                    <p class="titi">${ingredient.unit || ""}</p>
                                  </div>
                                </div>`
                              )
                        .join("")}
                       </div>
                    </div>
                </div>
            </div>`;
      rowContainer.append(recipeContainer);
    });

    // Set ingredients list based on recipes
    buildIngredientsTagsByRecipes(recipes)
    buildAppliancesTagsByRecipes(recipes)
    buildUstensilsTagsByRecipes(recipes)
    buildRecipesNumber(recipes)
    if(recipes.length) {
      recipeContainer.appendChild(div);
    } else {
      const noRecipesSection = document.getElementById('no-recipes-section')
      noRecipesSection.innerHTML = ''
      const recipesSection = document.getElementById('recipes-section')
      const paragraph = document.createElement('p')
      const mainInput = document.getElementById('main-search-input')
      paragraph.innerText = `Aucune recette ne contient "${mainInput.value}" vous pouvez chercher tarte aux pommes », « poisson », etc.`
      noRecipesSection.append(paragraph)
      recipesSection.parentNode.insertBefore(noRecipesSection, recipesSection.nextSibling)
    }
  };

  document.getElementById('ingredients-input').addEventListener('input',onIngredientsInputChange);
  document.getElementById('appliances-input').addEventListener('input',onAppliancesInputChange);
  document.getElementById('ustensils-input').addEventListener('input',onUstensilsInputChange);
  document.getElementById('main-search-input').addEventListener('input', onInputChange)
  document.getElementById('close-icon-main-input').addEventListener('click', onSettingInputValue)

  const init = () => {
    buildIngredientsTagsByRecipes();
    buildRecipes();
  };

  return {
    init
  };
};

const allRecipes = await getAllRecipes();
const myRecipesFactory = recipesFactory(allRecipes);
myRecipesFactory.init();
