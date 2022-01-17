/*
File where we change the theme of the web app
We recover all elements that we need to interact with
*/
const themeselector = document.getElementById("theme-selector-checkbox"); //Button that makes the theme change
const controlpanel = document.querySelector(".controls"); //div that contains all the controls
const icons = document.getElementsByClassName("icon"); //All elements with an svg icon in it
const check = document.getElementsByClassName("check"); //Checkbox buttons (visualize, grids)
const dot = document.getElementsByClassName("dot");//Dot in checkbox buttons
const armcontrols = document.getElementsByClassName("armcontrols");//Controls to move the arm
const basecontrols = document.getElementsByClassName("basecontrols");//Controls to move the base


//Colors that we are using
const colors = ['#2A2A2A', 'white', 'black'];

themeselector.addEventListener( 'change', function() { //We listen events on themeselector
    if(this.checked) { //If it is checked, we apply dark theme
        document.body.style.backgroundColor = colors[0]; //changing body's background to dark gray
        document.body.style.color = colors[1]; //changing body's font color to drak gray
        controlpanel.style.borderColor = colors[1]; //changing the border of the control panel to white
        
        for (let element of check){ element.style.backgroundColor = colors[1]; element.style.borderColor = colors[1]; } //For each check, we change it's background (color : white)
        for (let element of dot){ element.style.backgroundColor = colors[2] } //For each dot, we change it's background (color : black)
        for (let element of armcontrols){ element.style.borderColor = colors[1]; } //For each armcontrol, we change it's bordercolor (color : white)
        for (let element of icons){ element.style.filter = "invert(100%)"; } //For each icon, we change it's color by inverting it (color : white)
        for (let element of basecontrols){ element.style.color = colors[1] } // For each basecontrol, we change the font color  (color : white)
        
    } else { //If it isn't checked, we apply clear theme
        document.body.style.backgroundColor = colors[1]; //changing body's background to white
        document.body.style.color = colors[2]; //changing body's font color to white
        controlpanel.style.borderColor = colors[2]; //changing the border of the control panel to black

        for (let element of check){ element.style.backgroundColor = colors[2]; element.style.borderColor = colors[2]; }//For each check, we change it's background (color : black)
        for (let element of dot){ element.style.backgroundColor = colors[1] }//For each dot, we change it's background (color : white)
        for (let element of armcontrols){ element.style.borderColor = colors[2]; }//For each armcontrol, we change it's bordercolor (color : black)
        for (let element of icons){ element.style.filter = "invert(0%)"; }//For each icon, we change it's color by inverting it (color : black)
        for (let element of basecontrols){ element.style.color = colors[2] }// For each basecontrol, we change the font color  (color : black)
    }
});