    var ractive = new Ractive({
        el: "#container",
        template: "#template",
        data: {
            units: 9999999999999, //TODO SET TO 1000 FOR GAMPLAY
            dps: 0,
            level: 0, //aantalKills
            enemyIndex: 0,
            currentEnemy: {},
            door:"images/door.png",
            doorSet: true,
            attack: false,
            mine: true,
            diceMessage: '',
            diceList: [{value:1}],
            round: function(number){
                return Math.round(number * 10) / 10;
            },
            isFriendAvailable: function(name){
                if(name != 'No one'){
                    return getObjectFromListByName('friends', name).count > 0;
                }
            },
            selectedFriend: function(name){
                if(name != 'No one'){
                    return getObjectFromListByName('friends', name);
                }
            },
            TotalDmgOfFriendType: function(name){
                if(name != 'No one'){
                    return getTotalDmgOfFriendType(name);
                }
            },
            roundedUnits: 0,
            nFormat: function(number){
                    return nFormatter(number,2);               
            },
            selectedFriendName: 'No one',  
            trainButton: { name: "Train", description: "Level up your friend. Increases base damge and unlocks evolutions.", img:"", isVisble: true },
            evolveButton: { name: "Evolve", description: "Evolve this friend to a new and more powerfull form!", img:"images/items/stars.png", price:1000, isVisble: false },                              
            items: [],                    
           
            //Items per starter
            itemsPandoo: 
                    [{name:"Focus Cube",   description:"Increase Pandoo's base damage.",         img:"images/items/weird-cube.png",         lvl:0,  count:0, price:1000,   dmg:100,    boost:0,    max:10}, 
                     {name:"+1% DMG",      description:"Add 1% bonus damage to the base dmg.",   img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:0,     boost:1,    max:100}],

            itemsBlazby: 
                    [{name:"Focus Cube",   description:"Increase Blazby's base damage.",         img:"images/items/weird-cube.png",         lvl:0,  count:0, price:6000,     dmg:300,    boost:0,    max:10},
                     {name:"+1% DMG",      description:"Add 1% bonus damage to the base dmg.",   img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:0,     boost:1,    max:200}],

            itemsKniron: 
                    [{name:"Focus Cube",   description:"Increase Knirion's base damage.",         img:"images/items/weird-cube.png",         lvl:0,  count:0, price:10000,     dmg:500,     boost:0,     max:10},
                     {name:"+1% DMG",      description:"Add 1% bonus damage to the base dmg.",    img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:0,      boost:1,     max:300}],

            itemsEartail:
                    [{name:"Focus Cube",   description:"Increase base Dmg.",                      img:"images/items/weird-cube.png",         lvl:0,  count:0, price:16000,    dmg:800,     boost:0,     max:10},
                     {name:"+1% DMG",      description:"Add 1% bonus damage to the base dmg.",    img:"images/items/water.png",              lvl:0,  count:0, price:10,     dmg:0,      boost:1,     max:500}],

            itemsPhyracu: 
                     [{name:"Focus Cube",  description:"Increase base Dmg.",                      img:"images/items/weird-cube.png",         lvl:0,  count:0, price:26000,     dmg:1300,    boost:0,     max:10},
                     {name:"+1% DMG",      description:"Add 1% bonus damage to the base dmg.",    img:"images/items/water-glass.png",        lvl:0,  count:0, price:100,    dmg:0,      boost:1,     max:999}],

            enemys: 
                    [{name:"Dropphin",   hp:150, total: 150, power:'Easy', index: 1, img:"images/enemys/007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                     {name:"Dolswim",    hp:0,   total: 0,   power:'Easy', index: 2, img:"images/enemys/008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                     {name:"Arambly",    hp:0,   total: 0,   power:'Easy', index: 3, img:"images/enemys/034_arambly_by_deoxysdaniel-d5mriwg.png"},
                     {name:"Umbrarach",  hp:0,   total: 0,   power:'Easy', index: 4, img:"images/enemys/035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                     {name:"Cubern",     hp:0,   total: 0,   power:'Easy', index: 5, img:"images/enemys/036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                     {name:"Gigarotto",  hp:0,   total: 0,   power:'Easy', index: 6, img:"images/enemys/037_gigarotto_by_deoxysdaniel-d5n1w4w.png"},
                     {name:"Giksy",      hp:0,   total: 0,   power:'Easy', index: 7, img:"images/enemys/041_giksy_by_deoxysdaniel-d5ncn82.png"},
                     {name:"Scrysee",    hp:0,   total: 0,   power:'Easy', index: 8, img:"images/enemys/042_scrysee_by_deoxysdaniel-d5ngh83.png"},
                     {name:"Hitkid",     hp:0,   total: 0,   power:'Easy', index: 9, img:"images/enemys/043_hitkid_by_deoxysdaniel-d5ncn8n.png"},
                     {name:"Hitkayow",   hp:0,   total: 0,   power:'Easy', index: 10, img:"images/enemys/044_hitkayow_by_deoxysdaniel-d5ngh88.png"},                  
                     {name:"Snogoat",    hp:0,   total: 0,   power:'Easy', index: 11, img:"images/enemys/045_snogoat_by_deoxysdaniel-d5nwevp.png"},
                     {name:"Firnhorn",   hp:0,   total: 0,   power:'Easy', index: 12, img:"images/enemys/046_firnhorn_by_deoxysdaniel-d5o36ot.png"},
                     {name:"Glacyak",    hp:0,   total: 0,   power:'Easy', index: 13, img:"images/enemys/047_glacyak_by_deoxysdaniel-d5oh0h6.png"},
                     {name:"Anemo",      hp:0,   total: 0,   power:'Easy', index: 14, img:"images/enemys/051_anemo_by_deoxysdaniel-d5nwex0.png"},
                     {name:"Nemonish",   hp:0,   total: 0,   power:'Easy', index: 15, img:"images/enemys/052_nemonish_by_deoxysdaniel-d5o375e.png"},
                     {name:"Ancshark",   hp:0,   total: 0,   power:'Easy', index: 16, img:"images/enemys/056_ancshark_by_deoxysdaniel-d5p8brn.png"},
                     {name:"Ankammer",   hp:0,   total: 0,   power:'Medium', index: 17, img:"images/enemys/057_ankammer_by_deoxysdaniel-d5p8ici.png"},
                     {name:"Hammerank",  hp:0,   total: 0,   power:'Medium', index: 18, img:"images/enemys/058_hammerank_by_deoxysdaniel-d5p9sfq.png"},
                     {name:"Leafllen",   hp:0,   total: 0,   power:'Medium', index: 19, img:"images/enemys/059_leafllen_by_deoxysdaniel-d5pg65m.png"},
                     {name:"Spectree",   hp:0,   total: 0,   power:'Medium', index: 20, img:"images/enemys/060_spectree_by_deoxysdaniel-d5pg6nk.png"},
                     {name:"Treethom",   hp:0,   total: 0,   power:'Medium', index: 21, img:"images/enemys/061_treethom_by_deoxysdaniel-d5pg7k8.png"},
                     {name:"Macombu",    hp:0,   total: 0,   power:'Medium', index: 22, img:"images/enemys/062_macombu_by_deoxysdaniel-d5pmg6t.png"},
                     {name:"Eumovolt",   hp:0,   total: 0,   power:'Medium', index: 23, img:"images/enemys/063_eumovolt_by_deoxysdaniel-d5pmg70.png"},
                     {name:"Spookola",   hp:0,   total: 0,   power:'Medium', index: 24, img:"images/enemys/064_____by_deoxysdaniel-d5pqlrv.png"},
                     {name:"Bookola",    hp:0,   total: 0,   power:'Medium', index: 25, img:"images/enemys/065_____by_deoxysdaniel-d5psbvj.png"},
                     {name:"Sparkle",    hp:0,   total: 0,   power:'Medium', index: 26, img:"images/enemys/066_____by_deoxysdaniel-d5pqls8.png"},
                     {name:"The Don",    hp:0,   total: 0,   power:'Medium', index: 27, img:"images/enemys/067_____by_deoxysdaniel-d5psbvs.png"},
                     {name:"Zenkqwaak",  hp:0,   total: 0,   power:'Medium', index: 28, img:"images/enemys/068_last_fakemon_of_the_year_by_deoxysdaniel-d5px255.png"},
                     {name:"Tribuno",    hp:0,   total: 0,   power:'Medium', index: 29, img:"images/enemys/069_tribuno_by_deoxysdaniel-d5q5kzq.png"},
                     {name:"Tributoo",   hp:0,   total: 0,   power:'Medium', index: 30, img:"images/enemys/070_tributoo_by_deoxysdaniel-d5q7s8m.png"},
                     {name:"Tribarrior", hp:0,   total: 0,   power:'Medium', index: 31, img:"images/enemys/071_tribarrior_by_deoxysdaniel-d5qbho6.png"},
                     {name:"Lycub",      hp:0,   total: 0,   power:'Hard', index: 32, img:"images/enemys/072_lycub_by_deoxysdaniel-d5quelj.png"},
                     {name:"Lycantrix",  hp:0,   total: 0,   power:'Hard', index: 33, img:"images/enemys/073_____by_deoxysdaniel-d5r6whv.png"},
                     {name:"Companyan",  hp:0,   total: 0,   power:'Hard', index: 34, img:"images/enemys/074_companyan_by_deoxysdaniel-d5quelr.png"},
                     {name:"Felomnious", hp:0,   total: 0,   power:'Hard', index: 35, img:"images/enemys/075_felomnious_by_deoxysdaniel-d5r55wu.png"},
                     {name:"Lumbrunnel", hp:0,   total: 0,   power:'Hard', index: 36, img:"images/enemys/076_lumbrunnel_by_deoxysdaniel-d5qzbiv.png"},
                     {name:"Unidirecto", hp:0,   total: 0,   power:'Hard', index: 37, img:"images/enemys/077_____by_deoxysdaniel-d5r6wim.png"},
                     {name:"Chemiost",   hp:0,   total: 0,   power:'Hard', index: 38, img:"images/enemys/078_chemiost_by_deoxysdaniel-d5qzbj9.png"},
                     {name:"Chemizomb",  hp:0,   total: 0,   power:'Hard', index: 39, img:"images/enemys/079_chemizomb_by_deoxysdaniel-d5r55x0.png"},
                     {name:"Sounshock",  hp:0,   total: 0,   power:'Hard', index: 40, img:"images/enemys/080_sounshock_by_deoxysdaniel-d5rq3pz.png"},
                     {name:"Metahertz",  hp:0,   total: 0,   power:'Hard', index: 41, img:"images/enemys/081_metahertz_by_deoxysdaniel-d5rq3q5.png"},
                     {name:"Decibvolt",  hp:0,   total: 0,   power:'Hard', index: 42, img:"images/enemys/082_decibvolt_by_deoxysdaniel-d5rq3qf.png"},
                     {name:"Bilophos",   hp:0,   total: 0,   power:'Hard', index: 43, img:"images/enemys/083_bilophos_by_daniel_dna-d5s1icl.png"},
                     {name:"Bilophotor", hp:0,   total: 0,   power:'Legendary', index: 44, img:"images/enemys/084_bilophotor_by_daniel_dna-d5shojp.png"},
                     {name:"Dimitron",   hp:0,   total: 0,   power:'Legendary', index: 45, img:"images/enemys/085_dimitron_by_daniel_dna-d5s1ijl.png"},
                     {name:"Dimetrogos", hp:0,   total: 0,   power:'Legendary', index: 46, img:"images/enemys/086_dimetrogos_by_daniel_dna-d5t3ep1.png"},
                     {name:"Fragerus",   hp:0,   total: 0,   power:'Legendary', index: 47, img:"images/enemys/fragerus_by_deoxysdaniel-d5rpwqf.png"},
                     {name:"Gryffigon",  hp:0,   total: 0,   power:'Legendary', index: 48, img:"images/enemys/gryffigon_by_daniel_dna-d5w8jdr.png"},
                     {name:"Orthivide",  hp:0,   total: 0,   power:'Legendary', index: 49, img:"images/enemys/orthivide_by_deoxysdaniel-d5rpwqr.png"},
                     {name:"Unihund",    hp:0,   total: 0,   power:'Legendary', index: 50, img:"images/enemys/unihund_by_deoxysdaniel-d5ru0dg.png"}],
            //starters
            friends: 
                    [{name:"Pandoo",  count: 1, lvl:1, levelUp: 10, stage:1, nextStageIndex:0, minKills:0,   dmg:2, boost:0,  lifeTimeDmg:0, price:100, trainPrice: 100,   unlockedAt:0,   img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png", itemListName: "itemsPandoo",  isSelected: false },
                     {name:"Blazby",  count: 0, lvl:1, levelUp: 20, stage:1, nextStageIndex:2, minKills:10,  dmg:3, boost:0,  lifeTimeDmg:0, price:200,  trainPrice: 100,   unlockedAt:5,   img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png", itemListName: "itemsBlazby",   isSelected: false },
                     {name:"Kniron",  count: 0, lvl:1, levelUp: 30, stage:1, nextStageIndex:4, minKills:50,  dmg:5, boost:0,  lifeTimeDmg:0, price:300,  trainPrice: 100,   unlockedAt:25,  img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png", itemListName: "itemsKniron",   isSelected: false },
                     {name:"Eartail", count: 0, lvl:1, levelUp: 50, stage:1, nextStageIndex:6, minKills:100, dmg:8, boost:0,  lifeTimeDmg:0, price:500,  trainPrice: 100,   unlockedAt:50,  img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png", itemListName: "itemsEartail", isSelected: false },
                     {name:"Phyracu", count: 0, lvl:0, levelUp: 80, stage:1, nextStageIndex:8, minKills:200, dmg:13,boost:0,  lifeTimeDmg:0, price:800,  trainPrice: 100,   unlockedAt:100, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png", itemListName: "Phyracu",      isSelected: false }],          
            //upgrade data
            friendsData:
                    //Pandoo - Line
                    [{name:"Herbear", levelUp: 20,     nextStageIndex:1,       dmg:1000,  img:"images/friends/002_herbear_by_deoxysdaniel-d5jhct0.png"},       //0
                    {name:"Ursorest", levelUp: 9999,    nextStageIndex:9999,    dmg:300,   img:"images/friends/003_ursorest_by_deoxysdaniel-d5jv6td.png"},      //1
                    //Blazby - Line
                    {name:"Blazemour", levelUp: 40,    nextStageIndex:3,       dmg:2000,  img:"images/friends/005_blazemour_by_deoxysdaniel-d5jhcw5.png"},     //2
                    {name:"Blazieval", levelUp: 9999,   nextStageIndex:9999,    dmg:300,   img:"images/friends/006_blazieval_by_deoxysdaniel-d5jv6uh.png"},     //3
                    //Kniron - Line
                    {name:"Kniveroon", levelUp: 60,    nextStageIndex:5,       dmg:3000,  img:"images/friends/039_kniveroon_by_deoxysdaniel-d5ngh7v.png"},     //4
                    {name:"Kniferros", levelUp: 9999,   nextStageIndex:9999,    dmg:300,   img:"images/friends/040_kniferros_by_deoxysdaniel-d5nq2wl.png"},     //5
                    //Eartail - Line
                    {name:"Quaketai", levelUp: 100,     nextStageIndex:7,       dmg:4000,  img:"images/friends/049_quaketail_by_deoxysdaniel-d5ob4xn.png"},     //6
                    {name:"Seismitail", levelUp: 9999,  nextStageIndex:9999,    dmg:300,   img:"images/friends/050_seismitail_by_deoxysdaniel-d5ol2uq.png"},    //7
                    //Phyracu - Line
                    {name:"Corhyncu", levelUp: 160,     nextStageIndex:9,       dmg:5000,  img:"images/friends/054_corhyncu_by_deoxysdaniel-d5ob5z7.png"},      //8
                    {name:"Togarucu", levelUp: 9999,    nextStageIndex:9999,    dmg:300,   img:"images/friends/055_togarucu_by_deoxysdaniel-d5oi8h5.png"},      //9                                     
                    ],
            //Levels
            maplevel: [
                { areaName: "Forest", levelCode: 1 },
                { areaName: "Deep forest", levelCode: 2 },
                { areaName: "Deeper forest", levelCode: 3 },
                { areaName: "Middle forest", levelCode: 4 },
                { areaName: "Center forest", levelCode: 5 },
                { areaName: "Far forest", levelCode: 6 },
                { areaName: "Elven forest", levelCode: 7 },
                { areaName: "Forest edge", levelCode: 8 },
                { areaName: "Plains", levelCode: 9 },
                { areaName: "Wide Plaines", levelCode: 10 },
                { areaName: "Barren Plains", levelCode: 11 },
                { areaName: "Hillside", levelCode: 12 },
                { areaName: "plains", levelCode: 13 },
                { areaName: "plains", levelCode: 14 },
                { areaName: "plains", levelCode: 15 },
                { areaName: "plains", levelCode: 16 },
            ]
        }
    });

function getObjectFromListByName(list, name){
    var list = ractive.get(list);
    for(var i = 0; i <= list.length; i++){
        if(list[i].name == name)
            return list[i];
    }
}

function getTotalDmgOfFriendType(name){
    var friend = getObjectFromListByName('friends', name);
    var count = friend.count;
    var baseDamage = friend.dmg;
    var totalbaseDamage = baseDamage*count;
    var boostPercentage = friend.boost;   
    var TotalBoostDmg = (totalbaseDamage/100)*boostPercentage;
    var totalDamageOfThisFriendType = (count*baseDamage)+TotalBoostDmg;

    return totalDamageOfThisFriendType;

}

function nFormatter(num, digits) {
    var si = [                                  //ENG             //NL        //Si-units
        { value: 1E18, symbol: "Qt" },          //Quintillion     //Triljoen  //E
        { value: 1E15, symbol: "Q" },           //Quadrillion     //Biljard   //P
        { value: 1E12, symbol: "T" },           //Trillion        //Biljoen   //T
        { value: 1E9,  symbol: "B" },           //Bilion          //Miljard   //G
        { value: 1E6,  symbol: "M" },           //Million         //Miljoen   //M
        { value: 1E3,  symbol: "k" }            //Kilo            //Duizend   //k
    ], rx = /\.0+$|(\.[0-9]*[1-9])0+$/, i;
    for (i = 0; i < si.length; i++) {
        if (num >= si[i].value) {
        return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
        }
    }
    return num.toFixed(digits).replace(rx, " $1");
}

