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
        friendController.buyFriend(index);
    },
    selectFriend: function(event, index){
        friendController.selectFriend(index);
    },
    kickDoor: function(event) {
        ractive.set('doorSet', false);
        ractive.set('mine', false);
        ractive.set('attack', true);
        initializeClock('clockdiv', 0, 6); //minutes, seconds
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

