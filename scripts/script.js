// afficher les boutons de filtre
async function buildButtons(){
    const filter_btns = document.querySelector('.filter_btns'); // sélectionner le bloc qui comporte les boutons


    //créer le bouton de tri d'ingrédients
    const group_ingredients_button = document.createElement('div');
    group_ingredients_button.classList.add('btn_group');
    group_ingredients_button.setAttribute('role','group');

    const ingredients_button = document.createElement('button');
    ingredients_button.classList.add('filter_button');
    ingredients_button.classList.add('ingredients_button');
    ingredients_button.setAttribute('title','Ingrédients');
    ingredients_button.setAttribute('type','button');
    ingredients_button.setAttribute('data-bs-toggle','dropdown');
    ingredients_button.setAttribute('aria-haspopup','true');
    ingredients_button.setAttribute('aria-expanded','false');
    ingredients_button.textContent = 'Ingrédients';
    ingredients_button.style.backgroundColor = '#3282f7';

    const ingredients_menu = document.createElement('div');
    ingredients_menu.classList.add('ingredients_menu');

    ingredients_menu.setAttribute('aria-labelledby','ingredients_menu_group');
    const ingredient = document.createElement('a');
    ingredient.classList.add('ingredient');
    ingredient.setAttribute('href','#');

    
    ingredients_menu.appendChild(ingredients_button);
    ingredients_menu.appendChild(ingredient);
    group_ingredients_button.appendChild(ingredients_menu);
    group_ingredients_button.appendChild(ingredients_button);


    //créer le bouton de tri d'Appareils
    const group_appareils_button = document.createElement('div');
    group_appareils_button.classList.add('btn_group');
    group_appareils_button.setAttribute('role','group');

    const appareils_button = document.createElement('button');
    appareils_button.classList.add('filter_button');
    appareils_button.classList.add('appareils_button');
    appareils_button.setAttribute('title','Appareils');
    appareils_button.setAttribute('type','button');
    appareils_button.setAttribute('data-bs-toggle','dropdown');
    appareils_button.textContent = 'Appareils';
    appareils_button.style.backgroundColor = '#68d9a4';
    group_appareils_button.appendChild(appareils_button);


    //créer le bouton de tri d'Appareils
    const group_ustensiles_button = document.createElement('div');
    group_ustensiles_button.classList.add('btn_group');
    group_ustensiles_button.setAttribute('role','group');

    const ustensiles_button = document.createElement('button');
    ustensiles_button.classList.add('filter_button');
    ustensiles_button.classList.add('ustensiles_button');
    ustensiles_button.setAttribute('title','Ustensiles');
    appareils_button.setAttribute('type','button');
    appareils_button.setAttribute('data-bs-toggle','dropdown');
    ustensiles_button.textContent = 'Ustensiles';
    ustensiles_button.style.backgroundColor = '#ed6454';
    group_ustensiles_button.appendChild(ustensiles_button);


    //ajouter les boutons de filtre dans le même élément
    filter_btns.appendChild(group_ingredients_button);
    filter_btns.appendChild(group_appareils_button);
    filter_btns.appendChild(group_ustensiles_button);

}
buildButtons();