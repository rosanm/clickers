

var units = 0;
var items = [{name:"0", count:0, price:10},
            {name:"1", count:0, price:100},
            {name:"2", count:0, price:1000},
            {name:"3", count:0, price:10000},
            {name:"4", count:0, price:100000},
            {name:"5", count:0, price:100000}];


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


function buy(itemNr){

    if(units >= items[itemNr].price){
        units = units-items[itemNr].price;
        items[itemNr].count++;
    }


};


