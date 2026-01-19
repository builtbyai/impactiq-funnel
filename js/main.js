/**
 * ImpactIQ Roofing Platform - Main JavaScript
 * Handles all interactive functionality for the funnel website
 */

// ============================
// CONFIGURATION
// ============================

const CONFIG = {
    scrollAnimationThreshold: 0.15,
    navbarScrollThreshold: 100,
    formSubmitDelay: 1000,
    apiEndpoint: '/api/leads', // Update with actual endpoint
    animationDuration: 300,
};

// ============================
// DOM READY
// ============================

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initFormHandlers();
    initSmoothScroll();
    initLogoIntro();
    initCounterAnimations();
});

// ============================
// NAVIGATION
// ============================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active')
                ? 'hidden'
                : '';
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Navbar scroll behavior
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add/remove scrolled class
        if (scrollTop > CONFIG.navbarScrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    });
}

// ============================
// SMOOTH SCROLLING
// ============================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Ignore links that don't have a valid target
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================
// SCROLL ANIMATIONS
// ============================

function initScrollAnimations() {
    const observerOptions = {
        threshold: CONFIG.scrollAnimationThreshold,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-animate class
    document.querySelectorAll('.scroll-animate').forEach(el => {
        observer.observe(el);
    });

    // Auto-add scroll-animate class to common elements
    const animatedSelectors = [
        '.feature-card',
        '.benefit-card',
        '.step',
        '.testimonial',
        '.section-header'
    ];

    animatedSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate');
                observer.observe(el);
            }
        });
    });
}

// ============================
// LOGO INTRO
// ============================

function initLogoIntro() {
    const logoIntro = document.getElementById('logoIntro');
    const heroContent = document.querySelector('.hero-content');

    if (logoIntro && heroContent) {
        // Hide hero content initially
        heroContent.style.opacity = '0';

        // Show hero content after logo intro
        setTimeout(() => {
            logoIntro.style.opacity = '0';
            heroContent.style.opacity = '1';

            setTimeout(() => {
                logoIntro.style.display = 'none';
            }, 500);
        }, 2000); // Adjust timing based on your logo animation
    }
}

// ============================
// COUNTER ANIMATIONS
// ============================

function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const hasPercentage = text.includes('%');
    const hasTime = text.includes('hrs');
    const hasCurrency = text.includes('$');
    const hasK = text.includes('k');

    let targetValue = parseInt(text.replace(/[^0-9]/g, ''));
    let currentValue = 0;
    const duration = 2000;
    const steps = 60;
    const increment = targetValue / steps;
    const stepDuration = duration / steps;

    const counter = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(counter);
        }

        let displayValue = Math.floor(currentValue);
        if (hasPercentage) {
            element.textContent = displayValue + '%';
        } else if (hasTime) {
            element.textContent = displayValue + 'hrs';
        } else if (hasCurrency && hasK) {
            element.textContent = '$' + displayValue + 'k';
        } else if (hasCurrency) {
            element.textContent = '$' + displayValue.toLocaleString();
        } else {
            element.textContent = displayValue.toLocaleString();
        }
    }, stepDuration);
}

// ============================
// FORM HANDLING
// ============================

function initFormHandlers() {
    const signupForm = document.getElementById('signupForm');
    const waitlistForm = document.getElementById('waitlistForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleFormSubmit);
        addFormValidation(signupForm);
    }

    if (waitlistForm) {
        waitlistForm.addEventListener('submit', handleFormSubmit);
        addFormValidation(waitlistForm);
    }
}

function addFormValidation(form) {
    const inputs = form.querySelectorAll('.form-input');

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });

        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateInput(input);
            }
        });
    });
}

function validateInput(input) {
    const value = input.value.trim();
    let isValid = true;
    let errorMessage = '';

    // Required field check
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }

    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    // Phone validation
    if (input.type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }

    // Update UI based on validation
    if (!isValid) {
        input.classList.add('error');
        input.classList.remove('success');
        showInputError(input, errorMessage);
    } else if (value) {
        input.classList.remove('error');
        input.classList.add('success');
        removeInputError(input);
    } else {
        input.classList.remove('error', 'success');
        removeInputError(input);
    }

    return isValid;
}

