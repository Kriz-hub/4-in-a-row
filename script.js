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
var cubeDiv = document.getElementsByClassName("cube")[0];
var cubeCloneDiv;
for (col = 1; col<=totalCols; col++) {
    cubeCol += step;
    cubeRow = startCubeRow+step;
    for (row = 1; row<=totalRows; row++) {
        cubeRow -= step;
        cubeCloneDiv = cubeDiv.cloneNode(true);
        cubeCloneDiv.style.top = cubeRow + "em";
        cubeCloneDiv.style.left = cubeCol + "em";
        cubeCloneDiv.id = "col" + col + "row" + row;
        sceneDiv.appendChild(cubeCloneDiv);
    }
}

function dropBall(s) {
  //extract the column number from the cubeID which is clicked
  let s2 = s.slice(3,5);
  let s3 = s2.slice(1,2);
  if (isNaN(s3)===true) {s2=s.slice(3,4);}

  let ballRow = 0.5;
  let ballCol = -3 + (s2-1) * 0.5;
  let sceneDiv = document.getElementById("scene");
  let ballDiv = document.getElementsByClassName("redball")[0];
  let ballCloneDiv = ballDiv.cloneNode(false);
  ballCloneDiv.style.top = ballRow + "em";
  ballCloneDiv.style.left = ballCol + "em";
  sceneDiv.appendChild(ballCloneDiv);
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