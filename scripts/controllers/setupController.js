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

    function smoothAttackEnemy() {        
        //Show enemy en progressbar part
        ractive.set('currentEnemy', ractive.get('enemys')[ractive.get('enemyIndex')]);
        var currentEnemy = ractive.get('currentEnemy');

        var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
        $("progress").attr('value', progress);
        $("#progresscontainer").show();

        //Deal DMG part
        if(ractive.get('attack')) {                
            currentEnemy.hp = ractive.get('currentEnemy').hp - (ractive.get('dps')/100);

            var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
            $("progress").attr('value', progress);
            $("#progresscontainer").show();

            ractive.update();
            
            if(ractive.get('currentEnemy.hp') < 0){
                ractive.set('doorSet', true);
                ractive.set('mine', true);
                ractive.set('attack', false);
                NextEnemy();
            }
        }

        //Control the attack/min variables
        if(ractive.get('mine')){
            ractive.set('attack', false);
        }

        if(ractive.get('attack')){
            ractive.set('mine', false);
        }

        setTimeout(smoothAttackEnemy, 10); //loop 100x per sec  
    };

    function NextEnemy() {
        ractive.set('level', ractive.get('level') + 1);

        var currentEnemy = ractive.get('currentEnemy');        
        var enemyIndex = ractive.get('enemyIndex');
        if(enemyIndex == ractive.get('enemys').length - 1){           
            enemyIndex = 0;
        }
        else {
            enemyIndex = enemyIndex + 1;
        }
            
        var newEnemy = ractive.get('enemys')[enemyIndex];

        //pak de volgende enemy met 61% meer hp als de vorige
        newEnemy.hp = currentEnemy.total * 1.61803398875; //Golden Ratio;
        newEnemy.total = newEnemy.hp;
    

        ractive.set('enemyIndex', enemyIndex);
        ractive.set('currentEnemy', newEnemy);  
        
        ractive.update();

        var random = Math.floor((Math.random() * 250) + 1);
        $('.enemySet').css('filter', 'hue-rotate(' + random + 'deg) saturate(3.3) drop-shadow(2px 2px 2px #222)');
    };

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
            $(".dice").addClass("diceRoll");
            spinDice();
            setTimeout(stopDice, 300);
            setTimeout(checkDiceValue, 1000);
        },
    });

    function checkDiceValue() {
        var diceList = ractive.get('diceList');
        diceList.forEach(function(die) {
            if(die.value == 6) {
                ractive.set('doorSet', true);
                NextEnemy();
                setMessage('win');
            }
            else {
                setMessage('lost');
            }
        });
    }

    function spinDice() {
        var diceList = ractive.get('diceList');
        diceList.forEach(function(die) {
            die.value = Math.floor((Math.random()*6)+1);
        }, this);
        ractive.set('diceList',diceList);
    }

    function stopDice() {
        $(".dice").removeClass("diceRoll");
    }

    function setMessage(messageType){
        if(messageType == 'win')
            ractive.set('diceMessage', 'You escaped from the dungeon!');
        else
            ractive.set('diceMessage', 'You lost! Items can help you defeat the enemies!');
    }

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
    smoothAttackEnemy();
   
});

