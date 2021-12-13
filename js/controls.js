"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

const control_panel = document.getElementById("control-panel");

/*--------------- Arm Controls ---------------*/

let arm_controls = true;


let isBaseRotating = false;
//Makes the base rotating
const rotateBase = (param) => setTimeout(() => {

    //We put the maximum and minimum values that the base can reach
    const MIN_LIMIT = -90*Math.PI/180;
    const MAX_LIMIT = 90*Math.PI/180;

    if (isBaseRotating && arm_controls) {
         //If the base is between the limits, then it can rotate
        if(socleCyl.rotation.y <= MAX_LIMIT && socleCyl.rotation.y >= MIN_LIMIT){
            socleCyl.rotation.y += param * Math.PI/180;
        } 
        rotateBase(param);
    }
    else{ //If not, we give it the right position 
        // We use 0 to know on which side we are 
        if (socleCyl.rotation.y <= MAX_LIMIT && socleCyl.rotation.y >= MIN_LIMIT) socleCyl.rotation.y += 0;
        else if (socleCyl.rotation.y < 0) socleCyl.rotation.y = -90*Math.PI/180;
        else socleCyl.rotation.y = 90*Math.PI/180;
            
    }
})

//color of the buttons when a key is pressed, kind of a :active effect
const button_color = "#f00";

//buttons on the website
const base_right = document.getElementById('base-left'); 
const base_left = document.getElementById('base-right');

//Listeners on "right" and "left" buttons 
//if the button base-left is pressed (down), we make it rotate
//We also change the color of the button 
function buttonBaseLeftDown(){
    isBaseRotating = true;
    let sensivity = document.getElementById('sensivity-slider').value;
    rotateBase(-sensivity)
    base_right.style.background = button_color;
}

// Same thing for the base-right
function buttonBaseRightDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isBaseRotating = true;
    rotateBase(sensivity)
    base_left.style.background = button_color;
}

//if the button is released, the rotation is stopped and background are reset
function buttonBaseUp(){
    isBaseRotating = false
    base_left.style.background = 'none';
    base_right.style.background = 'none';
}

//First part of the arm 
let isArmMoving = false;
const moveArm = (param) => setTimeout(() => {
    //We put the maximum and minimum values that the part can reach
    const MIN_LIMIT = 0*Math.PI/180;
    const MAX_LIMIT = 85*Math.PI/180;

    if (isArmMoving && arm_controls) {
        //If the base is between the limits, then it can move
        if(arm.rotation.z <= MAX_LIMIT && arm.rotation.z >= MIN_LIMIT){
            arm.rotation.z += param * Math.PI / 180;
        }
    moveArm(param);

    }
    else {//If not, we recover on which limit it is and "freeze" it
        if (arm.rotation.z <= MAX_LIMIT && arm.rotation.z >= MIN_LIMIT) arm.rotation.z += 0;
        else if (arm.rotation.z <= 0) arm.rotation.z = 0*Math.PI/180;
        else arm.rotation.z = 85*Math.PI/180;
    }
})

//if a button is pressed (down), we move the arm on the direction corresponding
//We also change its color
function buttonArmFrontDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isArmMoving = true;
    moveArm(sensivity)
    arm_front.style.background = button_color;
}
function buttonArmBackDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isArmMoving = true;
    moveArm(-sensivity)
    arm_back.style.background = button_color;
}
//if a button is released, we stop rotation
//we also change its color
function buttonArmUp(){
    isArmMoving = false
    arm_front.style.background = 'none';
    arm_back.style.background = 'none';
}

//Same things for the second part of the arm 
let isForeArmMoving = false;
const moveForeArm = (param) => setTimeout(() => {

    const MIN_LIMIT = -10*Math.PI/180;
    const MAX_LIMIT = 90*Math.PI/180;

    if(isForeArmMoving && arm_controls){
        if (forearm.rotation.z <= MAX_LIMIT && forearm.rotation.z >= MIN_LIMIT) {
            forearm.rotation.z += param * Math.PI / 180;
        }
        moveForeArm(param);
    }
    else {
        if (forearm.rotation.z <= MAX_LIMIT && forearm.rotation.z >= MIN_LIMIT) forearm.rotation.z += 0;
        else if (forearm.rotation.z < 0) forearm.rotation.z = -10*Math.PI/180;
        else forearm.rotation.z = 90*Math.PI/180;  
    }
    
})
function buttonForeArmFrontDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isForeArmMoving = true;
    moveForeArm(sensivity)
    forearm_front.style.background = button_color;
}
function buttonForeArmBackDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isForeArmMoving = true;
    moveForeArm(-sensivity)
    forearm_back.style.background = button_color;
}
function buttonForeArmUp(){
    isForeArmMoving = false
    forearm_front.style.background = 'none';
    forearm_back.style.background = 'none';
}

// All these const are the buttons on the page (to change their colors)
const forearm_back = document.getElementById("fore-arm-back");
const forearm_front = document.getElementById("fore-arm-front");
const arm_back = document.getElementById("arm-back");
const arm_front = document.getElementById("arm-front");

