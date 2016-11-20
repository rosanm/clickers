$(document).ready(function(){    
    function populateZoo() {  
        ractive.get('friends').forEach(function(e, i) {
            if(e.count > 0){
                   ractive.get('friends')[i].dmg = e.dmg*e.count;
                }
        }, this);
    };

    function smoothScoreLoop() {
        //berekend hoeveel je er per 100/ste seconden bij krijgt
        var addPer100stSec = ractive.get('dps') / 100;

        //tel je units erbij en rond af op 1 decimaal
        var unrounded = ractive.get('units') + addPer100stSec
        var roundend = unrounded;
        if(addPer100stSec > 0.1)
            rounded = Math.round(unrounded * 10 ) / 10;  //1 decimaal
        else
            rounded = Math.round(unrounded * 100 ) / 100;  //2 decimaal

        //if your mining
        if(ractive.get('mine')){
            ractive.set('units', rounded);
            ractive.set('roundedUnits', ractive.get('nFormat')(rounded));
        }

        //this must be the last statment
        setTimeout(smoothScoreLoop, 10); //loop 100x per sec
    }

    ractive.on({
        evolveFriend: function(event){
            friendController.evolveFriend();   
        },
        trainFriend: function(event) {
            friendController.trainFriend();
        },
        buyItem: function (event, itemNr) {
            itemController.buyItem(itemNr);
        },
        buy: function (event, index){            
            friendController.buyFriend();
        },
        selectFriend: function(event, index){
            friendController.selectFriend(index);
        },
        kickDoor: function(event) {
            ractive.set('doorSet', false);
            ractive.set('mine', false);
            ractive.set('attack', true);
            initializeClock('clockdiv', 0, 5);
        },
        closeWindow: function(event) {
            $(".diceBox").hide();
            $(".overlay").hide();
            ractive.set('mine', true);
            ractive.set('doorSet', true);
            ractive.set('diceMessage', '');
        },
        roleDice: function(event) {
            diceController.roleDice();
        },
    });

    function calcUnitsPerSec(itemsArray){
        var unitsPerSec = 0;
            itemsArray.forEach(function(e) {
                    unitsPerSec += ractive.get('TotalDmgOfFriendType')(e.name);
                        if(ractive.get('attack')) {
                            e.lifeTimeDmg += ractive.get('TotalDmgOfFriendType')(e.name);
                        }
                    }, this);
            return unitsPerSec;
    };

    function gameLoop() {      
        //update dmg
        var friendDps = calcUnitsPerSec(ractive.get('friends'));
        ractive.set('dps', friendDps); 
        //update title
        document.title = ractive.get('units') + " Diamonds"; 

        //this must be the last statment
        setTimeout(gameLoop, 1000);
    }

    //Start the game the first time
    gameLoop();
    //start the smoothscore
    smoothScoreLoop();
    //attack
    enemyController.attack();
   
});

