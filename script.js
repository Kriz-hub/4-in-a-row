var scene = document.createElement("div");
scene.id = "scene";
scene.style.position = "relative";
scene.style.transformstyle = "preserve-3d";
//scene.style.animation = "scene-rotate var(--rotate-speed) linear";
scene.style.transform = "rotateY(0deg) translateY(0em)";

var floor = document.createElement("div");
scene.id = "floor";
scene.style.position = "absolute";
scene.style.top = "1em";
scene.style.width = "12em";
scene.style.height = "12em";
scene.style.background = "radial-gradient(#0000, #000 65%), repeating-conic-gradient(from 125deg, red, rgb(206, 198, 198) 90deg 180deg)";
scene.style.transform = "translate(-50%, -50%) rotateX(90deg)";

var newSelectCube = document.createElement("div");
newSelectCube.id = "cube-col1-row1";
newSelectCube.style.width=".5em";
newSelectCube.style.height=".5em";
newSelectCube.style.position="absolute";
newSelectCube.style.top=".5em";
newSelectCube.style.left="-1em";

var newLeftSideCube = document.createElement("div");
newLeftSideCube.id = "left-col1-row1"; 
newLeftSideCube.style.width="100%";
newLeftSideCube.style.height="100%";
newLeftSideCube.style.position="absolute";
newLeftSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newLeftSideCube.style.transform= "rotateY(270deg) translateZ(.25em)";

var newRightSideCube = document.createElement("div");
newRightSideCube.id = "right-col1-row1";
newRightSideCube.style.width="100%";
newRightSideCube.height="100%";
newRightSideCube.style.position="absolute";
newRightSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newRightSideCube.style.transform= "rotateY(90deg) translateZ(.25em)";

var newFrontSideCube = document.createElement("div");
newFrontSideCube.style.width="100%";
newFrontSideCube.style.height="100%";
newFrontSideCube.style.position="absolute";
newFrontSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newFrontSideCube.style.transform= "transform: translateZ(.25em)";

var newBackSideCube = document.createElement("div");
newBackSideCube.id = "back-col1-row1";
newBackSideCube.style.width="100%";
newBackSideCube.style.height="100%";
newBackSideCube.style.position="absolute";
newBackSideCube.style.boxshadow="0 0 0.5em rgba(48, 48, 48, 0.667) inset";
newBackSideCube.style.transform= "transform: rotateY(180deg) translateZ(.25em)";

scene.appendChild (floor);
scene.appendChild (newSelectCube);
newSelectCube.appendChild (newLeftSideCube);
newSelectCube.appendChild (newRightSideCube);
newSelectCube.appendChild (newFrontSideCube);
newSelectCube.appendChild (newBackSideCube);
document.body.appendChild (scene);
