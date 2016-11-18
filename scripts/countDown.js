function getTimeRemaining(minutes, seconds) {
    if(seconds == 0){
        minutes = minutes - 1;
        seconds = 59;
    }
    else {
        var seconds = seconds - 1;
        var minutes = minutes;
    }
    return {
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, minutes, seconds) {
    var clock = document.getElementById(id);
    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(minutes, seconds);
        minutes = t.minutes;
        seconds = t.seconds;
        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

        if ($(".minutes").text() == '00' && $(".seconds").text() == '00') {
            clearInterval(timeinterval);

            var enemy = ractive.get('currentEnemy');
            enemy.hp = enemy.total;
            ractive.update();

            //stopattacking (not mining yet)
            ractive.set('attack', false);
            
            //beforeSetDoor roll the dice only if there is a dice
            $(".diceBox").show();
            $(".overlay").show();

            //setdoor and start mining
            //in closing window function
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}