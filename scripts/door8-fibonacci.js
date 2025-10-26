class FibonacciDoors {
    constructor() {
        this.currentIndex = 0;
        this.fibonacciSequence = this.generateFibonacciSequence(8);
        this.openedDoors = [];
        this.doorStack = document.getElementById('doorStack');
        
        
        this.createInitialDoor();
    }

    generateFibonacciSequence(n) {
        const sequence = [1, 2];
        for (let i = 2; i < n; i++) {
            sequence[i] = sequence[i-1] + sequence[i-2];
        }
        return sequence;
    }

    createInitialDoor() {
        this.createDoor(0);
    }

    createDoor(index) {
        
        const door = document.createElement('div');
        door.className = 'fibonacci-door appearing';
        door.dataset.index = index;
        door.dataset.fibonacciNumber = this.fibonacciSequence[index];
        
        door.innerHTML = `
            <div class="sequence-frame">Door ${this.fibonacciSequence[index]}</div>
            <div class="door-frame"></div>
            <div class="door-panel">
                <div class="door-hinges"></div>
                <div class="door-number">${this.fibonacciSequence[index]}</div>
                <div class="door-handle"></div>
            </div>
        `;

        door.addEventListener('click', () => this.openDoor(door));
        
        const zOffset = index * 20;
        door.style.transform = `translateZ(${zOffset}px)`;
        door.style.zIndex = 100 - index;
        
        this.doorStack.appendChild(door);

        setTimeout(() => {
            door.classList.remove('appearing');
        }, 600);
    }

    openDoor(door) {
        const index = parseInt(door.dataset.index);
        const fibonacciNumber = parseInt(door.dataset.fibonacciNumber);
        
        this.openedDoors.push(fibonacciNumber);
        
        const doorNumberElement = door.querySelector('.door-number');
        if (doorNumberElement) {
            doorNumberElement.style.display = 'none';
        }
        
        door.classList.add('opening');
        
        setTimeout(() => {
            door.classList.remove('opening');
            door.classList.add('opened');
            
            // Check if this is the last door in the sequence
            if (index + 1 >= this.fibonacciSequence.length) {
                this.showLoveMessage();
            } else {
                this.createDoor(index + 1);
            }
        }, 800);
    }

    showLoveMessage() {
        const loveMessage = document.createElement('div');
        loveMessage.className = 'love-message appearing';
        loveMessage.innerHTML = 'i <3 you';
        
        // Style the love message
        loveMessage.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 3rem;
            font-weight: bold;
            color: #00ff00;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
            z-index: 1000;
            animation: pulse 2s infinite;
        `;
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); }
            }
        `;
        document.head.appendChild(style);
        
        this.doorStack.appendChild(loveMessage);
        
        setTimeout(() => {
            loveMessage.classList.remove('appearing');
        }, 600);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new FibonacciDoors();
});
