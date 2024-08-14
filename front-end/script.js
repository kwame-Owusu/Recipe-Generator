const footer = document.querySelector(".footer");
footer.innerHTML = `Happy Cooking! &copy; ${new Date().getFullYear()} Recipe Generator`;

const recipeBtn = document.querySelector(".recipe-btn");
const input = document.querySelector(".input");

document.querySelector('.recipe-btn').addEventListener('click', async () => {
    const ingredients = document.querySelector('.input').value.split(',').map(ingredient => ingredient.trim());
    
    try {
        const response = await fetch('/generate-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });
        const data = await response.json();
        const dataRecipe = document.querySelector(".result p");
        const delRecipe = document.querySelector(".recipe-delete");
        dataRecipe.textContent = data.recipe;
        delRecipe.addEventListener("click", () => {
            dataRecipe.textContent = "";
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

