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
        if(ractive.get('attack')){
                  
                    currentEnemy.hp = ractive.get('currentEnemy').hp - (ractive.get('dps')/100);

                    var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
                    $("progress").attr('value', progress);
                    $("#progresscontainer").show();

                    ractive.update();
                    
                    if(ractive.get('currentEnemy.hp') < 0){
                        NextEnemy();
                    }
                    else {
                        $(".doorSet").hide();
                        $(".enemySet").show();
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
        ractive.set('level', ractive.get('level') + 1);

            var currentEnemy = ractive.get('currentEnemy');
        
                var enemyIndex = ractive.get('enemyIndex');
                if(enemyIndex == ractive.get('enemys').length - 1){           
                    enemyIndex = 0;
                }
                else{
                    enemyIndex = enemyIndex + 1;
                }
                    
                var newEnemy = ractive.get('enemys')[enemyIndex];

                //pak de volgende enemy met 61% meer hp als de vorige
                newEnemy.hp = currentEnemy.total * 1.61803398875; //Golden Ratio;
                newEnemy.total = newEnemy.hp;
            

                ractive.set('enemyIndex', enemyIndex);
                ractive.set('currentEnemy', newEnemy);  
                
                ractive.update();

                $("#progresscontainer").hide();
                $(".doorSet").show();
                $(".enemySet").hide();
    };

    ractive.on({
        evolveFriend: function(event){
            //set all new data
            var evo = ractive.get('friendsData')[me.nextStageIndex];
            me.img = evo.img;
            me.name = evo.name;
            me.levelUp = evo.levelUp;
            me.stage = me.stage + 1;
            me.nextStageIndex = evo.nextStageIndex;
            me.dmg = evo.dmg;
        },
        trainFriend: function(event) {
        var button = ractive.get('trainButton');
        var name = ractive.get('selectedFriend');
        var me = getObjectFromListByName('friends', name);

        if(me.lvl < 999){
            me.lvl = me.lvl + 1;
            me.dmg = me.dmg + 3;
            me.price = ractive.get('round')(me.price * 1.3);

            if(me.lvl == me.levelUp - 1) {
                    button.isVisble = false;;
            }
            
            ractive.update();

            }
        },
        buyOrUpgrade: function (event, itemNr){
            //name of selectedFriend
            var selectedFriend = ractive.get('selectedFriend');
            //Can affound?
            if(ractive.get('units') >= ractive.get('items' + selectedFriend)[itemNr].price){
                //Still in stock?
                if(ractive.get('items' + selectedFriend)[itemNr].count < ractive.get('items' + selectedFriend)[itemNr].max){
                    //Buy it
                    var diamonds = ractive.get('units');
                    var priceOfItem = ractive.get('items' + selectedFriend)[itemNr].price;
                    ractive.set('units', diamonds - priceOfItem);
                    var upgradedItem = ractive.get('items' + selectedFriend)[itemNr];
                    upgradedItem.lvl = upgradedItem.lvl +1;
                    upgradedItem.price = Math.round(upgradedItem.price * 1.3);
                    upgradedItem.dmg = Math.round(upgradedItem.dmg * 1.2);
                    upgradedItem.count = upgradedItem.count + 1;
                    ractive.update();
                }else{
                    alert(ractive.get('items')[itemNr].name +" is out of stock, maximum reached. " +
                    ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max )
                }
            }
        },
        buy: function (event, index){            
            if(ractive.get('units') >= ractive.get('friends')[index].price) {
                var selectedFriend =  ractive.get('friends')[index];
                selectedFriend.count++;
                ractive.update();
            }
            return false;
        }
    });

    function calcUnitsPerSec(itemsArray){
        var unitsPerSec = 0;
            itemsArray.forEach(function(e) {
                        unitsPerSec += (e.count*e.dmg);
                        e.lifeTimeDmg += (e.count*e.dmg);
                    }, this);
            return unitsPerSec;
    };

    function gameLoop() {
        //update dmg
        var itemDps = calcUnitsPerSec(ractive.get('items'));
        var friendDps = calcUnitsPerSec(ractive.get('friends'));

        ractive.set('dps', itemDps + friendDps); 

        document.title = ractive.get('units') + " Diamonds"; 

        //this must be the last statment
        setTimeout(gameLoop, 1000);
    }

    //Start the game the first time
    gameLoop();
    //start the smoothscore
    smoothScoreLoop();

   $(".MonsterCard").click(function() {
//TODOset train button visible when needed!!!

       var selectedItem = $(this);
       if(selectedItem.hasClass('active')){
           unSelectFriend();
           return;       
        }
        //selection 
        $(".MonsterCard").removeClass("active");
        selectedItem.addClass("active");
        
        $('.MonsterCard').each(function(i, e){
            if(selectedItem[0] != e)
            {
                $(this).find('.arrow-right').hide();
            }
            else{
                $(this).find('.arrow-right').show();
            }
        });

        //load itemset
        var name = $(this).attr('friendName');
        ractive.set('selectedFriend', name); //eeeh dubbel??
        var selectedFriend = getObjectFromListByName('friends', name);
        ractive.set('selectedFriendName', selectedFriend.name);  // HALP > Doet dit nu hetzelfde als de regel hier 2 boven //het lijkt erop dat friendName en friend hetzelfde bevatten
        var items = getByName(selectedFriend.itemListName)
        ractive.set('items', items);   
    });

    function unSelectFriend(){
        $(".MonsterCard").removeClass("active");
        $(".MonsterCard").find('.arrow-right').hide();
        //load itemset
        ractive.set('selectedFriend', '');
        ractive.set('selectedFriendName', 'No one');
        ractive.set('items', []);  
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


});