function showInputError(input, message) {
    removeInputError(input); // Remove existing error

    const errorDiv = document.createElement('div');
    errorDiv.className = 'input-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ef4444';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';

    input.parentElement.appendChild(errorDiv);
}

function removeInputError(input) {
    const errorDiv = input.parentElement.querySelector('.input-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validate all inputs
    const inputs = form.querySelectorAll('.form-input');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        form.classList.add('shake');
        setTimeout(() => form.classList.remove('shake'), 500);
        return;
    }

    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    try {
        // Simulate API call (replace with actual API endpoint)
        await submitFormData(data);

        // Show success message
        showSuccessMessage(form);

        // Reset form
        form.reset();
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
            removeInputError(input);
        });

    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage(form, 'Something went wrong. Please try again.');
    } finally {
        submitButton.classList.remove('loading');
        submitButton.disabled = false;
    }
}

async function submitFormData(data) {
    // Replace this with your actual API call
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Form data submitted:', data);

            // Simulate success
            resolve({ success: true });

            // Simulate error (uncomment to test)
            // reject(new Error('API Error'));
        }, CONFIG.formSubmitDelay);
    });
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="background: #10b981; color: white; padding: 1rem; border-radius: 0.75rem; text-align: center; margin-top: 1rem; animation: fadeInUp 0.5s;">
            <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
            <p style="margin: 0; font-weight: 600;">Success!</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">We'll be in touch soon.</p>
        </div>
    `;

    form.appendChild(successDiv);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove after 5 seconds
    setTimeout(() => {
        successDiv.style.opacity = '0';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

function showErrorMessage(form, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.innerHTML = `
        <div style="background: #ef4444; color: white; padding: 1rem; border-radius: 0.75rem; text-align: center; margin-top: 1rem; animation: fadeInUp 0.5s;">
            <i class="fas fa-exclamation-circle" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
            <p style="margin: 0; font-weight: 600;">Error</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem;">${message}</p>
        </div>
    `;

    form.appendChild(errorDiv);

    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove after 5 seconds
    setTimeout(() => {
        errorDiv.style.opacity = '0';
        setTimeout(() => errorDiv.remove(), 300);
    }, 5000);
}

// ============================
// UTILITY FUNCTIONS
// ============================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function to limit function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ============================
// ANALYTICS & TRACKING
// ============================

/**
 * Track events (integrate with Google Analytics, Mixpanel, etc.)
 */
function trackEvent(eventName, eventData = {}) {
    console.log('Event tracked:', eventName, eventData);

    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }

    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
}

// Track form submissions
document.addEventListener('submit', (e) => {
    if (e.target.matches('form')) {
        trackEvent('form_submit', {
            form_id: e.target.id || 'unknown',
            form_name: e.target.getAttribute('data-form-name') || 'unknown'
        });
    }
});

// Track button clicks
document.addEventListener('click', (e) => {
    if (e.target.matches('.btn') || e.target.closest('.btn')) {
        const button = e.target.matches('.btn') ? e.target : e.target.closest('.btn');
        trackEvent('button_click', {
            button_text: button.textContent.trim(),
            button_class: button.className
        });
    }
});

// ============================
// PAGE VISIBILITY
// ============================

/**
 * Handle page visibility changes
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('Page is hidden');
    } else {
        console.log('Page is visible');
    }
});

// ============================
// BROWSER COMPATIBILITY
// ============================

/**
 * Polyfill for browsers without IntersectionObserver
 */
if (!('IntersectionObserver' in window)) {
    console.warn('IntersectionObserver not supported');
    // Fallback: add 'visible' class to all scroll-animate elements
    document.querySelectorAll('.scroll-animate').forEach(el => {
        el.classList.add('visible');
    });
}

// ============================
// PERFORMANCE MONITORING
// ============================

/**
 * Log performance metrics
 */
window.addEventListener('load', () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime, 'ms');
    }
});

// ============================
// ERROR HANDLING
// ============================

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    // Send to error tracking service
});

/**
 * Promise rejection handler
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // Send to error tracking service
});

console.log('ImpactIQ initialized successfully');
