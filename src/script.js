// console.log("test");
import "./style.css";
import {DOM, OBJ} from "./modules.js"

// add "list"
    // functions                    (N°3)
        // add new                  
        // add text                 
        // remove                   
        // move up/down             

// add "note"
    // functions
        // add new                  done
        // add text                 done
        // remove                   
        // move up/down             
        // make child/sibling       
        // collapse / expand        
        // check                    
        // add date                 (N°7)
        // add important            
        
// here happens all the magic__________________________________________________
let desk = {};
addUserInterface();

// if something is assigned to an object the key and class have to be the same!!

function addUserInterface(){
    const userInterface = {
        noteBook1: {
            prop: {
                htmlTag: "div",
                innerHTML: "noteBook1",
                attributes: {class: "noteBook1 noteBook"},
            },
        },
        addIcon: {
            prop: {
                htmlTag: "div",
                innerHTML: "add",
                attributes: {class: "material-symbols-outlined addIcon"},
            },
        },
    }
    Object.assign(desk, userInterface)
    addItemsToDOM(desk)
}

function addNewNote() {
    document.querySelector(".addIcon").addEventListener("click", () => {
        const timestamp = Date.now();
        const newNote = {
            [`note${timestamp+1}`]: {
                prop: {
                    htmlTag: "div",
                    innerHTML: " ",
                    dataId: timestamp + 1,
                    attributes: {
                        "data-id": timestamp + 1,
                        class: `note${timestamp+1} note`},
                },
                text: {
                    prop: {
                        htmlTag: "div",
                        innerHTML: "...",
                        dataId: timestamp + 2,
                        attributes: {
                            "data-id": timestamp + 2,
                            class: "text", 
                            contenteditable: "true"},
                    },
                },
                deleteIcon: {
                    prop: {
                        htmlTag: "div",
                        innerHTML: "delete",
                        dataId: timestamp + 3,
                        attributes: {
                            "data-id": timestamp + 3,
                            class: "material-symbols-outlined deleteIcon"},
                    },
                }
            },
        }
        Object.assign(desk.noteBook1, newNote)
        addItemsToDOM(desk)
        removeElement(".deleteIcon", desk)
    })
}

function addItemsToDOM(object) {
    const flattenedArray = OBJ.flattenForDOMaddElement(object);
    document.querySelector(".container").innerHTML ="";
    flattenedArray.forEach((element) => {
        DOM.addElement(element)
    })
    addNewNote();
    saveEditedText(".text", desk);
} 

function saveEditedText(textElement, dataObject) {
    document.querySelectorAll(textElement).forEach((element) => {
        element.addEventListener("blur", () => {
            const newText = element.innerText || element.textContent; 
            const dataId = element.dataset.id; 
            changeObjectsText(dataObject, dataId, newText);
        });
    });
}

function changeObjectsText(object, id, newValue) {
    for (const key in object) {
        if (object[key].dataId == id) {
            object[key].innerHTML = newValue; // this changes the object
            return; 
        }
        if (typeof object[key] == "object") {
            changeObjectsText(object[key], id, newValue); 
        }
    }
}

// prevent default enter-------------------------------------------------------
function preventDefaultEnter(textElement) {
    document.querySelectorAll(textElement).forEach(element => {
        element.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                element.blur();
            }
        });
    });
}

// remove item function--------------------------------------------------------
function removeElement(buttonElement, dataObject) {
    document.querySelectorAll(buttonElement).forEach(element => {
        element.addEventListener("click", () => {
            const dataIdObject = element.dataset.id;
            const parentElement = document.querySelector(`[data-id="${dataIdObject}"]`).parentElement
            const dataId = parentElement.dataset.id
            // console.log(dataIdObject)
            // console.log(dataId)
            deleteObject(dataObject, dataId);
        })
    })
}

function deleteObject(object, id) {
    for (const key in object) {
        if (object[key].dataId == id) {
            delete object[key];
            return; 
        }
        if (typeof object[key] == "object") {
            deleteObject(object[key], id); 
        }
    }
}

// local storage_______________________________________________________________

// get local storage-----------------------------------------------------------
function getLocalStorage() {
    for(let i = 0; i < localStorage.length; i++) {
        const localStorageKey = localStorage.key(i);
        const localStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
        allItems[localStorageKey] = localStorageValue;
    }
}

// set local storage-----------------------------------------------------------
function setLocalStorage() {
    localStorage.clear();
    allItems.forEach((item, index) => {
        localStorage.setItem(index, JSON.stringify(item));
    });
}
 