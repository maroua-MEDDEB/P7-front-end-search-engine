/**
 * Ce fichier construit et traite le filtre de recherche
 */

// Afficher les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons
let filtred = [];

let ingredients;
let filtred_ingredients = []; 
const filter_inreg = () => {
    recipes.forEach((recipe) => {
        ingredients = recipe.ingredients;

        ingredients.forEach((ingr) => {
            if(filtred_ingredients.indexOf(ingr.ingredient.toLowerCase()) === -1) {
                console.log(filtred_ingredients.push(ingr.ingredient.toLowerCase())
                );
                // filtred_ingredients.push(ingr.ingredient.toLowerCase());
            }
        });    
    })
}

let appliance;
let filtred_appliance = [];
const filter_app = () => {
    recipes.forEach((el) => {
        appliance = el.appliance;
        
        filtred_appliance.push(appliance);

    })
};

let ustensils;
let filtred_ustensils = [];
const filter_ust = () => {
    recipes.forEach((recipe) => {
        ustensils = recipe.ustensils;

        ustensils.forEach((ust) => {
           
            if(filtred_ustensils.indexOf(ust.toLowerCase()) === -1) {
                filtred_ustensils.push(ust.toLowerCase());
                console.log(filtred_ustensils.push(ust.toLowerCase())
                );
            }
            console.log(ust.toLowerCase());
        });    
    })
}

const build_filter_list = (backgroundColor, filtred) => {
    const filter = document.createElement('div');
    filter.classList.add('filter');
    filter.style.backgroundColor = backgroundColor;

    const filter_search_group = document.createElement('div');
    filter_search_group.classList.add('filter_search_group');

    const filter_search_input = document.createElement('input');
    filter_search_input.setAttribute('type', 'text');
    filter_search_input.setAttribute('placeholder', 'Rechecher un ingrédient');

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
        filter_list.appendChild(filter_list_item);
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

const ingredients_button = document.querySelector('.ingredients_button');
const appliances_button = document.querySelector('.appliances_button');
const ustensiles_button = document.querySelector('.ustensiles_button');


const ingredients_button_group = document.querySelector('.ingredients_button_group');
const appliances_button_group = document.querySelector('.appliances_button_group');
const ustensiles_button_group = document.querySelector('.ustensiles_button_group');



ingredients_button.addEventListener('click', (event) => {
    ingredients_button.style.display = 'none';
    ingredients_button_group.appendChild(build_filter_list('#3282f7', filtred_ingredients));
});

appliances_button.addEventListener('click', () => {
    appliances_button.style.display = 'none';
    appliances_button_group.appendChild(build_filter_list('#68d9a4', filtred_appliance));
});

ustensiles_button.addEventListener('click', () => {
    ustensiles_button.style.display = 'none';
    ustensiles_button_group.appendChild(build_filter_list('#ed6454', filtred_ustensils));
});




