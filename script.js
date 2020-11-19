"use strict";

const canvas = document.getElementById("canvas");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let particlesArr = [];
const numOfParticles = 700;

// Measure title el
const titleElement = document.getElementById("title");
let titleElementMeasurements = titleElement.getBoundingClientRect();
let title = {
    x: titleElementMeasurements.left,
    y: titleElementMeasurements.top,
    width: titleElementMeasurements.width,
    height: 10
};

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10;
        this.weight = Math.random() * 2;
        this.directionX = -1;
    }

    update() {
        if (this.y > canvas.height) {
            this.y = 0 - this.size;
            this.weight = Math.random() * 2;
            this.x = Math.random() * canvas.width * 1.3;
        }

        this.weight += 0.05;
        this.y += this.weight;
        this.x += this.directionX;

        // Check for collision between particle and title el
        if (
            this.x < title.x + title.width  &&
            this.x + this.size > title.x    &&
            this.y < title.y + title.height &&
            this.y + this.size > title.y
        ) {
            this.y -= 3;
            this.weight *= -0.3;
        }
    }

    draw() {
        ctx.moveTo(this.x, this.y);
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    }
}

function init() {
    particlesArr = [];

    for (let i = 0; i < numOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height; 

        particlesArr.push(new Particle(x, y));
    }
}

init();

function animate() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    // Initial rain particles color
    ctx.fillStyle = "purple";

    for (let i = 0; i < particlesArr.length; i++) {
        particlesArr[i].update();
        particlesArr[i].draw();
    }

    // Call fill once for traced particles, after looping over all.
    ctx.fill();

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = document.documentElement.clientWidth;
    canvas.height = document.documentElement.clientHeight;

    // Reset title el boundaries for proper collision detection
    titleElementMeasurements = titleElement.getBoundingClientRect();
    title = {
        x: titleElementMeasurements.left,
        y: titleElementMeasurements.top,
        width: titleElementMeasurements.width,
        height: 10
    };

    init();
});