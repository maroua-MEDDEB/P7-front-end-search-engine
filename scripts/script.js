// afficher les boutons de filtre
async function buildButtons(){
    const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons

    //créer le bouton de tri d'ingrédients
    const group_button = document.createElement('div');
    group_button.classList.add('btn_group');
    group_button.setAttribute('role','group');

    //créer le bouton de tri d'ingredients
    const ingredients_button = document.createElement('button');
    ingredients_button.classList.add('filter_button');
    ingredients_button.setAttribute('type','button');
    ingredients_button.style.backgroundColor = '#3282f7';

    const text_button_ingredients = document.createElement('p');
    text_button_ingredients.classList.add('text_btn');
    text_button_ingredients.textContent='Ingrédients';
    ingredients_button.appendChild(text_button_ingredients);

    const icon_button_ingredients = document.createElement('i');
    icon_button_ingredients.classList.add('fa-solid');
    icon_button_ingredients.classList.add('fa-caret-down');
    ingredients_button.appendChild(icon_button_ingredients);


    //créer le bouton de tri d'Appareils
    const appareils_button = document.createElement('button');
    appareils_button.classList.add('filter_button');
    appareils_button.setAttribute('type','button');
    appareils_button.style.backgroundColor = '#68d9a4';

    const text_button_appareils = document.createElement('p');
    text_button_appareils.classList.add('text_btn');
    text_button_appareils.textContent='Appareils';
    appareils_button.appendChild(text_button_appareils);

    const icon_button_appareils = document.createElement('i');
    icon_button_appareils.classList.add('fa-solid');
    icon_button_appareils.classList.add('fa-caret-down');
    appareils_button.appendChild(icon_button_appareils);


    //créer le bouton de tri d'Ustensiles
    const ustensiles_button = document.createElement('button');
    ustensiles_button.classList.add('filter_button');
    appareils_button.setAttribute('type','button');
    ustensiles_button.style.backgroundColor = '#ed6454';

    const text_button_ustensiles = document.createElement('p');
    text_button_ustensiles.classList.add('text_btn');
    text_button_ustensiles.textContent='Appareils';
    ustensiles_button.appendChild(text_button_ustensiles);

    const icon_button_ustensiles = document.createElement('i');
    icon_button_ustensiles.classList.add('fa-solid');
    icon_button_ustensiles.classList.add('fa-caret-down');
    ustensiles_button.appendChild(icon_button_ustensiles);


    group_button.appendChild(ingredients_button);
    group_button.appendChild(appareils_button);
    group_button.appendChild(ustensiles_button);
    group_button.appendChild(ustensiles_button);


    filter_btns.appendChild(group_button);

    //ajouter les boutons de filtre dans le même élément
    filter_btns.appendChild(group_button);
    filter_btns.appendChild(group_button);

}
buildButtons();
