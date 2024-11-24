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
        // remove                   done
        // move up/down             
        // make child/sibling       
        // collapse / expand        
        // check                    
        // add important            
        // add date                 (N°7)
        
// here happens all the magic__________________________________________________
let ultimateParent = {};

addUserInterface();
getLocalStorage(ultimateParent);
refreshDom(ultimateParent);

//-----------------------------------------------------------------------------
function addUserInterface(){
    const timestamp = Date.now();
    const userInterface = {
        noteBook: {
            domProperties: {
                htmlTag: "div",
                innerHTML: "noteBook",
                attributes: {
                    "data-id": "noteBook",
                    class: "noteBook"},
            },
        },
        addNoteButton: {
            domProperties: {
                htmlTag: "div",
                innerHTML: "add",
                attributes: {
                    "data-id": "addNoteButton",
                    class: "material-symbols-outlined addIcon"},
            },
        },
    }
    Object.assign(ultimateParent, userInterface);
    refreshDom(ultimateParent);
}

//-----------------------------------------------------------------------------
function refreshDom(ultimateParent) {
    document.querySelector(".container").innerHTML = "";
    const flattenedArray = OBJ.flattenForDOMaddElement(ultimateParent);
    flattenedArray.forEach((element) => {
        DOM.addElement(element);
    });
    addNewNote();
    autoSaveText(".text", ultimateParent);
    preventDefaultEnter(".text");
    deleteNote(".deleteIcon", ultimateParent);
}

//-----------------------------------------------------------------------------
function addNewNote() {
    document.querySelector(".addIcon").addEventListener("click", () => {
        const timestamp = Date.now();
        const newNote = {
            [timestamp+1]: {
                domProperties: {
                    htmlTag: "div",
                    innerHTML: " ",
                    attributes: {
                        "data-id": timestamp+1,
                        class: `note${timestamp+1} note`},
                },
                [timestamp+2]: {
                    domProperties: {
                        htmlTag: "div",
                        innerHTML: "...",
                        attributes: {
                            "data-id": timestamp+2,
                            class: "text", 
                            contenteditable: "true"},
                    },
                },
                [timestamp+3]: {
                    domProperties: {
                        htmlTag: "div",
                        innerHTML: "delete",
                        attributes: {
                            "data-id": timestamp+3,
                            class: "material-symbols-outlined deleteIcon"},
                    },
                }
            },
        }
        Object.assign(ultimateParent.noteBook, newNote);
        refreshDom(ultimateParent);
        setLocalStorage(ultimateParent);
    })
}

//_____________________________________________________________________________

//-----------------------------------------------------------------------------
function findObjectById(object, domId) {
    for (const key in object) {
        if (key == domId) {
            return { foundObject: object, key };
        }
        if (typeof object[key] == "object") {
            const returnValue = findObjectById(object[key], domId); 
            if (returnValue) return returnValue;
        }
    }
}

//-----------------------------------------------------------------------------
function deleteNote(buttonElement, ultimateParent) {
    document.querySelectorAll(buttonElement).forEach(element => {
        element.addEventListener("click", () => {
            // define id here (in case the parentId is required)
            const domIdObject = element.dataset.id;
            const domIdParent = document.querySelector(
                `[data-id="${domIdObject}"]`).parentElement
            const domId = domIdParent.dataset.id
            // run the function
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            delete foundObject[key];
            // refresh the DOM
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })
}

function markDone() {
    
}






//-----------------------------------------------------------------------------
function autoSaveText(textElement, ultimateParent) {
    document.querySelectorAll(textElement).forEach((element) => {
        element.addEventListener("blur", () => {
            // define id here (in case the parentId is required)   
            const domId = element.dataset.id;
            // run the function
            const newValue = element.innerHTML;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            foundObject[key]["domProperties"].innerHTML = newValue;
            // refresh the DOM
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        });
    });
}

//-----------------------------------------------------------------------------
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

//_____________________________________________________________________________

//-----------------------------------------------------------------------------
function getLocalStorage(ultimateParent) {
    const locallyStoredData = JSON.parse(localStorage.getItem("noteBook"));
    console.log(locallyStoredData)
    Object.assign(ultimateParent, locallyStoredData);
}

//-----------------------------------------------------------------------------
function setLocalStorage(ultimateParent) {
    localStorage.clear();
    localStorage.setItem("noteBook", JSON.stringify(ultimateParent));
}
 



