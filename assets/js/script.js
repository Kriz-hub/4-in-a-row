const computerName = "Compu";
const totalCols = 12; //number of cubes (=columns) on x-direction
const totalRows = 7; // number of cubes (=rows) on y-direction
const startCubeCol = -3; //-3em 
const startCubeRow = 0.5; //0.5em
const step = 0.5; //cubes and balls are 0.5em positioned from each other
const blinkingTime = 4000; //time to let balls blink after made 4 in a row

var busy=false;
var explanationListShown=true;
var firstTimeSettingPage=true;
//12 columns, will later be filled with: "r" (Red ball), "b" (blue ball) or "n" (none):
var grid = [[], [], [], [], [], [], [], [], [], [], [], []];
var ballsPerCol = []; //how many balls are placed per column
var computerOpponent = true;
var computerBeginsFirst = false;
var redsTurn = true; //who has to make a move, when blue then redsTurn=false
var player1Red = true; //player 1 has the red color by default
var fullScreenWish = false;
var settingPageLeft = false;
var endQuestion = false; //when pressed on exit, this will be true
var gameEnded = false;
var player1Name = "Player1"; //default player names
var player2Name = "Player2";
var movesToMake = totalCols*totalRows; // max amount of moves
var pointsRed = -1; //points of red player, must be -1, when game starts they will be 0
var pointsBlue =-1;
//first game environment will be build with opacity 0 because otherwise there can be a little flickering effect
buildGameScene();
document.getElementsByClassName("ballshadow")[0].style.display= "none";
document.getElementById("scene").style.display = "none";
//game environment is made none, first setting page is displayed
document.getElementById("bodyID").style.opacity="1";
eventListeners ();


//to give it an app look, the game can be displayed without URL input area
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

function phoneDevice (AlsoDetectTabletDevice) { // When is a phone device (and tablet) used
  let pixelAmount;
  if (AlsoDetectTabletDevice) {pixelAmount=1050} else {pixelAmount=950};
  if (screen.width<pixelAmount && screen.height<pixelAmount) 
    {return true
    } else {
      if (AlsoDetectTabletDevice) {if (screen.width<screen.height) {return true} else {return false}}
  }
}


function eventListeners () {
  let collu = document.getElementsByClassName("collapsible")[0];
  let introLine = document.getElementsByClassName("content")[0];
  let explanation = document.getElementsByClassName("content")[1];
  collu.addEventListener("click", function() { //for showing collapsible with gamerules in it
    if (explanation.style.display === "inline") {
      setTimeout(() => {introLine.style.display = "inline"; explanation.style.display = "none";}, 300); 
      $(explanation).animate({opacity: '0'}, '3s')
    } else {
      introLine.style.display = "none"; explanation.style.display = "inline";
      $(explanation).animate({opacity: '1'}, '3s')
    }
  });

  const radio1 = document.querySelector("#option-1");
  const radio2 = document.querySelector("#option-2");
  //choose number of players
  radio1.addEventListener("click", () => {enableComputerPlayer();});
  radio2.addEventListener("click", () => {disableComputerPlayer();})
}


// https://stackoverflow.com/questions/1248081/how-to-get-the-browser-viewport-dimensions
function decideFontsizeSmallerDevice() { 
  // a different font size for phones with a diffrent aspect ratio 
  // in this 3D world a higher font-size value gives a closer look to the cubes
  let screenCheck=document.getElementById("bodyID");
  $(document).ready(function(){
    if(phoneDevice(false)) {
      if (screen.width/screen.height>1.78) {screenCheck.style.fontSize =  "5vw";
      } else {screenCheck.style.fontSize =  "7vw";}
      // right now 7vw is already a default value but this could change, therefore I leave this here
    } 
  });
}



function improvedInput (name) {
  /*when player name is given, spaces before 1st character will be erased. Also are spaces 
  erased when it are just that. Spaces after 1st character are OK */
  let i;
  let name2="";
  let spacesCheckBeforeChar=true;
  if (name.length===0) { 
    return name2
  } else { 
    for (i = 0; i<name.length; i++) {
      if (name.charAt(i)===" ") {
        if (!spacesCheckBeforeChar) {name2+=name.charAt(i)}
      } else {
        spacesCheckBeforeChar=false;
        name2+=name.charAt(i);
      }
    }
    return name2;
  }
}


