"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/


let isBaseRotating = false;
//Makes the base rotating
const rotateBase = (param) => setTimeout(() => {

    //We put the maximum and minimum values that the base can reach
    const MIN_LIMIT = -90*Math.PI/180;
    const MAX_LIMIT = 90*Math.PI/180;

    //If the base is between the limits, then it can rotate
    if(socleCyl.rotation.y <= MAX_LIMIT && socleCyl.rotation.y >= MIN_LIMIT){
        socleCyl.rotation.y += param * Math.PI/180;
    } else { //If not, we give it the right position 
        if (socleCyl.rotation.y < 0)// We use 0 to know on which side we are 
            socleCyl.rotation.y = -90*Math.PI/180;
        else
            socleCyl.rotation.y = 90*Math.PI/180 
    }
    
    if (isBaseRotating)
    rotateBase(param)
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

//First part of the arm 
let isArmMoving = false;
const moveArm = (param) => setTimeout(() => {
    //We put the maximum and minimum values that the part can reach
    const MIN_LIMIT = 0*Math.PI/180;
    const MAX_LIMIT = 85*Math.PI/180;
    //If the base is between the limits, then it can move
    if(arm.rotation.z <= MAX_LIMIT && arm.rotation.z >= MIN_LIMIT){
        arm.rotation.z += param * Math.PI / 180;
    } else {//If not, we recover on which limit it is and "freeze" it
        if (arm.rotation.z < 0)
            arm.rotation.z = 0*Math.PI/180;
        else
            arm.rotation.z = 85*Math.PI/180 
    }
    
    if (isArmMoving)
    moveArm(param)
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
    if(forearm.rotation.z <= MAX_LIMIT && forearm.rotation.z >= MIN_LIMIT){
        forearm.rotation.z += param * Math.PI / 180;
    } else {
        console.log(forearm.rotation.z)
        if (forearm.rotation.z < 0){
          forearm.rotation.z = -10*Math.PI/180;
          console.log("setting to -10")
        }
        else{
            forearm.rotation.z = 90*Math.PI/180 
            console.log("setting to 90")
        }
        
            
    }
    
    if (isForeArmMoving)
    moveForeArm(param)
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


const realtime_visualize = document.getElementById("real-time-visualize");
let dataInterval;

// If the button visualize is checked, we fetch data in an interval of 500ms
// it is like a for which fetches with infinity
realtime_visualize.addEventListener('change', (event) => {
    if (realtime_visualize.checked) {

        dataInterval = setInterval(() => {
            getData();
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
    }
    
});


/*
leftB =  document.getElementById("base-left");
leftB.addEventListener('click', (event) => {
  console.log("Je vais à gauche");
  socleCyl.rotation.y += 1*Math.PI/180;
});*/