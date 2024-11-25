// DOM functions_______________________________________________________________

// multiple classes with whitespace " " between
// const elements = [DOM.defineElement("", "", "", {src: "",}),];
// elements.forEach((element) => DOM.addElement(element));

const DOM = (function() {
       
    // add DOM elements with the defined properties----------------------------
    const addElement = function addElement({ 
        parentSelector, 
        htmlTag, 
        innerHTML = " ", // can't be empty, otherwise it would delete the item itself
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
    return { addElement };
})();

const OBJ = (function() {

    const changeParent = function(object, oldParent, newParent) {
        newParent[object] = oldParent[object];
        delete oldParent[object];
    }
    
    // use an object with key "prop" to define the values----------------------
    const flattenForDOMaddElement = function(object, parentSelector = "container") {
        const flattenedObject = [];
        for (const [key, value] of Object.entries(object)) {
            if (value.domProperties) {
                flattenedObject.push({
                    // define key of parentObject as parentSelector
                    parentSelector: `[data-id="${parentSelector}"]`,
                    // get the other properties
                    htmlTag: value.domProperties.htmlTag, 
                    ...(value.domProperties.innerHTML !== "" && { innerHTML: value.domProperties.innerHTML }),
                    attributes: value.domProperties.attributes,
                });
            }
            if (typeof value === "object" && !Array.isArray(value)) {
                flattenedObject.push(...flattenForDOMaddElement(value, key));
            }
        }
        return flattenedObject;
    }

    // order an object by its values-----------------------------------------------
    // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
    // const list1 = {
    //     item1: 3,
    //     item2: 2,
    //     item3: 1,
    // }
    // const sortedObject = Object.fromEntries(
    //     Object.entries(list1).sort(([,a],[,b]) => a - b)
    // )
    // console.log(list1)
    // console.log(sortedObject)

    // const list1 = {
    //     prop: {
    //         htmlTag: 'div',
    //         innerHTML: 'list1',
    //     },
    //     item1: {
    //         prop: {
    //             htmlTag: 'div',
    //             innerHTML: 'item1',
    //         },
    //         subitem1: {
    //             prop: {
    //                 htmlTag: 'div',
    //                 innerHTML: 'item1.1',
    //             },
    //         }
    //     },
    //     item2: {
    //         prop: {
    //             htmlTag: 'div',
    //             innerHTML: 'item2',
    //         },
    //         subitem2: {
    //             prop: {
    //                 htmlTag: 'div',
    //                 innerHTML: 'item2.1',
    //             },
    //         }
    //     }
    // }
    
    return { changeParent, flattenForDOMaddElement }
})();

export { DOM, OBJ }