/**
 * Créer un élément html avec ses attributs
 * @param  elem : (String) le nom de la balise
 * @param attributes : (Objet) qui contient les attributs de l'élément
 * @returns : (String) l'élément html
 */
const create_element = (elem, attributes) => {
    const element = document.createElement(elem);
    for(key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
};

/**
 * Créer un bouton pour le système de tri
 * @param {String} button_group_class 
 * @param {String} button_class 
 * @param {String} text_content 
 * @returns String : élément html
 */
const create_button = (button_group_class, button_class, text_content) => {
    // créer un groupe pour le bouton
    const button_group = create_element('div', {class: 'filter_button_group '+button_group_class});
    // Créer le bouton de tri
    const button = create_element('button', {class: 'filter_button '+button_class, type: 'button'});
    button.textContent = text_content;
    const button_icon = create_element('i', {class: 'fa-solid fa-chevron-down'});
    button.appendChild(button_icon);
    button_group.appendChild(button);
    return button_group;
};

// Construire les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner l'élément qui va contenir les boutons

const tags_container = create_element('div', {class: 'tags_container'});
filter_btns.appendChild(tags_container);

const build_btns_group = () => {
    // Créer les boutons de tri
    const btns_group = create_element('div', {class: 'btns_group', role: 'group'});

    btns_group.appendChild(create_button('ingredients_button_group', 'ingredients_button', 'Ingredients'));
    btns_group.appendChild(create_button('appliances_button_group', 'appliances_button', 'Appareils'));   
    btns_group.appendChild(create_button('ustensils_button_group', 'ustensils_button', 'Ustensils'));

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
        const recipe = create_element('div', {class: 'recipe'});

        const recipe_image = create_element('div', {class : 'recipe_image'});

        const recipe_info = create_element('div', {class: 'recipe_info'});

        const recipe_name = create_element('span', {class: 'recipe_name'});
        recipe_name.textContent = element.name;

        const recipe_time_icon = create_element('i', {class: 'fa-regular fa-clock recipe_time_icon'});
              
        const recipe_time = create_element('span', {class : 'recipe_time'});
        recipe_time.textContent = element.time + ' min';
        
        const recipe_ingredients = create_element('div', {class: 'recipe_ingredients'});
        
        element.ingredients.forEach((el) => {
            const ingredient = create_element('div');
            const el_ingredient = el.ingredient ? el.ingredient : '';
            const el_quantity = el.quantity ? el.quantity : '';
            const el_unit = el.unit ? el.unit : '';

            ingredient.innerHTML = '<span>'+el_ingredient + ': </span>' + el_quantity  + el_unit;

            recipe_ingredients.appendChild(ingredient);
        });

        const recipe_description = create_element('div', {class: 'recipe_description'});
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

/**
 * Ajouter un élément unique au tableau
 * @param {Array} list 
 * @param {String} itemList 
 */
const push_once = (list, itemList) => {
    // Si le tableau list ne contient pas déjà itemList, on ajoute ce dernier
    if(list.indexOf(itemList.toLowerCase()) === -1) {
        list.push(itemList.toLowerCase());
    } 
};

const filtered_ingredients = (filtered) => {
    let ingredientsList = []; //Tableau de chaîne de caractères
    
    filtered.forEach((recipe) => {
        const ingredients = recipe.ingredients;

        ingredients.forEach((ingr) => {
            push_once(ingredientsList, ingr.ingredient);
        });    
    });
    return ingredientsList;
};

const filtered_appliances = (filtered) => {
    let appliancesList = [];
    filtered.forEach((el) => {
        push_once(appliancesList, el.appliance);
    });
    return appliancesList;
};

const filtered_ustensils = (filtered) => {
    let ustensilsList = [];
    filtered.forEach((recipe) => {
        const ustensils = recipe.ustensils;
    
        ustensils.forEach((ust) => {
            push_once(ustensilsList, ust);
        });
    });
    return ustensilsList;
};

let is_ingredients_list_active;
let is_appliances_list_active;
let is_ustensils_list_active;

let selected_ingredients_tags = [];
let selected_appliances_tags = [];
let selected_ustensils_tags = [];

/**
 * 
 * @param {Array} array_to_filter : le tableau à filtrer selon le système des tags
 * @param {Array} ingredients_tags : tableau des tags d'ingrédients
 * @param {Array} appliances_tags : tableau des tags d'appareils
 * @param {Array} ustensils_tags : tableau des tags des ustensils
 * @returns tableau
 */
const filtered_recipes_by_tags = (array_to_filter, ingredients_tags,appliances_tags, ustensils_tags) => {
    // Recherche selon les étiquettes (tags) d'ingrédients sélectionnés
    if(ingredients_tags && ingredients_tags.length > 0) {
        array_to_filter = array_to_filter.filter((item) => {
            const ingredients = item.ingredients;
            if(selected_ingredients_tags.every((s_ingr) => {return ingredients.some((el) => {return el.ingredient.toLowerCase().includes(s_ingr.toLowerCase())});})) {
                return true;
            }
        });
    }
    //

    // Recherche selon les étiquettes (tags) d'appareils sélectionnés
    if(appliances_tags && appliances_tags.length > 0) {
        array_to_filter = array_to_filter.filter((item) => {
            const appliances = item.appliance;
            
            if(selected_appliances_tags.every((s_app) => {return appliances.toLowerCase().includes(s_app.toLowerCase())})) {
                return true;
            }
        });
    }
    //

    // Recherche selon les étiquettes (tags) d'ustensils sélectionnés
    if(ustensils_tags && ustensils_tags.length > 0) {
        array_to_filter = array_to_filter.filter((item) => {
            const ustensils = item.ustensils;
            
            if(selected_ustensils_tags.every((s_ust) => {return ustensils.some((el) => {return el.toLowerCase().includes(s_ust.toLowerCase())});})) {
                return true;
            }
        });
    }
    return array_to_filter;
};

build_recipes_grid(filtered_recipes);// On remplit la grille avec toutes les recettes

/**
 * Gestion des évennements et interactions
 */

const search_input = document.querySelector('.search_input'); // Sélectionner le champs de recherche

search_input.addEventListener('input', (event) => {
    // Lancer la recherhe
    launch_search(search_input.value.toLowerCase(), selected_ingredients_tags, selected_appliances_tags, selected_ustensils_tags);
});

/**
 * 
 * @param {String} input_value : La valeur saisie par l'utilisateur dans le champs input
 * @param {Array} ingredients_tags : tableau de tags des ingrédients
 * @param {Array} appliances_tags : tableau de tags d'appareils
 * @param {Array} ustensils_tags : tableau de tags des ustensils

 */
const launch_search = (input_value, ingredients_tags, appliances_tags, ustensils_tags) => {
    // Recherche selon la valeur saisie par l'utilisateur
    if(input_value.length > 2) {
        // On reconstruit la grille de recettes contenant les recipes filtrées
        filtered_recipes = recipes.filter((item) => {
            // Le système recherche des recettes qui correspond à l’entrée utilisateur (dans le champs input)
            const name_to_search = item.name.toLowerCase(); // le nom à rechercher
            const ingredients = item.ingredients; // le tableau d'ingrédients à rechercher
            const description_to_search = item.description.toLowerCase(); // la description à rechercher
            
            if(name_to_search.includes(input_value)) {
                return true;
            }
            else if (ingredients.some((el) => { return el.ingredient.toLowerCase().includes(input_value)})) {
                return true;
            }
            // vérifier si description_to_search contient input_value
            else if(description_to_search.includes(input_value)) {
                return true;
            }
        });
    }
    else {
        filtered_recipes = recipes;
    }

    filtered_recipes = filtered_recipes_by_tags(filtered_recipes, ingredients_tags, appliances_tags, ustensils_tags);

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

/**
 * Afficher les listes des tags
 * @param {listener} event
 * @param {String} list_name: le nom de la liste 
 * @param {String} the_list : la liste en tant qu'élément html
 */
const show_filter_list = (event, list_name, the_list) => {
    switch(list_name) {
        case 'ingredients':
            is_ingredients_list_active = true;
            break;
        case 'appliances':
            is_appliances_list_active = true;
            break;
        case 'ustensils':
            is_ustensils_list_active = true;
            break;
    }

    event.currentTarget.style.display = 'none';
    event.currentTarget.parentNode.appendChild(the_list);

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = create_element('div', {class: 'temp_'+list_name});
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    event.currentTarget.parentNode.appendChild(temp_element);
};

ingredients_button.addEventListener('click', (event) => {
    show_filter_list(event, 'ingredients', build_filter_list('ingredients', 'Rechercher un ingrédient', filtered_ingredients(filtered_recipes)));
});

appliances_button.addEventListener('click', (event) => {
    show_filter_list(event, 'appliances', build_filter_list('appliances', 'Rechercher une appareil', filtered_appliances(filtered_recipes)));
});

ustensils_button.addEventListener('click', (event) => {
    show_filter_list(event, 'ustensils', build_filter_list( 'ustensils', 'Rechercher un unstensil', filtered_ustensils(filtered_recipes)));
});

/**
 * 
 * @param {String} list_name : le nom de la liste, soit 'ingredients', 'appliances', 'ustensils'
 * @param {String} placeholderText : le texte visible dans l'input de la liste
 * @param {Array of strings} filtered_array : tableau de chaîne de caractères
 * @returns 
 */
const build_filter_list = (list_name, placeholderText, filtered_array) => {
    const filter = create_element('div', {class: 'filter'});

    let backgroundColor;

    switch(list_name) {
        case 'ingredients':
            backgroundColor = '#3282f7';
            break;

        case 'appliances':
            backgroundColor = '#68d9a4';
            break;

        case 'ustensils':
            backgroundColor = '#ed6454';
            break;
    }

    filter.style.backgroundColor = backgroundColor;

    const filter_search_group = create_element('div', {class: 'filter_search_group'});

    const filter_search_input = create_element('input', {type: 'text', placeholder: placeholderText});

    const filter_search_icon = create_element('i', {class: 'fa-solid fa-chevron-up'});
    filter_search_icon.style.cursor = 'pointer';

    const filter_list = create_element('div', {class: 'filter_list'});

    filter_search_group.appendChild(filter_search_input);
    filter_search_group.appendChild(filter_search_icon);
    filter.appendChild(filter_search_group);
    filter.appendChild(filter_list);

    const build_tag = (textContent) => {
        //Construire liste de tag
        const tag = create_element('div', {class: 'tag', 'data-id': textContent});
        tag.style.backgroundColor = backgroundColor;
    
        const tag_text = create_element('span', {class: 'tag_text'});
        tag_text.textContent = textContent;
    
        const tag_icon = create_element('i', {class: 'fa-regular fa-circle-xmark tag_icon'});
              
        tag.appendChild(tag_text);
        tag.appendChild(tag_icon);

        /**
         * Mise à jour des tableaux de tags
         * @param {String} listName : le nom de la liste
         * @param {Array} the_selected_array : le tableau de tags sélectionnés
         * @returns 
         */
        let update_tags_array = (listName, the_selected_array) => {
            if(list_name === listName) {               
                the_selected_array = the_selected_array.filter((el) => {
                    if(el.toLowerCase() !== textContent.toLowerCase()) {
                        return true;
                    }
                });
            }
            return the_selected_array;
        };

        tag_icon.addEventListener('click', () => {
            tag.remove();
            
            selected_ingredients_tags = update_tags_array('ingredients', selected_ingredients_tags);
            selected_appliances_tags = update_tags_array('appliances', selected_appliances_tags)
            selected_ustensils_tags = update_tags_array('ustensils', selected_ustensils_tags);
 
            launch_search(search_input.value.toLowerCase(), selected_ingredients_tags, selected_appliances_tags, selected_ustensils_tags);   
        });
    
        return tag;
    };

    const create_filter_list_items = (the_filtered_array) => {
        the_filtered_array.forEach((item) => {
            const filter_list_item = create_element('div', {class: 'filter_list_item'});
            filter_list_item.textContent = item;
            filter_list_item.style.cursor = 'pointer';
            
            filter_list.appendChild(filter_list_item);
    
            filter_list_item.addEventListener('click', (event) => {
                // Si tags_container contient un tag dont son data-id égal au text du bouton qu'on a cliqué dessus
                if(tags_container.querySelector('[data-id="'+item+'"]') === null) {
                    if(list_name === 'ingredients') {
                        selected_ingredients_tags.push(item);
                    }
                    if(list_name === 'appliances') {
                        selected_appliances_tags.push(item);
                    }
                    if(list_name === 'ustensils') {
                        selected_ustensils_tags.push(item);
                    }
    
                    tags_container.appendChild(build_tag(item));
                    // On relance la recherche
                    launch_search(search_input.value.toLowerCase(), selected_ingredients_tags, selected_appliances_tags, selected_ustensils_tags);
                }
            });
        });
    };

    create_filter_list_items(filtered_array);

    // Fermeture de la liste des tags
    const remove_filter_list = (listName, the_button) => {
        switch(listName) {
            case 'ingredients':
                is_ingredients_list_active = false;
                break;
            case 'appliances':
                is_appliances_list_active = false;
                break;
            case 'ustensils':
                is_ustensils_list_active = false;
                break;
        }
        if(list_name === listName) {
            the_button.style.display = 'flex';
            const filter = the_button.parentNode.querySelector('.filter');
            const temp_holder = document.querySelector('.temp_'+listName);
            filter.remove();
            temp_holder.remove();
        }    
    };

    filter_search_icon.addEventListener('click', () => {
        remove_filter_list('ingredients', ingredients_button);
        remove_filter_list('appliances', appliances_button);
        remove_filter_list('ustensils', ustensils_button);
    });

    // Recherche de tags selon la valeur saisie dans le champs de la liste
    filter_search_input.addEventListener('input', (event) => {
        let new_filtered_array = [];

        new_filtered_array = filtered_array.filter((item) => {
            if(item.includes(filter_search_input.value)) {
                return true;
            }
        });

        filter_list.innerHTML = '';

        create_filter_list_items(new_filtered_array);
    });

    return filter;
};

/**
 * 
 * @param {Array} filtered : tableau de recettes filtrées
 */
const refresh_filter_list = (filtered) => {
    if(is_ingredients_list_active === true) {
        const filter = document.querySelector('.ingredients_button_group .filter');
        filter.remove();
        ingredients_button_group.appendChild(build_filter_list('ingredients', 'Rechercher un ingrédient', filtered_ingredients(filtered)));
    }
    if(is_appliances_list_active === true) {
        const filter = document.querySelector('.appliances_button_group .filter');
        filter.remove();
        appliances_button_group.appendChild(build_filter_list('appliances', 'Rechercher un Appareil', filtered_appliances(filtered)));
    }
    if(is_ustensils_list_active === true) {
        const filter = document.querySelector('.ustensils_button_group .filter');
        filter.remove();
        ustensils_button_group.appendChild(build_filter_list('ustensils', 'Rechercher un ingrédient', filtered_ustensils(filtered)));
    }
};