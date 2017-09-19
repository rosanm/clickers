var itemController = {
    getItemsOfFriendByItemListName: function(itemListName){
        var items = ractive.get(itemListName);
        ractive.set('items', items);  
    },
    buyItem: function(itemNr){
        //name of selectedFriend
        var selectedFriend = ractive.get('selectedFriend')(ractive.get('selectedFriendName'));
        var clickedItem = ractive.get(selectedFriend.itemListName)[itemNr];
        //Can afford?
        if(ractive.get('units') >= clickedItem.price) {
            //Still in stock?
            if(clickedItem.count < clickedItem.max){
                //Buy it (update in je inventory)
                ractive.set('units', ractive.get('units') - clickedItem.price);
               
                var upgradedItem = clickedItem;
                upgradedItem.lvl = upgradedItem.lvl +1;
                upgradedItem.price = Math.round(upgradedItem.price * 1.3);
                upgradedItem.dmg = Math.round(upgradedItem.dmg * 1.2);
                upgradedItem.count = upgradedItem.count + 1;

                //als het een boost item is, de boost percentage erbij optellen
                selectedFriend.boost = selectedFriend.boost + upgradedItem.boost;

                //als het een cube is, gelijk base dmg verhogen
                selectedFriend.dmg = selectedFriend.dmg + upgradedItem.dmg;
                ractive.update();
            }
            else {
                ractive.get('items')[itemNr].max +"/"+ ractive.get('items')[itemNr].max;
            }
        }
    },
    clearCurrentItems: function(){
        ractive.set('items', []);        
    },
    randomBonusGeneratorShow: function(){
        randomBonusGeneratorShow(); 
    },
    randomBonusGeneratorHide: function(){
        randomBonusGeneratorHide(); 
    },
};


var verdwijnNa = 10000; //10seconden
var spawnNieuweNa = 20000; //20seconden

$('.bonus-item').click(function() {
    //Do the bonus item logica hier

    $('.bonus-item').hide();
    setTimeout(randomBonusGeneratorShow, spawnNieuweNa); 
});


var randomBonusGeneratorShow = function(){
    var docHeight = $(document).height(),
        docWidth = $(document).width(),
        $div = $('.bonus-item'),
        divWidth = $div.width(),
        divHeight = $div.height(),
        heightMax = docHeight - divHeight,
        widthMax = docWidth - divWidth;

    $div.css({
        left: Math.floor( Math.random() * widthMax ),
        top: Math.floor( Math.random() * heightMax )
    });

    $('.bonus-item').show();
    setTimeout(randomBonusGeneratorHide, verdwijnNa);
}

var randomBonusGeneratorHide = function(){
    $('.bonus-item').hide();
    setTimeout(randomBonusGeneratorShow, spawnNieuweNa);
}