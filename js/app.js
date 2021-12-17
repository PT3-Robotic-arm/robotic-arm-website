let checkbox = document.querySelector("input[name=ldmod]");


const gauche = document.querySelector("#gauche");
const droite = document.querySelector("#droite");
const para = document.querySelector(".controls");
const imgs = document.querySelector(".icon");

//Arrow up arrow left arrow right arrow down
const au = document.getElementById("arrow-up");
const al = document.getElementById("arrow-left");
const ar = document.getElementById("arrow-right");
const ad = document.getElementById("arrow-down");



const colors = ['#2A2A2A', 'white', 'black']

checkbox.addEventListener( 'change', function() {
    if(this.checked) {
        document.body.style.backgroundColor = colors[0];
        document.body.style.color = colors[1];
        para.style.borderColor = colors[1];
        gauche.style.color = colors[1];
        droite.style.color = colors[1];
        imgs.style.filter = "invert(100%)";
        au.style.filter = "invert(100%)";
        al.style.filter = "invert(100%)";
        ar.style.filter = "invert(100%)";
        ad.style.filter = "invert(100%)";


    } else {
        document.body.style.backgroundColor = colors[1];
        document.body.style.color = colors[2];
        para.style.borderColor = colors[2];
        gauche.style.color = colors[2];
        droite.style.color = colors[2];
        imgs.style.filter = "invert(0%)";
        au.style.filter = "invert(0%)";
        al.style.filter = "invert(0%)";
        ar.style.filter = "invert(0%)";
        ad.style.filter = "invert(0%)";
        
    }
});