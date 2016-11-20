var enemyController = {
    attack: function(){
        attackEnemy(); 
    },
    nextEnemy: function(){
        setNextEnemy();
    }
};

var setNextEnemy = function(){
    ractive.set('level', ractive.get('level') + 1);

    var currentEnemy = ractive.get('currentEnemy');        
    var enemyIndex = ractive.get('enemyIndex');
    if(enemyIndex == ractive.get('enemys').length - 1){           
        enemyIndex = 0;
    }
    else {
        enemyIndex = enemyIndex + 1;
    }
        
    var newEnemy = ractive.get('enemys')[enemyIndex];

    //pak de volgende enemy met 61% meer hp als de vorige
    newEnemy.hp = currentEnemy.total * 1.61803398875; //Golden Ratio;
    newEnemy.total = newEnemy.hp;


    ractive.set('enemyIndex', enemyIndex);
    ractive.set('currentEnemy', newEnemy);  
    
    ractive.update();

    var random = Math.floor((Math.random() * 250) + 1);
    $('.enemySet').css('filter', 'hue-rotate(' + random + 'deg) saturate(3.3) drop-shadow(2px 2px 2px #222)');
};

var attackEnemy = function(){
    //Show enemy en progressbar part
    ractive.set('currentEnemy', ractive.get('enemys')[ractive.get('enemyIndex')]);
    var currentEnemy = ractive.get('currentEnemy');

    var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
    $("progress").attr('value', progress);
    $("#progresscontainer").show();

    //Deal DMG part
    if(ractive.get('attack')) {                
        currentEnemy.hp = ractive.get('currentEnemy').hp - (ractive.get('dps')/100);

        var progress = ractive.get('currentEnemy').hp / ractive.get('currentEnemy').total * 100;
        $("progress").attr('value', progress);
        $("#progresscontainer").show();

        ractive.update();
        
        if(ractive.get('currentEnemy.hp') < 0){
            ractive.set('doorSet', true);
            ractive.set('mine', true);
            ractive.set('attack', false);
            setNextEnemy();
        }
    }

    //Control the attack/mine variables
    if(ractive.get('mine')){
        ractive.set('attack', false);
    }

    if(ractive.get('attack')){
        ractive.set('mine', false);
    }

    setTimeout(attackEnemy, 10); 
};