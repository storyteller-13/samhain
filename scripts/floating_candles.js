document.addEventListener('DOMContentLoaded', function() {
    createFloatingCandles();
});

function createFloatingCandles() {
    const objectCount = 30;
    
    // Candle objects with their corresponding CSS classes
    const candleObjects = [
        { symbol: '🧟‍♀️', class: 'candle-drop' },
        { symbol: '🧟', class: 'candle-drop' },
        { symbol: '🪦', class: 'candle-drop' }
    ];
    
    for (let i = 0; i < objectCount; i++) {
        const object = document.createElement('div');
        const randomObject = candleObjects[Math.floor(Math.random() * candleObjects.length)];
        
        object.className = `particle-candle ${randomObject.class}`;
        object.textContent = randomObject.symbol;
        object.style.left = `${Math.random() * 100}vw`;
        object.style.top = `${Math.random() * 100}vh`;
        object.style.animationDuration = `${6 + Math.random() * 12}s`;
        object.style.opacity = `${0.4 + Math.random() * 0.5}`;
        object.style.fontSize = `${18 + Math.random() * 10}px`;
        object.style.animationDelay = `${Math.random() * 5}s`;
        
        document.body.appendChild(object);
    }
}
