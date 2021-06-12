const totalCols = 12; //number of cubes (=columns) on x-direction
const totalRows = 7; // number of cubes (=rows) on y-direction
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5; //cubes and balls are 0.5em positioned from each other
//12 columns, will later be filled with: "r" (Red ball), "b" (blue ball) or "n" (none)
var grid = [[], [], [], [], [], [], [], [], [], [], [], []];
var ballsPerCol = []; //how many balls are placed per column
var redsTurn = true; //who's turn, when blue then redsTurn=false
var movesToMake = totalCols*totalRows;
var pointsRed = 0;
var pointsBlue =0;
buildCubes();


function buildCubes () {    
  let cubeCol = startCubeCol-step;
  let cubeRow;
  let row;
  let col;
  let sceneDiv = document.getElementById("scene");
  let cubeDiv = document.getElementsByClassName("cube")[0];
  let cubeCloneDiv;
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
} // end function buildCubes
/*

function controlHor (who, x, y) {//check if a new 'four in a row' is made in horizontal direction after a move is made
  let countLeft=0;
  let countRight=0;
  let gridCondition = true;

  while (x + countRight < totalRows && gridCondition)  { //check to the right for new '4 in a row'
    if (grid[x + countRight + 1][y]===who) {countRight ++;} else {gridCondition = false;}
  } 

  gridCondition = true;
  while (x - countLeft > 1 && gridCondition) { //check to the left for new '4 in a row'
    if (grid[x - CountLeft - 1][y] === Who) {countleft ++;} else {gridCondition = false;}
  }

  if (countLeft < 4 && countRight < 4 && countLeft + countRight + 1 >= 4) {return controlHor=true;} 
     else {return controlHor=false;} // if there is already '4 in a row' horizontally then function returns false
}
*/
function controlVert (who, x, y) {
  let countDown = 0;
  let gridCondition = true;
  let a;
  let b;
  let ny;
  alert ("y" + y);
  while (y - countDown > 0 && gridCondition) {
    a=grid[x][y - countDown - 1];
    ny = y - countDown - 1;
    b=countDown;
    if (grid[x][y - countDown - 1] === who) {countDown+=1} else {gridCondition = false;}
    let test = (y - countDown > 0);
    alert ("while: countDown:" + b + "  nieuwecountdown:" + countDown + " whilevooruit:" + test + "  " + gridCondition + "  " + x + "  "+ y + " gr:"+ a + "  nieuweY:" +  ny + " grid0:"+ grid[x][0]  + " who:" + who + " y-c-1:" + (y-countDown-1));
  }
  if (countDown===3) {return true;} else {return false;}
}

function givePoint (who) {
  let scoreDiv;
  if (who==="r") {
    pointsRed++;
    scoreDiv = document.getElementById("score-text-red");  
    scoreDiv.innerText = "Red: " + pointsRed;
    } else {
    pointsBlue++;
    scoreDiv = document.getElementById("score-text-blue");  
    scoreDiv.innerText = "blue: " + pointsBlue;
  }
}


function dropBall(s) {
  //extract the column number from the cubeID which is clicked, to variable s2
  let s2 = s.slice(3,5);
  let s3 = s2.slice(1,2);
  if (isNaN(s3)===true) {s2=s.slice(3,4);}
  
  if (ballsPerCol[s2-1] < totalRows) { //if the collumn isn't full then place red or blue ball in that column
    ballsPerCol[s2-1] += 1;
    let ballRow = 0.5 - (ballsPerCol[s2-1]-1) * step;
    let ballCol = startCubeCol + (s2-1) * step; 

    let ballClass;
    let sceneDiv = document.getElementById("scene");
    if (redsTurn===true) {
      ballClass = "redball";
      grid[s2-1][ballsPerCol[s2-1]-1] = "r"; //add red ball to grid array
      redsTurn = false;
    } else {
      ballClass = "blueball";
      grid[s2-1][ballsPerCol[s2-1]-1] = "b";  //add blue ball to grid array
      redsTurn = true;
    }

    let ballDiv = document.getElementsByClassName(ballClass)[0];
    let ballCloneDiv = ballDiv.cloneNode(false);
    ballCloneDiv.style.top = ballRow + "em";
    ballCloneDiv.style.left = ballCol + "em"; //give ball the proper coordinates
    sceneDiv.appendChild(ballCloneDiv); 

    let contr;
    let who = grid[s2-1][ballsPerCol[s2-1]-1];
    
    if (controlVert (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    //contr=controlVert (who, s2-1, ballsPerCol[s2-1]-1);
    //alert (who + " ftest  " + contr);
    movesToMake -= 1;
    //Alert("Moves to make:    " +  movesToMake);
    if (movesToMake<0.1) {alert("Game Over");}
  } //drop ball 
} // end function dropBall

