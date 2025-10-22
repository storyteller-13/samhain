// Door Logic
/**
 * Samhain Door Countdown - Interactive Door System
 * Manages door states, interactions, and effects for the Halloween countdown
 */

// Configuration constants
const CONFIG = {
    TOTAL_DOORS: 13,
    AVAILABLE_DOORS: [1, 2, 3, 4, 5], // Doors that can be opened
    DOORS_LEFT_COUNT: 9, // Total doors - available doors
    UPDATE_INTERVAL: 3600000, // 1 hour in milliseconds
    AUDIO_FREQUENCY: 200,
    AUDIO_DURATION: 0.5
};

// Global state
let audioContext = null;
let hasUserInteracted = false;

document.addEventListener('DOMContentLoaded', function() {
    const doors = document.querySelectorAll('.door');
    
    // Set Halloween date (October 31st of current year)
    const currentYear = new Date().getFullYear();
    const halloweenDate = new Date(currentYear, 9, 31); // Month is 0-indexed, so 9 = October
    
    // If Halloween has passed this year, set it to next year
    // But if it's November 1st, we add 1 day to the countdown
    const now = new Date();
    const isDayAfterHalloween = now.getMonth() === 10 && now.getDate() === 1; // November 1st
    
    if (halloweenDate < now && !isDayAfterHalloween) {
        halloweenDate.setFullYear(currentYear + 1);
    }
    
    
    // Calculate which doors should be open - only door 1 is open
    function updateDoors() {
        const now = new Date();
        
        // Process each door by its data-day attribute
        for (let doorNumber = 1; doorNumber <= 13; doorNumber++) {
            const door = document.querySelector(`[data-day="${doorNumber}"]`);
            if (!door) continue;
            
            // Remove all classes first
            door.classList.remove('opened', 'locked', 'available');
            
            if (doorNumber === 1 || doorNumber === 2 || doorNumber === 3) {
                // Doors 1, 2, and 3 are available to open (normal state)
                door.classList.add('available');
                door.addEventListener('click', function() {
                    openDoor(this);
                });
            } else {
                // All other doors are locked
                door.classList.add('locked');
                door.addEventListener('click', function() {
                    showLockedMessage(this);
                });
            }
        }
        
        // Re-add hover effects and sound listeners to door elements
        addHoverEffects();
        // Re-add sound listeners
        addSoundListeners();
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

        // Update doors left count
        updateDoorsLeftCount();
    }
    
    // Open door (navigate to door page)
    function openDoor(door) {
        const doorNumber = door.getAttribute('data-day');
        // Navigate to the corresponding door page
        window.location.href = `doors/${doorNumber}.html`;
    }
    
    // Show message for locked doors
    function showLockedMessage(door) {
        const doorNumber = door.getAttribute('data-day');
        // Reset door classes
        door.classList.remove('opened', 'locked', 'available');

        if (doorNumber === "1" || doorNumber === "2" || doorNumber === "3") {
            alert(`Door ${doorNumber} is already available to open!`);
        // Set door state based on availability
        if (CONFIG.AVAILABLE_DOORS.includes(doorNumber)) {
            setupAvailableDoor(door);
} else {
            alert(`Door ${doorNumber} is currently locked.`);
            setupLockedDoor(door);
}
}
    
    // Add some spooky effects
    function addSpookyEffects() {
        // Add random spooky sounds (optional - requires user interaction first)
        addSpookySounds();
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
    
    // Global variables for sound system
    let audioContext;
    let hasInteracted = false;
    
    // Add spooky sound effects (requires user interaction)
    function addSpookySounds() {
        function initAudio() {
            if (!hasInteracted) return;
            
            try {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            } catch (e) {
                console.log('Web Audio API not supported');
            }
        }
        
        // Play door creak sound
        function playDoorSound() {
            if (!audioContext) return;
            
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.5);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        }
        
        function handleDoorSound() {
            if (!hasInteracted) {
                hasInteracted = true;
                initAudio();
            }
            if (audioContext && !this.classList.contains('locked') && !this.classList.contains('opened')) {
                playDoorSound();
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
        
        // Make handleDoorSound globally accessible
        window.handleDoorSound = handleDoorSound;
        
        // Initial setup
        addSoundListeners();
        
        // Initialize audio on first user interaction
        document.addEventListener('click', function() {
            if (!hasInteracted) {
                hasInteracted = true;
                initAudio();
            }
        }, { once: true });
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

    // Add click listeners to doors for sound
    function addSoundListeners() {
        const doors = document.querySelectorAll('.door');
        doors.forEach(door => {
            // Remove existing sound listeners to prevent duplicates
            door.removeEventListener('click', window.handleDoorSound);
            // Add new sound listener
            door.addEventListener('click', window.handleDoorSound);
        });
    }
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    // Initialize everything
    updateDoors();
    addSpookyEffects();
    addHoverEffects();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Update doors every hour (in case date changes)
    setInterval(updateDoors, 3600000);
    oscillator.frequency.setValueAtTime(CONFIG.AUDIO_FREQUENCY, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + CONFIG.AUDIO_DURATION);

    // Add some interactive hover effects
    function addHoverEffects() {
        // Get door elements
        const doors = document.querySelectorAll('.door');
        
        doors.forEach(door => {
            // Remove existing hover listeners to prevent duplicates
            door.removeEventListener('mouseenter', handleMouseEnter);
            door.removeEventListener('mouseleave', handleMouseLeave);
            
            // Add new hover listeners
            door.addEventListener('mouseenter', handleMouseEnter);
            door.addEventListener('mouseleave', handleMouseLeave);
        });
    }
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + CONFIG.AUDIO_DURATION);

    // Separate functions for hover effects to enable proper cleanup
    function handleMouseEnter() {
        if (!this.classList.contains('locked') && !this.classList.contains('opened')) {
            this.style.transform = 'scale(1.05)';
        }
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

    function handleMouseLeave() {
        if (!this.classList.contains('opened')) {
            this.style.transform = 'scale(1)';
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

    // Add keyboard navigation
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
@@ -201,14 +227,20 @@ document.addEventListener('DOMContentLoaded', function() {
}
}
});
    
    // Update doors left count
    function updateDoorsLeftCount() {
        const doorsLeftElement = document.getElementById('doors-left');
        if (!doorsLeftElement) return;
        
        // Show 11 days left (13 total - 2 available = 11)
        doorsLeftElement.textContent = 11;
    }
}

});
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
