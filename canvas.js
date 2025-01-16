const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearButton = document.getElementById('clearButton');

let painting = false;
let color = '#000000';
let size = brushSize.value;


canvas.width = canvas.parentElement.clientWidth;
canvas.height = window.innerHeight *0.75;



window.addEventListener("resize", function () {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = window.innerHeight * 0.75;
});



// Start painting
function startPosition(e) {
    painting = true;
    draw(e);
}

// End painting
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Draw on canvas
function draw(e) {
    if (!painting) return;

    ctx.lineWidth = size;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Change the drawing color
colorPicker.addEventListener('input', (e) => {
    color = e.target.value;
});

// Change the brush size
brushSize.addEventListener('input', (e) => {
    size = e.target.value;
});

// Clear the canvas
// Clear the canvas and animate the circle
clearButton.addEventListener('click', () => {
    let x = 0;
    let y = 0;
    const squareSize = 30;
    const speed = 15;
    let directionX = 1;
    let directionY = 1;

    function animate() {
        // Clear only the area where the square was last frame
        ctx.clearRect(x, y, squareSize, squareSize);

        // Update position
        y += directionY * speed;

        // Reverse direction if the square hits a boundary
        if (x + squareSize >= canvas.width || x <= 0) {
            directionX *= -1;
            console.log(x);
        }
        if (y + squareSize >= canvas.height || y <= 0) {
            directionY *= -1;
            x+= speed;
        }

        // Draw the square
        ctx.fillStyle = 'orange';
        ctx.fillRect(x, y, squareSize, squareSize);

        if (x <= canvas.width){
            // Continue animation
        requestAnimationFrame(animate);
        }
    }

    // Start the animation
    animate();
});



// Event listeners for mouse movement
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Prevent right-click context menu
canvas.addEventListener('contextmenu', (e) => e.preventDefault());