// Mobile Menu Functionality
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
});

// Close mobile menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });
});

// Color Selection Functionality
const colorCards = document.querySelectorAll('.color-card');
const phoneImage = document.getElementById('phoneImage');
const selectedColorName = document.getElementById('selectedColorName');
const ambientGlow = document.getElementById('ambientGlow');
const colorAmbientLight = document.getElementById('colorAmbientLight');

const colorData = {
    natural: {
        name: 'Natural Titanium',
        image: 'https://images.unsplash.com/photo-1695822958645-b2b058159215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNSUyMFBybyUyME1heCUyMG5hdHVyYWwlMjB0aXRhbml1bXxlbnwxfHx8fDE3NTkxMjY0MzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ambientColor: 'linear-gradient(135deg, #9CA3AF 0%, #6B7280 100%)',
        lightColor: 'radial-gradient(circle, #9CA3AF 0%, transparent 70%)'
    },
    blue: {
        name: 'Blue Titanium',
        image: 'https://images.unsplash.com/photo-1607936854279-55e8a4c64888?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNSUyMGJsdWUlMjB0aXRhbml1bSUyMGNvbG9yfGVufDF8fHx8MTc1OTEyNjQzMHww&ixlib=rb-4.1.0&q=80&w=1080',
        ambientColor: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%)',
        lightColor: 'radial-gradient(circle, #60A5FA 0%, transparent 70%)'
    },
    white: {
        name: 'White Titanium',
        image: 'https://images.unsplash.com/photo-1604548530945-fbdce3e76bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNSUyMHdoaXRlJTIwdGl0YW5pdW0lMjBmaW5pc2h8ZW58MXx8fHwxNzU5MTI2NDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
        ambientColor: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
        lightColor: 'radial-gradient(circle, #E5E7EB 0%, transparent 70%)'
    },
    black: {
        name: 'Black Titanium',
        image: 'https://images.unsplash.com/photo-1725625972772-9f1bc04a2608?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpUGhvbmUlMjAxNSUyMGJsYWNrJTIwdGl0YW5pdW0lMjBzcGFjZXxlbnwxfHx8fDE3NTkxMjY0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080',
        ambientColor: 'linear-gradient(135deg, #6B7280 0%, #111827 100%)',
        lightColor: 'radial-gradient(circle, #6B7280 0%, transparent 70%)'
    }
};

function selectColor(selectedColor) {
    // Remove active class from all cards
    colorCards.forEach(card => {
        card.classList.remove('active');
    });

    // Add active class to selected card
    const selectedCard = document.querySelector(`[data-color="${selectedColor}"]`);
    if (selectedCard) {
        selectedCard.classList.add('active');
    }

    // Update phone image and text
    const colorInfo = colorData[selectedColor];
    if (colorInfo) {
        // Update phone image with transition
        phoneImage.style.opacity = '0.7';
        phoneImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            phoneImage.src = colorInfo.image;
            phoneImage.alt = `iPhone 15 Pro ${colorInfo.name}`;
            selectedColorName.textContent = colorInfo.name;
            
            // Update ambient glow colors
            ambientGlow.style.background = colorInfo.ambientColor;
            colorAmbientLight.style.background = colorInfo.lightColor;
            
            // Restore phone image
            phoneImage.style.opacity = '1';
            phoneImage.style.transform = 'scale(1)';
        }, 200);
    }
}

// Add click event listeners to color cards
colorCards.forEach(card => {
    card.addEventListener('click', () => {
        const selectedColor = card.getAttribute('data-color');
        selectColor(selectedColor);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background opacity on scroll
const header = document.getElementById('header');
let lastScrollY = window.scrollY;

function updateHeader() {
    const scrollY = window.scrollY;
    const opacity = Math.min(scrollY / 100, 0.95);
    
    header.style.background = `rgba(255, 255, 255, ${opacity * 0.1})`;
    header.style.backdropFilter = `blur(${20 + (opacity * 10)}px)`;
    
    lastScrollY = scrollY;
}

window.addEventListener('scroll', updateHeader);

// Simple AOS (Animate On Scroll) Implementation
function observeElements() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// 3D Phone Interaction
const realisticPhone = document.getElementById('realisticPhone');

function handleMouseMove(e) {
    if (window.innerWidth > 768) {
        const rect = realisticPhone.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateY = deltaX * 10;
        const rotateX = -deltaY * 10;
        
        realisticPhone.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    }
}

function resetPhoneRotation() {
    realisticPhone.style.transform = 'rotateY(0deg) rotateX(0deg)';
}

// Add mouse interaction to phone
realisticPhone.addEventListener('mousemove', handleMouseMove);
realisticPhone.addEventListener('mouseleave', resetPhoneRotation);

// Parallax effect for floating elements
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-dot, .floating-particle');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

window.addEventListener('scroll', () => {
    requestAnimationFrame(handleParallax);
});

// Preload images for smooth transitions
function preloadImages() {
    Object.values(colorData).forEach(color => {
        const img = new Image();
        img.src = color.image;
    });
}

// Enhanced button interactions
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        
        if (this.classList.contains('btn-primary')) {
            this.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.4)';
        }
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '';
    });
    
    button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = 'scale(1.05)';
    });
});

// Feature cards tilt effect
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);
        
        const rotateY = deltaX * 5;
        const rotateX = -deltaY * 5;
        
        this.style.transform = `translateY(-8px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotateY(0deg) rotateX(0deg)';
    });
});

// Color card interactions
colorCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1.05) translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('active')) {
            this.style.transform = 'scale(1) translateY(0)';
        }
    });
});

// Performance optimization: Throttle scroll events
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

// Apply throttling to scroll handlers
window.addEventListener('scroll', throttle(updateHeader, 10));
window.addEventListener('scroll', throttle(handleParallax, 16)); // ~60fps

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    observeElements();
    
    // Preload images
    preloadImages();
    
    // Set initial header state
    updateHeader();
    
    // Add loading animation completion
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// Add resize handler for responsive behavior
window.addEventListener('resize', throttle(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        mobileNav.classList.remove('open');
    }
    
    // Reset phone rotation on mobile
    if (window.innerWidth <= 768) {
        resetPhoneRotation();
    }
}, 250));

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        mobileNav.classList.remove('open');
    }
    
    // Arrow keys for color selection
    if (document.activeElement && document.activeElement.classList.contains('color-card')) {
        const currentIndex = Array.from(colorCards).indexOf(document.activeElement);
        let newIndex = currentIndex;
        
        switch(e.key) {
            case 'ArrowLeft':
                newIndex = Math.max(0, currentIndex - 1);
                break;
            case 'ArrowRight':
                newIndex = Math.min(colorCards.length - 1, currentIndex + 1);
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                document.activeElement.click();
                return;
        }
        
        if (newIndex !== currentIndex) {
            e.preventDefault();
            colorCards[newIndex].focus();
        }
    }
});

// Add accessibility improvements
colorCards.forEach((card, index) => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Select ${card.getAttribute('data-color')} titanium color`);
    
    // Handle keyboard activation
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Add focus indicators for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    .color-card:focus {
        outline: 3px solid var(--primary-color);
        outline-offset: 2px;
    }
    
    .nav-link:focus,
    .btn-primary:focus,
    .btn-secondary:focus {
        outline: 2px solid var(--primary-color);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);

console.log('🍎 iPhone 15 Pro website initialized successfully!');