function enableComputerPlayer() {
  /*when 2 players is choosen, the computer player div with it's difficulty levels must be displayed
  Also a reset must taken place get the form into start position for input one player*/
  document.getElementById("color-player1").innerHTML = "Player1";
  document.getElementById("color-player2").innerHTML = "Player2";
  document.getElementById("player1-form").value = "";
  document.getElementById("player2-form").value = "";
  document.getElementById("player1-form").placeholder = "Enter Player 1";
  document.getElementById("player2-form").placeholder = "Enter Player 2";
  if (computerOpponent) {player2Name=computerName;} 
    else {player2Name = document.getElementById("player2-form").value;}
  let pl2Form = document.getElementById("player2-form");
  pl2Form.disabled = true; //because there is a computer player, no player2 name can be filled in on form
  computerOpponent = true;  
  let compLevelDiv = document.getElementById("play-level-comp");
  setTimeout(() => {$(compLevelDiv).animate({opacity: '1'}, '3s')}, 300); //give the appearance a smooth animation
  if(phoneDevice(true)) {
    /*When using a phone the computer play level div was hidden under the following div. That div must move 
    down to give space to the computer play level div. Also mousepointer must be activated again*/
    $(compLevelDiv).removeClass("remove-mouse-pointer"); 
    let divUnderCompLevel = document.getElementById("form-and-color-choice");
    $(divUnderCompLevel).animate({marginTop: '1vh'}, '3s') 
  }
}

function disableComputerPlayer() {
 /*when 1 player is choosen, the computer player div with it's difficulty levels must be made hidden
  Also a reset must taken place get the form into start position for input two players*/
  document.getElementById("color-player1").innerHTML = "Player1";
  document.getElementById("color-player2").innerHTML = "Player2";
  document.getElementById("player1-form").value = "";
  document.getElementById("player2-form").value = "";
  document.getElementById("player1-form").placeholder = "Enter Player 1";
  document.getElementById("player2-form").placeholder = "Enter Player 2";
  let pl2Form = document.getElementById("player2-form");
  pl2Form.disabled = false; //because there is no computer player, player2 name must be filled on the form
  computerOpponent = false;
  let compLevelDiv=document.getElementById("play-level-comp");
  $(compLevelDiv).animate({opacity: '0'}, '3s');
  if(phoneDevice(true)) { 
    /*when number of players is changed to two, computerplayer-column disappear. a collapse must be taken 
    place to close the gap. because every device has a different height, the amount of movement differ,
    therefore comming variables are needed to calculate this. This is not for large tablets of laptops because 
    the computerplayer-column there is side by side. */
    const normalScreenheight=640;
    const maxScreenheight=1366;
    const normalMarginTop=-32;
    const maxMargintop=-16;
    let difHeight=maxScreenheight-normalScreenheight;
    let difMargin=maxMargintop-normalMarginTop;
    let heightDivide=(screen.height-normalScreenheight)/difHeight;
    let marginT = normalMarginTop + heightDivide*difMargin + "vh";
    let divUnderCompLevel = document.getElementById("form-and-color-choice");
    $(compLevelDiv).addClass("remove-mouse-pointer");
    setTimeout(() => {$(divUnderCompLevel).animate({marginTop: marginT}, '3s');}, 300); 
  }
}



function getNames () { 
  /*after pressing the submit button the input of player names are tested. By using Function ImpovedInput
  wrongly placed spaces are removed. When inpoutlines are empty the placeholder text must return */
  player1Name = document.getElementById("player1-form").value;
  player1Name = improvedInput (player1Name);
  document.getElementById("player1-form").value = player1Name;
  if (player1Name==="") {document.getElementById("player1-form").placeholder = "Enter Player 1"}
  if (computerOpponent) {player2Name=computerName;
  } else {
    player2Name = document.getElementById("player2-form").value;
    player2Name = improvedInput (player2Name);
    document.getElementById("player2-form").value = player2Name;
    if (player2Name==="") {document.getElementById("player2-form").placeholder = "Enter Player 2"}
  }
  //When input is allright the player names must placed in the next div where player color can be choosen
  if (player1Name!="" && player2Name!="") { 
    document.getElementById("color-player1").innerHTML = player1Name;
    document.getElementById("color-player2").innerHTML = player2Name;
  } else {
    //with at least one empty player line a red blinking start to point out that there is an error.
    let formDiv = document.getElementsByClassName("bring-shadow")[3];
    $(formDiv).addClass("blinking-red");
    setTimeout(() => {$(formDiv).removeClass("blinking-red")}, 3000); 
  }
}

