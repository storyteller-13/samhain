/**
 * Matrix Digital Rain Effect
 * Creates falling green characters similar to The Matrix movie
 */

document.addEventListener('DOMContentLoaded', function() {
    createMatrixEffect();
});

function createMatrixEffect() {
    // Create canvas element
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.8';
    
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Matrix characters (mix of katakana, numbers, and symbols)
    const matrixChars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    // Font size and column settings
    const fontSize = 24;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to store the drops for each column
    const drops = [];
    
    // Initialize drops array
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    // Matrix colors
    const colors = {
        bright: '#00ff00',
        medium: '#00cc00',
        dim: '#009900',
        veryDim: '#006600'
    };
    
    function drawMatrix() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.font = `${fontSize}px monospace`;
        
        // Draw the characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            
            // Determine color based on position in column
            let color;
            const dropHeight = drops[i] * fontSize;
            
            if (dropHeight < fontSize * 2) {
                color = colors.bright;
            } else if (dropHeight < fontSize * 4) {
                color = colors.medium;
            } else if (dropHeight < fontSize * 6) {
                color = colors.dim;
            } else {
                color = colors.veryDim;
            }
            
            ctx.fillStyle = color;
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            // Reset drop to top randomly
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
                drops[i] = 0;
            }
            
            drops[i] += 0.3; // Slower drop speed
        }
    }
    
    // Animation loop with frame rate control
    let lastTime = 0;
    const targetFPS = 30; // Reduced from ~60fps to 30fps
    const frameInterval = 1000 / targetFPS;
    
    function animate(currentTime) {
        if (currentTime - lastTime >= frameInterval) {
            drawMatrix();
            lastTime = currentTime;
        }
        requestAnimationFrame(animate);
    }
    
    // Start the animation
    requestAnimationFrame(animate);
    
    // Add some variation to the effect
    setInterval(() => {
        // Occasionally change the character set for variety
        if (Math.random() < 0.1) {
            // Add some glitch effect
            ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }, 2000);
}
