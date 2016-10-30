

var units = 1000;
var ups = 0;
var level = 1;
var items = [{name:"Maginifying glass", img:"water.png",                count:0, price:10,     gains:1,     max:2},
            {name:"Newspaper",          img:"water-glass.png",          count:0, price:100,    gains:2,     max:10},
            {name:"Anonymous tip",      img:"water-glass-round.png",    count:0, price:500,    gains:10,    max:100},
            {name:"Watson",             img:"orange-glass-round.png",   count:0, price:2500,   gains:50,    max:1},
            {name:"Police dog",         img:"green-glass-round.png",    count:0, price:8000,   gains:500,   max:2},
            {name:"Police station",     img:"pink-glass-round.png",     count:0, price:50000,  gains:2000,  max:2}];

var enemys = [{name:"Dropphin", hp:1500,    total: 1500,    img:"007_dropphin_by_deoxysdaniel-d5j9slu.png"},
            {name:"Dolswim",    hp:5000,    total: 5000,    img:"008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
            {name:"Arambly",    hp:20000,   total: 20000,   img:"034_arambly_by_deoxysdaniel-d5mriwg.png"},
            {name:"Umbrarach",  hp:100000,  total: 100000,  img:"035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
            {name:"Cubern",     hp:500000,  total: 500000,  img:"036_cubern_by_deoxysdaniel-d5n1gqm.png"},
            {name:"Gigarotto",  hp:2000000, total: 200000,  img:"037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}]

var friends = [{name:"Pandoo", level:1500,    count:4, gains:100, img:"001_pandoo_by_deoxysdaniel-d5j9po2.png"},
            {name:"Blazby",    level:5000,    count:2, gains:200, img:"004_blazby_by_deoxysdaniel-d5j9qzc.png"},
            {name:"Kniron",    level:20000,   count:1, gains:300, img:"038_kniron_by_deoxysdaniel-d5ncn7r.png"},
            {name:"Eartail",   level:100000,  count:1, gains:500, img:"048_eartail_by_deoxysdaniel-d5nwewr.png"},
            {name:"Phyracu",   level:500000,  count:1, gains:800, img:"053_phyracu_by_deoxysdaniel-d5nwexe.png"}]

 function populateZoo() {
//     var itemsString = "";    
//             friends.forEach(function(e) {
//                 if(e.count > 0){
//                     itemsString += '<div class="whitebg">';
                    
//                     var imgString ="";
//                         //Build image part
//                         for(i=1; i<= e.count; i++){                     
//                             imgString += '<img src="images/friends/'+e.img+'" width="35%">';
//                         }
//                         //Build text part
//                             itemsString += imgString + "<br/>" + e.name + ': ' + e.count + "x." + 
//                              "<br/>DMG per second: " +e.gains*e.count;   
//                         itemsString += '</div>';
//                     }
//                 }, this);
        
//             $(".theZoo").html(itemsString);
 };

function populateEnemy() {
    var itemsString = "";    
    e = enemys[level-1];                        
    var imgString ="";
    //Build image part                
    imgString += '<img src="images/enemys/'+e.img+'" width="100%">';
    //Build text part
    itemsString += imgString + "<br/>" + e.name;  

    var progress = e.hp / e.total * 100;

    $("progress").attr('value', progress);

    $(".monster-box-enemy").html(itemsString);
    $("#progresscontainer").show();
};

function attackEnemy() {
   e = enemys[level-1];
   e.hp = e.hp - ups;
    if(e.hp < 0){
        level = level + 1;
        $("#progresscontainer").hide();
        setDoor();
    }
    else {
        populateEnemy();
    }
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
    $("#unitcounter").html("<i class=\"diamondIcon fa fa-diamond fa-lg\"></i> " + units);
    $("#unitpersec").html("<i class=\"diamondIcon fa fa-flash fa-lg\"></i> p/s " + ups );
    $("#currentLvl").html("Level: " + level);
    populateZoo();
    populateEnemy();
};

function setDoor(){
    var imgString = '<img id="door" src="images/door.png" width="100%">';
    $(".monster-box-enemy").html(imgString);
}

function gameLoop() {
        //update ups
        itemUps = calcUnitsPerSec(items);
        friendUps = calcUnitsPerSec(friends);
        ups = itemUps + friendUps;      
        
        //Add units 
        units += ups;
    
        //Update units
        $("#unitcounter").html("<i class=\"diamondIcon fa fa-diamond fa-lg\"></i> " + units);
        
        //Attack
        attackEnemy();
        //this must be the last statment
        setTimeout(gameLoop, 1000);
}

//Start the game the first time
gameLoop();


$(document).ready(function(){

    updateGui();
    $(".section-monstercard").draggable({ 
                containment: "parent",
                grid: [ 30, 30 ],
                scroll: true, });

    //Build image part                
    setDoor();

    items.forEach(function(i, index){      
        var div = $('<div/>',
        {
            class: 'item-field',
        });

        var image = $('<img/>',
        {
            class: 'item-image',
        });
        image.attr('src', 'images/Items/' + i.img);

        var buttonBox = $('<div/>', {
            class: 'button-box',
        });

        var buttonBox2 = $('<div/>', {
            class: 'button-box',
        });

        var buttonBuy = $('<button/>',
        {
            text: "Buy",
            class: 'button-buy',
            click: function() { buy(index);updateGui(index) }
        });

        buttonBox.append(buttonBuy);
        buttonBox.append('<p class="text">' + i.price + ' coins</p>');

        var buttonUpgrade = $('<button/>',
        {
            text: "Upgrade",
            class: 'button-upgrade',
            click: function() { buy(index);updateGui(index) }
        });

        buttonBox2.append(buttonUpgrade);
        buttonBox2.append('<p class="text">' + i.price + ' coins</p>');

        div.append(image);
        div.append(buttonBox);     
        div.append(buttonBox2)
        
        $("#items-box").append(div);
    });

});