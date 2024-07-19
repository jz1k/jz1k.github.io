// Controla las frases dinámicas
document.addEventListener("DOMContentLoaded", function () {
    const dynamicPhrases = [
        "DUBSTEP",
        "TRAP",
        "RIDDIM",
        "INFECTED BY BASS",
    ];

    new Typed('#dynamic-text', {
        strings: dynamicPhrases,
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        startDelay: 500,
        loop: true
    });

    const registerLink = document.getElementById('show-register-form');
    const registerForm = document.getElementById('register-form');

    registerLink.addEventListener('click', function (event) {
        event.preventDefault();
        registerForm.classList.toggle('active');

    });

});

displayGreetingAndText();
