$(document).ready(function(){   
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
    //start giving out bonuses     
    setTimeout(itemController.randomBonusGeneratorShow, 3000);


//Draw connections last
  
     //draw a line for each level that is defined in dataSet.js to the next level
     for (var index = 0; index < ractive.get('maplevel').length; index++) {
         $().connections({ from: '.mapPoint'+index, to: '.mapPoint'+(index+1) });
         
     }
 
    //Draw all connections again after a resize
    $( window ).resize(function() {
        $('*').connections('update');
    });

});