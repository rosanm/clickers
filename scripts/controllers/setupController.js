$(document).ready(function(){    
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

    function gameLoop() {      
        //update dmg
        var friendDps = scoreController.calcUnitsPerSec(ractive.get('friends'));
        ractive.set('dps', friendDps); 
        //update title
        document.title = ractive.get('units') + " Diamonds"; 

        //this must be the last statment
        setTimeout(gameLoop, 1000);
    }

    //Start the game the first time
    gameLoop();
    //start the smoothscore
    scoreController.smoothScore();
    //attack
    enemyController.attack();
   
});

