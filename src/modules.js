// DOM functions_______________________________________________________________

// multiple classes with whitespace " " between
// const elements = [DOM.defineElement("", "", "", {src: "",}),];
// elements.forEach((element) => DOM.addElement(element));

const DOM = (function() {
    
    // define objects with the properties required to add DOM elements---------
    const defineElement = function defineElement(
        parentSelector, 
        htmlTag, 
        innerHTML,
        attributes = {}
    ) {
        return { 
            parentSelector, 
            htmlTag,
            innerHTML,
            attributes
        };
    };
    
    // add DOM elements with the defined properties----------------------------
    const addElement = function addElement({ 
        parentSelector, 
        htmlTag, 
        innerHTML ="",
        attributes = {}
    }) {
        const newChild = document.createElement(htmlTag);
        newChild.innerHTML = innerHTML; // HTML possible (<br> / <hr>)
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