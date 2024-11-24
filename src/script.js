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
    markDone(".markDoneIcon", ultimateParent);
    markImportant(".markImportantIcon", ultimateParent);
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
                        class: `note`},
                },
                [timestamp+2]: {
                    domProperties: {
                        htmlTag: "div",
                        innerHTML: " ",
                        attributes: {
                            "data-id": timestamp+2,
                            class: "text", 
                            contenteditable: "true",
                            "data-placeholder": "newNote"},
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
                },
                [timestamp+4]: {
                    domProperties: {
                        htmlTag: "div",
                        innerHTML: "check_box_outline_blank",
                        attributes: {
                            "data-id": timestamp+4,
                            class: "material-symbols-outlined markDoneIcon"},
                    },
                },
                [timestamp+5]: {
                    domProperties: {
                        htmlTag: "div",
                        innerHTML: "<span class='material-symbols-outlined' style='color: rgba(0, 0, 0, 0.1)'>priority_high</span>",
                        attributes: {
                            "data-id": timestamp+5,
                            class: "material-symbols-outlined markImportantIcon"},
                    },
                },
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
function deleteNote(deleteElement, ultimateParent) {
    document.querySelectorAll(deleteElement).forEach(element => {
        element.addEventListener("click", () => {
            // find the correct object
            const domIdObject = element.dataset.id;
            const domIdParent = document.querySelector(
                `[data-id="${domIdObject}"]`).parentElement;
            const domId = domIdParent.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            // act on that object
            delete foundObject[key];
            // refresh DOM & local storage
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })
}

//-----------------------------------------------------------------------------
function markDone(markElement, ultimateParent) {
    document.querySelectorAll(markElement).forEach(element => {
        element.addEventListener("click", () => {
            // find the correct object
            const domId = element.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            // act on that object
            foundObject[key]["domProperties"].innerHTML == "check_box"?
            foundObject[key]["domProperties"].innerHTML = "check_box_outline_blank":
            foundObject[key]["domProperties"].innerHTML = "check_box";
            // refresh DOM & local storage
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })
}

//-----------------------------------------------------------------------------
function markImportant(markElement, ultimateParent) {
    document.querySelectorAll(markElement).forEach(element => {
        element.addEventListener("click", () => {
            // find the correct object
            const domId = element.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            // act on that object
            foundObject[key]["domProperties"].innerHTML == 
            "<span class='material-symbols-outlined' style='color: rgba(0, 0, 0, 0.1)'>priority_high</span>"?
            foundObject[key]["domProperties"].innerHTML = 
            "<span class='material-symbols-outlined' style='color: black'>priority_high</span>":
            foundObject[key]["domProperties"].innerHTML = 
            "<span class='material-symbols-outlined' style='color: rgba(0, 0, 0, 0.1)'>priority_high</span>";
            // refresh DOM & local storage
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })
}

//-----------------------------------------------------------------------------
function autoSaveText(textElement, ultimateParent) {
    document.querySelectorAll(textElement).forEach((element) => {
        element.addEventListener("blur", () => {
            // find the correct object   
            const domId = element.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            // act on that object
            const newValue = element.innerHTML;
            foundObject[key]["domProperties"].innerHTML = newValue;
            // refresh DOM & local storage
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
 



