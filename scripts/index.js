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
    /* TODO : filter by appliances */
    /* TODO : filter by ustensils */
    return result;
  };

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

  /* HANDLERS */
  const onInputChange = (e) => {
    const value = e.target.value;
    const result = filterByInput(value.toLowerCase());
    buildRecipes(result);
  };

  const onIngredientTagClick = (e, ingredient) => {
    _tags.ingredients.push(ingredient);
    const result = filterByTag();
    buildRecipes(result);
    buildIngredientsTagsByRecipes(result);
    buildTagUi();
  };

  const onRemoveTag = (type, value) => {
    _tags[type] = _tags[type].filter((tag) => tag !== value);
    buildTagUi();
    const result = filterByTag();
    if (type === "ingredients") {
      buildIngredientsTagsByRecipes();
    }
    /* TODO : build appliances tags*/
    /* TODO : build ustensils tags */

    buildRecipes(result);
  };

  /* RENDER */

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
  };

  const buildTag = (type, content, onClick) => {
    const tagContainer = document.createElement("li");
    const tagElement = document.createElement("a");
    tagElement.classList.add("dropdown-item");
    if (_tags[type].includes(content)) {
      tagElement.classList.add("disabled");
    }
    tagElement.textContent = content;
    tagElement.addEventListener("click", onClick);
    tagContainer.appendChild(tagElement);
    return tagContainer;
  };

  // const buildIngredientsTagsByTagsFilter = (ingredients) => {
  //   const tagsElement = document.getElementById("tags-ingredients");
  //   tagsElement.innerHTML = "";
  //   buildSearchIngredientsInput((e) => {
  //     console.log('LALALAL', e.target.value)
  //     // const filteredIngredients = getAllIngredients(recipes)
  //     // const list = filterIngredientTags(filteredIngredients, e.target.value)
  //     // buildIngredientsTagsByTagsFilter(list)
  //     // if(e.target.value.length) {
  //     //   closeIcon.classList.remove('hidden')
  //     //   closeIcon.classList.add('visible')
  //     // } else {
  //     //   closeIcon.classList.add('hidden')
  //     //   closeIcon.classList.remove('visible')
  //     // }
  //   })
  //   // ingredients.forEach((ingredient) => {
  //   //   tagsElement.append(
  //   //       buildTag("ingredients", ingredient, (e) =>
  //   //           onIngredientTagClick(e, ingredient)
  //   //       )
  //   //   );
  //   // });
  // };

  const buildIngredientsTagsByRecipes = (recipes = _recipes) => {
    let ingredients = getAllIngredients(recipes);
    const tagsElement = document.getElementById("tags-ingredients");
    tagsElement.innerHTML = "";
    buildSearchIngredientsInput((e) => {
        const filteredIngredients = getAllIngredients(recipes)
      ingredients =  filterIngredientTags(filteredIngredients, e.target.value)
    })
    ingredients.forEach((ingredient) => {
      tagsElement.append(
        buildTag("ingredients", ingredient, (e) =>
          onIngredientTagClick(e, ingredient)
        )
      );
    });
  };
  //                        ^
  //                        |
  // Same for 2 other types --

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
    buildIngredientsTagsByRecipes(recipes)
    recipeContainer.appendChild(div);
  };

  const buildSearchIngredientsInput = (onInput) => {
    const tagsElement = document.getElementById("tags-ingredients");
    const inputContainer = document.createElement("div");
    inputContainer.classList.add("dropdown-input-container")
    const closeIcon = document.createElement("div");
    closeIcon.classList.add('hidden')
    closeIcon.classList.add('reset-icon')
    const searchIcon = document.createElement("div");
    const input = document.createElement("input");
    input.classList.add('dropdown-input-field')
    input.setAttribute('type', 'text')
    closeIcon.innerHTML = `  
       <svg width="10" height="10" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 7L4 4M4 4L1 1M4 4L7 1M4 4L1 7" stroke="#7A7A7A" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>`
    searchIcon.innerHTML = `  
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search cursor-pointer" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>`
    input.addEventListener('input', onInput)
    // closeIcon.addEventListener('click', () => {
    //   input.value = ''
    // })
    // searchIcon.addEventListener('click', (e) => {
    //   e.preventDefault()
    // })
    inputContainer.append(input)
    inputContainer.append(closeIcon)
    inputContainer.append(searchIcon)
    inputContainer.setAttribute('id', 'tags-ingredients-input')
    tagsElement.append(inputContainer)
    // return inputContainer
  }

  const filterIngredientTags = (list, value) => {
    let filteredList
    filteredList = list.filter(el => {
      return el.toLowerCase().includes(value)
    })
    console.log(filteredList)
    return filteredList
  }

  // const attachEventListenerToIngredientsTags = () => {
  //   const inputElements = Array.from(document.getElementById('tags-ingredients-input').getElementsByTagName('input'));
  //   inputElements[0].addEventListener('input', (e) => {
  //     console.log('1', e.target.value)
  //     const filteredIngredients = getAllIngredients(recipes)
  //     console.log('2', filteredIngredients)
  //
  //     const list = filterIngredientTags(filteredIngredients, e.target.value)
  //     console.log('3', list)
  //     buildIngredientsTagsByTagsFilter(list)
  //   })
  // }

  // Event to avoid closing ingredients dropdown menu
  document.getElementById('tags-ingredients').addEventListener('click', function(event) {
    event.stopPropagation();
  });

  const init = () => {
    buildInput();
    buildIngredientsTagsByRecipes();
    buildRecipes();
  };

  return { init };
};

const allRecipes = await getAllRecipes();
const myRecipesFactory = recipesFactory(allRecipes);
myRecipesFactory.init();
