import {getAllRecipes} from "./api.js";

const recipesFactory = (recipes) => {
  const _recipes = recipes;

  const _tags = { ingredients: [], appliances: [], ustensils: [] };

  /* FILTERS */
  const filterByInput = (searchValue) => {
    return _recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(searchValue) ||
        recipe.description.toLowerCase().includes(searchValue) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(searchValue)
        )
    );
  };

  const filterByTag = (tags = _tags) => {
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
    const result = filterByInput(value.toLowerCase());
    buildRecipes(result);
  };

  const onIngredientsInputChange = (e) => {
    const value = e.target.value;
    console.log(_recipes.length)
    // const result = filterByInput(value.toLowerCase());
    // buildRecipes(result);
  };


  // ---------------   TAGS EVENT HANDLER ----------------->
  const onIngredientTagClick = (e, ingredient) => {
    _tags.ingredients.push(ingredient);
    const result = filterByTag();
    buildRecipes(result);
    buildIngredientsTags(result);
    buildTagUi();
  };

  const onApplianceTagClick = (e, appliance) => {
    _tags.appliances.push(appliance);
    const result = filterByTag();
    buildRecipes(result);
    buildAppliancesTags(result);
    buildTagUi();
  };

  const onUstetnsilTagClick = (e, ustensil) => {
    _tags.ustensils.push(ustensil);
    const result = filterByTag();
    buildRecipes(result);
    buildUstensilsTags(result);
    buildTagUi();
  };

  const onRemoveTag = (type, value) => {
    _tags[type] = _tags[type].filter((tag) => tag !== value);
    buildTagUi();
    const result = filterByTag();
    if (type === "ingredients") {
      buildIngredientsTags();
    } else if(type === "appliances") {
      buildAppliancesTags();
    } else {
      buildUstensilsTags();
    }
    buildRecipes(result);
  };
  // ---------------   TAGS EVENT HANDLER ----------------->


  /* RENDER */
  // ---------------   INGREDIENTS/APPLIANCES/USTENSILS LISTS ----------------->
  const buildTagUi = () => {
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.innerHTML = "";
    _tags.ingredients.forEach((ingredient) => {
      const tag = document.createElement("span");
      tag.classList.add("badge", "text-bg-primary", "m-1");
      tag.textContent = ingredient;
      tag.addEventListener("click", () =>
          onRemoveTag("ingredients", ingredient)
      );
      tagsContainer.append(tag);
    });

    _tags.appliances.forEach((appliance) => {
      const tag = document.createElement("span");
      tag.classList.add("badge", "text-bg-primary", "m-1");
      tag.textContent = appliance;
      tag.addEventListener("click", () =>
          onRemoveTag("appliances", appliance)
      );
      tagsContainer.append(tag);
    });

    _tags.ustensils.forEach((ustensil) => {
      const tag = document.createElement("span");
      tag.classList.add("badge", "text-bg-primary", "m-1");
      tag.textContent = ustensil;
      tag.addEventListener("click", () =>
          onRemoveTag("ustensils", ustensil)
      );
      tagsContainer.append(tag);
    });
  };

  const buildIngredientsTags = (recipes = _recipes) => {
    let ingredients = getAllIngredients(recipes);
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

  const buildAppliancesTags = (recipes = _recipes) => {
    let appliances = getAllAppliances(recipes);
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

  const buildUstensilsTags = (recipes = _recipes) => {
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
    const tagContainer = document.createElement("li");
    const tagElement = document.createElement("a");
    tagElement.classList.add(`dropdown-item-${type}`);
    if (_tags[type].includes(content)) {
      tagElement.classList.add("disabled");
    }
    tagElement.textContent = content;
    tagElement.addEventListener("click", onClick);
    tagContainer.appendChild(tagElement);
    return tagContainer;
  };
  // ---------------   INGREDIENTS/APPLIANCES/USTENSILS LISTS ----------------->


  const buildInput = () => {
    const input = document.createElement("input");
    input.classList.add("form-control");
    input.addEventListener("keyup", onInputChange);
    document.getElementById("search-input").appendChild(input);
  };

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
                <img class="recipe-item-image" src="../assets/images/Recette01.jpg" alt="recipe">
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
                                  <div class="flex">
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
    buildIngredientsTags(recipes)
    buildAppliancesTags(recipes)
    buildUstensilsTags(recipes)
    recipeContainer.appendChild(div);
  };

  document.getElementById('ingredients-input').addEventListener('input',onIngredientsInputChange);

  const init = () => {
    buildInput();
    buildIngredientsTags();
    buildRecipes();
  };

  return { init };
};

const allRecipes = await getAllRecipes();
const myRecipesFactory = recipesFactory(allRecipes);
myRecipesFactory.init();
