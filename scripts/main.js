

var units = 10000000;
var ups = 0;

var items = [{name:"Maginifying glass", img:"water.png",                count:0, price:10,     gains:1,     max:2},
            {name:"Newspaper",          img:"water-glass.png",          count:0, price:100,    gains:2,     max:10},
            {name:"Anonymous tip",      img:"water-glass-round.png",    count:0, price:500,    gains:10,    max:100},
            {name:"Watson",             img:"orange-glass-round.png",   count:0, price:2500,   gains:50,    max:1},
            {name:"Police dog",         img:"green-glass-round.png",    count:0, price:8000,   gains:500,   max:2},
            {name:"Police station",     img:"pink-glass-round.png",     count:0, price:50000,  gains:2000,  max:2}];
var level = 0;

var enemys = [{name:"Dropphin", hp:100,img:"007_dropphin_by_deoxysdaniel-d5j9slu.png"},
            {name:"Dolswim",  hp:200, img:"008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
            {name:"Arambly",  hp:300, img:"034_arambly_by_deoxysdaniel-d5mriwg.png"},
            {name:"Umbrarach",  hp:400, img:"035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
            {name:"Cubern",  hp:500, img:"036_cubern_by_deoxysdaniel-d5n1gqm.png"},
            {name:"Gigarotto",  hp:600, img:"037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}]

function populateZoo() {
    var itemsString = "";
    
            items.forEach(function(e) {
                if(e.count > 0){
                    itemsString += '<div class="whitebg">';
                    
                    var imgString ="";
                        //Build image part
                        for(i=1; i<= e.count; i++){                     
                            imgString += '<img src="images/sherlock/'+e.img+'" height="40" width="40">';
                        }
                        //Build text part
                            itemsString += imgString + "<br/>" + e.name + ': ' + e.count + "x." + 
                            "<br/>&pound per second: " +e.gains*e.count;
                    
                        itemsString += '</div>';
                    }
                }, this);

                
            $(".theZoo").html(itemsString);
};

function populateEnemy() {
    var itemsString = "";    
            e = enemys[level];                        
                    var imgString ="";
                        //Build image part                
                            imgString += '<img src="images/enemys/'+e.img+'" width="100%">';
                        //Build text part
                            itemsString += imgString + "<br/>" + e.name + ': ' + e.hp + "hp." ;             
            
            $(".monster-box").html(itemsString);
};

function buy(itemNr){
    //Can affound?
    if(units >= items[itemNr].price){
        //Still in stock?
        if(items[itemNr].count < items[itemNr].max){
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
        $("#currentLvl").html(level);
        currentLvl
        populateZoo();
        populateEnemy();
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
        var image = $('<img/>',
        {
            class: 'item-image',
        });

        image.attr('src', 'images/Items/' + i.img);

        var div = $('<div/>',
        {
            class: 'item-field',
        });

        var buttonBuy = $('<button/>',
        {
            text: "BUY  ["+i.price+"P]",
            class: 'button-buy',
            click: function() { buy(index);updateGui(index) }
        });

        var buttonUpgrade = $('<button/>',
        {
            text: "UPGRADE ["+i.price+"P]",
            class: 'button-upgrade',
            click: function() { buy(index);updateGui(index) }
        });

        div.append(image);
        div.append(buttonBuy);
        div.append(buttonUpgrade);
        
        $("#items-box").append(div);
    });

});