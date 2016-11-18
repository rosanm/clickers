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

    smoothAttackEnemy();

    function NextEnemy() {
        //verhoog level met 1

        if(!ractive.get('doorSet')){
            ractive.set('mine', false);
            ractive.set('attack', true);
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
        }
    };

    ractive.on({
        evolveFriend: function(event){
            var trainButton = ractive.get('trainButton');
            var evolveButton = ractive.get('evolveButton');   
            var name = ractive.get('selectedFriendName');
            var me = getObjectFromListByName('friends', name);
            if(hasEnoughDiamonds(me.price)) { 
                //do normal lvl-up stuff
                me.lvl = me.lvl + 1;
                me.dmg = me.dmg + 3;
                me.price = ractive.get('round')(me.price * 1.3);

                //set all new data
                var evo = ractive.get('friendsData')[me.nextStageIndex];
                me.img = evo.img;
                me.name = evo.name;
                me.levelUp = evo.levelUp;
                me.stage = me.stage + 1;
                me.nextStageIndex = evo.nextStageIndex;
                me.dmg = evo.dmg;

                //stop evolving
                evolveButton.isVisble = false;
                trainButton.isVisble = true;
                ractive.set('selectedFriendName', evo.name);
                showItemsOfFriend(me.itemListName);
                ractive.update();    
            }     
        },
        trainFriend: function(event) {
            var trainButton = ractive.get('trainButton');
            var evolveButton = ractive.get('evolveButton');
            var name = ractive.get('selectedFriendName');
            var me = getObjectFromListByName('friends', name);

            if(me.lvl < 999){
                if(hasEnoughDiamonds(me.trainPrice)) { 
                    ractive.set('units', ractive.get('units') - me.trainPrice);

                    me.lvl = me.lvl + 1;
                    me.dmg = me.dmg + 3;
                    me.trainPrice = ractive.get('round')(me.trainPrice * 1.3);

                        if(me.lvl == me.levelUp -1) {
                            trainButton.isVisble = false;
                            evolveButton.isVisble = true;
                        }
                }
            }
            else { //max level
                trainButton.isVisble = false;               
            }
            ractive.update();          
        },
        buyItem: function (event, itemNr){
            //name of selectedFriend
            var selectedFriend = ractive.get('selectedFriend')(getByName('selectedFriendName'));
            var clickedItem = ractive.get(selectedFriend.itemListName)[itemNr];
            //Can affound?
            if(hasEnoughDiamonds(clickedItem.price)) {
                //Still in stock?
                if(clickedItem.count < clickedItem.max){
                    //Buy it
                    ractive.set('units', ractive.get('units') - clickedItem.price);

                    var upgradedItem = clickedItem;
                    upgradedItem.lvl = upgradedItem.lvl +1;
                    upgradedItem.price = Math.round(upgradedItem.price * 1.3);
                    upgradedItem.dmg = Math.round(upgradedItem.dmg * 1.2);
                    upgradedItem.count = upgradedItem.count + 1;
                    ractive.update();
                }
                else {
                    ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max;
                }
            }
        },
        buy: function (event, index){            
            if(hasEnoughDiamonds(ractive.get('friends')[index].price)) {
                var selectedFriend =  ractive.get('friends')[index];
                ractive.set('units', ractive.get('units') - selectedFriend.price);

                selectedFriend.price = ractive.get('round')(selectedFriend.price * 1.3);
                selectedFriend.count++;
                ractive.update();
            }
            return false;
        },
        selectFriend: function(event, index){
            
            var friend = ractive.get('friends')[index];

            var trainButton = ractive.get('trainButton');
            var evolveButton = ractive.get('evolveButton');

            if(friend.count == 0)
                return false;
            if(friend.isSelected) {
                friend.isSelected = false;
                ractive.set('selectedFriendName', 'No one');
                ractive.set('items', []); 
            }
            else {
                deselectAllFriends();
                friend.isSelected = true;
                showItemsOfFriend(friend.itemListName);
                ractive.set('selectedFriendName', friend.name);
            }

            //Check if the friend can evolve or train
            if(friend.lvl == friend.levelUp -1 ){
                trainButton.isVisble = false;
                evolveButton.isVisble = true;
            }else{
                trainButton.isVisble = true;
                evolveButton.isVisble = false;
            }

            //max level
            if(friend.lvl == 999){
                trainButton.isVisble = true;
            }
            ractive.update();
        },
        kickDoor: function(event) {
            ractive.set('doorSet', false);
            NextEnemy();
            var deadline = new Date(Date.parse(new Date()) + 1 * 1 * 1 * 60 * 1000);
            initializeClock('clockdiv', deadline);
        },
    });

    function hasEnoughDiamonds(amount){
        return ractive.get('units') >= amount;
    }

    function showItemsOfFriend(itemListName){
        var items = getByName(itemListName);
        ractive.set('items', items);  
    }

    function getByName(name){
        return ractive.get(name);
    }

    function getObjectFromListByName(list, name){
        var list = ractive.get(list);
        for(var i = 0; i <= list.length; i++){
            if(list[i].name == name)
                return list[i];
        }
    }

    function deselectAllFriends(){
        var friends = ractive.get('friends');
        for(var i = 0; i < friends.length; i++){
            friends[i].isSelected = false;
        }
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


    $( ".dice" ).click(function() {  
        $(".dice").addClass("diceRoll");
        setTimeout(stopSpin, 300); 
        var dieList = ractive.get('diceList');
            dieList.forEach(function(die) {
                die.value = Math.floor((Math.random()*6)+1);
            }, this);
       ractive.set('diceList',dieList);
    });

    function stopSpin() {
        $(".dice").removeClass("diceRoll");
    }
   
});

