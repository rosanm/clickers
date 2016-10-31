var app = angular.module('Clickers', []);
app.controller('setupController', function($scope) {

    //variables
    $scope.units = 1000;
    $scope.ups = 0;
    $scope.level = 1;
    $scope.currentEnemy = {};
    $scope.door = "images/door.png";
    $scope.items = [{name:"Maginifying glass", img:"water.png",                count:0, price:10,     gains:1,     max:2},
                    {name:"Newspaper",          img:"water-glass.png",          count:0, price:100,    gains:2,     max:10},
                    {name:"Anonymous tip",      img:"water-glass-round.png",    count:0, price:500,    gains:10,    max:100},
                    {name:"Watson",             img:"orange-glass-round.png",   count:0, price:2500,   gains:50,    max:1},
                    {name:"Police dog",         img:"green-glass-round.png",    count:0, price:8000,   gains:500,   max:2},
                    {name:"Police station",     img:"pink-glass-round.png",     count:0, price:50000,  gains:2000,  max:2}];

    $scope.enemys = [{name:"Dropphin", hp:1500,    total: 1500,    img:"images/enemys/007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                    {name:"Dolswim",    hp:5000,    total: 5000,    img:"images/enemys/008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                    {name:"Arambly",    hp:20000,   total: 20000,   img:"images/enemys/034_arambly_by_deoxysdaniel-d5mriwg.png"},
                    {name:"Umbrarach",  hp:100000,  total: 100000,  img:"images/enemys/035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                    {name:"Cubern",     hp:500000,  total: 500000,  img:"images/enemys/036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                    {name:"Gigarotto",  hp:2000000, total: 200000,  img:"images/enemys/037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}]

    $scope.friends = [{name:"Pandoo", level:1500,    count:1, gains:100, img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png", ups: 1},
                    {name:"Blazby",    level:5000,    count:1, gains:200, img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png"},
                    {name:"Kniron",    level:20000,   count:1, gains:300, img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png"},
                    {name:"Eartail",   level:100000,  count:1, gains:500, img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png"},
                    {name:"Phyracu",   level:500000,  count:1, gains:800, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png"}];
    //end variables
    
    function populateZoo() {  
        $scope.friends.forEach(function(e, i) {
            if(e.count > 0){
                    $scope.friends[i].ups = e.gains*e.count;
                    $scope.$apply();
                }
        }, this);
    };

    function populateEnemy() {   
        $scope.currentEnemy = $scope.enemys[$scope.level-1];       
        $scope.$apply();                 

        var progress = $scope.currentEnemy.hp / $scope.currentEnemy.total * 100;
        $("progress").attr('value', progress);
        $("#progresscontainer").show();
    };

    function attackEnemy() {
        $scope.currentEnemy = $scope.enemys[$scope.level-1];
        $scope.currentEnemy.hp = $scope.currentEnemy.hp - $scope.ups;
        
        if($scope.currentEnemy.hp < 0){
            $scope.level = $scope.level + 1;
            $("#progresscontainer").hide();
            $(".doorSet").show();
            $(".enemySet").hide();
        }
        else {
            $(".doorSet").hide();
            $(".enemySet").show();
            populateEnemy();
        }

        
    };

    function buy(itemNr){
        //Can affound?
        if($scope.units >= $scope.items[itemNr].price){
            //Still in stock?
            if($scope.items[itemNr].count < $scope.items[itemNr].max){
                //Buy it
                $scope.units = $scope.units-$scope.items[itemNr].price;
                $scope.items[itemNr].count++;
            }else{
                alert($scope.items[itemNr].name +" is out of stock, maximum reached. " +
                $scope.items[itemNr].max +"/"+ $scope.items[itemNr].max )
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
        $("#unitcounter").html("<i class=\"diamondIcon fa fa-diamond fa-lg\"></i> " + $scope.units);
        $("#unitpersec").html("<i class=\"diamondIcon fa fa-flash fa-lg\"></i> p/s " + $scope.ups );
        $("#currentLvl").html("Level: " + $scope.level);
        populateZoo();
        populateEnemy();
    };


    function gameLoop() {
            //update ups
            itemUps = calcUnitsPerSec($scope.items);
            friendUps = calcUnitsPerSec($scope.friends);
            $scope.ups = itemUps + friendUps;      
            
            //Add units 
            $scope.units += $scope.ups;
        
        //Update units
        $("#unitcounter").html("<i class=\"diamondIcon fa fa-diamond fa-lg\"></i> " + $scope.units);
        
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
                scroll: false,
                cursor: "move"
         });

   
  //  $(".section-center").resizable();
  //  $(".section-right").resizable();


        $scope.items.forEach(function(i, index){      
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
});