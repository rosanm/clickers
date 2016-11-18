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

            //stopattacking
            ractive.set('mine', true);
            ractive.set('attack', false);
            
            //setdoor
            ractive.set('doorSet', true);
            alert('bam close door');
        }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}