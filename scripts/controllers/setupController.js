$(document).ready(function(){    
    var ractive = new Ractive({
        el: "#container",
        template: "#template",
        data: {
            units: 0,
            dps: 0,
            level: 1,
            enemyIndex: 0,
            currentEnemy: {},
            door:"images/door.png",
            doorSet: false,
            range: function (low, high) {
                        var range = [];
                        for (i = low; i <= high; i += 1) {
                            range.push( i );
                        }
                        return range;
                    },

            items: [],
            
            //Items per starter
            itemsPandoo: 
                    [{name:"Harder Pandoo",     img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:5,     max:2},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:25,     max:10}],

            itemsBlazby: 
                    [{name:"Harder Blazby",     img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:5,     max:2},
                     {name:"Mega Bite",         img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:25,     max:10},
                     {name:"Dance Saliva",      img:"images/items/orange-glass-round.png", lvl:0,  count:0, price:2500,   dmg:50,    max:1},
                     {name:"Crit Bite",         img:"images/items/green-glass-round.png",  lvl:0,  count:0, price:8000,   dmg:500,   max:2},],

            itemsKniron: 
                    [{name:"Harder Kniron",     img:"images/items/water.png",              lvl:0, count:0, price:10,     dmg:5,     max:2}],

            itemsEartail:
                    [{name:"Super Eartail",     img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:1,     max:10},
                     {name:"Low Kick",          img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:2,     max:2},
                     {name:"Fighter Bite",      img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:3,     max:10},
                     {name:"Hyper Bite",        img:"images/items/water-glass-round.png",  lvl:0,  count:0, price:500,    dmg:5,    max:100}],

            itemsPhyracu: 
                     [{name:"Harder Phyracu",   img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:1,     max:2},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:2,     max:10},
                     {name:"Harder Bite",       img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:3,     max:2},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:5,     max:10},
                     {name:"Hyper Bite",        img:"images/items/water-glass-round.png",  lvl:0,  count:0, price:500,    dmg:8,    max:100},
                     {name:"Fire Saliva",       img:"images/items/orange-glass-round.png", lvl:0,  count:0, price:2500,   dmg:13,    max:1},
                     {name:"Poison Bite",       img:"images/items/green-glass-round.png",  lvl:0,  count:0, price:8000,   dmg:21,   max:2},
                     {name:"Extra Damage",      img:"images/items/pink-glass-round.png",   lvl:0,  count:0, price:50000,  dmg:34,  max:2}],

            enemys: 
                    [{name:"Dropphin",   hp:150,    total: 150,    img:"images/enemys/007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                     {name:"Dolswim",    hp:500,    total: 500,    img:"images/enemys/008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                     {name:"Arambly",    hp:1000,   total: 1000,   img:"images/enemys/034_arambly_by_deoxysdaniel-d5mriwg.png"},
                     {name:"Umbrarach",  hp:2000,   total: 2000,  img:"images/enemys/035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                     {name:"Cubern",     hp:4000,   total: 4000,  img:"images/enemys/036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                     {name:"Gigarotto",  hp:8000,   total: 8000,  img:"images/enemys/037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}],

            //starters
            friends: 
                    [{name:"Pandoo",  count: 1, lvl:1, levelUp: 10, stage:1, nextStageIndex:0, dmg:2, img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png", itemListName: "itemsPandoo" },
                     {name:"Blazby",  count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:1, dmg:3, img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png", itemListName: "itemsBlazby" },
                     {name:"Kniron",  count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:2, dmg:5, img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png", itemListName: "itemsKniron" },
                     {name:"Eartail", count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:3, dmg:8, img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png", itemListName: "itemsEartail" },
                     {name:"Phyracu", count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:4, dmg:13, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png", itemListName: "Phyracu" }],          
            //upgrade data
            friendsData: 
                    [{name:"Herbear", levelUp: 20, nextStageIndex:1, dmg:200, img:"images/friends/002_herbear_by_deoxysdaniel-d5jhct0.png"},
                    {name:"Ursorest", levelUp: 999, nextStageIndex:999, dmg:300, img:"images/friends/003_ursorest_by_deoxysdaniel-d5jv6td.png"}]
        }
    });
    //TODO: Doorset

    function populateZoo() {  
        ractive.get('friends').forEach(function(e, i) {
            if(e.count > 0){
                   ractive.get('friends')[i].dmg = e.dmg*e.count;
                }
        }, this);
    };


    function attackEnemy() {
        ractive.set('currentEnemy', ractive.get('enemys')[ractive.get('enemyIndex')]);
        var currentEnemy = ractive.get('currentEnemy');
       
        //Dmg word nonstop gedaan in de progressbarr
        currentEnemy.hp = ractive.get('currentEnemy').hp - (ractive.get('dps')/100);

        var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
        $("progress").attr('value', progress);
        $("#progresscontainer").show();

        ractive.update();
        
        if(ractive.get('currentEnemy.hp') < 0){
            //verhoog level met 1
            ractive.set('level', ractive.get('level') + 1);
            //zet de nieuwe 20% sterker
            currentEnemy.hp = currentEnemy.total + (currentEnemy.total * 0.2);
            currentEnemy.total = currentEnemy.hp;

            var enemyIndex = ractive.get('enemyIndex');
            if(enemyIndex == ractive.get('enemys').length - 1)
                ractive.set('enemyIndex', 0);
            else
                ractive.set('enemyIndex', enemyIndex + 1);
                  
            ractive.set('currentEnemy', ractive.get('enemys')[enemyIndex]);  
            
            ractive.update();

            $("#progresscontainer").hide();
            $(".doorSet").show();
            $(".enemySet").hide();
        }
        else {
            $(".doorSet").hide();
            $(".enemySet").show();
        } 

        setTimeout(attackEnemy, 10); //loop 100x per sec  
    };

    attackEnemy();

    ractive.on({
        trainFriend: function(event, index) { 
            var me =  ractive.get('friends')[index];           
            me.lvl = me.lvl + 1;
            me.dmg = me.dmg + 3;

            if(me.lvl >= me.levelUp) {
                    //set all new data
                    var evo = ractive.get('friendsData')[me.nextStageIndex];
                    me.img = evo.img;
                    me.name = evo.name;
                    me.levelUp = evo.levelUp;
                    me.stage = me.stage + 1;
                    me.nextStageIndex = evo.nextStageIndex;
                    me.dmg = evo.dmg;
                }
            
            ractive.update();
        },
        buyOrUpgrade: function (event, itemNr){
            //Can affound?
            if(ractive.get('units') >= ractive.get('items')[itemNr].price){
                //Still in stock?
                if(ractive.get('items')[itemNr].count < ractive.get('items')[itemNr].max){
                    //Buy it
                    var diamonds = ractive.get('units');
                    var priceOfItem = ractive.get('items')[itemNr].price;
                    ractive.set('units', diamonds - priceOfItem);
                    var upgradedItem = ractive.get('items')[itemNr];
                    upgradedItem.lvl = upgradedItem.lvl +1;
                    upgradedItem.price = Math.round(upgradedItem.price * 1.2);
                    upgradedItem.dmg = Math.round(upgradedItem.dmg * 1.2);
                    ractive.update();
                }else{
                    alert(ractive.get('items')[itemNr].name +" is out of stock, maximum reached. " +
                    ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max )
                }
            }
        }
    });

    function calcUnitsPerSec(itemsArray){
        var unitsPerSec = 0;
            itemsArray.forEach(function(e) {
                        unitsPerSec += (e.count*e.dmg);
                    }, this);
            return unitsPerSec;
    };

    function gameLoop() {
        //update dmg
        var itemDps = calcUnitsPerSec(ractive.get('items'));
        var friendDps = calcUnitsPerSec(ractive.get('friends'));
        ractive.set('dps', itemDps + friendDps);      
                
        //this must be the last statment
        setTimeout(gameLoop, 1000);
    }

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

        ractive.set('units', rounded);

        //this must be the last statment
        setTimeout(smoothScoreLoop, 10); //loop 100x per sec
    }

    //Start the game the first time
    gameLoop();
    //start the smoothscore
    smoothScoreLoop();

    //Jquery-UI
    $("#sortable").sortable({
        revert: true,
    });

    $("#items-box").sortable({
        revert: true,
    });

    //$(".MonsterCard").tooltip();

   $(".MonsterCard").click(function() {
        //selection 
        $(".MonsterCard").removeClass("active");
        $(this).addClass("active");
        
        //load itemset
        var name = $(this).attr('friendName');
        var selectedFriend = getObjectFromListByName('friends', name);
        var items = getByName(selectedFriend.itemListName)
        ractive.set('items', items);   
    });

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

