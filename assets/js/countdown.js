var countDownDate = new Date("Aug 3, 2024 22:00:00").getTime();
var eventEndDate = new Date("Aug 3, 2024 23:00:00").getTime();

var countdownFunction = setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;

    if (now >= countDownDate && now < eventEndDate) {
        document.getElementById("countdown").innerHTML = "OPEN AIR 22:00";
    } else if (now >= eventEndDate) {
        document.getElementById("countdown").innerHTML = "GRACIAS <3";
    } else {
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        days = String(days).padStart(2, '0');
        hours = String(hours).padStart(2, '0');
        minutes = String(minutes).padStart(2, '0');
        seconds = String(seconds).padStart(2, '0');

        document.getElementById("countdown").innerHTML = `
            <span data-text="${days}">${days}</span> : 
            <span data-text="${hours}">${hours}</span> : 
            <span data-text="${minutes}">${minutes}</span> : 
            <span data-text="${seconds}">${seconds}</span>
        `;

        if (distance < 0) {
            clearInterval(countdownFunction);
            document.getElementById("countdown").innerHTML = "EVENTO EN CURSO";
        }
    }
}, 1000);
