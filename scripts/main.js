

var units = 0;
var items = [{name:"0", count:0},
            {name:"1", count:0},
            {name:"2", count:0},
            {name:"3", count:0},
            {name:"4", count:0},
            {name:"5", count:0}];


function gameLoop() {

    //Add units   
    units = units+1;

    //Update GUI
    $("#unitcounter").html("UNITS:" + units);

    //this must be the last statment
    setTimeout(gameLoop, 1000);
}

//Start the game the first time
gameLoop();


function buy(itemNr,price){

    if(units >= price){
        units = units-price;
        items[itemNr].count++;
    }


};


