var diceController = {
    roleDice: function(){
        $(".dice").addClass("diceRoll");
        spinDice();
        setTimeout(stopDice, 300);
        setTimeout(checkDiceValue, 1000);
    }
};

function checkDiceValue() {
    var diceList = ractive.get('diceList');
    diceList.forEach(function(die) {
        if(die.value == 6) {
            ractive.set('doorSet', true);
            enemyController.nextEnemy();
            setMessage('win');
        }
        else {
            setMessage('lost');
        }
    });
};

function spinDice() {
    var diceList = ractive.get('diceList');
    diceList.forEach(function(die) {
        die.value = Math.floor((Math.random()*6)+1);
    }, this);
    ractive.set('diceList',diceList);
};

function stopDice() {
    $(".dice").removeClass("diceRoll");
};

function setMessage(messageType){
    if(messageType == 'win')
        ractive.set('diceMessage', 'You escaped from the dungeon!');
    else
        ractive.set('diceMessage', 'You lost! Items can help you defeat the enemies!');
}