function togglePlayerColor () { //this div is to determine who gets what color
    if (player1Red) {
        player1Red=false;
        document.getElementById("color-player1").style.background = "blue";
        document.getElementById("color-player2").style.background = "red";   
    } else {
        player1Red=true;
        document.getElementById("color-player1").style.background = "red";
        document.getElementById("color-player2").style.background = "blue";
    }
    let pl=player1Name;
    player1Name=player2Name;
    player2Name=pl;
    //only relevant when there is a computer player:
    if (player1Name===computerName) {computerBeginsFirst=true;} else {computerBeginsFirst=false;}
    
}


function togglePages() { // change from setting page to game page
  //with this conditions the input area starts to blink red because there is an error:
  if (player1Name === "Player1" || player2Name === "Player2" || player1Name === "" 
      || player2Name === "" || player2Name === player1Name) {
    let formDiv = document.getElementsByClassName("bring-shadow")[3];
    $(formDiv).addClass("blinking-red");
    setTimeout(() => {$(formDiv).removeClass("blinking-red")}, 3000); 
    return;
  }
  document.getElementById("setting-page").style.display = "none";
  document.getElementById("scene").style.display = "inline";
  decideFontsizeSmallerDevice(); //when using a phone fontsize will be changed
  let bodyID = document.getElementById("bodyID");
  $(bodyID).addClass("give-game-start-fade-in");
  
  //when device is in portrait mode, this hint appears:
  //https://stackoverflow.com/questions/15078213/javascript-insertbefore-in-a-different-div-both-within-a-parent-div
  let reference = document.getElementById('scene');
  let newDiv = document.createElement('div');
  let newH3 = document.createElement('h3');
  newDiv.id = "landscape-orientation";
  newH3.id = "orientation-text";
  newH3.innerText = "You may turn your device to landscape mode for a better game experience";
  newDiv.appendChild(newH3);
  document.body.insertBefore(newDiv, reference);

  fullScreenWish = document.getElementById("check-it").checked;
  if (fullScreenWish) {toggle_full_screen()} //remove the URL area to give it an app appearance
  givePoint ("b"); //give point to get opponents to zero from -1
  givePoint ("r");
  settingPageLeft = true;
  if (computerOpponent && computerBeginsFirst) { //when computer plays and go first, then a move will be made:
    putFocus ('r');
    setTimeout(() => {computerSaysIAmThinking ('r');}, 500); 
    setTimeout(() => {computerMove('r');}, 1500); 
    busy=true;
  }
}

function buildGameScene () {    
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
          grid[col-1][row-1]="n"; //fill grid with "n", that means none, no balls this moment
          cubeRow -= step;
          cubeCloneDiv = cubeDiv.cloneNode(true);
          cubeCloneDiv.style.top = cubeRow + "em";
          cubeCloneDiv.style.left = cubeCol + "em";
          cubeCloneDiv.id = "col" + col + "row" + row; //give each cube an ID from "col1row1" to "col12row7"
          sceneDiv.appendChild(cubeCloneDiv);
      }
  }
  // build extra cubes to hold 2 big score-cubes
  // these are the two legs to hold left scorecube
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "-5.25em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg1a";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "-5.25em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg1b";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "-3.75em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg2a";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "-3.75em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg2b";
  sceneDiv.appendChild(cubeCloneDiv);
  // these are the two legs to hold right scorecube
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow  + "em";
  cubeCloneDiv.style.left = "3.25em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg3a";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "3.25em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg3b";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow + "em";
  cubeCloneDiv.style.left = "4.75em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg4a";
  sceneDiv.appendChild(cubeCloneDiv);
  cubeCloneDiv = cubeDiv.cloneNode(true);
  cubeCloneDiv.style.top = startCubeRow-step + "em";
  cubeCloneDiv.style.left = "4.75em";
  cubeCloneDiv.style.background = "darkslategray";
  cubeCloneDiv.id = "leg4b";
  sceneDiv.appendChild(cubeCloneDiv);

  //make second message cube, the first one already exist in CSS
  let cubeMessageDiv = document.getElementsByClassName("message-cube")[0];
  let cubeMessageCloneDiv = cubeMessageDiv.cloneNode(true);
  $(cubeMessageCloneDiv).addClass("messagecube-position");
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

  /*The cube with 'Exit' on it is 'CSS family' of the cubes with blue and red scores, therefore it appears on the
  wrong coordinates. Each site of the cube must move forwards by transform rotation and translation This Exit cube is
  already made in CSS*/
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
} // end function buildGameScene