//Keyboard events when a key is pressed
document.addEventListener('keydown', (e) => {
    //We recover the value of the sentivity in order to move the parts of the robot with the speed choosed. 
    let sensivity = document.getElementById('sensivity-slider').value;

    //depending on the key of the event that is pressed (down), we move the corresponding part of the robot.
    //We also change its color
    if (e.code === "ArrowRight"){
        isArmMoving = true;
        moveArm(sensivity);
        arm_back.style.background = button_color;
    }
    else if (e.code === "ArrowLeft"){
        isArmMoving = true;
        moveArm(-sensivity);
        arm_front.style.background = button_color;
    }
    else if (e.code === "ArrowUp"){
        isForeArmMoving = true;
        moveForeArm(-sensivity);
        forearm_back.style.background = button_color;
    }
    else if (e.code === "ArrowDown"){
        isForeArmMoving = true;
        moveForeArm(sensivity);
        forearm_front.style.background = button_color;
    }
    else if (e.keyCode == 81){
        isBaseRotating = true;
        rotateBase(-sensivity);
        //Style of the button when we press the key
        base_right.style.background = button_color;
    }
    else if (e.keyCode == 68){
        isBaseRotating = true;
        rotateBase(sensivity);
        //Style of the button when we press the key
        base_left.style.background = button_color;
    }    
});

//Keyboard events when a key is released
document.addEventListener('keyup', (e) => {
    //depending on the key of the event that is pressed (down)
    //we stop the movement of the corresponding part and reset its background
    if (e.code === "ArrowRight" || e.code === "ArrowLeft") {
        isArmMoving = false;
        arm_back.style.background = 'none';
        arm_front.style.background = 'none';
    } 
    else if(e.code === "ArrowUp" || e.code === "ArrowDown") {
        isForeArmMoving = false;
        forearm_back.style.background = 'none';
        forearm_front.style.background = 'none';
    }
    else{
        isBaseRotating = false;
        base_right.style.background = 'none';
        base_left.style.background = 'none';


    }
  });


/*--------------- Grid Controls ---------------*/


//these grid buttons allows us to display or not the x,y and z grids on the 3d scene
const gridxbutton = document.getElementById("gridx-input"); //Button
//When the button is clicked, if its status is checked, we allow the grid to be displayed and draw it
gridxbutton.addEventListener('click', (event) => {
    if(gridxbutton.checked){
        gridX = true;
        drawHelpers();
    } else { //Else we don't allow it to be displayed and we clear the grid with the function clearGrid (in axes.js)
        gridX = false;
        Coordinates.clearGrid("x")
    } 
});

const gridybutton = document.getElementById("gridy-input");
gridybutton.addEventListener('change', (event) => {
    if(gridybutton.checked){
        gridY = true;
        drawHelpers();
    }else{
        gridY = false;
        Coordinates.clearGrid("y");
    }
});

const gridzbutton = document.getElementById("gridz-input");
gridzbutton.addEventListener('change', (event) => {
    if(gridzbutton.checked){
        gridZ = true;
        drawHelpers();
    }else{
        gridZ = false;
        Coordinates.clearGrid("z");
    }
    
});

/*--------------- Visualizer Controls ---------------*/

const realtime_visualize = document.getElementById("real-time-visualize");
let dataInterval;

// If the button visualize is checked, we fetch data in an interval of 500ms
// it is like a for which fetches with infinity
realtime_visualize.addEventListener('change', (event) => {
    if (realtime_visualize.checked) {

        arm_controls = false;
        control_panel.style.background = "gray";
        let data;

        let previousData;
        dataInterval = setInterval(async () => {
            data = getLatest();

            
            let currentData = await getLatest();

            if (previousData) {
                let captorOne = currentData.values[0];
                let captorTwo = currentData.values[1];
                let oldCaptorTwo = previousData.values[1];

                let degres = angles([0, 0], [captorOne.x, captorOne.y], [captorTwo.x, captorTwo.y], [oldCaptorTwo.x, oldCaptorTwo.y]);

                //Rotation de la base
                socleCyl.rotation.y = degres["rotationAngle"] * Math.PI/180;

                //Rotation de la première partie du bras près de la base
                arm.rotation.z = degres["coudeBaseAngle"] * Math.PI / 180;

                //Rotation de la deuxième partie du bras
                forearm.rotation.z = degres["coudeAngle"] * Math.PI / 180;

            }

            previousData = currentData;

        }, 500);


        /** 
         * Si capteur affiche orientation (c'est le cas)
         * Simplement appliquer les rotations au robot
         * 
         * Sinon :
         * Récupérer les accélérations x,y ou z en fonction de la partie à bouger
         * Faire un calcul pour que l'accélération en m/s soit convertie (intervalle 500 ms -> m = ? )
         * 1 cm ~= 3,87096774193548 three.js unit
         * 
        */

    }else{
        //Else we stop the interval
        clearInterval(dataInterval);
        arm_controls = true;
        control_panel.style.background = "none";
    }
    
});


/*
leftB =  document.getElementById("base-left");
leftB.addEventListener('click', (event) => {
  console.log("Je vais à gauche");
  socleCyl.rotation.y += 1*Math.PI/180;
});*/