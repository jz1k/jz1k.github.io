const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

var freq = 1;
const opacity = 0.5 + (freq / 3) * 0.5;

let mouseMoved = false;

const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
};

const params = {
    pointsNumber: 10,
    widthFactor: 10,
    mouseThreshold: 0.5,
    spring: 0.25,
    friction: 0.5,
};

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
}

window.addEventListener("click", (e) => {
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("mousemove", (e) => {
    mouseMoved = true;
    updateMousePosition(e.pageX, e.pageY);
});

window.addEventListener("touchmove", (e) => {
    mouseMoved = true;
    updateMousePosition(e.touches[0].pageX, e.touches[0].pageY);
});

function updateMousePosition(x, y) {
    pointer.x = x - window.scrollX;
    pointer.y = y - window.scrollY;
}

setupCanvas();
update(0);

window.addEventListener('load', setupCanvas);
window.addEventListener('resize', setupCanvas);

function update(t) {
    if (!mouseMoved) {
        pointer.x =
            (0.5 + 0.3 * Math.cos(t * 0.002) * Math.sin(0.005 * t)) * window.innerWidth;
        pointer.y =
            (0.5 + 0.2 * Math.sin(t * 0.005) * Math.cos(0.01 * t)) * window.innerHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let pIdx = 0; // Inicializamos pIdx aquí
    trail.forEach((point, i) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;
        point.dx += (prev.x - point.x) * spring;
        point.dy += (prev.y - point.y) * spring;
        point.dx *= params.friction;
        point.dy *= params.friction;
        point.x += point.dx;
        point.y += point.dy;
        pIdx++; // Incrementamos pIdx en cada iteración
    });

    var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
    gradient.addColorStop(1, `rgba(10, 154, 173, ${opacity})`);

    ctx.strokeStyle = gradient;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(trail[0].x, trail[0].y);

    for (let i = 1; i < trail.length - 1; i++) {
        const xc = 0.5 * (trail[i].x + trail[i + 1].x);
        const yc = 0.5 * (trail[i].y + trail[i + 1].y);
        ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
        ctx.lineWidth = params.widthFactor * 70 * freq; // Ajusta el valor para hacer el rastro más grande
    }

    ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
    ctx.stroke();

    window.requestAnimationFrame(update);
}

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
