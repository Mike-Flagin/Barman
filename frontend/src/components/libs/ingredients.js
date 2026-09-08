/**
 * Find ingredients that are available in passed configuration state
 *
 * @param config JSON-object config
 *
 * @return array of ingredients ids
 */
function getAvailableIngredients(config) {
    return config.pumps.map((item) => item.ingredientId).filter((item) => item > 0)
}

/**
 * Delete ingredient from list by id
 *
 * @param recipes JSON-array of recipes
 * @param config JSON-object config
 * @param ingredients JSON-array of ingredients
 * @param id id of ingredient to delete
 *
 * @throws Error is ingredient is used in any recipe or pump
 *
 * @return JSON-array of ingredients
 */
function deleteIngredient(recipes, config, ingredients, id) {
    if (recipes.map((item) => item.ingredients).flat().map((item) => item.ingredientId).includes(id)) {
        throw new Error('Ingredient is used in recipes');
    }
    if (getAvailableIngredients(config).includes(id)) {
        throw new Error('Ingredient is used in pumps');
    }
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id === id) {
            ingredients.splice(i, 1);
            break;
        }
    }
    return ingredients;
}

/**
 * Add ingredient to list and assign id to it
 *
 * @param ingredients JSON-array of ingredients
 * @param ingredient JSON-object of ingredient
 *
 * @throws Exists error if ingredient with same name is already in list
 *
 * @return JSON-array of ingredients
 */
function addIngredient(ingredients, ingredient) {
    if (ingredients.map((item) => item.name).includes(ingredient.name)) {
        throw new Error("Name is already in use");
    }
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id !== i + 1) {
            ingredient.id = i + 1;
            ingredients.splice(i, 0, ingredient);
            return ingredients;
        }
    }
    ingredient.id = ingredients[ingredients.length - 1].id + 1;
    ingredients.push(ingredient);
    return ingredients;
}

/**
 * Modify ingredien in the list
 *
 * @param ingredients JSON-array of ingredients
 * @param ingredient JSON-object of new ingredient
 *
 * @return JSON-array of ingredients
 */
function modifyIngredient(ingredients, ingredient) {
    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i].id === ingredient.id) {
            ingredients[i].name = ingredient.name;
            ingredients[i].category = ingredient.category;
            break;
        }
    }
    return ingredients;
}