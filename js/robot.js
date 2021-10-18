"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

const clock = new THREE.Clock();

let camera, scene, renderer;
let cameraControls, effectController;
let gridX;
let gridY = false;
let gridZ = false;
let axes = true;
let ground = false;
let arm, forearm, socleCyl, body, handLeft, handRight;
let leftB, rightB, topB, bottomB;


function fillScene() {
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x808080, 2000, 4000);

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0x222222);
    const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light.position.set(200, 400, 500);
    const light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
    light2.position.set(-500, 250, -200);
    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    // Robot definitions
    const robotHandLeftMaterial = new THREE.MeshPhongMaterial({
        color: 0xCC3399,
        specular: 0xCC3399,
        shininess: 20
    });
    const robotHandRightMaterial = new THREE.MeshPhongMaterial({
        color: 0xDD3388,
        specular: 0xDD3388,
        shininess: 20
    });
    const robotBaseMaterial = new THREE.MeshPhongMaterial({
        color: 0x6E23BB,
        specular: 0x6E23BB,
        shininess: 20
    });
    const robotForearmMaterial = new THREE.MeshPhongMaterial({
        color: 0xF4C154,
        specular: 0xF4C154,
        shininess: 100
    });
    const robotUpperArmMaterial = new THREE.MeshPhongMaterial({
        color: 0xFF0000,
        specular: 0x95E4FB,
        shininess: 100
    });

    //Faire tout le socle avec une fonction !!

    const hsocleCube = 25;
    const lsocleCube = 70;

    const armYpos = 53;

    const socleCube = new THREE.Mesh(
        new THREE.BoxGeometry(lsocleCube, hsocleCube, lsocleCube),
        robotBaseMaterial);
    //torus.rotation.x = 90 * Math.PI/180;
    socleCube.position.y = hsocleCube / 2;
    scene.add(socleCube);

    //------------------------------
    /*
    var hsocleCyl1 = 9;
    var dsocleCyl = 57/2;

    var hsocleCyl2 = 39;
    var dTopSocleCyl2 = 57/2-5;


    var socleCyl1 = new THREE.Mesh(
        new THREE.CylinderGeometry( dsocleCyl, dsocleCyl, hsocleCyl1, 40 ),
        robotBaseMaterial
    );
    socleCyl1.position.y = hsocleCube+hsocleCyl1/2;
    //socleCyl1.position.z -= 4;
    scene.add(socleCyl1);


    var socleCyl2 = new THREE.Mesh(
        new THREE.CylinderGeometry( dTopSocleCyl2, dsocleCyl, hsocleCyl2, 4 ),
        robotBaseMaterial
    );
    socleCyl2.position.y = hsocleCube+hsocleCyl2/2;
    socleCyl2.rotation.y += 95;
    scene.add(socleCyl2);
    */
    //-----------------------------

    forearm = new THREE.Object3D();
    const faLength = 57;

    createRobotExtender(forearm, faLength, robotForearmMaterial);

    arm = new THREE.Object3D();
    const uaLength = 52;

    createRobotCrane(arm, uaLength, robotUpperArmMaterial);

    socleCyl = new THREE.Object3D();

    createSocleCyl(socleCyl, robotBaseMaterial);

    // Move the forearm itself to the end of the upper arm.
    forearm.position.y = uaLength;
    arm.add(forearm);

    arm.position.y += armYpos;

    //Put the socle
    socleCyl.add(arm);

    scene.add(socleCyl);

    const handLength = 38;

    handLeft = new THREE.Object3D();
    createRobotGrabber(handLeft, handLength, robotHandLeftMaterial);
    // Move the hand part to the end of the forearm.
    handLeft.position.y = faLength;
    forearm.add(handLeft);

    // Add the second grabber handRight. Note that it uses a different color, defined above
    handRight = new THREE.Object3D();
    createRobotGrabber(handRight, handLength, robotHandRightMaterial);
    // Move the hand part to the end of the forearm.
    handRight.position.y = faLength;
    forearm.add(handRight);
}

