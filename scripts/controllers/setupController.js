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
            attack: false,
            mine: true,
            // range: function (low, high) {
            //             var range = [];
            //             for (i = low; i <= high; i += 1) {
            //                 range.push( i );
            //             }
            //             return range;
            //         },
            round: function(number){
                return Math.round(number);
            },
            isFriendAvailable: function(name){
                return getObjectFromListByName('friends', name).count > 0;
            },
            selectedFriend: '',
            selectedFriendName: 'No one',           
            items: [],           
            //Items per starter
            itemsPandoo: 
                    [{name:"Harder Pandoo",     img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:5,     max:999},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:25,    max:999}],

            itemsBlazby: 
                    [{name:"Harder Blazby",     img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:5,     max:999},
                     {name:"Mega Bite",         img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:25,    max:999},
                     {name:"Dance Saliva",      img:"images/items/orange-glass-round.png", lvl:0,  count:0, price:2500,   dmg:50,    max:999},
                     {name:"Crit Bite",         img:"images/items/green-glass-round.png",  lvl:0,  count:0, price:8000,   dmg:500,   max:999},],

            itemsKniron: 
                    [{name:"Harder Kniron",     img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:5,      max:999}],

            itemsEartail:
                    [{name:"Super Eartail",     img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:1,     max:999},
                     {name:"Low Kick",          img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:2,     max:999},
                     {name:"Fighter Bite",      img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:3,     max:999},
                     {name:"Hyper Bite",        img:"images/items/water-glass-round.png",  lvl:0,  count:0, price:500,    dmg:5,     max:999}],

            itemsPhyracu: 
                     [{name:"Harder Phyracu",   img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:1,     max:999},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:2,     max:999},
                     {name:"Harder Bite",       img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:3,     max:999},
                     {name:"Super Bite",        img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:5,     max:999},
                     {name:"Hyper Bite",        img:"images/items/water-glass-round.png",  lvl:0,  count:0, price:500,    dmg:8,     max:999},
                     {name:"Fire Saliva",       img:"images/items/orange-glass-round.png", lvl:0,  count:0, price:2500,   dmg:13,    max:999},
                     {name:"Poison Bite",       img:"images/items/green-glass-round.png",  lvl:0,  count:0, price:8000,   dmg:21,    max:999},
                     {name:"Extra Damage",      img:"images/items/pink-glass-round.png",   lvl:0,  count:0, price:50000,  dmg:34,    max:999}],

            enemys: 
                    [{name:"Dropphin",   hp:150,    total: 150,         img:"images/enemys/007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                     {name:"Dolswim",    hp:500,    total: 500,         img:"images/enemys/008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                     {name:"Arambly",    hp:1000,   total: 1000,        img:"images/enemys/034_arambly_by_deoxysdaniel-d5mriwg.png"},
                     {name:"Umbrarach",  hp:2000,   total: 2000,        img:"images/enemys/035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                     {name:"Cubern",     hp:4000,   total: 4000,        img:"images/enemys/036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                     {name:"Gigarotto",  hp:8000,   total: 8000,        img:"images/enemys/037_gigarotto_by_deoxysdaniel-d5n1w4w.png"},
                     {name:"Giksy",      hp:13000,   total: 13000,      img:"images/enemys/041_giksy_by_deoxysdaniel-d5ncn82.png"},
                     {name:"Scrysee",    hp:21000,   total: 8000,       img:"images/enemys/042_scrysee_by_deoxysdaniel-d5ngh83.png"},
                     {name:"Hitkid",     hp:29000,   total: 29000,      img:"images/enemys/043_hitkid_by_deoxysdaniel-d5ncn8n.png"},
                     {name:"Hitkayow",   hp:50000,   total: 50000,      img:"images/enemys/044_hitkayow_by_deoxysdaniel-d5ngh88.png"},                  
                     {name:"Snogoat",    hp:79000,   total: 79000,      img:"images/enemys/045_snogoat_by_deoxysdaniel-d5nwevp.png"},
                     //BELOW HERE IS NOT FIXED YET
                     {name:"Firnhorn",   hp:0,   total: 0,              img:"images/enemys/046_firnhorn_by_deoxysdaniel-d5o36ot.png"},
                     {name:"Glacyak",    hp:0,   total: 0,              img:"images/enemys/047_glacyak_by_deoxysdaniel-d5oh0h6.png"},
                     {name:"Anemo",     hp:0,   total: 0,               img:"images/enemys/051_anemo_by_deoxysdaniel-d5nwex0.png"},
                     {name:"Nemonish",  hp:0,   total: 0,               img:"images/enemys/052_nemonish_by_deoxysdaniel-d5o375e.png"},
                     {name:"Ancshark",  hp:0,   total: 0,               img:"images/enemys/056_ancshark_by_deoxysdaniel-d5p8brn.png"},
                     {name:"Ankammer",  hp:0,   total: 0,               img:"images/enemys/057_ankammer_by_deoxysdaniel-d5p8ici.png"},
                     {name:"Hammerank",  hp:0,   total: 0,     img:"images/enemys/058_hammerank_by_deoxysdaniel-d5p9sfq.png"},
                     {name:"Leafllen",  hp:0,   total: 0,      img:"images/enemys/059_leafllen_by_deoxysdaniel-d5pg65m.png"},
                     {name:"Spectree",  hp:0,   total: 0,      img:"images/enemys/060_spectree_by_deoxysdaniel-d5pg6nk.png"},
                     {name:"Treethom",  hp:0,   total: 0,      img:"images/enemys/061_treethom_by_deoxysdaniel-d5pg7k8.png"},
                     {name:"Macombu",  hp:0,   total: 0,      img:"images/enemys/062_macombu_by_deoxysdaniel-d5pmg6t.png"},
                     {name:"Eumovolt",  hp:0,   total: 0,     img:"images/enemys/063_eumovolt_by_deoxysdaniel-d5pmg70.png"},
                     {name:"Spookola",  hp:0,   total: 0,    img:"images/enemys/064_____by_deoxysdaniel-d5pqlrv.png"},
                     {name:"Bookola",  hp:0,   total: 0,    img:"images/enemys/065_____by_deoxysdaniel-d5psbvj.png"},
                     {name:"Sparkle",  hp:0,   total: 0,    img:"images/enemys/066_____by_deoxysdaniel-d5pqls8.png"},
                     {name:"The Don",  hp:0,   total: 0,    img:"images/enemys/067_____by_deoxysdaniel-d5psbvs.png"},
                     {name:"Zenkqwaak",  hp:0,   total: 0,                  img:"images/enemys/068_last_fakemon_of_the_year_by_deoxysdaniel-d5px255.png"},
                     {name:"Tribuno",  hp:0,   total: 0,                    img:"images/enemys/069_tribuno_by_deoxysdaniel-d5q5kzq.png"},
                     {name:"Tributoo",  hp:0,   total: 0,                   img:"images/enemys/070_tributoo_by_deoxysdaniel-d5q7s8m.png"},
                     {name:"Tycub",  hp:0,   total: 0,                      img:"images/enemys/071_tycub_by_deoxysdaniel-d5qbho6.png"},
                     {name:"Lycub",  hp:0,   total: 0,                      img:"images/enemys/072_lycub_by_deoxysdaniel-d5quelj.png"},
                     {name:"Lycantrix",  hp:0,   total: 0,                  img:"images/enemys/073_____by_deoxysdaniel-d5r6whv.png"},
                     {name:"Companyan",  hp:0,   total: 0,            img:"images/enemys/074_companyan_by_deoxysdaniel-d5quelr.png"},
                     {name:"Felomnious",  hp:0,   total: 0,         img:"images/enemys/075_felomnious_by_deoxysdaniel-d5r55wu.png"},
                     {name:"Lumbrunnel",  hp:0,   total: 0,       img:"images/enemys/076_lumbrunnel_by_deoxysdaniel-d5qzbiv.png"},
                     {name:"Unidirecto",  hp:0,   total: 0,     img:"images/enemys/077_____by_deoxysdaniel-d5r6wim.png"},
                     {name:"Chemiost",  hp:0,   total: 0,     img:"images/enemys/078_chemiost_by_deoxysdaniel-d5qzbj9.png"},
                     {name:"Chemizomb",  hp:0,   total: 0,   img:"images/enemys/079_chemizomb_by_deoxysdaniel-d5r55x0.png"},
                     {name:"Sounshock",  hp:0,   total: 0,   img:"images/enemys/080_sounshock_by_deoxysdaniel-d5rq3pz.png"},
                     {name:"Metahertz",  hp:0,   total: 0,   img:"images/enemys/081_metahertz_by_deoxysdaniel-d5rq3q5.png"},
                     {name:"Decibvolt",  hp:0,   total: 0,   img:"images/enemys/082_decibvolt_by_deoxysdaniel-d5rq3qf.png"},
                     {name:"Bilophos",  hp:0,   total: 0,    img:"images/enemys/083_bilophos_by_daniel_dna-d5s1icl.png"},
                     {name:"Bilophotor",  hp:0,   total: 0,  img:"images/enemys/084_bilophotor_by_daniel_dna-d5shojp.png"},
                     {name:"Dimitron",  hp:0,   total: 0,    img:"images/enemys/085_dimitron_by_daniel_dna-d5s1ijl.png"},
                     {name:"Dimetrogos",  hp:0,   total: 0, img:"images/enemys/086_dimetrogos_by_daniel_dna-d5t3ep1.png"},
                     {name:"Fragerus",  hp:0,   total: 0,   img:"images/enemys/fragerus_by_deoxysdaniel-d5rpwqf.png"},
                     {name:"Gryffigon",  hp:0,   total: 0,  img:"images/enemys/gryffigon_by_daniel_dna-d5w8jdr.png"},
                     {name:"Orthivide",  hp:0,   total: 0,  img:"images/enemys/orthivide_by_deoxysdaniel-d5rpwqr.png"},
                     {name:"Unihund",  hp:0,   total: 0,    img:"images/enemys/unihund_by_deoxysdaniel-d5ru0dg.png"}],
            //starters
            friends: 
                    [{name:"Pandoo",  count: 1, lvl:1, levelUp: 10, stage:1, nextStageIndex:0, dmg:2, lifeTimeDmg:0, price:100, img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png", itemListName: "itemsPandoo" },
                     {name:"Blazby",  count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:1, dmg:3, lifeTimeDmg:0, price:200, img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png", itemListName: "itemsBlazby" },
                     {name:"Kniron",  count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:2, dmg:5, lifeTimeDmg:0, price:300, img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png", itemListName: "itemsKniron" },
                     {name:"Eartail", count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:3, dmg:8, lifeTimeDmg:0, price:500, img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png", itemListName: "itemsEartail" },
                     {name:"Phyracu", count: 0, lvl:1, levelUp: 10, stage:1, nextStageIndex:4, dmg:13,lifeTimeDmg:0, price:800, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png", itemListName: "Phyracu" }],          
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
        var currentEnemy = ractive.get('currentEnemy');

                //verhoog level met 1
                ractive.set('level', ractive.get('level') + 1);
                //zet de nieuwe 61% sterker
                currentEnemy.hp = currentEnemy.total * 1.61803398875; //Golden Ratio
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
    };

    ractive.on({
        trainFriend: function(event, index) { 
            var me =  ractive.get('friends')[index];           
            me.lvl = me.lvl + 1;
            me.dmg = me.dmg + 3;
            me.price = ractive.get('round')(me.price * 1.3);

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

    //Jquery-UI
    $("#sortable").sortable({
        revert: true,
    });

    $("#items-box").sortable({
        revert: true,
    });

   $(".MonsterCard").click(function() {
        //selection 
        $(".MonsterCard").removeClass("active");
        $(this).addClass("active");
        
        //load itemset
        var name = $(this).attr('friendName');
        ractive.set('selectedFriend', name); //eeeh dubbel??
        var selectedFriend = getObjectFromListByName('friends', name);
        ractive.set('selectedFriendName', selectedFriend.name);  // HALP > Doet dit nu hetzelfde als de regel hier 2 boven //het lijkt erop dat friendName en friend hetzelfde bevatten
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

