var newSelectCube = document.getElementById("cube-col1-row1");
newSelectCube.style.width=".5em";
newSelectCube.style.height=".5em";
newSelectCube.style.position="absolute";
newSelectCube.style.top=".5em";
newSelectCube.style.left="-1em";

var newLeftSideCube = document.getElementById("left-col1-row1");
newLeftSideCube.style.width="100%";
newLeftSideCube.style.height="100%";
newLeftSideCube.style.position="absolute";
newLeftSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newLeftSideCube.style.transform= "rotateY(270deg) translateZ(.25em)";

var newRightSideCube = document.getElementById("right-col1-row1");
newRightSideCube.style.width="100%";
newRightSideCube.height="100%";
newRightSideCube.style.position="absolute";
newRightSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newRightSideCube.style.transform= "rotateY(90deg) translateZ(.25em)";

var newFrontSideCube = document.getElementById("front-col1-row1");
newFrontSideCube.style.width="100%";
newFrontSideCube.style.height="100%";
newFrontSideCube.style.position="absolute";
newFrontSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newFrontSideCube.style.transform= "transform: translateZ(.25em)";

var newBackSideCube = document.getElementById("back-col1-row1");
newBackSideCube.style.width="100%";
newBackSideCube.style.height="100%";
newBackSideCube.style.position="absolute";
newBackSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newBackSideCube.style.transform= "transform: rotateY(180deg) translateZ(.25em)";