function endAnimation () {
//When pressed on the cube with "Exit", 2 message-cube appear with the question to leave the game
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
    $(sceneDiv).addClass("rotate"); //scene rotation starts
    $(".redball").css("animation-name", "scene-rotate");
    $(".blueball").css("animation-name", "scene-rotate");
    makeThemScoreBlocks_MakeThemYesNoBlocks (false); 
    //the blocks where normally are the scores on change in blinking cubes with "Yes" or "No" where can be clicked on
    let redCube = document.getElementById("score-cube-red");
    let greenCube = document.getElementById("score-cube-blue");
    $(redCube).addClass("blinking-red");
    $(greenCube).addClass("blinking-green");
    let root = document.documentElement;
    //the CSS variables change to other colors
    root.style.setProperty('--left-cube-text-color', 'white');
    root.style.setProperty('--right-cube-text-color', 'white');
    root.style.setProperty('--hover-color', 'gray');
    endQuestion=true;
  }
}

function answer (q) {
if (endQuestion && !gameEnded) {
  makeThemScoreBlocks_MakeThemYesNoBlocks (true);
  var root = document.documentElement;
  //after question to leave the game or not, the blocks get back there opponent scores
  root.style.setProperty('--left-cube-text-color', 'red');
  root.style.setProperty('--right-cube-text-color', 'blue');
  let redCube = document.getElementById("score-cube-red");
  let greenCube = document.getElementById("score-cube-blue");
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
    let p1;
    let p2;
    if (redsTurn) {
      p1 = document.getElementsByClassName("score-text-red")[0];
      p2 = document.getElementsByClassName("score-text-red")[1]; 
    } else {
      p1 = document.getElementsByClassName("score-text-blue")[0];
      p2 = document.getElementsByClassName("score-text-blue")[1]; 
    }
    p1.style.textDecoration = "none";
    p2.style.textDecoration = "none";
    setTimeout(() => {if (fullScreenWish) {toggle_full_screen()}; 
          root.style.setProperty('--hover-color', 'gray')}, 3000); //after a few seconds full screen is ended
  } else { //When Clicked 'NO' to end this game, back to game mode:
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
    if (redsTurn) {root.style.setProperty('--hover-color', 'red');}
       else {root.style.setProperty('--hover-color', 'blue');}
    endQuestion=false;
  }
}
}


function bringShadow (colNr) { //when 1st ball is placed in row, a shadow appears on ground
  const rowNr="row1" // shadow is always on the ground, so part of the cube's ID we look for, will be row1
  let cubeDiv= document.getElementById('col' + colNr + rowNr);
  let shadowDiv = document.getElementsByClassName("ballshadow")[0];
  let shadowCloneDiv = shadowDiv.cloneNode(true);
  shadowCloneDiv.style.display = "inline";
  cubeDiv.appendChild(shadowCloneDiv);
  $(shadowCloneDiv).animate({opacity: "1"});
}


function blinkingBall (who, x, y) { //when 4 in a row is made, balls begin to blink 
  let ballID = "bcol" + (x+1) + "brow" + (y+1);
  let ballDiv = document.getElementById(ballID);
  if (who==='r') {
    $(ballDiv).addClass("redball-blink");
    setTimeout(() => {$(ballDiv).removeClass("redball-blink");}, blinkingTime); 
  }
  if (who==='b') {$(ballDiv).addClass("blueball-blink");
  setTimeout(() => {$(ballDiv).removeClass("blueball-blink");}, blinkingTime); 
  }
}