function createSocleCyl(part, material) {
    const dsocleCyl = 57 / 2;

    const hsocleCyl2 = 25;
    const dTopSocleCyl2 = 57 / 2 - 5;

    const socleCyl1 = new THREE.Mesh(
        new THREE.CylinderGeometry(dsocleCyl, dsocleCyl, 9, 40),
        material);
    socleCyl1.position.y = 25 + 9 / 2;
    //socleCyl1.position.z -= 4;
    part.add(socleCyl1);

    const socleCyl2 = new THREE.Mesh(
        new THREE.CylinderGeometry(dTopSocleCyl2, dsocleCyl, hsocleCyl2, 4),
        material);
    socleCyl2.position.y = 25 + hsocleCyl2 / 2;
    socleCyl2.rotation.y += 95;
    part.add(socleCyl2);

    /*
    var box = new THREE.Mesh(
        new THREE.BoxGeometry( 30, 20, 2 ),
        material);
    box.position.y = 25+hsocleCyl2+9;
    box.position.z += 16;
    part.add( box );
    */

    for (let i = 0; i < 2; i++) {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(30, 20, 2),
            material);
        box.position.z = (i < 1) ? -16 : 16;
        box.position.y = 25 + hsocleCyl2 + 9;
        //box.position.z = (i%2) ? -8 : 8;
        part.add(box);


        const cylinder = new THREE.Mesh(
            new THREE.CylinderGeometry(7, 7, 4, 32),
            material);
        cylinder.rotation.x = 90 * Math.PI / 180;
        cylinder.position.y = 53;
        cylinder.position.z = (i < 1) ? -18 : 18;

        part.add(cylinder);

        const motor = new THREE.Mesh(
            new THREE.BoxGeometry(14, 14, 16),
            material);
        motor.position.z = (i < 1) ? -27 : 27;
        motor.position.y = 53;
        //box.position.z = (i%2) ? -8 : 8;
        part.add(motor);

    }
}

function createRobotGrabber(part, length, material) {
    const box = new THREE.Mesh(
        new THREE.BoxGeometry(15, length, 2),
        material);
    box.position.y = length / 2;
    part.add(box);
}

function createRobotExtender(part, length, material) {
    for (let i = 0; i < 4; i++) {
        const box = new THREE.Mesh(
            new THREE.BoxGeometry(8, length, 2),
            material);
        box.position.x = (i < 2) ? -7 : 7;
        box.position.y = length / 2;
        box.position.z = (i % 2) ? -8 : 8;
        part.add(box);
    }

    // Cylindre pince
    const cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 20, 32),
        material);
    cylinder.rotation.x = 90 * Math.PI / 180;
    cylinder.position.y = length;
    part.add(cylinder);
}

//Part 1 of the robot
function createRobotCrane(part, length, material) {
    /*
    var box = new THREE.Mesh(
        new THREE.BoxGeometry( 18, length, 18 ), material );
    box.position.y = (length/2);
    part.add( box );
    */

    let box;

    //Bottom cylinder
    let cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(8, 8, 30, 32),
        material);
    cylinder.rotation.x = 90 * Math.PI / 180;

    part.add(cylinder);

    for (let i = 0; i < 4; i++) {
        box = new THREE.Mesh(
            new THREE.BoxGeometry(7, length, 2),
            material);
        box.position.x = (i < 2) ? -7 : 7;
        box.position.y = length / 2;
        box.position.z = (i % 2) ? -8 : 8;
        part.add(box);
    }
    
    //Top cylinder
    cylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(10, 10, 20, 32),
        material);
    cylinder.rotation.x = 90 * Math.PI / 180;
    cylinder.position.y = length;
    part.add(cylinder);

    /*
    var sphere = new THREE.Mesh(
        new THREE.SphereGeometry( 10, 32, 16 ), material );
    // place sphere at end of arm
    sphere.position.y = length;
    part.add( sphere );
    */
}

