angular.module('Clickers', []).controller('setupController', function($scope) {

    //variables
    $scope.units = 1000;
    $scope.ups = 0;
    $scope.level = 1;
    $scope.items = [{name:"Maginifying glass", img:"water.png",                count:0, price:10,     gains:1,     max:2},
                    {name:"Newspaper",          img:"water-glass.png",          count:0, price:100,    gains:2,     max:10},
                    {name:"Anonymous tip",      img:"water-glass-round.png",    count:0, price:500,    gains:10,    max:100},
                    {name:"Watson",             img:"orange-glass-round.png",   count:0, price:2500,   gains:50,    max:1},
                    {name:"Police dog",         img:"green-glass-round.png",    count:0, price:8000,   gains:500,   max:2},
                    {name:"Police station",     img:"pink-glass-round.png",     count:0, price:50000,  gains:2000,  max:2}];

    $scope.enemys = [{name:"Dropphin", hp:1500,    total: 1500,    img:"007_dropphin_by_deoxysdaniel-d5j9slu.png"},
                    {name:"Dolswim",    hp:5000,    total: 5000,    img:"008_dolswim_by_deoxysdaniel-d5jhd0v.png"},
                    {name:"Arambly",    hp:20000,   total: 20000,   img:"034_arambly_by_deoxysdaniel-d5mriwg.png"},
                    {name:"Umbrarach",  hp:100000,  total: 100000,  img:"035_umbrarach_by_deoxysdaniel-d5mx4t9.png"},
                    {name:"Cubern",     hp:500000,  total: 500000,  img:"036_cubern_by_deoxysdaniel-d5n1gqm.png"},
                    {name:"Gigarotto",  hp:2000000, total: 200000,  img:"037_gigarotto_by_deoxysdaniel-d5n1w4w.png"}]

    $scope.friends = [{name:"Pandoo", level:1500,    count:4, gains:100, img:"images/friends/001_pandoo_by_deoxysdaniel-d5j9po2.png"},
                    {name:"Blazby",    level:5000,    count:2, gains:200, img:"images/friends/004_blazby_by_deoxysdaniel-d5j9qzc.png"},
                    {name:"Kniron",    level:20000,   count:1, gains:300, img:"images/friends/038_kniron_by_deoxysdaniel-d5ncn7r.png"},
                    {name:"Eartail",   level:100000,  count:1, gains:500, img:"images/friends/048_eartail_by_deoxysdaniel-d5nwewr.png"},
                    {name:"Phyracu",   level:500000,  count:1, gains:800, img:"images/friends/053_phyracu_by_deoxysdaniel-d5nwexe.png"}];
    //end variables
    
    function populateZoo() {
    var itemsString = "";    
            friends.forEach(function(e) {
                if(e.count > 0){
                    
                    itemsString += '<div class="whitebg">';
                    
                    var imgString ="";
                        //Build image part
                        for(i=1; i<= e.count; i++){                     
                            imgString += '<img src="images/friends/'+e.img+'" width="35%">';
                        }
                        //Build text part
                            itemsString += imgString + "<br/><div>" + e.name + ': ' + e.count + "x." + 
                             "<br/>DMG per second: " +e.gains*e.count;   
                        itemsString += '</div>';
                    }
                }, this);
        
            $(".theZoo").html(itemsString);
};

});