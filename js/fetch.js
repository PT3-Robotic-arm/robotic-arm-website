"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Robot hand exercise: add a second grabber and have it respond
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window, dat*/

/** 
 * Function that fetches data from our API on localhost:3000
 * each data object has an id and position informations
 * getLastest/ : get latest position (latest id)
 * getSince/:id : get all positions from the element which has the id given
 * getRow/:id : get a precise element from its id
*/
function getData(){

    fetch(`http://127.0.0.1:3000/api/getLatest`).then(res => res.json().then(data=> {
        console.log(data);
    }))
}