function controlHor (who, x, y) {
  //a horizontal count of balls of the same color to check if 4 in a row is made after a ball drop:
  let countLeft=0;
  let countRight=0;
  let gridCondition = true;

  while (x + countRight < totalCols-1 && gridCondition)  { 
    if (grid[x + countRight + 1][y]===who) {countRight+=1;} else {gridCondition = false;}
  } 
  
  gridCondition = true;
  while (x - countLeft > 0 && gridCondition) { 
    if (grid[x - countLeft - 1][y]===who) {countLeft+=1;} else {gridCondition = false;}
  }

  let a=0;
  if (countLeft===3 || countRight===3) {
    while (a<countLeft) {a+=1; blinkingBall(who, x-a, y)}
    a=0;  while (a<countRight) {a+=1; blinkingBall(who, x+a, y)} 
    blinkingBall(who, x, y);
    return true;
    } else {
      if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {
        a=0; while (a<countLeft) {a+=1; blinkingBall(who, x-a, y)}
        a=0; while (a<=countRight) {a+=1; blinkingBall(who, x+a, y)} 
        blinkingBall(who, x, y);
        return true;
    } else {return false}
  }
}


function controlVert (who, x, y) {
  //a vertical count of balls of the same color to check if 4 in a row is made after a ball drop:
  let countDown = 0;
  let gridCondition = true;
  
  while (y - countDown > 0 && gridCondition) {
    if (grid[x][y - countDown - 1] === who) {countDown+=1} else {gridCondition = false;}
  }

  let a=-1;
  if (countDown===3) {
    while (a<countDown) {a+=1; blinkingBall(who, x, y-a)}
    return true;} else {return false;}
}


function controlDiagonalRight (who, x, y) {
  //a diagonal count of balls of the same color to check if 4 in a row is made after a ball drop:
  let countLeft = 0;
  let countRight = 0; 
  let gridCondition = true;

   while (x + countRight < totalCols-1 && y + countRight < totalRows-1 && gridCondition) {
    if (grid[x + countRight + 1][y + countRight + 1]===who) {countRight+=1;} else {gridCondition = false;}
  }

  gridCondition = true;
  while (x - countLeft > 0 && y - countLeft > 0 && gridCondition) {
    if (grid[x - countLeft - 1][y - countLeft - 1]===who) {countLeft+=1;} else {gridCondition = false;}
  }

  let a=0;
  if (countLeft===3 || countRight===3) {
    while (a<countLeft) {a+=1; blinkingBall(who, x-a, y-a)}
    a=0; while (a<countRight) {a+=1; blinkingBall(who, x+a, y+a)}
    blinkingBall(who, x, y);
    return true;
    } else {
      if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {
        while (a<countLeft) {a+=1; blinkingBall(who, x-a, y-a)}
        a=0; while (a<countRight) {a+=1; blinkingBall(who, x+a, y+a)}
        blinkingBall(who, x, y); 
        return true;} 
      else {return false}
  }
} // function controlDiagonalRight


function controlDiagonalLeft (who, x, y) {
  //a diagonal count of balls of the same color to check if 4 in a row is made after a ball drop:
  let countLeft = 0;
  let countRight = 0; 
  let gridCondition = true;

  while (x + countRight < totalCols-1 && y - countRight > 0 && gridCondition) {
    if (grid[x + countRight + 1][y - countRight - 1]===who) {countRight+=1;} else {gridCondition = false;}
  }

  gridCondition = true;
  while (x - countLeft > 0 && y + countLeft < totalRows-1 && gridCondition) {
    if (grid[x - countLeft - 1][y + countLeft + 1]===who) {countLeft+=1;} else {gridCondition = false;}
  }

  let a=0;
  if (countLeft===3 || countRight===3) {
    while (a<countLeft) {a+=1; blinkingBall(who, x-a, y+a)}
    a=0; while (a<countRight) {a+=1; blinkingBall(who, x+a, y-a)}
    blinkingBall(who, x, y); 
    return true;
  } else {
    if (countLeft < 3 && countRight < 3 && countLeft + countRight >= 3) {
      while (a<countLeft) {a+=1; blinkingBall(who, x-a, y+a)}
      a=0; while (a<countRight) {a+=1; blinkingBall(who, x+a, y-a)}
      blinkingBall(who, x, y); 
      return true;} 
         else {return false}
  }
} // function controlDiagonalLeft


