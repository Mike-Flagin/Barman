import './ingredients.js'
import {getAvailableIngredients} from "./ingredients.js";

/**
 * Checks which recipes from passed parameters are available in passed configuration state
 *
 * @param recipes JSON-array of recipes
 * @param config JSON-object config
 *
 * @return JSON-array of recipes with 'available' key attached to every recipe, true - available, false - otherwise
 */
export function checkRecipesAvailability(recipes, config) {
    let availableIngredients = getAvailableIngredients(config)
    recipes.map((item) => {
        for (let i = 0; i < item.ingredients.length; i++) {
            if (!availableIngredients.includes(item.ingredients[i].ingredientId)) {
                item.available = false;
                return item;
            }
        }
        item.available = true;
        return item;
    })
    return recipes;
}

/**
 * Delete recipe from list by id and move ids of next recipes to be in sequence
 *
 * @param recipes JSON-array of recipes
 * @param id id of recipe to delete
 *
 * @return JSON-array of recipes
 */
export function deleteRecipe(recipes, id) {
    recipes.splice(id - 1, 1)
    for(let i = id - 1; i < recipes.length;){
        recipes[i].id = ++i
    }
    return recipes;
}

/**
 * Add recipe to list and assign id to it
 *
 * @param recipes JSON-array of recipes
 * @param recipe JSON-object of recipe
 *
 * @throws error if recipe with same name is already in list
 *
 * @return JSON-array of recipes
 */
export function addRecipe(recipes, recipe) {
    if (recipes.map((item) => item.name).includes(recipe.name)) {
        throw new Error("Name is already in use");
    }
    recipe.id = recipes.length + 1;
    recipes.push(recipe);
    return recipes;
}

/**
 * Modify recipe in the list
 *
 * @param recipes JSON-array of recipes
 * @param recipe JSON-object of new recipe
 *
 * @return JSON-array of recipes
 */
export function modifyRecipe(recipes, recipe) {
    recipes.splice(recipe.id - 1, 1, recipe);
    return recipes;
}