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
async function getLatest(){
    return new Promise(async (resolve, reject) => {
        let data = await fetch(`http://127.0.0.1:3000/api/getLatest`) //waiting for a response of the API and then storing the value returned in data

        if (!data.ok){ //If there is a problem with the data returned
            console.log("status :", data.status); //We print it's status in order to debug
            await getLatest(); // We try to fetch again
        }

        data = await data.json(); // if there is no probleme, we parse data to json
        
        resolve(data); //We return data
    })
}
