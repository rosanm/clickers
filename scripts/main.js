

var units = 0;
var items = [{name:"0", count:0, price:10, gains:1, max:1},
            {name:"1", count:0, price:100, gains:2, max:100},
            {name:"2", count:0, price:1000, gains:5, max:100},
            {name:"3", count:0, price:10000, gains:25, max:200},
            {name:"4", count:0, price:100000, gains:50, max:500},
            {name:"5", count:0, price:100000, gains:500, max:10000}];


function gameLoop() {

    //Add units 
        //Free 1ps  
        units += 1;
        //items
        items.forEach(function(element) {
            units += (element.count*element.gains);
        }, this);

    //Update GUI
    $("#unitcounter").html("UNITS:" + units);

    //this must be the last statment
    setTimeout(gameLoop, 1000);
}

//Start the game the first time
gameLoop();


function buy(itemNr){
    //Can affound?
    if(units >= items[itemNr].price){
        //Still in stock?
        if(items[itemNr].count <= items[itemNr].max){
            //Buy it
            units = units-items[itemNr].price;
            items[itemNr].count++;
        }
    }


};


