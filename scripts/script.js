/**
 * Ce fichier construit et traite le filtre de recherche
 */

// Afficher les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons
let selected_tags_appliances = [];

let filtred_ingredients = []; 
const filter_inreg = () => {
    recipes.forEach((recipe) => {
        const ingredients = recipe.ingredients;

        ingredients.forEach((ingr) => {
            if(filtred_ingredients.indexOf(ingr.ingredient.toLowerCase()) === -1) {
                filtred_ingredients.push(ingr.ingredient.toLowerCase());
            }
        });    
    })
}

let filtred_appliance = [];
const filter_app = () => {
    recipes.forEach((el) => {
        // Si le tableau filtred_appliance ne contient pas  déjà "appliance" donc on ajoute ce dernier
        if(filtred_appliance.indexOf(el.appliance.toLowerCase()) === -1 ) {
            filtred_appliance.push(el.appliance.toLowerCase());
        }
    })
};

let filtred_ustensils = [];
const filter_ust = () => {
    recipes.forEach((recipe) => {
        const ustensils = recipe.ustensils;

        ustensils.forEach((ust) => {
            if(filtred_ustensils.indexOf(ust.toLowerCase()) === -1) {
                filtred_ustensils.push(ust.toLowerCase());
            }
        });    
    })
}

const build_filter_list = (backgroundColor, research_element, filtred) => {
    const filter = create('div', {class: 'filter'});
    filter.style.backgroundColor = backgroundColor;

    const filter_search_group = create('div', {class: 'filter_search_group'});

    const filter_search_input = create('input', {type: 'text', placeholder: 'research_element'});

    const filter_search_icon = create('i', {class: 'fa-solid fa-chevron-up'});


    const filter_list = create('div', {class: 'filter_list'});

    filter_search_group.appendChild(filter_search_input);
    filter_search_group.appendChild(filter_search_icon);
    filter.appendChild(filter_search_group);
    filter.appendChild(filter_list);
    
    filter_inreg();
    filter_app();
    filter_ust();

    const tags_container = create('div', {class: 'tags_container'});
    filter_btns.prepend(tags_container);

    const build_tag = (textContent) => {
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
    };

    filtred.forEach((item) => {
        const filter_list_item = create('div', {class: 'filter_list_item'});
        filter_list_item.textContent = item;
        filter_list_item.style.cursor = 'pointer';
        
        filter_list.appendChild(filter_list_item);

        filter_list_item.addEventListener('click', (event) => {
            // Si  tags_container contient un tag dont son data-id égal au text du bouton qu'on a cliqué dessus
            if(tags_container.querySelector('[data-id="'+item+'"]') === null) {
                tags_container.appendChild(build_tag(item));

                // ajouter les tags dans un tableau
                selected_tags_appliances.push(item.toLowerCase());

                // On reconstruit la grille de recettes contenant la recette dont le tag est sélectionné
                // const target_recipes = recipes.filter((item) => {
                search_recipe(selected_tags_appliances); // récupérer les recipes filtés avec l'input de recherche
            }
        });
    });
    
    return filter;
};

const buildButtons = () => {
    // Créer les boutons de tri
    const btns_group = create('div', {class: 'btns_group', role: 'group'});

    // créer un groupe pour le  bouton d'ingrédients
    const ingredients_button_group = create('div', {class: 'filter_button_group ingredients_button_group'});

    // Créer le bouton de tri d'ingredients
    const ingredients_button =create('button', {class: 'filter_button ingredients_button', type: 'button'});
    ingredients_button.textContent = 'Ingredients';

    const ingredients_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    ingredients_button.appendChild(ingredients_button_icon);

    // Créer un groupe pour le  bouton d'appareils
    const appliances_button_group = create('div', {class: 'filter_button_group appliances_button_group'});

    // Créer le bouton de tri d'Appareils
    const appliances_button = create('button', {class: 'filter_button appliances_button', type: 'button'});
    appliances_button.textContent = 'Appareils';

    const appliances_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    appliances_button.appendChild(appliances_button_icon);

    // créer un groupe pour le  bouton d'ustensiles
    const ustensiles_button_group = create('div', {class: 'filter_button_group ustensiles_button_group'});

    // Créer le bouton de tri d'Ustensiles
    const ustensiles_button = create('button', {class:'filter_button ustensiles_button', type: 'button'});
    ustensiles_button.textContent = 'Ustensiles';

    const ustensiles_button_icon = create('i', {class: 'fa-solid fa-chevron-down'});
    ustensiles_button.appendChild(ustensiles_button_icon);

    ingredients_button_group.appendChild(ingredients_button);
    btns_group.appendChild(ingredients_button_group);
   
    appliances_button_group.appendChild(appliances_button);
    btns_group.appendChild(appliances_button_group);

    ustensiles_button_group.appendChild(ustensiles_button);
    btns_group.appendChild(ustensiles_button_group);

    filter_btns.appendChild(btns_group);

    // Ajouter les boutons de filtre dans le même élément
    filter_btns.appendChild(btns_group);
    filter_btns.appendChild(btns_group);
}

buildButtons();

const ingredients_button_group = document.querySelector('.ingredients_button_group');
const ingredients_button = document.querySelector('.ingredients_button');
const appliances_button_group = document.querySelector('.appliances_button_group');
const appliances_button = document.querySelector('.appliances_button');
const ustensiles_button_group = document.querySelector('.ustensiles_button_group');
const ustensiles_button = document.querySelector('.ustensiles_button');

ingredients_button.addEventListener('click', (event) => {
    ingredients_button.style.display = 'none';
    ingredients_button_group.appendChild(build_filter_list('#3282f7', 'Rechercher un ingrédient', filtred_ingredients));

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = document.createElement('div');
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    ingredients_button_group.appendChild(temp_element);
});

appliances_button.addEventListener('click', (event) => {
    appliances_button.style.display = 'none';
    appliances_button_group.appendChild(build_filter_list('#68d9a4', 'Rechercher une appareil', filtred_appliance));

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = document.createElement('div');
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    const filter = event.currentTarget.closest('div');
    appliances_button_group.appendChild(temp_element);
});

ustensiles_button.addEventListener('click', (event) => {
    ustensiles_button.style.display = 'none';
    ustensiles_button_group.appendChild(build_filter_list( '#ed6454', 'Rechercher un unstentil', filtred_ustensils));
});