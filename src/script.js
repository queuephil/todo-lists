// console.log("test");
import "./style.css";
import {DOM} from "./modules.js"

// add "list"
// functions                        (N°3)
        // add new                  
        // add text                 
        // remove                   
        // move up/down             

// add "note"
    // functions
        // add new                  done
        // add text                 done
        // add date                 (N°7)
        // add important            
        // remove                   
        // move up/down             
        // make child/sibling       
        // collapse / expand        
        // check                    
        
        // run the functions___________________________________________________________
// meanwhile creating a local storage property that is set to the textcontnt
// updating the text in the local storage????
// reloading the page 
// get the stored items again
let allItems = {};
// localStorage.clear();
loadUserInterface();
getLocalStorage();
addItemsToDOM();

addNewItem();
saveEditedText();
preventDefaultEnter(".itemText");



// object that has a values I need for the whole list
// 1. it gets the values from the local storage (on open)
// 2. it adds the values dynamically created (while open)
    // creating something is: writing to the object
    // from the object the list gets refreshed
    // + the local storage gets refresehed

// DOM.defineElement()


// load UI---------------------------------------------------------------------
function loadUserInterface(){
    const elements = [
        DOM.defineElement("main", "div", "list"),
        DOM.defineElement("main", "div", "material-symbols-outlined.addIcon", "add"),
    ];
    elements.forEach((element) => DOM.addElement(element));
}

// get local storage-----------------------------------------------------------
function getLocalStorage() {
    for(let i = 0; i < localStorage.length; i++) {
        const localStorageKey = localStorage.key(i);
        const localStorageValue = JSON.parse(localStorage.getItem(localStorageKey));
        allItems[localStorageKey] = localStorageValue;
    }
    // console.log(allItems);
}

// add items to the DOM
function addItemsToDOM() {
    document.querySelector(".list").innerHTML ="";
    console.log(allItems)
    Object.values(allItems).forEach((element) => DOM.addElement(element));
} 

// add new item----------------------------------------------------------------
function addNewItem() {
    document.querySelector(".addIcon").addEventListener("click", () => {
        const timestamp = Date.now();
                
        const elements = {
            [`${timestamp}`]: DOM.defineElement(
                ".list", "div", "item", "", {"data-id": id1,}),
            [`${timestamp + 1}`]: DOM.defineElement(
                ".list", "div", "itemText", "created item", 
                {contenteditable: "true", "data-id": id2,}),
        };
        
        allItems = {...allItems, ...elements}; 
        setLocalStorage();
        addItemsToDOM();
    });
}

// set local storage-----------------------------------------------------------
function setLocalStorage() {
    localStorage.clear();
    Object.keys(allItems).forEach((key) => {
        localStorage.setItem(key, JSON.stringify(allItems[key]));
    });
}

// add possiblity to edit the text---------------------------------------------
function saveEditedText() {
    const items = document.querySelectorAll(".itemText");
    items.forEach((item) => {
        item.addEventListener("blur", () => {
            const dataId = item.getAttribute("data-id");
            allItems[dataId].textContent = item.textContent; 
            setLocalStorage();
        });
    });
}

// prevent default enter ------------------------------------------------------
function preventDefaultEnter(element) {
    document.querySelectorAll(element).forEach(itemText => {
        itemText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                itemText.blur();
            }
        });
    });
}
 