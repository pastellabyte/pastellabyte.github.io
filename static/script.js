const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size to fill window
canvas.width = canvas.parentElement.clientWidth;
canvas.height = canvas.parentElement.clientHeight;

// Number of dots
const numDots = 50;
const dots = [];

// Line Settings
const maxLength = 150;

//Visuals
const lineOpacity = 0.5;
const dotRadius = 4;

// Dot object constructor
function Dot(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = (Math.random() - 0.5) * 2; // Random horizontal speed
    this.velocityY = (Math.random() - 0.5) * 2; // Random vertical speed
}

// Create random dots
for (let i = 0; i < numDots; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    dots.push(new Dot(x, y));
}

// Draw function
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Loop through dots and update their position
    for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // Move the dot by its velocity
        dot.x += dot.velocityX;
        dot.y += dot.velocityY;

        // Bounce the dots off edges (wrap around effect)
        if (dot.x - dotRadius <= 0 || dot.x + dotRadius >= canvas.width) dot.velocityX *= -1;
        if (dot.y - dotRadius <= 0 || dot.y + dotRadius >= canvas.height) dot.velocityY *= -1;

        // Draw the dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }

    // Draw lines between each pair of dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            const dot1 = dots[i];
            const dot2 = dots[j];
            const distance = Math.sqrt(Math.pow(dot2.x - dot1.x, 2) + Math.pow(dot2.y - dot1.y, 2));

            if (distance < maxLength) {  // Only draw lines if dots are within a certain distance
                ctx.beginPath();
                ctx.moveTo(dot1.x, dot1.y);
                ctx.lineTo(dot2.x, dot2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distance / maxLength) * lineOpacity})`; // Line opacity
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(draw);
}

// Start drawing
draw();