function init() {
    const canvasWidth = 846;
    const canvasHeight = 494;
    // For grading the window is fixed in size; here's general code:
    //var canvasWidth = window.innerWidth;
    //var canvasHeight = window.innerHeight;
    const canvasRatio = canvasWidth / canvasHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    //renderer.setClearColor(0xAAAAAA, 1.0);
    renderer.setClearColor( 0x000000, 0 );

    // CAMERA
    camera = new THREE.PerspectiveCamera(38, canvasRatio, 1, 10000);
    // CONTROLS
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
    camera.position.set(-400, 242, 30);
    cameraControls.target.set(54, 106, 30);
    fillScene();

}

function addToDOM() {
    const container = document.getElementById("brasRobotique");
    container.appendChild(renderer.domElement);
}

function drawHelpers() {
    if (ground) {
        Coordinates.drawGround({size: 10000});
    }
    if (gridX) {
        Coordinates.drawGrid({size: 10000, scale: 0.01});
    }
    if (gridY) {
        Coordinates.drawGrid({size: 10000, scale: 0.01, orientation: "y"});
    }
    if (gridZ) {
        Coordinates.drawGrid({size: 10000, scale: 0.01, orientation: "z"});
    }
    if (axes) {
        Coordinates.drawAllAxes({axisLength: 200, axisRadius: 1, axisTess: 50});
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    const delta = clock.getDelta();
    cameraControls.update(delta);

    
    /*
    
    if (effectController.newGridX !== gridX
        || effectController.newGridY !== gridY
        || effectController.newGridZ !== gridZ
        || effectController.newGround !== ground
        || effectController.newAxes !== axes) {
        gridX = effectController.newGridX;
        gridY = effectController.newGridY;
        gridZ = effectController.newGridZ;
        ground = effectController.newGround;
        axes = effectController.newAxes;

        fillScene();
        drawHelpers();
    }

    // All controls


    //arm.rotation.z = effectController.uz * Math.PI / 180;	// roll


    // Add handRight yaw and translate
    handLeft.rotation.z = effectController.hz * Math.PI / 180;	// yaw
    handLeft.position.z = effectController.htz;	// translate
    handRight.rotation.z = effectController.hz * Math.PI / 180;    // yaw
    // negate to go the other direction
    handRight.position.z = -effectController.htz;    // translate
    */
    renderer.render(scene, camera);
}

function setupGui() {
    
    effectController = {

        newGridX: gridX,
        newGridY: gridY,
        newGridZ: gridZ,
        newGround: ground,
        newAxes: axes,

        //uz: -15.0,

        fz: 60.0,

        hz: 30.0,
        htz: 12.0
    };

    const gui = new dat.GUI();
    let h = gui.addFolder("Grid display");
    h.add(effectController, "newGridX").name("Show XZ grid");
    h.add(effectController, "newGridY").name("Show YZ grid");
    h.add(effectController, "newGridZ").name("Show XY grid");
    h.add(effectController, "newGround").name("Show ground");
    h.add(effectController, "newAxes").name("Show axes");
    h = gui.addFolder("Arm angles");
    //h.add(effectController, "uz", 0, 85.0, 0.025).name("Upper arm z");
    h.add(effectController, "fz", -10.0, 90.0, 0.025).name("Forearm z");
    h.add(effectController, "hz", -45.0, 45.0, 0.025).name("Hand z");
    h.add(effectController, "htz", 2.0, 17.0, 0.025).name("Hand spread");
}

try {
    init();
    fillScene();
    drawHelpers();
    addToDOM();
    //setupGui();
    animate();
} catch (e) {
    const errorReport = (e) => `<div>Your program encountered an unrecoverable error, can not draw on canvas.</br></br>Error was: </br>${e}</div>`;
    document.getElementById("brasRobotique").innerHTML = errorReport(e);
}
