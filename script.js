const totalCols = 12;
const totalRows = 7;
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5;
//12 columns, will be filled with: "r" (Red ball), "b" (blue ball) or "n" (none)
var grid = [[], [], [], [], [], [], [], [], [], [], [], []];
var ballsPerCol = []; //how many balls are placed per column
var cubeCol = startCubeCol-step;
var cubeRow;
let row;
let col;
var sceneDiv = document.getElementById("scene");
var cubeDiv = document.getElementsByClassName("cube")[0];
var cubeCloneDiv;
for (col = 1; col<=totalCols; col++) { //build rows of cubes to contain the balls later
    ballsPerCol[col-1]=0;
    cubeCol += step;
    cubeRow = startCubeRow+step;
    for (row = 1; row<=totalRows; row++) {
        grid[col-1][row-1]="n"; //fill grid with "n", none, no balls this moment
        cubeRow -= step;
        cubeCloneDiv = cubeDiv.cloneNode(true);
        cubeCloneDiv.style.top = cubeRow + "em";
        cubeCloneDiv.style.left = cubeCol + "em";
        cubeCloneDiv.id = "col" + col + "row" + row; //give each cube an ID from "col1row1" to "col12row7"
        sceneDiv.appendChild(cubeCloneDiv);
    }
}
var redsTurn = true; //who's turn, when blue then redsTurn=false

function dropBall(s) {
  //extract the column number from the cubeID which is clicked to variable s2
  let s2 = s.slice(3,5);
  let s3 = s2.slice(1,2);
  if (isNaN(s3)===true) {s2=s.slice(3,4);}
  
  if (ballsPerCol[s2-1] < totalRows) { //if the collumn isn't full then place red or blue ball
    ballsPerCol[s2-1] += 1;
    let ballRow = 0.5 - (ballsPerCol[s2-1]-1) * step;
    let ballCol = startCubeCol + (s2-1) * step; 

    let ballClass;
    let sceneDiv = document.getElementById("scene");
    if (redsTurn===true) {
      ballClass = "redball";
      grid[s2-1][ballsPerCol[s2-1]] = "r"; //add red ball to grid array
      redsTurn = false;
    } else {
      ballClass = "blueball";
      grid[s2-1][ballsPerCol[s2-1]] = "b";  //add blue ball to grid array
      redsTurn = true;
    }

    let ballDiv = document.getElementsByClassName(ballClass)[0];
    let ballCloneDiv = ballDiv.cloneNode(false);
    ballCloneDiv.style.top = ballRow + "em";
    ballCloneDiv.style.left = ballCol + "em"; //give ball the proper coordinates
    sceneDiv.appendChild(ballCloneDiv); } //drop ball 
}
/*

function dropBall(){
let ballDiv = document.getElementById("redBall");
let ballCloneDiv = ballDiv.cloneNode(true);
}
//https://stackoverflow.com/questions/21755937/accessing-an-element-that-is-currently-being-hovered-by-mouse-from-any-where-in
document.querySelectorAll('div')[0].onmouseover = function(e){

   var target = (e.target) ? e.target: e.srcElement;
   alert(target.style.left);// get element that is being hovered over right now

};

*/