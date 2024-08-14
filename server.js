const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("front-end"));

app.post('/generate-recipe', async (req, res) => {
    const ingredients = req.body.ingredients;
    const recipe = await generateRecipe(ingredients);  // Make sure to use `await` here

    res.json({ recipe });
});

const generateRecipe = async (ingredients) => {
    const apiKey = "spoonacular api key";
    try {
        const response = await axios.get('https://api.spoonacular.com/recipes/findByIngredients', {
            params: {
                ingredients: ingredients.join(","),
                number: 1,
                apiKey: apiKey
            }
        });
        console.log('API Response:', response.data); // Log the full response

        const recipes = response.data;
        if (recipes.length > 0) {
            const recipeId = recipes[0].id; // Get the recipe ID
            const recipeDetailsResponse = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information`, {
                params: {
                    apiKey: apiKey
                }
            });
            console.log('Recipe Details Response:', recipeDetailsResponse.data); // Log the recipe details

            const recipeDetails = recipeDetailsResponse.data;
            return `Recipe: ${recipeDetails.title}, Instructions: ${recipeDetails.instructions}`;
        } else {
            return 'No recipe found with the given ingredients.';
        }
    } catch (error) {
        console.error('Error fetching recipe', error);
        return 'Error generating recipe.';
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
