/**
 * Ce script traite la grille de recettes 
 */
// consctruire la grille de recettes
const recipes_grid = document.querySelector('.recipes_grid');

const build_recipes_grid = (items) => {
    
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

// Barre de recherche
const search_input = document.querySelector('.search_input');
// recupérer la valeur de l'input
search_input.addEventListener('input', (event) => {
    //évennement à la saisie du clavier 
    //l'untilisateur saisie au moins de 3 caractères, on retourne l'affichage des recettes
    if(event.target.value.length < 3) {
        // Ne fait rien
    }
    else {
        // On reconstruit la grille de recettes contenant les recipes filtrées
        const filtered_recipes = recipes.filter((item) => {
            const name_to_search = item.name.toLowerCase(); // le nom à rechercher
            const ingredients = item.ingredients; // le tableau d'ingrédients à rechercher
            const description_to_search = item.description.toLowerCase(); // la description à rechercher

            const user_value = event.target.value.toLowerCase(); // la valeur saisie par l'utilisateur 
            
            // vérifier si name_to_search contient user_value
            if(name_to_search.includes(user_value)) {
                return true;
            }
            else if (ingredients.some((el) => { return el.ingredient.toLowerCase().includes(user_value)})) {
                return true;
            }
            // vérifier si description_to_search contient user_value
            else if(description_to_search.includes(user_value)) {
                return true;
            }
        });

         // regénérer la grille des reccettes après le filtre
    recipes_grid.innerHTML = '';

    build_recipes_grid(filtered_recipes);

    }    
});