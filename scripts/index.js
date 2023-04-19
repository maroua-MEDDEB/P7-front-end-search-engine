/**
 * Ce script traite la grille de recettes 
 */
// consctruire la grille de recettes
const recipes_grid = document.querySelector('.recipes_grid');

const create = (elem, attributes) => {
    const element = document.createElement(elem);
    for(key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
};

const build_recipes_grid = (items) => {
    
    items.forEach((element, index) => {
        /*const recipe = document.createElement('div');
        recipe.classList.add('recipe');*/
        const recipe = create('div', {class: 'recipe'});

        const recipe_image = create('div', {class : 'recipe_image'});

        const recipe_info = create('div', {class: 'recipe_info'});

        const recipe_name = create('span', {class: 'recipe_name'});
        recipe_name.textContent = element.name;

        const recipe_time_icon = create('i', {class: 'fa-regular fa-clock recipe_time_icon'});
              
        const recipe_time = create('span', {class : 'recipe_time'});
        recipe_time.textContent = element.time + ' min';
        
        const recipe_ingredients = create('div', {class: 'recipe_ingredients'});
        
        element.ingredients.forEach((el) => {
            const ingredient = create('div');
            const el_ingredient = el.ingredient ? el.ingredient : '';
            const el_quantity = el.quantity ? el.quantity : '';
            const el_unit = el.unit ? el.unit : '';

            ingredient.textContent = el_ingredient + ': ' + el_quantity  + el_unit;

            recipe_ingredients.appendChild(ingredient);
        });

        const recipe_description = create('div', {class: 'recipe_description'});
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

const search_recipe = (user_value) => { // user_value: c'est la valeur saisie par l'utilisateur
    let filtered_recipes = recipes;

    // On reconstruit la grille de recettes contenant les recipes filtrées
    filtered_recipes = recipes.filter((item) => {
        const name_to_search = item.name.toLowerCase(); // le nom à rechercher
        const ingredients = item.ingredients; // le tableau d'ingrédients à rechercher
        const description_to_search = item.description.toLowerCase(); // la description à rechercher
        const appliance_to_search = item.appliance.toLowerCase();

        // vérifier si name_to_search contient user_value

        // console.log(name_to_search.includes(user_value));

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
        else if(appliance_to_search.includes(user_value)) {
            return true;
        }
    });

    if(filtered_recipes.length === 0) {
        recipes_grid.innerHTML = '<div class="search_error">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
    }
    else {
          // regénérer la grille des reccettes après le filtre
        recipes_grid.innerHTML = '';
        build_recipes_grid(filtered_recipes);
    }
};

// recupérer la valeur de l'input
search_input.addEventListener('input', (event) => {
    //évennement à la saisie du clavier 
    if(search_input.value.length > 2) {
        search_recipe(search_input.value.toLowerCase());
    } 
    else {
        recipes_grid.innerHTML = '';
        build_recipes_grid(recipes);
    }
});