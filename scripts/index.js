import {getAllRecipes} from "./api.js";
import {useFilter} from "./filter.js";
import {useGetter} from "./getter.js";
const recipesFactory = (recipes) => {
  const _recipes = recipes;
  const _tags = { ingredients: [], appliances: [], ustensils: [] };

  let _filteredIngredients = []
  let _filteredAppliances = []
  let _filteredUstensils = []
  const filter = useFilter(_recipes, _tags, _filteredIngredients, _filteredAppliances, _filteredUstensils)
  const getter = useGetter(_recipes)

  /* HANDLERS */
  const onInputChange = (e) => {
    const recipeContainer = document.getElementById('recipes-container')
    const value = e.target.value;
    !value.length ? hideMainInputCloseIcon() : showMainInputCloseIcon()
    const result = filter.filterRecipesByInput(value.toLowerCase());
    if(!result.length) {
      recipeContainer.innerHTML = ''
      buildNoRecipesSection();
      showNoRecipeSection()
      buildRecipesNumber([])
    } else if(value.length >= 3) {
      hideNoRecipeSection()
      buildRecipes(result)
    } else {
      hideNoRecipeSection()
      buildRecipes()
    }
  };

  const onIngredientsInputChange = (e) => {
    onToggleCloseIcon(e, 'close-icon-ingredient-tag-input', 'ingredients-input')
    const value = e.target.value;
    const result = filterIngredientTagsByInput(value.toLowerCase());
    buildIngredientsTagsByFilteredTags(result)
  };

  const onAppliancesInputChange = (e) => {
    onToggleCloseIcon(e, 'close-icon-appliance-tag-input', 'appliances-input')
    const value = e.target.value;
    const result = filterApplianceTagsByInput(value.toLowerCase());
    buildAppliancesTagsByFilteredTags(result)
  };

  const onUstensilsInputChange = (e) => {
    onToggleCloseIcon(e, 'close-icon-ustensil-tag-input', 'ustensils-input')
    const value = e.target.value;
    const result = filterUstensilTagsByInput(value.toLowerCase());
    buildUstensilsTagsByFilteredTags(result)
  }

  const onToggleCloseIcon = (e, closeIconId, inputToReset) => {
    const closeIcon = document.getElementById(closeIconId)
    closeIcon.addEventListener('click', (e) => {
      resetFilterInput(inputToReset)
      buildTagsByFilteredRecipes()
      closeIcon.classList.remove('visible')
      closeIcon.classList.add('hidden')
    })
    if(e.target.value.length > 0 || closeIcon.value.length > 0) {
      closeIcon.classList.remove('hidden')
      closeIcon.classList.add('visible')
    }

  }

  // ---------------   TAGS EVENT HANDLER ----------------->
  const onIngredientTagClick = (e, ingredient) => {
    _tags.ingredients.push(ingredient);
    buildTagsByFilteredRecipes()
    buildTagUi();
    resetFilterInput('ingredients-input')
    hideFilterTagCloseIcon('close-icon-ingredient-tag-input')
  };

  const onApplianceTagClick = (e, appliance) => {
    _tags.appliances.push(appliance);
    buildTagsByFilteredRecipes()
    buildTagUi();
    resetFilterInput('appliances-input')
    hideFilterTagCloseIcon('close-icon-appliance-tag-input')
  };

  const onUstetnsilTagClick = (e, ustensil) => {
    _tags.ustensils.push(ustensil);
    buildTagsByFilteredRecipes()
    buildTagUi();
    resetFilterInput('ustensils-input')
    hideFilterTagCloseIcon('close-icon-ustensil-tag-input')
  };

  const onRemoveTag = (type, value) => {
    const mainInputValue = document.getElementById('main-search-input').value
    _tags[type] = _tags[type].filter((tag) => tag !== value);
    buildTagUi();
    let result
    if(mainInputValue.length) {
      const recipes = filter.filterRecipesByInput(mainInputValue)
      result = filter.filterRecipesByTag(_tags , recipes);
    } else {
      result = filter.filterRecipesByTag();
    }
    buildTagsByRecipesAndTagType(type)
    buildRecipes(result);
  };

  const resetFilterInput = (filterId) => {
    const filter = document.getElementById(filterId)
    filter.value = ''
  }

  const buildTagsByRecipesAndTagType = (type) => {
    if (type === "ingredients") {
      buildIngredientsTagsByRecipes();
    } else if(type === "appliances") {
      buildAppliancesTagsByRecipes();
    } else {
      buildUstensilsTagsByRecipes();
    }
  }
  // ---------------   TAGS EVENT HANDLER ----------------->


  /* RENDER */
  // ---------------   INGREDIENTS/APPLIANCES/USTENSILS LISTS ----------------->
  const buildTagUi = () => {
    const tagsContainer = document.getElementById("tags-container");
    tagsContainer.innerHTML = "";
    _tags.ingredients.forEach((ingredient) => {
      const tag = document.createElement("div");
      const closingIcon = document.createElement('img')
      closingIcon.setAttribute('src', '../assets/images/close-icon.svg')
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
      const closingIcon = document.createElement('img')
      closingIcon.setAttribute('src', '../assets/images/close-icon.svg')
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
      const closingIcon = document.createElement('img')
      closingIcon.setAttribute('src', '../assets/images/close-icon.svg')
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
    let ingredients = getter.getAllIngredients(recipes);
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

  const buildAppliancesTagsByRecipes = (recipes = _recipes) => {
    let appliances = getter.getAllAppliances(recipes);
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

  const buildUstensilsTagsByRecipes = (recipes = _recipes) => {
    let ustensils = getter.getAllUstensils(recipes);
    _filteredUstensils = ustensils
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
              onUstetnsilTagClick(e, ustensil)
          )
      );
    });
  };

  const buildTag = (type, content, onClick) => {
    const tagContainer = document.createElement("li");
    const tagElement = document.createElement("a");
    tagElement.classList.add(`dropdown-item-${type}`);
    tagElement.textContent = content;
    tagElement.addEventListener("click", onClick);
    tagContainer.appendChild(tagElement);

    if (_tags[type].includes(content)) {
      tagElement.removeEventListener("click", onClick);
      tagElement.classList.add('disabled');

    }
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
        recipesNumber.innerHTML = `0 recettes`
      } else if(recipes.length === 1) {
        recipesNumber.innerHTML = `${recipes.length} recette`
      } else {
        recipesNumber.innerHTML = `${recipes.length} recettes`
      }
      tagsListContainer.append(recipesNumber)
    }
  }

  const buildRecipes = (recipes = _recipes) => {
    const recipesContainer = document.getElementById("recipes-container");
    recipesContainer.innerHTML = "";

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
                                  <p class="text-semibold">${ingredient.ingredient}</p> 
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
      recipesContainer.append(rowContainer)
    });

    // Set tags list and recipes number based on recipes
    buildIngredientsTagsByRecipes(recipes)
    buildAppliancesTagsByRecipes(recipes)
    buildUstensilsTagsByRecipes(recipes)
    buildRecipesNumber(recipes)
  };


  const buildNoRecipesSection = () => {
      const noRecipesSection = document.getElementById('no-recipes-section')
      noRecipesSection.innerHTML = ''
      const paragraph = document.createElement('p')
      paragraph.classList.add('text')
      const mainInput = document.getElementById('main-search-input')
      paragraph.innerText = `Aucune recette ne contient "${mainInput.value}" vous pouvez chercher tarte aux pommes », « poisson », etc.`
      noRecipesSection.append(paragraph)
  }

  const buildTagsByFilteredRecipes = () => {
    const mainInputValue = document.getElementById('main-search-input').value
    const recipes = filter.filterRecipesByInput(mainInputValue)
    const result = filter.filterRecipesByTag(_tags, recipes);
    buildRecipes(result);
    buildIngredientsTagsByRecipes(result);
    buildAppliancesTagsByRecipes(result);
    buildUstensilsTagsByRecipes(result);
  }

  const hideFilterTagCloseIcon = (closeIconId) => {
    const closeIcon = document.getElementById(closeIconId)
    closeIcon.classList.remove('visible')
    closeIcon.classList.add('hidden')
  }

  const hideMainInputCloseIcon = () => {
    const closeIcon = document.getElementById('close-icon-main-input')
    closeIcon.classList.remove('visible')
    closeIcon.classList.add('hidden')
  }

  const showMainInputCloseIcon = () => {
    const closeIcon = document.getElementById('close-icon-main-input')
    closeIcon.classList.remove('hidden')
    closeIcon.classList.add('visible')
  }

  const hideNoRecipeSection = () => {
    const noRecipeSection = document.getElementById('no-recipes-section')
    noRecipeSection.classList.remove('flex')
    noRecipeSection.classList.add('hidden')
  }

  const showNoRecipeSection = () => {
    const noRecipeSection = document.getElementById('no-recipes-section')
    noRecipeSection.classList.remove('hidden')
    noRecipeSection.classList.add('flex')
  }

  document.getElementById('ingredients-input').addEventListener('input',onIngredientsInputChange);
  document.getElementById('appliances-input').addEventListener('input',onAppliancesInputChange);
  document.getElementById('ustensils-input').addEventListener('input',onUstensilsInputChange);
  document.getElementById('main-search-input').addEventListener('input', onInputChange)
  document.getElementById('close-icon-main-input').addEventListener('click', (e) => {
    const mainInput = document.getElementById('main-search-input')
    mainInput.value = ''
    hideMainInputCloseIcon()
    hideNoRecipeSection()
    buildRecipes();
  })

  const init = () => {
    buildIngredientsTagsByRecipes();
    buildAppliancesTagsByRecipes()
    buildUstensilsTagsByRecipes()
    buildRecipes();
  };

  return {
    init
  };
};

const allRecipes = await getAllRecipes();
const myRecipesFactory = recipesFactory(allRecipes);
myRecipesFactory.init();
