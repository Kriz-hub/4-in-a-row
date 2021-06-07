const totalCols = 12;
const totalRows = 7;
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5;
var cubeCol = startCubeCol-step;
var cubeRow = startCubeRow-step;
let row;
let col;
var sceneDiv = document.getElementById("scene");
var cubeDiv = document.getElementById("cube");
var cubeCloneDiv;
for (col = 1; col<totalCols; col++) {
    cubeCol += step;
    for (row = 1; row<totalRows; row++) {
        cubeRow += step;
        cubeCloneDiv = cubeDiv.cloneNode(true);
        cubeCloneDiv.top = string(cubeRow) + "em";
        cubeCloneDiv.left = string(cubeCol) + "em";
        sceneDiv.appendChild(cubeCloneDiv);
    }
}
