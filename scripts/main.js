
window.onload = function start() {
    gameLoop();
}

var units = 0;


function gameLoop() {

//Add units   
units = units+1;

//Update GUI
$("#unitcounter").html("UNITS:" + units);

//this must be the last statment
setTimeout(gameLoop, 1000);
}

// boot up the first call
gameLoop();