/**
 * Samhain Door Countdown - Interactive Door System
 * Manages door states, interactions, and effects for the Halloween countdown
 */

// Configuration constants
const CONFIG = {
    TOTAL_DOORS: 13,
    AVAILABLE_DOORS: [1, 2, 3, 4], // Doors that can be opened
    DOORS_LEFT_COUNT: 10, // Total doors - available doors
    UPDATE_INTERVAL: 3600000, // 1 hour in milliseconds
    AUDIO_FREQUENCY: 200,
    AUDIO_DURATION: 0.5
};

// Global state
let audioContext = null;
let hasUserInteracted = false;

document.addEventListener('DOMContentLoaded', function() {
    initializeDoorSystem();
    setupKeyboardNavigation();
    setupPeriodicUpdates();
});

/**
 * Initialize the entire door system
 */
function initializeDoorSystem() {
    updateDoorStates();
    setupHoverEffects();
    setupSoundSystem();
    updateDoorsLeftCount();
}

/**
 * Update the state of all doors based on availability
 */
function updateDoorStates() {
    for (let doorNumber = 1; doorNumber <= CONFIG.TOTAL_DOORS; doorNumber++) {
        const door = document.querySelector(`[data-day="${doorNumber}"]`);
        if (!door) continue;
        
        // Reset door classes
        door.classList.remove('opened', 'locked', 'available');
        
        // Set door state based on availability
        if (CONFIG.AVAILABLE_DOORS.includes(doorNumber)) {
            setupAvailableDoor(door);
        } else {
            setupLockedDoor(door);
        }
    }
}
/**
 * Setup an available door with click handler
 */
function setupAvailableDoor(door) {
    door.classList.add('available');
    door.addEventListener('click', handleDoorClick);
}

/**
 * Setup a locked door with click handler
 */
function setupLockedDoor(door) {
    door.classList.add('locked');
    door.addEventListener('click', handleDoorClick);
}

/**
 * Handle door click events
 */
function handleDoorClick() {
    const doorNumber = parseInt(this.getAttribute('data-day'));
    
    if (CONFIG.AVAILABLE_DOORS.includes(doorNumber)) {
        openDoor(doorNumber);
    } else {
        showLockedMessage(doorNumber);
    }
}

/**
 * Navigate to the door page
 */
function openDoor(doorNumber) {
    window.location.href = `doors/${doorNumber}.html`;
}

/**
 * Show message for locked doors
 */
function showLockedMessage(doorNumber) {
    if (CONFIG.AVAILABLE_DOORS.includes(doorNumber)) {
        alert(`Door ${doorNumber} is already available to open!`);
    } else {
        alert(`Door ${doorNumber} is currently locked.`);
    }
}
/**
 * Setup the sound system for door interactions
 */
function setupSoundSystem() {
    initializeAudioOnInteraction();
    addSoundListeners();
}

/**
 * Initialize audio context on first user interaction
 */
function initializeAudioOnInteraction() {
    document.addEventListener('click', function() {
        if (!hasUserInteracted) {
            hasUserInteracted = true;
            initAudioContext();
        }
    }, { once: true });
}

/**
 * Initialize the Web Audio API context
 */
function initAudioContext() {
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
        console.log('Web Audio API not supported');
    }
}

/**
 * Play door creak sound effect
 */
function playDoorSound() {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(CONFIG.AUDIO_FREQUENCY, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + CONFIG.AUDIO_DURATION);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + CONFIG.AUDIO_DURATION);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + CONFIG.AUDIO_DURATION);
}

/**
 * Handle door sound effects on click
 */
function handleDoorSound() {
    if (!hasUserInteracted) {
        hasUserInteracted = true;
        initAudioContext();
    }
    
    if (audioContext && !this.classList.contains('locked') && !this.classList.contains('opened')) {
        playDoorSound();
    }
}

/**
 * Add sound listeners to all doors
 */
function addSoundListeners() {
    const doors = document.querySelectorAll('.door');
    doors.forEach(door => {
        door.removeEventListener('click', handleDoorSound);
        door.addEventListener('click', handleDoorSound);
    });
}
/**
 * Setup hover effects for doors
 */
function setupHoverEffects() {
    const doors = document.querySelectorAll('.door');
    
    doors.forEach(door => {
        door.removeEventListener('mouseenter', handleMouseEnter);
        door.removeEventListener('mouseleave', handleMouseLeave);
        
        door.addEventListener('mouseenter', handleMouseEnter);
        door.addEventListener('mouseleave', handleMouseLeave);
    });
}

/**
 * Handle mouse enter event for door hover effects
 */
function handleMouseEnter() {
    if (!this.classList.contains('locked') && !this.classList.contains('opened')) {
        this.style.transform = 'scale(1.05)';
    }
}

/**
 * Handle mouse leave event for door hover effects
 */
function handleMouseLeave() {
    if (!this.classList.contains('opened')) {
        this.style.transform = 'scale(1)';
    }
}

/**
 * Setup keyboard navigation for doors
 */
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (e.key >= '1' && e.key <= '9') {
            const doorNumber = parseInt(e.key);
            const door = document.querySelector(`[data-day="${doorNumber}"]`);
            if (door) {
                door.click();
            }
        } else if (e.key === '0') {
            // Handle door 10
            const door = document.querySelector('[data-day="10"]');
            if (door) {
                door.click();
            }
        }
    });
}

/**
 * Setup periodic updates for door states
 */
function setupPeriodicUpdates() {
    setInterval(updateDoorStates, CONFIG.UPDATE_INTERVAL);
}
/**
 * Update the doors left count display
 */
function updateDoorsLeftCount() {
    const doorsLeftElement = document.getElementById('doors-left');
    if (!doorsLeftElement) return;
    
    doorsLeftElement.textContent = CONFIG.DOORS_LEFT_COUNT;
}
