function toggle_full_screen() //https://stackoverflow.com/questions/1125084/how-to-make-the-window-full-screen-with-javascript-stretching-all-over-the-scre
{
    if ((document.fullScreenElement && document.fullScreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen))
    {
        if (document.documentElement.requestFullScreen){
            document.documentElement.requestFullScreen();
        }
        else if (document.documentElement.mozRequestFullScreen){ /* Firefox */
            document.documentElement.mozRequestFullScreen();
        }
        else if (document.documentElement.webkitRequestFullScreen){   /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        else if (document.msRequestFullscreen){ /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    }
    else
    {
        if (document.cancelFullScreen){
            document.cancelFullScreen();
        }
        else if (document.mozCancelFullScreen){ /* Firefox */
            document.mozCancelFullScreen();
        }
        else if (document.webkitCancelFullScreen){   /* Chrome, Safari and Opera */
            document.webkitCancelFullScreen();
        }
        else if (document.msExitFullscreen){ /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

//https://stackoverflow.com/questions/14360581/force-landscape-orientation-mode
//https://stackoverflow.com/questions/1125084/how-to-make-the-window-full-screen-with-javascript-stretching-all-over-the-scre
//https://github.com/sindresorhus/screenfull.js/blob/main/src/screenfull.js

const totalCols = 12; //number of cubes (=columns) on x-direction
const totalRows = 7; // number of cubes (=rows) on y-direction
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5; //cubes and balls are 0.5em positioned from each other
//12 columns, will later be filled with: "r" (Red ball), "b" (blue ball) or "n" (none):
var grid = [[], [], [], [], [], [], [], [], [], [], [], []];
var ballsPerCol = []; //how many balls are placed per column
var redsTurn = true; //who's turn, when blue then redsTurn=false
var player1Red = true;
var fullScreenWish = false;
var settingPageLeft = false;
var endQuestion = false;
var gameEnded = false;
var player1Name = "Player1";
var player2Name = "Player2";
var movesToMake = totalCols*totalRows;
var pointsRed = -1;
var pointsBlue =-1;
buildCubes();
document.getElementsByClassName("ballshadow")[0].style.display= "none";
//document.getElementsByClassName("circleshadow")[0].style.display= "none";
document.getElementById("scene").style.display = "none";

function getNames () {
   player1Name = document.getElementById("player1-form").value;
   player2Name = document.getElementById("player2-form").value;
   document.getElementById("color-player1").innerHTML = player1Name;
   document.getElementById("color-player2").innerHTML = player2Name;
}

function endAnimation () {
  if (settingPageLeft) {
    let messageCubeDiv1 = document.getElementsByClassName("message-cube")[0];
    let messageCubeDiv2 = document.getElementsByClassName("message-cube")[1];
    let exitCubeDiv = document.getElementsByClassName("exit-cube")[0];
    let sceneDiv = document.getElementById("scene");
    exitCubeDiv.style.display = "none";
    messageCubeDiv1.style.display = "inline";
    $(messageCubeDiv1).animate({top: '0em'});
    messageCubeDiv2.style.display = "inline";
    $(messageCubeDiv2).animate({top: '0em'});
    $(sceneDiv).addClass("rotate");
    $(".redball").css("animation-name", "scene-rotate");
    $(".blueball").css("animation-name", "scene-rotate");
    makeThemScoreBlocks_MakeThemYesNoBlocks (false);
    let redCube = document.getElementsByClassName("score-cube-red")[0];
    let greenCube = document.getElementsByClassName("score-cube-blue")[0];
    $(redCube).addClass("blinking-red");
    $(greenCube).addClass("blinking-green");
    let root = document.documentElement;
    root.style.setProperty('--left-cube-text-color', 'white');
    root.style.setProperty('--right-cube-text-color', 'white');
    root.style.setProperty('--hover-color', 'gray');
    endQuestion=true;
  }
}

function answer (q) {
if (endQuestion && !gameEnded) {
  makeThemScoreBlocks_MakeThemYesNoBlocks (true);
  let root = document.documentElement;
  root.style.setProperty('--left-cube-text-color', 'red');
  root.style.setProperty('--right-cube-text-color', 'blue');
  let redCube = document.getElementsByClassName("score-cube-red")[0];
  let greenCube = document.getElementsByClassName("score-cube-blue")[0];
  $(redCube).removeClass("blinking-red");
  $(greenCube).removeClass("blinking-green");

  if (q) { //'Yes' clicked to end this game
    let messageP1 = document.getElementsByClassName("message-text")[0];
    let messageP2 = document.getElementsByClassName("message-text")[1];
    let messageP3 = document.getElementsByClassName("message-text")[2];
    let messageP4 = document.getElementsByClassName("message-text")[3];
    let endLine;
    if (pointsRed>pointsBlue) {
      endLine = player1Name + " has won!"
    } else { 
      root.style.setProperty('--message-text-color', 'blue');
      endLine = player2Name + " has won!"}
    if (pointsRed===pointsBlue) { endLine = "It's a draw, no winner!"}
    messageP1.innerHTML = endLine;
    messageP2.innerHTML = endLine;
    messageP3.innerHTML = endLine;
    messageP4.innerHTML = endLine;
    gameEnded=true;
    if (fullScreenWish) {toggle_full_screen();}
  } else { //When Clicked 'NO' to end this game, a back to game mode:
    let messageCubeDiv1 = document.getElementsByClassName("message-cube")[0];
    let messageCubeDiv2 = document.getElementsByClassName("message-cube")[1];
    let ExitCubeDiv = document.getElementsByClassName("exit-cube")[0];
    let sceneDiv = document.getElementById("scene");
    $(messageCubeDiv1).animate({top: '1.1em'});
    $(messageCubeDiv2).animate({top: '1.1em'});
    messageCubeDiv1.style.display = "none";
    messageCubeDiv2.style.display = "none";
    ExitCubeDiv.style.display = "inline";
    $(sceneDiv).removeClass("rotate");
    $(".redball").css("animation-name", "sscene-rotate");
    $(".blueball").css("animation-name", "sscene-rotate");
    root.style.setProperty('--hover-color', 'red');
    endQuestion=false;
  }
}
}

function togglePages() {
  if (player1Name === "Player1") {
    alert("You forgot to give the player(s) a name, please try again");
    return;
  }
    document.getElementById("setting-page").style.display = "none";
    document.getElementById("scene").style.display = "inline";
    fullScreenWish = document.getElementById("check-it").checked;
    if (fullScreenWish) {toggle_full_screen();}
    givePoint ("b");
    givePoint ("r");
    settingPageLeft = true;
}


function toggleColor () {
    if (player1Red) {
        player1Red=false;
        document.getElementById("color-player1").style.background = "blue";
        document.getElementById("color-player2").style.background = "red";   
    } else {
        player1Red=true;
        document.getElementById("color-player1").style.background = "red";
        document.getElementById("color-player2").style.background = "blue";}
}



function buildCubes () {    
  let cubeCol = startCubeCol-step;
  let cubeRow;
  let row;
  let col;
  let sceneDiv = document.getElementById("scene");
  let cubeDiv = document.getElementsByClassName("cube")[0];
  let cubeCloneDiv;
  for (col = 1; col<=totalCols; col++) { //build rows of cubes that contain the balls later
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
  // build extra cubes to hold 2 big score-cubes
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "-5.25em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "-5.25em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "-3.75em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "-3.75em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);

  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "3.25em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "3.25em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "4.75em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "4.75em";
  cubeCloneDiv.style.background = "darkslategray";
  sceneDiv.appendChild(cubeCloneDiv);

  let cubeMessageDiv = document.getElementsByClassName("message-cube")[0];
  let cubeMessageCloneDiv = cubeMessageDiv.cloneNode(true);
  sceneDiv.appendChild(cubeMessageCloneDiv);
  let frontPart = document.getElementsByClassName("message-front")[1];
  let backPart = document.getElementsByClassName("message-back")[1];
  let rightPart = document.getElementsByClassName("message-right")[1];
  let leftPart = document.getElementsByClassName("message-left")[1];
  let topPart = document.getElementsByClassName("message-top")[1];
  frontPart.style.transform="translateZ(.25em) translateZ(-3.5em)";
  backPart.style.transform="rotateY(180deg) translateZ(.25em) translateZ(3.5em)";
  rightPart.style.transform="rotateY(90deg) translateZ(4.75em) translateX(3.5em)";
  leftPart.style.transform="rotateY(270deg) translateZ(.25em) translateX(-3.5em)";
  topPart.style.transform="translateZ(0em) rotateX(90deg) translateY(-3.5em) translateX(0em)";

  //exitcube change translates
  frontPart = document.getElementsByClassName("score-front")[2];
  backPart = document.getElementsByClassName("score-back")[2];
  rightPart = document.getElementsByClassName("score-right")[2];
  leftPart = document.getElementsByClassName("score-left")[2];
  topPart = document.getElementsByClassName("score-top")[2];
  frontPart.style.transform="translateZ(.25em) translateZ(4em)";
  backPart.style.transform="rotateY(180deg) translateZ(.25em) translateZ(-4em)";
  rightPart.style.transform="rotateY(90deg) translateZ(1.75em) translateX(-4em)";
  leftPart.style.transform="rotateY(270deg) translateZ(.25em) translateX(4em)";
  topPart.style.transform="translateZ(0em) rotateX(90deg) translateY(4em) translateX(0em)";
} // end function buildCubes



function bringShadow (colNr) { //when 1st ball is placed in row a shadow appears on ground
const rowNr="row1" // shadow is always on the ground
let cubeDiv= document.getElementById('col' + colNr + rowNr);
let shadowDiv = document.getElementsByClassName("ballshadow")[0];
let shadowCloneDiv = shadowDiv.cloneNode(true);
shadowCloneDiv.style.display = "inline";
cubeDiv.appendChild(shadowCloneDiv);
}


function controlHor (who, x, y) {//check if a new 'four in a row' is made in horizontal direction after a move is made
  let countLeft=0;
  let countRight=0;
  let gridCondition = true;

  

  //alert ("gridcond: " + gridCondition + " x: " + x + " x + countRight < totalCols: " + (x + countRight < totalCols));
  while (x + countRight < totalCols-1 && gridCondition)  { //check to the right for new '4 in a row'
    if (grid[x + countRight + 1][y]===who) {countRight+=1;} else {gridCondition = false;}
   //alert (gridCondition + " x: " + x + " x + countRight < totalCols-1: " + (x + countRight < totalCols-1) + " Countrigh:" + countRight);
  } 
  
  
  gridCondition = true;
  while (x - countLeft > 0 && gridCondition) { //check to the left for new '4 in a row'
    if (grid[x - countLeft - 1][y]===who) {countLeft+=1;} else {gridCondition = false;}
  }

  //alert(countLeft + "  " + countRight); 

 
  if (countLeft===3 || countRight===3) {return true;} 
     else {
         if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {return true;} 
         else {return false}
  }
}


function controlVert (who, x, y) {
  let countDown = 0;
  let gridCondition = true;

  while (y - countDown > 0 && gridCondition) {
    if (grid[x][y - countDown - 1] === who) {countDown+=1} else {gridCondition = false;}
  }
  if (countDown===3) {return true;} else {return false;}
}


function controlDiagonalRight (who, x, y) {
  let countLeft = 0;
  let countRight = 0; 
  let gridCondition = true;

  while (x + countRight < totalRows-1 && y + countRight < totalCols-1 && gridCondition) {
    if (grid[x + countRight + 1][y + countRight + 1]===who) {countRight=+1;} else {gridCondition = false;}
  }

  gridCondition = true;
  while (x - countLeft > 1 && y - countLeft > 1 && gridCondition) {
    if (grid[x - countLeft - 1][y - countLeft - 1]===who) {countLeft=+1;} else {gridCondition = false;}
  }

  if (countLeft===3 || countRight===3) {return true;} 
     else {
         if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {return true;} 
         else {return false}
  }
} // function controlDiagonalRight


function controlDiagonalLeft (who, x, y) {
  let countLeft = 0;
  let countRight = 0; 
  let gridCondition = true;

  while (x + countRight < totalRows-1 && y - countRight > 1 && gridCondition) {
    if (grid[x + countRight + 1][y + countRight - 1]===who) {countRight=+1;} else {gridCondition = false;}
  }

  gridCondition = true;
  while (x - countLeft > 1 && y + countLeft < totalCols-1 && gridCondition) {
    if (grid[x - countLeft - 1][y + countLeft + 1]===who) {countLeft=+1;} else {gridCondition = false;}
  }

  if (countLeft===3 || countRight===3) {return true;} 
     else {
         if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {return true;} 
         else {return false}
  }
} // function controlDiagonalLeft

function makeThemScoreBlocks_MakeThemYesNoBlocks (scoreBlocks) { //scoreBlocks is a boolean
  //this function is needed to change the meaning of the blocks where normally the scores of 
  //red and blue is beeing displayed. after Exit is clicked it becomes yes or no to quit
  if (scoreBlocks) {
    pointsRed--;
    pointsBlue--; // when quit game is 'no' everything must be restored therefore Givepoint function is used
    if (redsTurn) {
      givePoint ('b'); givePoint ('r'); putFocus ('r');
    } else {
      givePoint ('r'); givePoint ('b'); putFocus ('b');
    }
  } else {
    let p1;
    let p2;
    p1 = document.getElementsByClassName("score-text-red")[0];
    p2 = document.getElementsByClassName("score-text-red")[1]; 
    p1.innerText = "NO";
    p2.innerText = "NO";
    p1.style.textDecoration = "none";
    p2.style.textDecoration = "none";
    p1 = document.getElementsByClassName("score-text-blue")[0];
    p2 = document.getElementsByClassName("score-text-blue")[1]; 
    p1.innerText = "YES";
    p2.innerText = "YES";
    p1.style.textDecoration = "none";
    p2.style.textDecoration = "none";
  }
}


function givePoint (who) {
  let scoreP1;
  let scoreP2;
  if (who==="r") {
    pointsRed++;
    scoreP1 = document.getElementsByClassName("score-text-red")[0];
    scoreP2 = document.getElementsByClassName("score-text-red")[1]; 
    scoreP1.innerText = player1Name + ": " + pointsRed;
    scoreP2.innerText = player1Name + ": " + pointsRed;
    } else {
    pointsBlue++;
    scoreP1 = document.getElementsByClassName("score-text-blue")[0];
    scoreP2 = document.getElementsByClassName("score-text-blue")[1]; 
    scoreP1.innerText = player2Name + ": " + pointsBlue;
    scoreP2.innerText = player2Name + ": " + pointsBlue;
  }
}

function putFocus (who) {
  let focusDiv1;
  let focusDiv2;
  let root = document.documentElement;
    // make variable "root" to gain control over a CSS variable: https://css-tricks.com/updating-a-css-variable-with-javascript/
  if (who==="r") {
    focusDiv1 = document.getElementsByClassName("score-text-red")[0];
    focusDiv2 = document.getElementsByClassName("score-text-red")[1];
    focusDiv1.style.textDecoration = "underline";
    focusDiv2.style.textDecoration = "underline";
    focusDiv1 = document.getElementsByClassName("score-text-blue")[0];
    focusDiv2 = document.getElementsByClassName("score-text-blue")[1];
    focusDiv1.style.textDecoration = "none";
    focusDiv2.style.textDecoration = "none";
    root.style.setProperty('--hover-color', 'red');
    } else {
      focusDiv1 = document.getElementsByClassName("score-text-blue")[0];
      focusDiv2 = document.getElementsByClassName("score-text-blue")[1];
      focusDiv1.style.textDecoration = "underline";
      focusDiv2.style.textDecoration = "underline";
      focusDiv1 = document.getElementsByClassName("score-text-red")[0];
      focusDiv2 = document.getElementsByClassName("score-text-red")[1];
      focusDiv1.style.textDecoration = "none";
      focusDiv2.style.textDecoration = "none";
      root.style.setProperty('--hover-color', 'blue');
  }
}


function dropBall(s) {
  //extract the column number from the cubeID which is clicked, to variable s2
  if (endQuestion) {return}
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
      putFocus ("b");
    } else {
      ballClass = "blueball";
      grid[s2-1][ballsPerCol[s2-1]-1] = "b";  //add blue ball to grid array
      redsTurn = true;
      putFocus ("r");
    }

    let ballDiv = document.getElementsByClassName(ballClass)[0];
    let ballCloneDiv = ballDiv.cloneNode(false);
    ballCloneDiv.style.top = ballRow + "em";
    ballCloneDiv.style.top = -4.5 + "em";
    ballCloneDiv.style.left = ballCol + "em"; //give ball the proper coordinates
    sceneDiv.appendChild(ballCloneDiv); 
    $('audio#pop1')[0].play();
    $(ballCloneDiv).animate({top: ballRow +'em'});
    //$('audio#pop2')[0].play();
    $(ballCloneDiv).animate({top: ballRow-0.8 +'em'});
    $(ballCloneDiv).animate({top: ballRow +'em'});
    $(ballCloneDiv).animate({top: ballRow-0.1 +'em'});
    $(ballCloneDiv).animate({top: ballRow +'em'});
    //$('audio#pop2')[0].play();
    if (ballsPerCol[s2-1] === 1) {bringShadow (s2);}
    
    let who = grid[s2-1][ballsPerCol[s2-1]-1];
    if (controlVert (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    if (controlHor (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    //if (controlDiagonalRight (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    //if (controlDiagonalLeft (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    movesToMake -= 1;
    if (movesToMake<0.1) { endAnimation (); answer (true); } //all balls placed, game over, determine who has won
  } //drop ball 
} // end function dropBall

