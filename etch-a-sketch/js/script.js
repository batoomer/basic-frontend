// CONSTANTS 
const BACKGROUND_COLOR = "#FFFFFF"; //white
const DEFAULT_PAINT_COLOR = "#000000"; //black
const DEFAULT_GRIDX = 16;
const DEFAULT_MODE = 'paint';
const DEFAULT_BORDER = false;

// VARIABLES
let currentGridX = DEFAULT_GRIDX
let currentPaintColor = DEFAULT_PAINT_COLOR;
let currentMode = DEFAULT_MODE;
let currentBorder = DEFAULT_BORDER;

// ================== DOM ELEMENTS ==================
const gridContainer = document.querySelector('#grid-container');
// Size Slider
const gridSizeSlider = document.querySelector('.grid-size-slider');
// Color Box
const gridColorBox = document.querySelector('.grid-color-box');
// Mode Buttons
const gridBtnPaint = document.querySelector('.btn-paint');
const gridBtnErase = document.querySelector('.btn-erase');
const gridBtnRainbow = document.querySelector('.btn-rainbow');

// Border Button
const gridBorderButton = document.querySelector('.btn-border')

// Clear Button
const gridBtnClear = document.querySelector('.btn-clear');
// ===================================================


// =================== LISTENERS AND EVENTS =======================

// Border Button Listener
gridBorderButton.onclick = (event) => {
    currentBorder = !currentBorder;
    setGridBorders(currentBorder);
    setToogleActive(event, currentBorder)
};

function setToogleActive(e, border){
    if (!border) {
        e.target.textContent = 'Off';
        e.target.style.color = "#FBFBFB";
        e.target.style.borderColor = "#FBFBFB";
        e.target.style.backgroundColor = "#716969";
    }
    if (border) {
        e.target.textContent = 'On';
        e.target.style.color = "#000000";
        e.target.style.borderColor = "#000000";
        e.target.style.backgroundColor = "#EFFDBB";
    }
}

/**
 * Add or Removes the Borders From the grid.
 * @param {boolean} border 
 */
function setGridBorders(border){
    const gridItems = document.querySelectorAll('.grid-item');

    if (border) {
        gridContainer.classList.add('.grid-border');
        gridItems.forEach((gridItem) => {
            gridItem.classList.add('grid-item-border');
        });
    }

    if (!border) {
        gridContainer.classList.remove('.grid-border');
        gridItems.forEach((gridItem) => {
            gridItem.classList.remove('grid-item-border');
        });
    };
};


// Paint Color Listener
gridColorBox.addEventListener('input', (e) => currentPaintColor = e.target.value);

// Mode Buttons Listeners
gridBtnPaint.onclick = () => {
    setActiveMode('paint');
    currentMode = 'paint'};
gridBtnErase.onclick = () => {
    setActiveMode('erase');
    currentMode = 'erase'};
gridBtnRainbow.onclick = () => {
    setActiveMode('rainbow')
    currentMode = 'rainbow'};

/**
 * Remove the active class from the old button and adds the active class to the new button
 * @param {string} activeMode 
 */
function setActiveMode(activeMode) {

    // Remove the active class from the correct button
    if (currentMode === 'paint') {
        gridBtnPaint.classList.remove('active');

    } else if (currentMode === 'erase') {
        gridBtnErase.classList.remove('active');
    } else if (currentMode === 'rainbow'){
        gridBtnRainbow.classList.remove('active');
    } else {
        alert('Something Went Wrong! The code broke and needs fixing.');
    }

    // Add the active class to the correct button
    if (activeMode === 'paint') {
        gridBtnPaint.classList.add('active');

    } else if (activeMode === 'erase') {
        gridBtnErase.classList.add('active');
    } else if (activeMode === 'rainbow'){
        gridBtnRainbow.classList.add('active');
    } else {
        alert('Something Went Wrong! The code broke and needs fixing.');
    }

};

// Grid Slider Listeners
gridSizeSlider.oninput = (e) => {updateGridSizeText(e.target.value)};
gridSizeSlider.onchange = (e) => {
    currentGridX = e.target.value;
    updateGridSize(e.target.value)};

/**
 * Clears the grid, updates the slider label and creates a new grid with size gridX x gridX
 * @param {int} gridX grid horizontal lenght
 */
function updateGridSize(gridX){
    clearGrid();
    updateGridSizeText(gridX);
    createGrid(gridX);
};

/**
 * Clears the grid by removing all children elements that the grid-container contains.
 */
function clearGrid() {
    const gridContainer = document.querySelector('#grid-container');
    gridContainer.innerHTML = '';
};

/**
 * Updates the slider label to gridX x gridX
 * @param {int} gridX gird horizontal length
 */
function updateGridSizeText(gridX) {
    const gridSizeText = document.querySelector('.grid-size-text');
    gridSizeText.textContent = `${gridX} x ${gridX}`;
};


/**
 * Creates a grid by adding div elements with an area off gridX x gridY.
 * @param {int} gridX grid horizontal lenght
 * @param {int} gridY grid vertical length
 */
function createGrid(gridX, gridY=gridX) {
    // gridArea: the size of the grid. 
    gridArea = gridX * gridY;

    // Grid Container Display Style
    const gridStyle = (
        `display:grid; 
        grid-template-columns: repeat(${gridY}, 1fr);
        grid-template-rows: repeat(${gridX}, 1fr)`
        );
    gridContainer.setAttribute('style', gridStyle);


    // Create the Grid and add Event Listeners
    for (let i=0; i<gridArea; i++) {
        // Create a div with class='grid-item' and add it to the DOM.
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item');
        // Event Listeners for painting
        gridItem.addEventListener('mouseover', paintGridItem);
        gridItem.addEventListener('mousedown', paintGridItem);
        gridContainer.appendChild(gridItem);   
    }

    setGridBorders(currentBorder);
};   

//Click AND Hover To paint
let mouseClicked = false;
gridContainer.addEventListener('mousedown', () => {mouseClicked=true})
gridContainer.addEventListener('mouseup', () => {mouseClicked=false})

/**
 * Enables to paint by clicking and hovering over the grid. Also checks for which paint mode to apply.
 * @param {Event} e mouseover or mousedown event
 * @returns undefined
 */
function paintGridItem (e) {
    // We want to paint when we click AND hover with the mouse
    if (e.type === 'mouseover' && !mouseClicked) return;
    
    // Select the paint mode according to the currentMode Variable
    switch(currentMode) {
        case 'paint':
            e.target.style.backgroundColor = currentPaintColor;
            break;
        case 'erase':
            e.target.style.backgroundColor = BACKGROUND_COLOR;
            break;
        case 'rainbow':
            e.target.style.backgroundColor = createRandomColor();
            break;
        default:
            alert('Something Went Wrong! The code broke and needs fixing.');
      }
    
};

/**
 * Creates a random hex number code
 * @returns A random hex number code.
 */
function createRandomColor(){
    let randColor = '#';

    const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];

    for (let i = 0; i<6; i++){
        const index = Math.floor(Math.random()*hexValues.length);
        randColor += hexValues[index];
    }

    return randColor
};


// Clear Button Listener
gridBtnClear.onclick = () => {restartGrid();};

/**
 * Clears and re Creates grid with the current settings.
 */
function restartGrid() {
    clearGrid();
    createGrid(currentGridX);
    updateGridSizeText(currentGridX);
    
}



window.onload = () => {
    createGrid(DEFAULT_GRIDX);
    updateGridSizeText(DEFAULT_GRIDX);
    setActiveMode(DEFAULT_MODE);
};