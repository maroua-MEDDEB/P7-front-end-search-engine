// Construire les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner l'élément qui va contenir les boutons

const build_btns_group = () => {
    // Créer les boutons de tri
    const btns_group = create('div', {class: 'btns_group', role: 'group'});

    // créer un groupe pour le  bouton d'ingrédients
    const ingredients_button_group = create('div', {class: 'filter_button_group ingredients_button_group'});
    // Créer le bouton de tri d'ingredients
    const ingredients_button =create('button', {class: 'filter_button ingredients_button', type: 'button'});
    ingredients_button.textContent = 'Ingredients';
    const ingredients_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    ingredients_button.appendChild(ingredients_button_icon);
    ingredients_button_group.appendChild(ingredients_button);

    // Créer un groupe pour le  bouton d'appareils
    const appliances_button_group = create('div', {class: 'filter_button_group appliances_button_group'});
    // Créer le bouton de tri d'Appareils
    const appliances_button = create('button', {class: 'filter_button appliances_button', type: 'button'});
    appliances_button.textContent = 'Appareils';
    const appliances_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    appliances_button.appendChild(appliances_button_icon);
    appliances_button_group.appendChild(appliances_button);

    // créer un groupe pour le  bouton d'ustensils
    const ustensils_button_group = create('div', {class: 'filter_button_group ustensils_button_group'});
    // Créer le bouton de tri d'Ustensils
    const ustensils_button = create('button', {class:'filter_button ustensils_button', type: 'button'});
    ustensils_button.textContent = 'Ustensils';
    const ustensils_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    ustensils_button.appendChild(ustensils_button_icon);
    ustensils_button_group.appendChild(ustensils_button);

    
    btns_group.appendChild(ingredients_button_group);
    
    btns_group.appendChild(appliances_button_group);
    
    btns_group.appendChild(ustensils_button_group);

    return btns_group;
};

filter_btns.appendChild(build_btns_group());

// Construire la grille de recettes
// Sélectionner le conteneur html de la grille de recettes
const recipes_grid = document.querySelector('.recipes_grid');

/**
 * 
 * @param {*Array} items : tableau de recettes
 */
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

let filtered_recipes = recipes; // Le tableau des recettes filtrées (initialement toutes les recettes)

const filtered_ingredients = (filtered) => {
    let ingredientsList = []; //Tableau de chaîne de caractères
    
    filtered.forEach((recipe) => {
        const ingredients = recipe.ingredients;
        ingredients.forEach((ingr) => {
            if(ingredientsList.indexOf(ingr.ingredient.toLowerCase()) === -1) {
                ingredientsList.push(ingr.ingredient.toLowerCase());
            }
        });    
    });
    return ingredientsList;
};

const filtered_appliances = (filtered) => {
    let appliancesList = [];
    filtered.forEach((el) => {
        // Si le tableau appliancesList ne contient pas  déjà "appliance" donc on ajoute ce dernier
        if(appliancesList.indexOf(el.appliance.toLowerCase()) === -1 ) {
            appliancesList.push(el.appliance.toLowerCase());
        }
    });
    return appliancesList;
};

const filtered_ustensils = (filtered) => {
    let ustensilsList = [];
    filtered.forEach((recipe) => {
        const ustensils = recipe.ustensils;
    
        ustensils.forEach((ust) => {
            if(ustensilsList.indexOf(ust.toLowerCase()) === -1) {
                ustensilsList.push(ust.toLowerCase());
            }
        });    
    });
    return ustensilsList;
};

let is_ingredients_list_active;
let is_appliances_list_active;
let is_ustensils_list_active;

build_recipes_grid(filtered_recipes);// On remplit la grille avec toutes les recettes

/**
 * Gestion des évennements et interactions
 */

const search_input = document.querySelector('.search_input'); // Sélectionner le champs de recherche

search_input.addEventListener('input', (event) => {
    if(search_input.value.length > 2) {
        // Lancer la recherhe
        launch_search(search_input.value.toLowerCase());
    }
    else {
        refresh_filter_list(recipes);
        recipes_grid.innerHTML = '';
        build_recipes_grid(recipes);
    }
});

/**
 * 
 * @param {String} user_value : La valeur saisie par l'utilisateur
 */
const launch_search = (user_value) => {
    // On reconstruit la grille de recettes contenant les recipes filtrées
    filtered_recipes = recipes.filter((item) => {
        // Le système recherche des recettes qui correspond à l’entrée utilisateur (dans le champs input)
        const name_to_search = item.name.toLowerCase(); // le nom à rechercher
        const ingredients = item.ingredients; // le tableau d'ingrédients à rechercher
        const description_to_search = item.description.toLowerCase(); // la description à rechercher
        
        // Le système de recherche lié au filtre
        const appliance_to_search = item.appliance.toLowerCase();

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
    });

    refresh_filter_list(filtered_recipes);

    if(filtered_recipes.length === 0) {
        recipes_grid.innerHTML = '<div class="search_error">Aucune recette ne correspond à votre critère... vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
    }
    else {
        // regénérer la grille des reccettes après le filtre
        recipes_grid.innerHTML = '';
        build_recipes_grid(filtered_recipes);
    }
};

