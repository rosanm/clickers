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
});