function makeThemScoreBlocks_MakeThemYesNoBlocks (scoreBlocks) { //scoreBlocks is a boolean
  //this function is needed to change the meaning of the blocks where normally the scores of 
  //red and blue is being displayed. after Exit is clicked it becomes yes or no to quit
  if (scoreBlocks) { //when scoreBlocks is true the cubes are in default mode
    pointsRed--;
    pointsBlue--; // when quit game is 'no' everything must be restored therefore Givepoint function is used
    if (redsTurn) {
      givePoint ('b'); givePoint ('r'); putFocus ('r');
    } else {
      givePoint ('r'); givePoint ('b'); putFocus ('b');
    }
  } else { //after clicked on the exit cube the score blocks change in blinking yes-or-no cubes
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


function givePoint (who, justShowScore) { 
  /*add a point to the opponent who makes 4 in a row. At the end of the game this function is used to show the score
  without giving points, in that case justShowScore=true */
  let scoreP1;
  let scoreP2;
  if (who==="r") {
    if (!justShowScore) {pointsRed++; busy=false}
    scoreP1 = document.getElementsByClassName("score-text-red")[0];
    scoreP2 = document.getElementsByClassName("score-text-red")[1]; 
    scoreP1.innerText = player1Name + ": " + pointsRed;
    scoreP2.innerText = player1Name + ": " + pointsRed;
    } else {
    if (!justShowScore) {pointsBlue++; busy=false}
    scoreP1 = document.getElementsByClassName("score-text-blue")[0];
    scoreP2 = document.getElementsByClassName("score-text-blue")[1]; 
    scoreP1.innerText = player2Name + ": " + pointsBlue;
    scoreP2.innerText = player2Name + ": " + pointsBlue;
  }
}

function computerSaysIAmThinking (who) { 
  //give a delay when a computer player does it's turn to give the illusion that it needs time to make a move
  let focusDiv1;
  if (who==="r") {
    focusDiv1 = document.getElementsByClassName("score-text-red")[0];
    focusDiv1.innerText = "Thinking";
    } else {
      focusDiv1 = document.getElementsByClassName("score-text-blue")[0];
      focusDiv1.innerText = "Thinking";
  }
}

function putFocus (who) {
  let focusDiv1;
  let focusDiv2;
  let root = document.documentElement;
    // make variable "root" to gain control over a CSS variable: https://css-tricks.com/updating-a-css-variable-with-javascript/
  if (who==="r") { //when red is to move the left red score cube gets an underline on it's text, the blue scorecube looses that underlining
    focusDiv1 = document.getElementsByClassName("score-text-red")[0];
    focusDiv2 = document.getElementsByClassName("score-text-red")[1];
    focusDiv1.style.textDecoration = "underline";
    focusDiv2.style.textDecoration = "underline";
    focusDiv1 = document.getElementsByClassName("score-text-blue")[0];
    focusDiv2 = document.getElementsByClassName("score-text-blue")[1];
    focusDiv1.style.textDecoration = "none";
    focusDiv2.style.textDecoration = "none";
    setTimeout(() => {root.style.setProperty('--hover-color', 'red');}, 1000);
    } else { //when blue is to move the right blue score cube gets an underline on it's text, the red scorecube looses that underlining
      focusDiv1 = document.getElementsByClassName("score-text-blue")[0];
      focusDiv2 = document.getElementsByClassName("score-text-blue")[1];
      focusDiv1.style.textDecoration = "underline";
      focusDiv2.style.textDecoration = "underline";
      focusDiv1 = document.getElementsByClassName("score-text-red")[0];
      focusDiv2 = document.getElementsByClassName("score-text-red")[1];
      focusDiv1.style.textDecoration = "none";
      focusDiv2.style.textDecoration = "none";
      setTimeout(() => {root.style.setProperty('--hover-color', 'blue');}, 1000);
  }
}

function computerMove(who) { 
  // the move of the computer has no AI for now, it just make a random move
  let colsAvailable=[];
  let colsAvailableAmount=0;
  let col;
  //look for available columns which aren't full of balls yet where a move can be made:
  for (col = 1; col<=totalCols; col++) {
    if (ballsPerCol[col-1]<totalRows) {colsAvailableAmount += 1; colsAvailable[colsAvailableAmount]=col;}}

  //thanks to https://www.w3schools.com/js/tryit.asp?filename=tryjs_random_0_9 how to get random numbers
  let choosenArrayNr=Math.floor(Math.random() * colsAvailableAmount) + 1;
  let colNr = colsAvailable[choosenArrayNr];
  dropBall(colNr);
  givePoint (who, true);
  movesToMake -= 1;
  //when all balls are played then game must be ended by starting function endAnimation:
  if (movesToMake<0.1) { endAnimation (); answer (true); }
}

function personMove (s) { //get the collumn in which a ball had dropped during a person's move
  //extract the column number from the cubeID which is clicked, to variable s2
  let s2 = s.slice(3,5);
  let s3 = s2.slice(1,2);
  if (isNaN(s3)===true) {s2=s.slice(3,4);}
  return s2
}


function dropBall(colNr) { // a move is made, now certain things has to be done:
    //the ball amount per column which is choosen to put a ball in must increase by one:
    ballsPerCol[colNr-1] += 1;
    let ballRow = 0.5 - (ballsPerCol[colNr-1]-1) * step;
    let ballCol = startCubeCol + (colNr-1) * step; 
    // ballRow and ballColl are x, y coordinates where the ball has to come

    //decide the color's ball and what CSS class must be choosen
    let ballClass;
    if (redsTurn===true) {
      ballClass = "redball";
      grid[colNr-1][ballsPerCol[colNr-1]-1] = "r"; //add red ball to grid array
      redsTurn = false;
      putFocus ("b");
    } else {
      ballClass = "blueball";
      grid[colNr-1][ballsPerCol[colNr-1]-1] = "b";  //add blue ball to grid array
      redsTurn = true;
      putFocus ("r");
    }

    let sceneDiv = document.getElementById("scene");
    let ballDiv = document.getElementsByClassName(ballClass)[0];
    let ballCloneDiv = ballDiv.cloneNode(false);
    ballCloneDiv.style.top = -4.5 + "em"; //place the ball high to get a falling effect later
    ballCloneDiv.style.left = ballCol + "em"; //give ball the X-coordinate
    ballCloneDiv.id = "bcol" + colNr + "brow" + ballsPerCol[colNr-1];
    sceneDiv.appendChild(ballCloneDiv); 
 
    $('audio#pop1')[0].play(); //give a falling sound
    $(ballCloneDiv).animate({top: ballRow +'em'}); //let the ball drop with an animation
    $(ballCloneDiv).animate({top: ballRow-0.8 +'em'}); //give it a big bounce
    $(ballCloneDiv).animate({top: ballRow +'em'}); //drop again
    $(ballCloneDiv).animate({top: ballRow-0.1 +'em'}); //give the ball a small bounce
    $(ballCloneDiv).animate({top: ballRow +'em'}); //make the final drop
    if (ballsPerCol[colNr-1] === 1) {setTimeout(() => { bringShadow (colNr); }, 1000);} //after the first ball a shadow appear
    busy=false; 
    //After falling of the ball 4 in a row can be made, check it horizontally, vertically and diagonally
    let who = grid[colNr-1][ballsPerCol[colNr-1]-1];
    if (controlVert (who, colNr-1, ballsPerCol[colNr-1]-1)){busy=true; setTimeout(() => { givePoint (who, false);}, blinkingTime);}
    if (controlHor (who, colNr-1, ballsPerCol[colNr-1]-1)) {busy=true; setTimeout(() => { givePoint (who, false);}, blinkingTime);}
    if (controlDiagonalRight (who, colNr-1, ballsPerCol[colNr-1]-1)){busy=true; setTimeout(() => { givePoint (who, false);}, blinkingTime);}
    if (controlDiagonalLeft (who, colNr-1, ballsPerCol[colNr-1]-1)) {busy=true; setTimeout(() => { givePoint (who, false);}, blinkingTime);}
} // end function dropBall


function makeMove (s) { 
  if (busy || endQuestion) {return;} //when pressed on the exitcube to finish it is not possible anymore to make a move
  let colNr = personMove (s);
  if (ballsPerCol[colNr-1] < totalRows) {dropBall(colNr);} else {return;}
  movesToMake -= 1;
  if (movesToMake<0.1) { endAnimation (); answer (true); } //all balls placed, game over, determine who has won
  else {
    if (computerOpponent) {
      let who;
      if (redsTurn) {who='r'} else {who='b'}
      let extraTime=0;
      if (busy) {extraTime = blinkingTime} 
      //when the opponent made 4 in a row the computer must wait extra with it's move, it's 'busy'
      busy=true; //the mouseclicking events in the grid are on hold until the computer move is made
      setTimeout(() => {computerSaysIAmThinking (who);}, 400+extraTime); 
      setTimeout(() => {computerMove(who);}, 900+extraTime); 
    }
  }
}