const ingredientUpArrow = document.getElementById('ingredient-up-arrow')
ingredientUpArrow.classList.add('hidden')
const ingredientDownArrow = document.getElementById('ingredient-down-arrow')
const tagsIngredients = document.getElementById('tags-ingredients')
tagsIngredients.classList.add('hidden')
const tagsIngredientsInput = document.getElementById('ingredients-input')
const tagsIngredientsInputContainer = document.getElementById('ingredients-input-container')
tagsIngredientsInput.classList.add('hidden')
tagsIngredientsInputContainer.classList.add('hidden')
const closeIconIngredientInput = document.getElementById('close-icon-ingredient-tag-input')
const searchIconIngredientInput = document.getElementById('search-icon-ingredient-tag-input')
const ingredientContainer = document.getElementById('ingredient-container')



const applianceUpArrow = document.getElementById('appliance-up-arrow')
applianceUpArrow.classList.add('hidden')
const applianceDownArrow = document.getElementById('appliance-down-arrow')
const tagsAppliances = document.getElementById('tags-appliances')
tagsAppliances.classList.add('hidden')
const tagsAppliancesInput = document.getElementById('appliances-input')
const tagsAppliancesInputContainer = document.getElementById('appliances-input-container')
tagsAppliancesInput.classList.add('hidden')
tagsAppliancesInputContainer.classList.add('hidden')
const closeIconApplianceInput = document.getElementById('close-icon-appliance-tag-input')
const searchIconApplianceInput = document.getElementById('search-icon-appliance-tag-input')
const applianceContainer = document.getElementById('appliance-container')

const ustensilUpArrow = document.getElementById('ustensil-up-arrow')
ustensilUpArrow.classList.add('hidden')
const ustensilDownArrow = document.getElementById('ustensil-down-arrow')
const tagsUstensils = document.getElementById('tags-ustensils')
tagsUstensils.classList.add('hidden')
const tagsUstensilsInput = document.getElementById('ustensils-input')
const tagsUstensilsInputContainer = document.getElementById('ustensils-input-container')
tagsUstensilsInput.classList.add('hidden')
tagsUstensilsInputContainer.classList.add('hidden')
const closeIconUstensilInput = document.getElementById('close-icon-ustensil-tag-input')
const searchIconUstensilInput = document.getElementById('search-icon-ustensil-tag-input')
const ustensilContainer = document.getElementById('ustensil-container')

ingredientUpArrow.addEventListener('click', () => {
    // hide ingredient up arrow
    hideIngredientsUpArrow()


    tagsIngredientsInputContainer.classList.add('hidden')
    ingredientContainer.classList.remove('p-20-h-150')
    closeIconIngredientInput.classList.add('hidden')
    closeIconIngredientInput.classList.remove('visible')
    // display ingredient down arrow
    displayIngredientsDownArrow()

    //hide ingredients list and input
    hideIngredientsList()
})

ingredientDownArrow.addEventListener('click', () => {
    // hide ingredient down arrow
    ingredientDownArrow.classList.remove('visible')
    ingredientDownArrow.classList.add('hidden')
    // display ingredient up arrow
    ingredientUpArrow.classList.remove('hidden')
    ingredientUpArrow.classList.add('visible')

    ustensilContainer.classList.add('hidden')
    applianceContainer.classList.add('hidden')
    searchIconIngredientInput.classList.remove('hidden')
    searchIconIngredientInput.classList.add('visible')
    tagsIngredientsInputContainer.classList.remove('hidden')
    ingredientContainer.classList.add('p-20-h-150')
    ingredientContainer.classList.remove('hidden')
    ingredientContainer.classList.add('visible')
    //display ingredients list and input
    displayIngredientsList()

    // handle other lists
    hideAppliancesList()
    hideUstensilsList()
    hideAppliancesUpArrow()
    hideUstensilsUpArrow()
    displayAppliancesDownArrow()
    displayUstensilsDownArrow()

})

applianceUpArrow.addEventListener('click', () => {
    // hide appliance up arrow
    hideAppliancesUpArrow()

    // display appliance down arrow
    displayAppliancesDownArrow()

    //hide appliances list and input
    hideAppliancesList()

    closeIconApplianceInput.classList.add('hidden')
    closeIconApplianceInput.classList.remove('visible')

    tagsAppliancesInputContainer.classList.add('hidden')
    applianceContainer.classList.remove('p-20-h-150')


})

