

var units = 10000;
var items = [{name:"Maginifying glass", count:0, price:10, gains:1, max:1},
            {name:"Newspaper", count:0, price:100, gains:2, max:100},
            {name:"Anonymous tip", count:0, price:1000, gains:5, max:100},
            {name:"Watson", count:0, price:10000, gains:25, max:200},
            {name:"Police dog", count:0, price:100000, gains:50, max:500},
            {name:"Police station", count:0, price:100000, gains:500, max:10000}];


function populateZoo() {
var itemsString ="";
        items.forEach(function(e) {
                itemsString += e.name + ': ' + e.count + "." +            " <br/>";
            }, this);

        $(".theZoo").html(itemsString);

};


function buy(itemNr){
    //Can affound?
    if(units >= items[itemNr].price){
        //Still in stock?
        if(items[itemNr].count <= items[itemNr].max){
            //Buy it
            units = units-items[itemNr].price;
            items[itemNr].count++;
        }else{
            alert(items[itemNr].name +" is out of stock, maximum reached. " + items[itemNr].max +"/"+ items[itemNr].max )
        }
    }

};

function gameLoop() {

    //Add units 
        //Free 1ps  
        units += 1;
        //items
        items.forEach(function(e) {
            units += (e.count*e.gains);
        }, this);

        //Update GUI
        $("#unitcounter").html("&pound;" + units);

        //Update ZOO
        populateZoo();

    //this must be the last statment
    setTimeout(gameLoop, 1000);
}

//Start the game the first time
gameLoop();



$(document).ready(function(){

    items.forEach(function(i, index){
        var button = $('<button/>',
        {
            text: i.name,
            class: 'button-buy',
            click: function() { buy(index) }
        });
        
        $("#buttonSection").append(button);
    });

});