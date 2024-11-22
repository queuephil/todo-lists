// DOM functions_______________________________________________________________

// const elements = [DOM.defineElement("", "", "", "", {src: "",}),];
// elements.forEach((element) => DOM.addElement(element));

const DOM = (function() {
    
    // define objects with the properties required to add DOM elements---------
    const defineElement = function defineElement(
        parentSelector, 
        htmlTag, 
        className, 
        textContent, 
        attributes = {}
    ) {
        return { 
            parentSelector, 
            htmlTag, 
            className, 
            textContent, 
            attributes
        };
    };
    
    // add DOM elements with the defined properties----------------------------
    const addElement = function addElement({ 
        parentSelector, 
        htmlTag, 
        className, 
        textContent ="", 
        attributes = {}
    }) {
        const newChild = document.createElement(htmlTag);
        newChild.classList.add(...className.split(".")); // >1 possible (c1.c2)
        newChild.innerHTML = textContent; // HTML possible (<br> / <hr>)
        for (const [key, value] of Object.entries(attributes)) {
            newChild.setAttribute(key, value);
        }
        const parentElement = document.querySelector(parentSelector);
        parentElement.appendChild(newChild);
    };
    
    // return all functions----------------------------------------------------
    return { defineElement, addElement };
})();

export {DOM}