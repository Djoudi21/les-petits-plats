const ingredientUpArrow = document.getElementById('ingredient-up-arrow')
ingredientUpArrow.classList.add('hidden')
const ingredientDownArrow = document.getElementById('ingredient-down-arrow')
const tagsIngredients = document.getElementById('tags-ingredients')
tagsIngredients.classList.add('hidden')
const tagsIngredientsInput = document.getElementById('ingredients-input')
tagsIngredientsInput.classList.add('hidden')

const applianceUpArrow = document.getElementById('appliance-up-arrow')
applianceUpArrow.classList.add('hidden')
const applianceDownArrow = document.getElementById('appliance-down-arrow')
const tagsAppliances = document.getElementById('tags-appliances')
tagsAppliances.classList.add('hidden')
const tagsAppliancesInput = document.getElementById('appliances-input')
tagsAppliancesInput.classList.add('hidden')


const tagsUstensils = document.getElementById('tags-ustensils')



tagsUstensils.classList.add('hidden')
ingredientUpArrow.addEventListener('click', () => {
    ingredientUpArrow.classList.add('hidden')
    ingredientDownArrow.classList.remove('hidden')
    ingredientDownArrow.classList.add('visible')
    tagsIngredients.classList.remove('visible')
    tagsIngredients.classList.add('hidden')
    tagsIngredientsInput.classList.remove('visible')
    tagsIngredientsInput.classList.add('hidden')
})

ingredientDownArrow.addEventListener('click', () => {
    // applianceUpArrow.classList.add('hidden')
    // tagsAppliances.classList.add('hidden')
    // tagsAppliancesInput.classList.add('hidden')
    // applianceDownArrow.classList.add('visible')


    ingredientDownArrow.classList.toggle('visible')
    ingredientDownArrow.classList.remove('visible')
    ingredientDownArrow.classList.add('hidden')
    ingredientUpArrow.classList.remove('hidden')
    ingredientUpArrow.classList.add('visible')
    tagsIngredients.classList.remove('hidden')
    tagsIngredients.classList.add('visible')
    tagsIngredientsInput.classList.remove('hidden')
    tagsIngredientsInput.classList.add('visible')
})

applianceUpArrow.addEventListener('click', () => {
    applianceUpArrow.classList.add('hidden')
    applianceDownArrow.classList.remove('hidden')
    applianceDownArrow.classList.add('visible')
    tagsAppliances.classList.remove('visible')
    tagsAppliances.classList.add('hidden')
    tagsAppliancesInput.classList.remove('visible')
    tagsAppliancesInput.classList.add('hidden')
})

applianceDownArrow.addEventListener('click', () => {
    applianceUpArrow.classList.remove('visible')
    applianceDownArrow.classList.add('hidden')
    applianceUpArrow.classList.remove('hidden')
    applianceUpArrow.classList.add('visible')
    tagsAppliances.classList.remove('hidden')
    tagsAppliances.classList.add('visible')
    tagsAppliancesInput.classList.remove('hidden')
    tagsAppliancesInput.classList.add('visible')
})




