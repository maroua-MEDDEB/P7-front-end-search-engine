/**
 * 
 * @param  elem : (String) le nom de la balise
 * @param attributes : (Objet) qui contient les attributs de l'élément
 * @returns : (String) l'élément html
 */
const create = (elem, attributes) => {
    const element = document.createElement(elem);
    for(key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
    return element;
};