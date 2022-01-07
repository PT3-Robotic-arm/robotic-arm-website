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
    e.preventDefault();
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
    e.preventDefault();
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
realtime_visualize.addEventListener('change', (event) => { //Interactions of the "visualize" button
    if (realtime_visualize.checked) { //If it is checked

        arm_controls = false; //We disbale arm controls
        control_panel.style.background = "gray"; // To mean that controls are disbaled, we change the bg of the controls panel

        dataInterval = setInterval(async () => { //Every 0.1 second, we execute this code, only if getLatest() returns something
        
            let currentData = await getLatest(); //We fetch data from the API's getLatest path, see fetch.js file
            //console.log(currentData);

            let sensorbottom = currentData[0]; // Sensor on the arm
            let sensortop = currentData[1]; // Sensor on the forearm

            //let sensorbottom_asin = Math.asin(sensorbottom.acc_x/10); Utilisé dans la première version
            //let sensortop_asin = Math.asin(sensortop.acc_x/10); Utilisé dans la première version

            /*
                We use a trigonometric circle, the data we get is acc_x and acc_y
                It matches with cos(angle) and sin(angle) 
                angle is the orientation of the arm and the forearm
            */
            let sensortop_sin = sensortop.acc_y/10; //Sinus of the top sensor

            let arm_angle = - Math.atan((sensorbottom.acc_x / 10) / (sensorbottom.acc_y / 10)); //Angle of the arm calculated with tan and arctan

            let forearm_angle = - Math.atan((sensortop.acc_x / 10) / (sensortop.acc_y / 10)); // Angle of the arm calculated with tan and arctan


            //console.log( "angle partie inférieure" + sensorbottom_asin);
            //console.log( "angle : " + sensortop_sin + ", "+ sensortop_asin);


            arm.rotation.z = arm_angle; //We apply the arm's angle to the Three.js model 

            let alpha = forearm_angle - arm_angle; //Alpha is the forearm angle - arm angle. 
            // We apply it to the forearm because we change the landmark (repère in french)

            if (sensortop_sin > 0 ) { //if sinus > 0, then we just apply the angle
                forearm.rotation.z = alpha;
                //forearm.rotation.z = - sensortop_asin + Math.PI; Used in first version
            }else{
                forearm.rotation.z = alpha + Math.PI; //else we add Math.PI To reverse it 
                //forearm.rotation.z = sensortop_asin; Used in first version
            }
        }, 100); //Reapeat every 0.1s

    }else{ // if visualize button if not checked
        clearInterval(dataInterval); //Clearing the interval = stop fetching 
        arm_controls = true; //Arm-controls are enabled again
        control_panel.style.background = "none"; //Control panel dosen't have the gray background anymore
    }
    
});