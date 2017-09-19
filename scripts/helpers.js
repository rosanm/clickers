var helpers = {
    hasEnoughKills: function(friendIndex){
        return ractive.get('level') >=ractive.get('friends')[friendIndex].minKills;
    },
    hasEnoughDiamonds: function(amount){
        return ractive.get('units') >= amount;
    },
    getObjectFromListByName: function(list, name){
        var list = ractive.get(list);
        for(var i = 0; i <= list.length; i++){
            if(list[i].name == name)
                return list[i];
        }
    }
};