let checkbox = document.querySelector("input[name=ldmod]");


const Gauche = document.querySelector(".Gauche");
const Droite = document.querySelector(".Droite");
const para = document.querySelector(".controls");
const imgs = document.querySelector(".icon");
const fl1 = document.querySelector(".fl1");
const fl2 = document.querySelector(".fl2");
const fl3 = document.querySelector(".fl3");
const fl4 = document.querySelector(".fl4");



const colors = ['#2A2A2A', 'white', 'black']

checkbox.addEventListener( 'change', function() {
    if(this.checked) {




        console.log('checked')
        document.body.style.backgroundColor = colors[0];
        document.body.style.color = colors[1];

        para.style.borderColor = colors[1];


        Gauche.style.color = colors[1];
        Droite.style.color = colors[1];

        imgs.style.filter = "invert(100%)";
        fl1.style.filter = "invert(100%)";
        fl2.style.filter = "invert(100%)";
        fl3.style.filter = "invert(100%)";
        fl4.style.filter = "invert(100%)";



    } else {
        console.log('not checked')
        imgs.style.filter = "invert(0%)";
        fl1.style.filter = "invert(0%)";
        fl2.style.filter = "invert(0%)";
        fl3.style.filter = "invert(0%)";
        fl4.style.filter = "invert(0%)";
        Gauche.style.color = colors[2];
        Droite.style.color = colors[2];
        document.body.style.backgroundColor = "#FFF"
        document.body.style.color = '#000'
        para.style.borderColor = colors[2];








        
    }
});