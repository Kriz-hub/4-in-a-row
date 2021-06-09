const totalCols = 12;
const totalRows = 7;
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5;
var cubeCol = startCubeCol-step;
var cubeRow;
let row;
let col;
var sceneDiv = document.getElementById("scene");
var cubeDiv = document.getElementById("cube");
var cubeCloneDiv;
var count=0;
var ident;
for (col = 1; col<=totalCols; col++) {
    cubeCol += step;
    cubeRow = startCubeRow+step;
    for (row = 1; row<=totalRows; row++) {
        count+=1;
        cubeRow -= step;
        cubeCloneDiv = cubeDiv.cloneNode(true);
        cubeCloneDiv.style.top = cubeRow + "em";
        cubeCloneDiv.style.left = cubeCol + "em";
        cubeCloneDiv.id = "ident"+count;
        sceneDiv.appendChild(cubeCloneDiv);
    }
}

function dropBall(){
let ballDiv = document.getElementById("redBall");
let ballCloneDiv = ballDiv.cloneNode(true);
}
//https://stackoverflow.com/questions/21755937/accessing-an-element-that-is-currently-being-hovered-by-mouse-from-any-where-in
document.querySelectorAll('div')[0].onmouseover = function(e){

   var target = (e.target) ? e.target: e.srcElement;
   alert(target.style.left);// get element that is being hovered over right now

};

