class FibonacciDoors {
    constructor() {
        this.currentIndex = 0;
        this.fibonacciSequence = this.generateFibonacciSequence(100);
        this.openedDoors = [];
        this.doorStack = document.getElementById('doorStack');
        
        
        this.createInitialDoor();
    }

    generateFibonacciSequence(n) {
        const sequence = [1, 1];
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
            this.createDoor(index + 1);
        }, 800);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    new FibonacciDoors();
});
