//filtre barre de recherche
const search_input = document.querySelector('.search_input');
search_input.addEventListener('keyup', (event) => {
//    console.log(event.target.value); 
   const recipes_filter = recipes.filter((element) => {
        return element.name.includes(event.target.value);    
        return element.ingredients.includes(event.target.value);
        return element.description.includes(event.target.value);

    });
    //build_recipes_grid(recipes_filter);
});

// consctruire la grille de recettes
const build_recipes_grid = (items) => {
    const recipes_grid = document.querySelector('.recipes_grid');
    
    items.forEach((element, index) => {
        const recipe = document.createElement('div');
        recipe.classList.add('recipe');

        const recipe_image = document.createElement('div');
        recipe_image.classList.add('recipe_image');

        const recipe_info = document.createElement('div');
        recipe_info.classList.add('recipe_info');

        const recipe_name = document.createElement('span');
        recipe_name.classList.add('recipe_name');
        recipe_name.textContent = element.name;

        const recipe_time_icon = document.createElement('i');
        recipe_time_icon.classList.add('fa-regular');
        recipe_time_icon.classList.add('fa-clock');
        recipe_time_icon.classList.add('recipe_time_icon');
       

        const recipe_time = document.createElement('span');
        recipe_time.classList.add('recipe_time');
        recipe_time.textContent = element.time + ' min';

        const recipe_ingredients = document.createElement('div');
        recipe_ingredients.classList.add('recipe_ingredients');
        
        element.ingredients.forEach((el) => {
            const ingredient = document.createElement('div');
            const el_ingredient = el.ingredient ? el.ingredient : '';
            const el_quantity = el.quantity ? el.quantity : '';
            const el_unit = el.unit ? el.unit : '';

            ingredient.textContent = el_ingredient + ': ' + el_quantity  + el_unit;

            recipe_ingredients.appendChild(ingredient);
        });

        const recipe_description = document.createElement('div');
        recipe_description.classList.add('recipe_description');
        recipe_description.textContent = element.description;

        recipe.appendChild(recipe_image);


        recipe_info.appendChild(recipe_name);
        recipe_time.prepend(recipe_time_icon);
        recipe_info.appendChild(recipe_time);

        recipe_info.appendChild(recipe_ingredients);
        recipe_info.appendChild(recipe_description);

        recipe.appendChild(recipe_info);

        recipes_grid.appendChild(recipe); 
    });
};

build_recipes_grid(recipes);