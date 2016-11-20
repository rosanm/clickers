var scoreController = {
    calcUnitsPerSec: function(itemsArray){
        var unitsPerSec = 0;
            itemsArray.forEach(function(e) {
                    unitsPerSec += ractive.get('TotalDmgOfFriendType')(e.name);
                        if(ractive.get('attack')) {
                            e.lifeTimeDmg += ractive.get('TotalDmgOfFriendType')(e.name);
                        }
                    }, this);
            return unitsPerSec;
    },
    smoothScore: function() {
        smoothScoreLoop();
    }
};

var smoothScoreLoop = function(){
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
        ractive.set('roundedUnits', ractive.get('nFormat')(rounded));
    }

    //this must be the last statment
    setTimeout(smoothScoreLoop, 10); //loop 100x per sec
}