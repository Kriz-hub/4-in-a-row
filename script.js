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
//12 columns, will later be filled with: "r" (Red ball), "b" (blue ball) or "n" (none)
var settingPage = true; //go to setting page
var grid = [[], [], [], [], [], [], [], [], [], [], [], []];
var ballsPerCol = []; //how many balls are placed per column
var redsTurn = true; //who's turn, when blue then redsTurn=false
var player1Red = true;
var movesToMake = totalCols*totalRows;
var pointsRed = 0;
var pointsBlue =0;
buildCubes();

if ( window.orientation == 0 || window.orientation == 180) {
    // WHEN IN PORTRAIT MODE
  document.getElementById("scene").style.display = "none";
  document.getElementById("setting-page").style.display = "inline";
  settingPage = true;} 
else {
    // WHEN IN LANDSCAPE MODE
  document.getElementById("setting-page").style.display = "none";
  document.getElementById("scene").style.display = "inline";
  settingPage = false;}


function animateIntro () {
  let sceneDiv = document.getElementById("scene");
    $(sceneDiv).addClass("rotate");

    $(".redball").css("animation-name", "scene-rotate");
    $(".blueball").css("animation-name", "scene-rotate");
     // $(this).removeClass("rotate");
  //$("scene").animate('transform','rotate(' + 90 + 'deg)');
  //$("scene").css('transform','rotateY(' + 90 + 'deg)');
}


function togglePages() {
  if (settingPage) {
    document.getElementById("setting-page").style.display = "none";
    document.getElementById("scene").style.display = "inline";
    animateIntro ();
    settingPage = false;
    }
  else {
    document.getElementById("scene").style.display = "none";
    document.getElementById("setting-page").style.display = "inline";
    settingPage = true;
    }
}

//very cool, on phones the portraitmode gives a setting page, landscape mode gives the game
//eventlistener: https://stackoverflow.com/questions/5498934/detect-change-in-orientation-using-javascript
window.addEventListener("orientationchange", function() {
  if ( window.orientation == 0 || window.orientation == 180) {
    // WHEN IN PORTRAIT MODE
    document.getElementById("scene").style.display = "none";
    document.getElementById("setting-page").style.display = "inline";
    settingPage = true;
    
  } else {
    // WHEN IN LANDSCAPE MODE
    document.getElementById("setting-page").style.display = "none";
    document.getElementById("scene").style.display = "inline";
    settingPage = false;
  }
}, false);

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

function putFocus (who) {
  let focusDiv;
  let root = document.documentElement;
    // make variable "root" to gain control over a CSS variable: https://css-tricks.com/updating-a-css-variable-with-javascript/
  if (who==="r") {
    focusDiv = document.getElementById("score-text-red");  
    focusDiv.style.textDecoration = "underline";
    focusDiv = document.getElementById("score-text-blue");  
    focusDiv.style.textDecoration = "none";
    root.style.setProperty('--hover-color', 'blue');
    } else {
    focusDiv = document.getElementById("score-text-blue");  
    focusDiv.style.textDecoration = "underline";
    focusDiv = document.getElementById("score-text-red");  
    focusDiv.style.textDecoration = "none";
    root.style.setProperty('--hover-color', 'red');
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

    let who = grid[s2-1][ballsPerCol[s2-1]-1];
    if (controlVert (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    if (controlHor (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    //if (controlDiagonalRight (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    //if (controlDiagonalLeft (who, s2-1, ballsPerCol[s2-1]-1)) {givePoint (who);}
    movesToMake -= 1;
    if (movesToMake<0.1) {alert("Game Over");}
  } //drop ball 
} // end function dropBall

