var itemController = {
    getItemsOfFriendByItemListName: function(itemListName){
        var items = ractive.get(itemListName);
        ractive.set('items', items);  
    },
    buyItem: function(itemNr){
        //name of selectedFriend
        var selectedFriend = ractive.get('selectedFriend')(ractive.get('selectedFriendName'));
        var clickedItem = ractive.get(selectedFriend.itemListName)[itemNr];
        //Can affound?
        if(ractive.get('units') >= clickedItem.price) {
            //Still in stock?
            if(clickedItem.count < clickedItem.max){
                //Buy it
                ractive.set('units', ractive.get('units') - clickedItem.price);

                var upgradedItem = clickedItem;
                upgradedItem.lvl = upgradedItem.lvl +1;
                upgradedItem.price = Math.round(upgradedItem.price * 1.3);
                upgradedItem.dmg = Math.round(upgradedItem.dmg * 1.2);
                upgradedItem.count = upgradedItem.count + 1;
                ractive.update();
            }
            else {
                ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max;
            }
        }
    },
    clearCurrentItems: function(){
        ractive.set('items', []);        
    }
};