const addBtns = document.querySelectorAll(".add-btn:not(.solid)");
const saveItemBtns = document.querySelectorAll(".solid");
const addItemContainers = document.querySelectorAll(".add-container");
const addItems = document.querySelectorAll(".add-item");
// Item Lists
const listColumns = document.querySelectorAll(".drag-item-list");
const itemList = document.getElementById("item-list");
const progressList = document.getElementById("progress-link");
const completedList = document.getElementById("complete-list");
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
