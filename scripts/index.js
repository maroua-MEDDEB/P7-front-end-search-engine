// consctruire la grille de recettes
const build_recipes_grid = () => {
    const recipes_grid = document.querySelector('.recipes_grid');
    
    recipes.forEach((element, index) => {
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');

        const recipe_image = document.createElement('div');
        recipe_image.classList.add('recipe_image');

        const recipe_info = document.createElement('div');
        recipe_info.classList.add('recipe_info');
        
        const recipe_name_time = document.createElement('div');
        recipe_name_time.classList.add('recipe_name_time');

        const recipe_name = document.createElement('span');
        recipe_name.classList.add('recipe_name');
        recipe_name.textContent = element.name;

        const recipe_time = document.createElement('span');
        recipe_time.textContent = element.time;

        recipe.appendChild(recipe_image);
        recipe.appendChild(recipe_info)

        recipe_name_time.appendChild(recipe_name);
        recipe_name_time.appendChild(recipe_time);
        recipe_info.appendChild(recipe_name_time);

        recipes_grid.appendChild(recipe);
    });
};

build_recipes_grid();