/**
 * Ce fichier construit et traite le filtre de recherche
 */

// Afficher les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons
let filtred = [];

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
    const filter = document.createElement('div');
    filter.classList.add('filter');
    filter.style.backgroundColor = backgroundColor;

    const filter_search_group = document.createElement('div');
    filter_search_group.classList.add('filter_search_group');

    const filter_search_input = document.createElement('input');
    filter_search_input.setAttribute('type', 'text');
    filter_search_input.setAttribute('placeholder', research_element);

    const filter_search_icon = document.createElement('i');
    filter_search_icon.classList.add('fa-solid');
    filter_search_icon.classList.add('fa-chevron-up');


    const filter_list = document.createElement('div');
    filter_list.classList.add('filter_list');

    filter_search_group.appendChild(filter_search_input);
    filter_search_group.appendChild(filter_search_icon);
    filter.appendChild(filter_search_group);
    filter.appendChild(filter_list);
    
    filter_inreg();
    filter_app();
    filter_ust();

    filtred.forEach((item) => {
        const filter_list_item = document.createElement('div');
        filter_list_item.classList.add('filter_list_item');
        filter_list_item.textContent = item;
        filter_list_item.style.cursor = 'pointer';
        
        filter_list.appendChild(filter_list_item);

        filter_list_item.addEventListener('click', () => {
            // filter_btns.prepend(build_tags());
            const build_tags = () => {
                const tags_container = document.createElement('div');
                tags_container.classList.add('tags_container');

                const tag = document.createElement('div');
                tag.classList.add('tag');
                tag.style.backgroundColor = backgroundColor;
            
                const tag_text = document.createElement('span');
                tag_text.classList.add('tag_text');
                tag_text.textContent = item;
            
                const tag_icon = document.createElement('i');
                tag_icon.classList.add('fa-regular');
                tag_icon.classList.add('fa-circle-xmark');
                      
                tag.appendChild(tag_text);
                tag.appendChild(tag_icon);
                tags_container.appendChild(tag);
            
                return tags_container;
            }
            filter_btns.prepend(build_tags());
        })
    });
    
    return filter;
}

const  buildButtons = () => {
    // Créer les boutons de tri
    const btns_group = document.createElement('div');
    btns_group.classList.add('btns_group');
    btns_group.setAttribute('role','group');

    // créer un groupe pour le  bouton d'ingrédients
    const ingredients_button_group = document.createElement('div');
    ingredients_button_group.classList.add('filter_button_group');
    ingredients_button_group.classList.add('ingredients_button_group');

    // Créer le bouton de tri d'ingredients
    const ingredients_button = document.createElement('button');
    ingredients_button.classList.add('filter_button');
    ingredients_button.classList.add('ingredients_button');
    ingredients_button.setAttribute('type','button');
    ingredients_button.textContent = 'Ingredients';

    const ingredients_button_icon = document.createElement('i');
    ingredients_button_icon.classList.add('fa-solid');
    ingredients_button_icon.classList.add('fa-chevron-down');
    ingredients_button.appendChild(ingredients_button_icon);

    // Créer un groupe pour le  bouton d'appareils
    const appliances_button_group = document.createElement('div');
    appliances_button_group.classList.add('filter_button_group');
    appliances_button_group.classList.add('appliances_button_group');


    // Créer le bouton de tri d'Appareils
    const appliances_button = document.createElement('button');
    appliances_button.classList.add('filter_button');
    appliances_button.classList.add('appliances_button');
    appliances_button.setAttribute('type','button');
    appliances_button.textContent = 'Appareils';

    const appliances_button_icon = document.createElement('i');
    appliances_button_icon.classList.add('fa-solid');
    appliances_button_icon.classList.add('fa-chevron-down');
    appliances_button.appendChild(appliances_button_icon);

    // créer un groupe pour le  bouton d'ustensiles
    const ustensiles_button_group = document.createElement('div');
    ustensiles_button_group.classList.add('filter_button_group');
    ustensiles_button_group.classList.add('ustensiles_button_group');


    // Créer le bouton de tri d'Ustensiles
    const ustensiles_button = document.createElement('button');
    ustensiles_button.classList.add('filter_button');
    ustensiles_button.classList.add('ustensiles_button');
    ustensiles_button.setAttribute('type','button');
    ustensiles_button.textContent = 'Ustensiles';

    const ustensiles_button_icon = document.createElement('i');
    ustensiles_button_icon.classList.add('fa-solid');
    ustensiles_button_icon.classList.add('fa-chevron-down');
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

appliances_button.addEventListener('click', () => {
    appliances_button.style.display = 'none';
    appliances_button_group.appendChild(build_filter_list('#68d9a4', 'Rechercher une appareil', filtred_appliance));

    const filter_list = event.currentTarget.parentNode.querySelector('.filter_list');
    
    const temp_element = document.createElement('div');
    temp_element.style.width = filter_list.offsetWidth + 40 +'px';

    appliances_button_group.appendChild(temp_element);
});

ustensiles_button.addEventListener('click', () => {
    ustensiles_button.style.display = 'none';
    ustensiles_button_group.appendChild(build_filter_list('#ed6454', 'Rechercher un unstentil', filtred_ustensils));
});