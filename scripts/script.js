/**
 * Ce fichier construit et traite le filtre de recherche
 */

// Afficher les boutons de filtre
const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons

const build_filter_list = (backgroundColor) => {
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
    
    let ingredients;
    let filtred_ingredients = []; 

    recipes.forEach((recipe) => {
        ingredients = recipe.ingredients;

        ingredients.forEach((ingr) => {
            if(filtred_ingredients.indexOf(ingr.ingredient.toLowerCase()) === -1) {
                filtred_ingredients.push(ingr.ingredient.toLowerCase());
            }
        });    
    })

    filtred_ingredients.forEach((item) => {
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
const ingredients_button_group = document.querySelector('.ingredients_button_group');

ingredients_button.addEventListener('click', (event) => {
    ingredients_button.style.display = 'none';
    ingredients_button_group.appendChild(build_filter_list('#3282f7'));
});

//filtrer  ingredient
    // ingredients_filter.style.display = 'block';

    //initialiser tableau des ingrédients
 
    /*const filtre_ingredients = recipes.filter((item) => {
        const ingredients = item.ingredients; // le tableau d'ingrédients
        // console.log(ingredients);
        
        for(i=0; i<ingredients.length;i++){
            const result_ingredients = ingredients[i];
            // console.log(result_ingredients);
            
            const tab_ingredients = Object.values(result_ingredients);
            console.log(tab_ingredients[0]);
        }
    });*/


// // filtrer appareils
// const btn_filter_appareils = document.querySelector('.appliances_button');
// btn_filter_appareils.addEventListener('click', () => {
//     //initialiser tableau des appareils
//     const filtre_appareils = recipes.filter((item) => {
//         const appareil_to_filter = item.appliance.toLowerCase(); // l'appareil 
//         console.log(appareil_to_filter);
//     });
// });


// // filtrer ustensiles
// const btn_filter_ustensiles = document.querySelector('.ustensiles_button');
// btn_filter_ustensiles.addEventListener('click', () => {
//     //initialiser tableau des Ustensiles
//     const filtre_ustensiles = recipes.filter((item) => {
//         const ustensiles = item.ustensils; // le tableau des ustensiles 
        
//         for(i=0; i<ustensiles.length;i++){
//             // const result_ustensiles = ustensiles[i];
//             // console.log(result_ustensiles);

//            // si l'élement existe on le supprime
//             if(ustensiles.indexOf(ustensiles[i]) !== -1){
//                 // donc not existe alors on fait rien (on laisse l'élément)
//                 console.log(ustensiles.splice(ustensiles.indexOf(ustensiles[i]), 1));

//             }
//         }
//     });
// });

