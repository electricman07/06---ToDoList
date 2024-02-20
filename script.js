const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const itemList = document.getElementById("item-list");
const progressList = document.getElementById("progress-list");
const completeList = document.getElementById("complete-list");
const onHoldList = document.getElementById("on-hold-list");

// Items
let updatedOnLoad = false;

// Initialize arrays
let itemListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;

// Get Arrays From LocalStorage if Available, set default values
function getSavedColumns() {
  if (localStorage.getItem("toDoItems")) {
    itemListArray = JSON.parse(localStorage.toDoItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    itemListArray = ["Release the course", "Sit back and relax"];
    progressListArray = ["Work on projects", "Listen to music"];
    completeListArray = ["ToDo list project"];
    onHoldListArray = ["Being Cool"];
  }
}

// Set LocalStorage Arrays
function updateSavedColumns() {
  listArrays = [
    itemListArray,
    progressListArray,
    completeListArray,
    onHoldListArray,
  ];
  const arrayNames = ["toDo", "progress", "complete", "onHold"];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(
      `${arrayName}Items`,
      JSON.stringify(listArrays[index])
    );
  });
}

// Filter Arrays to Remove Empty Items
function filterArray(array) {
  const filteredArray = array.filter((item) => item !== null);
  return filteredArray;
}

// Create DOM Elements for each line
function createItemEl(ColumnEl, column, item, index) {
  // Create list item
  const listEl = document.createElement("li");
  listEl.classList.add("drag-item");
  listEl.textContent = item;
  listEl.draggable = true;
  listEl.setAttribute("ondragstart", "drag(event)");
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute("onfocusout", `updateItem(${index}, ${column})`);
  //   Add trashcan icon
  const trashCanEl = document.createElement("i");
  trashCanEl.classList.add("fa-solid", "fa-trash", "icon");
  listEl.append(trashCanEl);
  // Append to the DOM
  ColumnEl.appendChild(listEl);
}
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Item Column
  itemList.textContent = "";
  itemListArray.forEach((toDoItem, index) => {
    createItemEl(itemList, 0, toDoItem, index);
  });
  itemListArray = filterArray(itemListArray);
  // Progress Column
  progressList.textContent = "";
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index);
  });
  progressListArray = filterArray(progressListArray);
  // Complete Column
  completeList.textContent = "";
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index);
  });
  completeListArray = filterArray(completeListArray);
  // On Hold Column
  onHoldList.textContent = "";
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index);
  });
  onHoldListArray = filterArray(onHoldListArray);
  // Run getSavedColumns only once, Update localStorage
  updatedOnLoad = true;
  updateSavedColumns();
}

// Update Item, Delete if necessary or update Array Value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  const selectedColumnEl = listColumns[column].children;
  if (!dragging) {
    if (!selectedColumnEl[id].textContext) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    updateDOM();
  }
}

// Add to Column List, Reset textbox
function addToColumn(column) {
  const itemText = addItems[column].textContext;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContext;
  updateDOM();
}

updateDOM();
