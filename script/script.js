// Door Logic
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
            
            if (doorNumber === 1 || doorNumber === 2) {
                // Doors 1 and 2 are available to open (normal state)
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
        
        if (doorNumber === "1" || doorNumber === "2") {
            alert(`Door ${doorNumber} is already available to open!`);
        } else {
            alert(`Door ${doorNumber} is currently locked.`);
        }
    }
    
    // Add some spooky effects
    function addSpookyEffects() {
        // Add floating particles effect
        createFloatingParticles();
        
        // Add random spooky sounds (optional - requires user interaction first)
        addSpookySounds();
    }
    
    // Create floating particles
    function createFloatingParticles() {
        const particleCount = 40;
        const container = document.querySelector('.container');
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.top = `${Math.random() * 100}vh`;
            particle.style.animationDuration = `${5 + Math.random() * 10}s`;
            particle.style.opacity = `${0.3 + Math.random() * 0.4}`;
            document.body.appendChild(particle);
        }
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
    }
    
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
    
    // Initialize everything
    updateDoors();
    addSpookyEffects();
    addHoverEffects();
    
    // Update doors every hour (in case date changes)
    setInterval(updateDoors, 3600000);
    
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
    
    // Separate functions for hover effects to enable proper cleanup
    function handleMouseEnter() {
        if (!this.classList.contains('locked') && !this.classList.contains('opened')) {
            this.style.transform = 'scale(1.05)';
        }
    }
    
    function handleMouseLeave() {
        if (!this.classList.contains('opened')) {
            this.style.transform = 'scale(1)';
        }
    }
    
    // Add keyboard navigation
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
    
    // Update doors left count
    function updateDoorsLeftCount() {
        const doorsLeftElement = document.getElementById('doors-left');
        if (!doorsLeftElement) return;
        
        // Show 12 days left (13 total - 1 available = 12)
        doorsLeftElement.textContent = 12;
    }
    
    // Add some Halloween-themed console messages
    console.log('%c🎃 Welcome to the Halloween Countdown! 🎃', 'color: #ff6b35; font-size: 20px; font-weight: bold;');
    console.log('%c👻 Open the doors daily to discover ancient wisdom! 👻', 'color: #ffd700; font-size: 14px;');
    console.log('%c💀 Happy Halloween! 💀', 'color: #ff6b35; font-size: 16px;');
});
