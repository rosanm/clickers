var helpers = {
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