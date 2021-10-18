"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

let isBaseRotating = false;
const rotateCylinder = (param) => setTimeout(() => {

    const MIN_LIMIT = -90*Math.PI/180;
    const MAX_LIMIT = 90*Math.PI/180;
    if(socleCyl.rotation.y <= MAX_LIMIT && socleCyl.rotation.y >= MIN_LIMIT){
        socleCyl.rotation.y += param * Math.PI/180;
    } else {
        if (socleCyl.rotation.y < 0)
            socleCyl.rotation.y = -90*Math.PI/180;
        else
            socleCyl.rotation.y = 90*Math.PI/180 
    }
    
    if (isBaseRotating)
    rotateCylinder(param)
})
function buttonBaseLeftDown(){
    isBaseRotating = true;
    let sensivity = document.getElementById('sensivity-slider').value;
    rotateCylinder(sensivity)
}
function buttonBaseRightDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isBaseRotating = true;
    rotateCylinder(-sensivity)
}
function buttonBaseUp(){
    isBaseRotating = false
}

let isArmMoving = false;
const moveArm = (param) => setTimeout(() => {

    const MIN_LIMIT = 0*Math.PI/180;
    const MAX_LIMIT = 85*Math.PI/180;
    if(arm.rotation.z <= MAX_LIMIT && arm.rotation.z >= MIN_LIMIT){
        arm.rotation.z += param * Math.PI / 180;
    } else {
        if (arm.rotation.z < 0)
            arm.rotation.z = 0*Math.PI/180;
        else
            arm.rotation.z = 85*Math.PI/180 
    }
    
    if (isArmMoving)
    moveArm(param)
})
function buttonArmFrontDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isArmMoving = true;
    moveArm(sensivity)
}
function buttonArmBackDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isArmMoving = true;
    moveArm(-sensivity)
}
function buttonArmUp(){
    isArmMoving = false
}

let isForeArmMoving = false;
const moveForeArm = (param) => setTimeout(() => {

    const MIN_LIMIT = -10*Math.PI/180;
    const MAX_LIMIT = 90*Math.PI/180;
    console.log("MIN_LIMIT: " + MIN_LIMIT)
    console.log("MAX_LIMIT: " + MAX_LIMIT)
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
}
function buttonForeArmBackDown(){
    let sensivity = document.getElementById('sensivity-slider').value;
    isForeArmMoving = true;
    moveForeArm(-sensivity)
}
function buttonForeArmUp(){
    isForeArmMoving = false
}


const gridxbutton = document.getElementById("gridx-input");
gridxbutton.addEventListener('click', (event) => {
    if(gridxbutton.checked){
        gridX = true;
        drawHelpers();
    } else {
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


/*
leftB =  document.getElementById("base-left");
leftB.addEventListener('click', (event) => {
  console.log("Je vais à gauche");
  socleCyl.rotation.y += 1*Math.PI/180;
});*/