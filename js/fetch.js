"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/


function getData(){

    fetch(`http://127.0.0.1:3000/api/getLatest`).then(res => res.json().then(data=> {
        console.log(data);
    }))
}
