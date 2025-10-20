document.addEventListener('DOMContentLoaded', function() {
    createFloatingParticles();
});

function createFloatingParticles() {
    const particleCount = 40;
    
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
