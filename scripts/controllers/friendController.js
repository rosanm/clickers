var friendController = {
    buyFriend: function(index){
        if(helpers.hasEnoughDiamonds(ractive.get('friends')[index].price) &&
            helpers.hasEnoughKills(index)) {
            var selectedFriend =  ractive.get('friends')[index];
            ractive.set('units', ractive.get('units') - selectedFriend.price);

            selectedFriend.price = ractive.get('round')(selectedFriend.price * 1.3);
            selectedFriend.count++;
            ractive.update();
        }
    },
    evolveFriend: function(){
        var trainButton = ractive.get('trainButton');
        var evolveButton = ractive.get('evolveButton');   
        var name = ractive.get('selectedFriendName');
        var me = helpers.getObjectFromListByName('friends', name);
        if(helpers.hasEnoughDiamonds(me.price)) { 
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
            itemController.getItemsOfFriendByItemListName(me.itemListName);
            ractive.update();    
        }
    },
    trainFriend: function(){
        var trainButton = ractive.get('trainButton');
        var evolveButton = ractive.get('evolveButton');
        var name = ractive.get('selectedFriendName');
        var me = helpers.getObjectFromListByName('friends', name);

        if(me.lvl < 999){
            if(helpers.hasEnoughDiamonds(me.trainPrice)) { 
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
    selectFriend: function(index){
        var friend = ractive.get('friends')[index];

        var trainButton = ractive.get('trainButton');
        var evolveButton = ractive.get('evolveButton');

        if(friend.count == 0)
            return false;
        if(friend.isSelected) {
            friend.isSelected = false;
            ractive.set('selectedFriendName', 'No one');
            itemController.clearCurrentItems();
        }
        else {
            deselectAllFriends();
            friend.isSelected = true;
            itemController.getItemsOfFriendByItemListName(friend.itemListName);
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
    }
};

function deselectAllFriends(){
    var friends = ractive.get('friends');
    for(var i = 0; i < friends.length; i++){
        friends[i].isSelected = false;
    }
}