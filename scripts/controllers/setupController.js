$(document).ready(function(){    
    var ractive = new Ractive({
        el: "#container",
        template: "#template",
        data: {
            units: 1000,
            ups: 0,
            level: 1,
            currentEnemy: {},
            selectedFriend: 0,
            door:"images/door.png",
            doorSet: false,
            range: function (low, high) {
                        var range = [];
                        for (i = low; i <= high; i += 1) {
                            range.push( i );
                        }
                        return range;
                    },


            items: [{name:"Harder Bite",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10},
                     {name:"Hyper Bite",   img:"images/items/water-glass-round.png",    count:0, price:500,    dmg:10,    max:100},
                     {name:"Fire Saliva",  img:"images/items/orange-glass-round.png",   count:0, price:2500,   dmg:50,    max:1},
                     {name:"Poison Bite",  img:"images/items/green-glass-round.png",    count:0, price:8000,   dmg:500,   max:2},
                     {name:"Extra Damage", img:"images/items/pink-glass-round.png",     count:0, price:50000,  dmg:2000,  max:2}],
            
            //Items For Pandoo
            items0: [{name:"Harder Pandoo",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10}],

            //Items For Blazby
            items1: [{name:"Harder Blazby",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10}],

             //Items For Kniron
            items2: [{name:"Harder Kniron",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10}],

            //Items For Eartail
            items3: [{name:"Harder Eartail",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10}],

            //Items For Phyracu
            items4: [{name:"Harder Phyracu",  img:"images/items/water.png",                count:0, price:10,      dmg:1,     max:2},
                     {name:"Super Bite",   img:"images/items/water-glass.png",          count:0, price:100,    dmg:2,     max:10}],

            enemys: [{name:"Dropphin",   hp:1500,    total: 1500,    img:"images/enemys/007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                     {name:"Dolswim",    hp:5000,    total: 5000,    img:"images/enemys/008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                     {name:"Arambly",    hp:20000,   total: 20000,   img:"images/enemys/034_arambly_by_deoxysdaniel-d5mriwg.png"},
                     {name:"Umbrarach",  hp:100000,  total: 100000,  img:"images/enemys/035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                     {name:"Cubern",     hp:500000,  total: 500000,  img:"images/enemys/036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                     {name:"Gigarotto",  hp:2000000, total: 200000,  img:"images/enemys/037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}],

            friends: [{name:"Pandoo", id:1, count: 1, lvl:1, levelUp: 10, nextStageId:0, stage:1, dmg:100, img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png"},
                     {name:"Blazby",  id:2, count: 0, lvl:1, levelUp: 10, nextStageId:1, stage:1, dmg:200, img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png"},
                     {name:"Kniron",  id:3, count: 0, lvl:1, levelUp: 10, nextStageId:2, stage:1, dmg:300, img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png"},
                     {name:"Eartail", id:4, count: 0, lvl:1, levelUp: 10, nextStageId:3, stage:1, dmg:500, img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png"},
                     {name:"Phyracu", id:5, count: 0, lvl:1, levelUp: 10, nextStageId:4, stage:1, dmg:800, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png"}],

            friends2: [{name:"Herbear", id:6, count: 1, lvl:10, levelUp: 20, stage:2, dmg:100, img:"images/friends/002_herbear_by_deoxysdaniel-d5jhct0.png"}],

            friends3: [{name:"Ursorest", id:11, count: 1, lvl:20, levelUp: 999, stage:3, dmg:100, img:"images/friends/003_ursorest_by_deoxysdaniel-d5jv6td.png"}]
        }
    });

    ractive.on({
        trainFriend: function(index) {
            var me =  ractive.get('friends')[index];
            ractive.get('friends')[index].lvl++;
            if(me.lvl >= me.levelUp){
                if(me.stage == 1){
                    ractive.set(('friends')[index].count, 0);
                    ractive.set(('friends2')[index].count, 1);
                }
                if(me.stage == 2){
                    ractive.set(('friends2')[index].count, 0);
                    ractive.set(('friends3')[index].count, 1);
                }
            } 
        }  
    });

    function populateZoo() {  
        ractive.get('friends').forEach(function(e, i) {
            if(e.count > 0){
                   ractive.get('friends')[i].ups = e.dmg*e.count;
                }
        }, this);
    };

    function populateEnemy() {   
        ractive.set('currentEnemy', ractive.get('enemys')[ractive.get('level')-1]);          

        var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
        $("progress").attr('value', progress);
        $("#progresscontainer").show();
    };

    function attackEnemy() {
        ractive.set('currentEnemy', ractive.get('enemys')[ractive.get('level')-1]);
        ractive.set('currentEnemy.hp', ractive.get('currentEnemy').hp - ractive.get('ups'));
        
        if(ractive.get('currentEnemy.hp') < 0){
            ractive.set('level', ractive.get('level') + 1);
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
        if(ractive.get('units') >= ractive.get('items')[itemNr].price){
            //Still in stock?
            if(ractive.get('items')[itemNr].count < ractive.get('items')[itemNr].max){
                //Buy it
                ractive.set('units', ractive.get('units')-ractive.get('items')[itemNr].price);
                ractive.get('items')[itemNr].count++;
            }else{
                alert(ractive.get('items')[itemNr].name +" is out of stock, maximum reached. " +
                ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max )
            }
        }
    };


    function calcUnitsPerSec(itemsArray){
        var unitsPerSec = 0;
        itemsArray.forEach(function(e) {
                    unitsPerSec += (e.count*e.dmg);
                }, this);
        return unitsPerSec;
    };

    function updateGui(){
       // populateZoo();
        populateEnemy();
    };


    function gameLoop() {
        //update ups
        itemUps = calcUnitsPerSec(ractive.get('items'));
        friendUps = calcUnitsPerSec(ractive.get('friends')) + calcUnitsPerSec(ractive.get('friends2')) + calcUnitsPerSec(ractive.get('friends3'));
        ractive.set('ups', itemUps + friendUps);      
        
        //Add units 
        ractive.set('units', ractive.get('units') + ractive.get('ups'));
        
        //Attack
        attackEnemy();
        //this must be the last statment
        setTimeout(gameLoop, 1000);
    }

    //Start the game the first time
    gameLoop();

    updateGui();


    //Jquery-UI
    $(".section-monstercard").draggable({ 
                containment: "parent",
                scroll: false,
                cursor: "move"
    });

   $(".MonsterCard").click(function(e) {

     //  alert("lol");
      alert($(this).attr('friendId'));
    });
});