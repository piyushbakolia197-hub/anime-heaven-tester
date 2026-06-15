// Anime Haven - JavaScript Enhancements
// Matches purple gradient design theme

// ==================== DOM Ready ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// ==================== Initialize App ====================
function initializeApp() {
    initializeTheme();
    addButtonAnimations();
    
    // Only run these if we're on the main page (not welcome page)
    if (document.querySelectorAll('form').length > 0) {
        addFormValidation();
    }
    
    if (document.querySelectorAll('.card').length > 0) {
        addScrollAnimations();
        addRatingSystem();
    }
}

// ==================== Theme Management ====================
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.textContent = '🌙 Dark Mode';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        padding: 10px 15px;
        border: 2px solid #d7eaf7;
        background: linear-gradient(135deg, #6b4db0, #9b6ba8);
        color: white;
        border-radius: 20px;
        cursor: pointer;
        z-index: 1000;
        font-weight: bold;
        transition: all 0.3s ease;
    `;
    
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = localStorage.getItem('theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
        updateThemeToggleText();
    });
    
    document.body.appendChild(themeToggle);
}

function applyTheme(theme) {
    const root = document.documentElement;
    
    if (theme === 'light') {
        root.style.filter = 'invert(1) hue-rotate(180deg)';
    } else {
        root.style.filter = 'none';
    }
}

function updateThemeToggleText() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    themeToggle.textContent = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// ==================== Color Picker ====================
function addColorPicker() {
    const colorPicker = document.getElementById('bgColor');
    const savedBgColor = localStorage.getItem('bgColor');
    
    if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
        colorPicker.value = savedBgColor;
    }
    
    colorPicker.addEventListener('change', function() {
        document.body.style.backgroundColor = this.value;
        localStorage.setItem('bgColor', this.value);
    });
    
    colorPicker.addEventListener('input', function() {
        document.body.style.backgroundColor = this.value;
    });
}

// ==================== Form Validation ====================
function addFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    highlightError(input);
                    isValid = false;
                } else {
                    clearError(input);
                }
            });
            
            if (isValid) {
                showSuccessMessage(this);
                setTimeout(() => {
                    this.reset();
                    clearAllErrors();
                }, 2000);
            }
        });
        
        // Clear error on input
        form.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('input', function() {
                clearError(this);
            });
        });
    });
}

function highlightError(input) {
    input.style.borderColor = '#ff6b6b';
    input.style.boxShadow = '0 0 8px rgba(255, 107, 107, 0.4)';
}

function clearError(input) {
    input.style.borderColor = '';
    input.style.boxShadow = '';
}

function clearAllErrors() {
    document.querySelectorAll('input, textarea').forEach(field => {
        clearError(field);
    });
}

function showSuccessMessage(form) {
    const message = document.createElement('div');
    message.textContent = '✓ Review submitted successfully!';
    message.style.cssText = `
        background: linear-gradient(135deg, #6b4db0, #9b6ba8);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 15px;
        font-weight: bold;
        animation: slideDown 0.3s ease;
        text-align: center;
    `;
    
    form.parentElement.insertBefore(message, form);
    
    setTimeout(() => {
        message.remove();
    }, 2000);
}

// ==================== Button Animations ====================
function addButtonAnimations() {
    const buttons = document.querySelectorAll('button:not(#theme-toggle)');
    
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ==================== Scroll Animations ====================
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ==================== Rating System ====================
function addRatingSystem() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // Create rating container
        const ratingContainer = document.createElement('div');
        ratingContainer.className = 'rating-container';
        ratingContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 5px;
            margin-top: 15px;
        `;
        
        // Create star rating
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'star';
            star.textContent = '★';
            star.style.cssText = `
                font-size: 24px;
                cursor: pointer;
                color: #d7eaf7;
                transition: all 0.2s ease;
                text-shadow: 0 0 5px rgba(215, 234, 247, 0.5);
            `;
            
            star.addEventListener('mouseenter', function() {
                for (let j = 1; j <= i; j++) {
                    ratingContainer.children[j - 1].style.color = '#ffd700';
                    ratingContainer.children[j - 1].style.textShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
                }
            });
            
            star.addEventListener('mouseleave', function() {
                updateStarColors(ratingContainer);
            });
            
            star.addEventListener('click', function(e) {
                e.stopPropagation();
                const rating = ratingContainer.dataset.rating = i;
                localStorage.setItem(`rating-${card.textContent}`, rating);
                updateStarColors(ratingContainer);
                showRatingMessage(rating);
            });
            
            ratingContainer.appendChild(star);
        }
        
        // Load saved rating
        const savedRating = localStorage.getItem(`rating-${card.textContent}`);
        if (savedRating) {
            ratingContainer.dataset.rating = savedRating;
        }
        
        card.appendChild(ratingContainer);
        updateStarColors(ratingContainer);
    });
}

function updateStarColors(ratingContainer) {
    const rating = ratingContainer.dataset.rating || 0;
    const stars = ratingContainer.querySelectorAll('.star');
    
    stars.forEach((star, index) => {
        if (index < rating) {
            star.style.color = '#ffd700';
            star.style.textShadow = '0 0 8px rgba(255, 215, 0, 0.6)';
        } else {
            star.style.color = '#d7eaf7';
            star.style.textShadow = '0 0 5px rgba(215, 234, 247, 0.5)';
        }
    });
}

function showRatingMessage(rating) {
    const messages = [
        'Needs Improvement',
        'Not Bad',
        'Good!',
        'Great!',
        'Masterpiece!'
    ];
    
    const message = document.createElement('div');
    message.textContent = `Rating: ${messages[rating - 1]}`;
    message.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #6b4db0, #9b6ba8);
        color: white;
        padding: 15px 20px;
        border-radius: 20px;
        font-weight: bold;
        animation: slideUp 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(107, 77, 176, 0.4);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideDown 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 2000);
}

// ==================== Animations ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== Utilities ====================
function log(message) {
    console.log('%c[Anime Haven] ' + message, 'color: #6b4db0; font-weight: bold;');
}

// Log initialization
log('Platform initialized successfully!');