applianceDownArrow.addEventListener('click', () => {
    // hide ustensil down arrow
    applianceDownArrow.classList.remove('visible')
    applianceDownArrow.classList.add('hidden')
    // display appliance up arrow
    applianceUpArrow.classList.remove('hidden')
    applianceUpArrow.classList.add('visible')

    searchIconApplianceInput.classList.remove('hidden')
    searchIconApplianceInput.classList.add('visible')

    tagsAppliancesInputContainer.classList.remove('hidden')
    applianceContainer.classList.add('p-20-h-150')
    applianceContainer.classList.remove('hidden')
    applianceContainer.classList.add('visible')
    ingredientContainer.classList.add('hidden')
    ustensilContainer.classList.add('hidden')
    //display appliances list and input
    displayAppliancesList()

    // handle other lists
    hideIngredientsList()
    hideIngredientsUpArrow()
    displayIngredientsDownArrow()
    hideUstensilsList()
    hideUstensilsUpArrow()
    displayUstensilsDownArrow()


})

ustensilUpArrow.addEventListener('click', () => {
    // hide ustensil up arrow
    hideUstensilsUpArrow()

    // display ustensil down arrow
    displayUstensilsDownArrow()

    //hide ustensils list and input
    hideUstensilsList()

    closeIconUstensilInput.classList.add('hidden')
    closeIconUstensilInput.classList.remove('visible')

    tagsUstensilsInputContainer.classList.add('hidden')
    ustensilContainer.classList.remove('p-20-h-150')
})

ustensilDownArrow.addEventListener('click', () => {
    // hide ustensil down arrow
    ustensilDownArrow.classList.remove('visible')
    ustensilDownArrow.classList.add('hidden')
    // display ustensil up arrow
    ustensilUpArrow.classList.remove('hidden')
    ustensilUpArrow.classList.add('visible')
    applianceContainer.classList.add('hidden')
    ingredientContainer.classList.add('hidden')

    tagsUstensilsInputContainer.classList.remove('hidden')

    searchIconUstensilInput.classList.remove('hidden')
    searchIconUstensilInput.classList.add('visible')
    ustensilContainer.classList.add('p-20-h-150')
    ustensilContainer.classList.remove('hidden')
    ustensilContainer.classList.add('visible')
    //display ustensils list and input
    displayUstensilsList()

    // handle other lists
    hideIngredientsList()
    hideAppliancesList()
    hideIngredientsUpArrow()
    hideAppliancesUpArrow()
    displayAppliancesDownArrow()
    displayIngredientsDownArrow()
})



/**
 * Ingredients Section
 * */
function hideIngredientsList() {
    tagsIngredients.classList.remove('visible')
    tagsIngredients.classList.add('hidden')
    tagsIngredientsInput.classList.remove('visible')
    tagsIngredientsInput.classList.add('hidden')
}

function displayIngredientsList() {
    tagsIngredients.classList.remove('hidden')
    tagsIngredients.classList.add('visible')
    tagsIngredientsInput.classList.remove('hidden')
    tagsIngredientsInput.classList.add('visible')
}

function hideIngredientsUpArrow() {
    ingredientUpArrow.classList.remove('visible')
    ingredientUpArrow.classList.add('hidden')
}

function displayIngredientsDownArrow() {
    ingredientDownArrow.classList.remove('hidden')
    ingredientDownArrow.classList.add('visible')
}


/**
 * Appliances Section
 * */
function hideAppliancesList() {
    tagsAppliances.classList.remove('visible')
    tagsAppliances.classList.add('hidden')
    tagsAppliancesInput.classList.remove('visible')
    tagsAppliancesInput.classList.add('hidden')
}

function displayAppliancesList() {
    tagsAppliances.classList.remove('hidden')
    tagsAppliances.classList.add('visible')
    tagsAppliancesInput.classList.remove('hidden')
    tagsAppliancesInput.classList.add('visible')
}

function hideAppliancesUpArrow() {
    applianceUpArrow.classList.remove('visible')
    applianceUpArrow.classList.add('hidden')
}

function displayAppliancesDownArrow() {
    applianceDownArrow.classList.remove('hidden')
    applianceDownArrow.classList.add('visible')
}


/**
 * Ustensils Section
 * */
function hideUstensilsList() {
    tagsUstensils.classList.remove('visible')
    tagsUstensils.classList.add('hidden')
    tagsUstensilsInput.classList.remove('visible')
    tagsUstensilsInput.classList.add('hidden')
}

function displayUstensilsList() {
    tagsUstensils.classList.remove('hidden')
    tagsUstensils.classList.add('visible')
    tagsUstensilsInput.classList.remove('hidden')
    tagsUstensilsInput.classList.add('visible')
}

function hideUstensilsUpArrow() {
    ustensilUpArrow.classList.remove('visible')
    ustensilUpArrow.classList.add('hidden')
}

function displayUstensilsDownArrow() {
    ustensilDownArrow.classList.remove('hidden')
    ustensilDownArrow.classList.add('visible')
}