// Sélectionner les boutons de filtre et ses parents
const ingredients_button_group = document.querySelector('.ingredients_button_group');
const ingredients_button = document.querySelector('.ingredients_button');
const appliances_button_group = document.querySelector('.appliances_button_group');
const appliances_button = document.querySelector('.appliances_button');
const ustensils_button_group = document.querySelector('.ustensils_button_group');
const ustensils_button = document.querySelector('.ustensils_button');

ingredients_button.addEventListener('click', (event) => {
    is_ingredients_list_active = true;

    ingredients_button.style.display = 'none';
    ingredients_button_group.appendChild(build_filter_list('#3282f7', 'Rechercher un ingrédient', filtered_ingredients(filtered_recipes)));

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = document.createElement('div');
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    ingredients_button_group.appendChild(temp_element);
});

appliances_button.addEventListener('click', (event) => {
    is_appliances_list_active = true;
    appliances_button.style.display = 'none';
    appliances_button_group.appendChild(build_filter_list('#68d9a4', 'Rechercher une appareil', filtered_appliances(filtered_recipes)));

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = document.createElement('div');
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    appliances_button_group.appendChild(temp_element);
});

ustensils_button.addEventListener('click', (event) => {
    is_ustensils_list_active = true;
    ustensils_button.style.display = 'none';
    ustensils_button_group.appendChild(build_filter_list( '#ed6454', 'Rechercher un unstensil', filtered_ustensils(filtered_recipes)));
});

/**
 * 
 * @param {String} backgroundColor : la couleur de l'arrière plan de la liste
 * @param {String} placeholderText : le texte visible dans l'input de la liste
 * @param {Array of strings} filtered_array : tableau de chaîne de caractères
 * @returns 
 */
const build_filter_list = (backgroundColor, placeholderText, filtered_array) => {
    const filter = create('div', {class: 'filter'});
    filter.style.backgroundColor = backgroundColor;

    const filter_search_group = create('div', {class: 'filter_search_group'});

    const filter_search_input = create('input', {type: 'text', placeholder: placeholderText});

    const filter_search_icon = create('i', {class: 'fa-solid fa-chevron-up'});

    const filter_list = create('div', {class: 'filter_list'});

    filter_search_group.appendChild(filter_search_input);
    filter_search_group.appendChild(filter_search_icon);
    filter.appendChild(filter_search_group);
    filter.appendChild(filter_list);

    /*const build_tag = (textContent) => {
        //Construire liste de tag
        const tag = create('div', {class: 'tag', 'data-id': textContent});
        tag.style.backgroundColor = backgroundColor;
    
        const tag_text = create('span', {class: 'tag_text'});
        tag_text.textContent = textContent;
    
        const tag_icon = create('i', {class: 'fa-regular fa-circle-xmark tag_icon'});
              
        tag.appendChild(tag_text);
        tag.appendChild(tag_icon);

        tag_icon.addEventListener('click', () => {
            tag.remove();
        });
    
        return tag;
    };*/

    filtered_array.forEach((item) => {
        const filter_list_item = create('div', {class: 'filter_list_item'});
        filter_list_item.textContent = item;
        filter_list_item.style.cursor = 'pointer';
        
        filter_list.appendChild(filter_list_item);

        /*filter_list_item.addEventListener('click', (event) => {
            // Si  tags_container contient un tag dont son data-id égal au text du bouton qu'on a cliqué dessus
            if(tags_container.querySelector('[data-id="'+item+'"]') === null) {
                tags_container.appendChild(build_tag(item));

                // On reconstruit la grille de recettes contenant la recette dont le tag est sélectionné
                // const target_recipes = recipes.filter((item) => {
                launch_search(item.toLowerCase()); // récupérer les recipes filtés avec l'input de recherche
            }
        });*/
    });
    
    return filter;
};

const refresh_filter_list = (filtered) => {
    if(is_ingredients_list_active === true) {
        const filter = document.querySelector('.ingredients_button_group .filter');
        filter.remove();
        ingredients_button_group.appendChild(build_filter_list('#3282f7', 'Rechercher un ingrédient', filtered_ingredients(filtered)));
    }
    if(is_appliances_list_active === true) {
        const filter = document.querySelector('.appliances_button_group .filter');
        filter.remove();
        appliances_button_group.appendChild(build_filter_list('#68d9a4', 'Rechercher un Appareil', filtered_appliances(filtered)));
    }
    if(is_ustensils_list_active === true) {
        const filter = document.querySelector('.ustensils_button_group .filter');
        filter.remove();
        ustensils_button_group.appendChild(build_filter_list('#ed6454', 'Rechercher un ingrédient', filtered_ustensils(filtered)));
    }
};






/*
const tags_container = create('div', {class: 'tags_container'});
filter_btns.prepend(tags_container);*/







