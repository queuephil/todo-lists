import "./style.css";
import {DOM, OBJ} from "./modules.js";
import { format } from "date-fns";

let ultimateParent = {};

addUserInterface();
getLocalStorage(ultimateParent);
refreshDom(ultimateParent);

//-----------------------------------------------------------------------------
function refreshDom(ultimateParent) {
    document.querySelector(".container").innerHTML = "";
    const flattenedArray = OBJ.flattenForDOMaddElement(ultimateParent);
    flattenedArray.forEach((element) => {
        DOM.addElement(element);
    });
    addNewNoteBook();
    addNewNote();
    autoSaveText(".text", ultimateParent);
    preventDefaultEnter(".text");
    deleteNotebook(".deleteNotebook", ultimateParent);
    deleteNote(".deleteIcon", ultimateParent);
    markDone(".markDoneIcon", ultimateParent);
    markImportant(".markImportantIcon", ultimateParent);
    processDate();
}
//-----------------------------------------------------------------------------
function addUserInterface(){
    const timestamp = Date.now();
    const userInterface = {
        addNotebook: {
            domProperties: {
                htmlTag: "div",
                innerHTML: "add new Notebook",
                attributes: {
                    "data-id": "addNotebook",
                    class: "addNotebook button"},
            },
        },
    }
    Object.assign(ultimateParent, userInterface);
    refreshDom(ultimateParent);
}

//-----------------------------------------------------------------------------
function addNewNoteBook() {
    document.querySelectorAll(".addNotebook").forEach(element => {
        element.addEventListener("click", () => {
            const timestamp = Date.now();
            const newNoteBook = {
                [timestamp+1]: {
                    domProperties: {
                        htmlTag: "div",
                        attributes: {
                            "data-id": [timestamp+1],
                            class: "noteBookContainer"},
                        },
                        [timestamp+2]: {
                            domProperties: {
                                htmlTag: "div",
                                innerHTML: "Notebook",
                                attributes: {
                                    "data-id": [timestamp+2],
                                    class: "noteBook"},
                            },
                        },
                        [timestamp+3]: {
                            domProperties: {
                                htmlTag: "div",
                                innerHTML: "add",
                                attributes: {
                                    "data-id": [timestamp+3],
                                    class: "material-symbols-outlined addIcon"},
                            },
                       },
                       [timestamp+4]: {
                        domProperties: {
                            htmlTag: "div",
                            innerHTML: "delete Notebook",
                            attributes: {
                                "data-id": [timestamp+4],
                                class: "deleteNotebook button"},
                        },
                   },
                },
            }
            Object.assign(ultimateParent, newNoteBook);
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })  
}

//-----------------------------------------------------------------------------
function addNewNote() {
    document.querySelectorAll(".addIcon").forEach(element => {
        element.addEventListener("click", () => {
            const timestamp = Date.now();
            const newNote = {
                [timestamp+1]: {
                    domProperties: {
                        htmlTag: "div",
                        attributes: {
                            "data-id": timestamp+1,
                            class: `note`},
                    },
                    [timestamp+2]: {
                        domProperties: {
                            htmlTag: "div",
                            attributes: {
                                "data-id": timestamp+2,
                                class: "text", 
                                contenteditable: "true",},
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
                            innerHTML: "priority_high",
                            attributes: {
                                "data-id": timestamp+5,
                                "data-markimportant": "notImportant",
                                class: "material-symbols-outlined markImportantIcon"},
                        },
                    },
                    [timestamp+6]: {
                        domProperties: {
                            htmlTag: "div",
                            attributes: {
                                "data-id": timestamp+6,
                                class: "date"},
                        },
                        [timestamp+7]: {
                            domProperties: {
                                htmlTag: "input",
                                attributes: {
                                    "data-id": timestamp+7,
                                    type: "date",
                                    class: "dateInput"},
                            },
                        },
                        [timestamp+8]: {
                            domProperties: {
                                htmlTag: "div",
                                innerHTML: "calendar_month",
                                attributes: {
                                    "data-id": timestamp+8,
                                    class: "material-symbols-outlined button dateIcon"},
                            },
                        },
                        [timestamp+9]: {
                            domProperties: {
                                htmlTag: "div",
                                innerHTML: "CW‒‒",
                                attributes: {
                                    "data-id": timestamp+9,
                                    class: "dateText"},
                            },
                        },
                    },
                },
            }
            // find the correct parent object
            const domIdObject = element.dataset.id;
            const domIdSibling = document.querySelector(
                `[data-id="${domIdObject}"]`).previousSibling;
            const domId = domIdSibling.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domId);
            // assign to it
            Object.assign(foundObject[key], newNote);
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })  
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
function deleteNotebook(deleteElement, ultimateParent) {
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
            // const domId = element.dataset.id;
            const domIdObject = element.dataset.id;
            const domIdParent = document.querySelector(
                `[data-id="${domIdObject}"]`).parentElement;
            const domId = domIdObject;
            
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
            foundObject[key]["domProperties"]["attributes"]["data-markimportant"] == "important"?
            foundObject[key]["domProperties"]["attributes"]["data-markimportant"] = "notImportant":
            foundObject[key]["domProperties"]["attributes"]["data-markimportant"] = "important";
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

//-----------------------------------------------------------------------------
function processDate() {
    document.querySelectorAll(".dateIcon").forEach(element => {
        element.addEventListener("click", () => {
            element.previousSibling.showPicker();
        })
    })
    document.querySelectorAll(".dateInput").forEach(element => {
        element.addEventListener("change", () => {
            // find the correct object
            const domIdObject = element.dataset.id;
            const { foundObject, key } = findObjectById(ultimateParent, domIdObject);
            // act on that object
            const newDate = element.value;
            foundObject[key]["domProperties"]["attributes"].value = newDate;
            // act on that object
            const textId = parseInt(key)+2;
            (newDate !== "") ?
            foundObject[textId]["domProperties"].innerHTML = `CW${format(newDate, "w")}`:
            foundObject[textId]["domProperties"].innerHTML = `CW‒‒`;
            // refresh DOM & local storage
            refreshDom(ultimateParent);
            setLocalStorage(ultimateParent);
        })
    })
}

//_____________________________________________________________________________

//-----------------------------------------------------------------------------
function getLocalStorage(ultimateParent) {
    const locallyStoredData = JSON.parse(localStorage.getItem("noteBook"));
    Object.assign(ultimateParent, locallyStoredData);
}

//-----------------------------------------------------------------------------
function setLocalStorage(ultimateParent) {
    localStorage.clear();
    localStorage.setItem("noteBook", JSON.stringify(ultimateParent));
}
 



