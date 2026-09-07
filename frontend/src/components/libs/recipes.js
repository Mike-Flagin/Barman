/**
 * Checks which recipes from passed parameters are available in passed configuration state
 *
 * @param recipes JSON-array of recipes
 * @param config JSON-object config
 *
 * @return JSON-array of recipes with 'available' key attached to every recipe, true - available, false - otherwise
 */

function checkRecipesAvailability(recipes, config) {
    let availableIngredients = config.pumps.map((item) => item.ingredientId)
    recipes.map((item) => {
        for (let i = 0; i < item.ingredients.length; i++) {
            if (!availableIngredients.contains(item.ingredients[i])) {
                item.available = false;
                return item;
            }
        }
        item.available = true;
        return item;
    })
}