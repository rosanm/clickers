

var units = 10000000;
var ups = 0;
var items = [{name:"Maginifying glass", img:"magnifyer.png",        count:0, price:10,     gains:1,     max:1},
            {name:"Newspaper",          img:"newspaper.png",        count:0, price:100,    gains:2,     max:20},
            {name:"Anonymous tip",      img:"key.png",              count:0, price:500,    gains:10,    max:100},
            {name:"Watson",             img:"watson.png",           count:0, price:2500,   gains:50,    max:200},
            {name:"Police dog",         img:"dog.gif",              count:0, price:8000,   gains:500,   max:500},
            {name:"Police station",     img:"policestation.jpg",    count:0, price:50000,  gains:2000,  max:10000}];


function populateZoo() {
    var itemsString = '<div class="whitebg">';
    
            items.forEach(function(e) {
                
                if(e.count > 0){
                   var imgString ="";
                    //Build image part
                    for(i=1; i<= e.count; i++){                     
                        imgString += '<img src="images/sherlock/'+e.img+'" height="40" width="40">';
                    }
                    //Build text part
                        itemsString += imgString + "<br/>" + e.name + ': ' + e.count + "x." + 
                        "<br/>&pound per second: " +e.gains*e.count  +
                        "<br/><br/>";
                }

                }, this);

                itemsString += '</div>';
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
            alert(items[itemNr].name +" is out of stock, maximum reached. " +
            items[itemNr].max +"/"+ items[itemNr].max )
        }
    }
};

function calcUnitsPerSec(itemsArray){
    var unitsPerSec = 0;
    itemsArray.forEach(function(e) {
                unitsPerSec += (e.count*e.gains);
            }, this);
    return unitsPerSec;
};

function updateGui(){
        $("#unitcounter").html("&pound;" + units );
        $("#unitpersec").html("PER SECOND:<br/>&pound; " + calcUnitsPerSec(items) );
        populateZoo();
};

function gameLoop() {
        //update ups
        ups = calcUnitsPerSec(items);
        
        //Add units 
        units += ups;
        
        //Update units
        $("#unitcounter").html("&pound;" + units );
      
    //this must be the last statment
    setTimeout(gameLoop, 1000);
}

//Start the game the first time
gameLoop();

$(document).ready(function(){

    items.forEach(function(i, index){
        var button = $('<button/>',
        {
            text: i.name + " ["+i.price+"P]",
            class: 'button-buy',
            click: function() { buy(index);updateGui(index) }
        });
        
        $("#buttonSection").append(button);
    });

});