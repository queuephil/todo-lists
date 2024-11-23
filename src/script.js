// console.log("test");
import "./style.css";
import {DOM} from "./modules.js"

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
        // add date                 (N°7)
        // add important            
        // remove                   
        // move up/down             
        // make child/sibling       
        // collapse / expand        
        // check                    
        
// main________________________________________________________________________

let allItems = [];
loadUserInterface();
addNewItem();
getLocalStorage();
addItemsToDOM();
saveEditedText(".itemText");
preventDefaultEnter(".itemText");

// load UI---------------------------------------------------------------------
function loadUserInterface(){
    const elements = [
        DOM.defineElement("main", "div", "", {class: "list"}),
        DOM.defineElement("main", "div", "add", 
            {class: "material-symbols-outlined addIcon"}),
    ];
    elements.forEach((element) => DOM.addElement(element));
}

// add new item----------------------------------------------------------------
function addNewItem() {
    document.querySelector(".addIcon").addEventListener("click", () => {
        const timestamp = Date.now();
        const elements = [
            DOM.defineElement(".list", "div", "", {class: "item", "data-id": timestamp,}),
            DOM.defineElement(`div[data-id='${timestamp}']`, "div", "created item",
                {class: "itemText", "data-id": timestamp + 1, contenteditable: "true",}
            ),];
        allItems = [...allItems, ...elements]; 
        setLocalStorage();
        addItemsToDOM();
    });
}

// add items to the DOM
function addItemsToDOM() {
    document.querySelector(".list").innerHTML ="";
    allItems.forEach((element) => DOM.addElement(element));
} 

// add possiblity to edit the text---------------------------------------------
function allignIndices(index) {return (index + 1) * 2 - 1}

function saveEditedText(editableElement) {
    const items = document.querySelectorAll(editableElement);
    items.forEach((item, index) => {
        item.addEventListener("blur", () => {          
            const allItemsIndex = allignIndices(index);
            allItems[allItemsIndex].innerHTML = item.innerHTML;
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
 