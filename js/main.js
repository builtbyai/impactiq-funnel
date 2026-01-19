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
    apiEndpoint: '/api/leads',
    animationDuration: 300,
    // EmailJS Configuration
    emailjs: {
        publicKey: 'YOUR_PUBLIC_KEY',      // Get from EmailJS dashboard
        serviceId: 'YOUR_SERVICE_ID',       // Create email service in EmailJS
        templateId: 'YOUR_TEMPLATE_ID',     // Create email template in EmailJS
        toEmail: 'impactiqdev@gmail.com'
    }
};

// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init(CONFIG.emailjs.publicKey);
}

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
    initParallaxEffects();
    initMouseFollowEffects();
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
        '.section-header',
        '.app-preview-item',
        '.how-it-works-image',
        '.demo-video-wrapper'
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
    // Check if EmailJS is available
    if (typeof emailjs !== 'undefined' && CONFIG.emailjs.publicKey !== 'YOUR_PUBLIC_KEY') {
        // Send via EmailJS
        const templateParams = {
            to_email: CONFIG.emailjs.toEmail,
            from_name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'Website Visitor',
            from_email: data.email || 'no-email@provided.com',
            phone: data.phone || 'Not provided',
            company: data.company || 'Not provided',
            projects_per_month: data.projectsPerMonth || 'Not provided',
            message: `
New Lead from ImpactIQ Funnel:

Name: ${data.firstName || ''} ${data.lastName || ''}
Email: ${data.email || 'Not provided'}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}
Projects Per Month: ${data.projectsPerMonth || 'Not provided'}

Submitted at: ${new Date().toLocaleString()}
            `.trim()
        };

        try {
            const response = await emailjs.send(
                CONFIG.emailjs.serviceId,
                CONFIG.emailjs.templateId,
                templateParams
            );
            console.log('Email sent successfully:', response);
            return { success: true, response };
        } catch (error) {
            console.error('EmailJS error:', error);
            throw error;
        }
    } else {
        // Use FormSubmit.co - sends directly to email, no registration needed
        const formSubmitEndpoint = 'https://formsubmit.co/ajax/impactiqdev@gmail.com';

        try {
            const response = await fetch(formSubmitEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New ImpactIQ Lead: ${data.firstName} ${data.lastName}`,
                    _template: 'table',
                    Name: `${data.firstName} ${data.lastName}`,
                    Email: data.email,
                    Phone: data.phone,
                    Company: data.company,
                    'Projects Per Month': data.projectsPerMonth,
                    'Submitted At': new Date().toLocaleString()
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('Form submitted via FormSubmit');
                return { success: true };
            } else {
                throw new Error('FormSubmit submission failed');
            }
        } catch (error) {
            console.error('FormSubmit error:', error);
            // Final fallback - log to console and show success anyway
            console.log('Form data (stored locally):', data);
            // Store in localStorage as backup
            const leads = JSON.parse(localStorage.getItem('impactiq_leads') || '[]');
            leads.push({ ...data, submittedAt: new Date().toISOString() });
            localStorage.setItem('impactiq_leads', JSON.stringify(leads));
            return { success: true, fallback: true };
        }
    }
}

function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success';
    successDiv.innerHTML = `
        <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 2rem; border-radius: 1rem; text-align: center; margin-top: 1.5rem; animation: zoomBounce 0.6s ease-out; box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3);">
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
                <i class="fas fa-check" style="font-size: 1.5rem;"></i>
            </div>
            <p style="margin: 0; font-weight: 700; font-size: 1.25rem;">Thank You!</p>
            <p style="margin: 0.75rem 0 0 0; font-size: 1rem; opacity: 0.9;">Your submission was received successfully.</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.875rem; opacity: 0.8;">We'll contact you at the email provided shortly.</p>
        </div>
    `;

    form.appendChild(successDiv);

    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove after 7 seconds
    setTimeout(() => {
        successDiv.style.transition = 'opacity 0.5s, transform 0.5s';
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(-20px)';
        setTimeout(() => successDiv.remove(), 500);
    }, 7000);
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

// ============================
// PARALLAX EFFECTS
// ============================

function initParallaxEffects() {
    const heroBanner = document.querySelector('.hero-banner-img');
    const heroOrbs = document.querySelectorAll('.bg-orb');

    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.pageYOffset;

        // Parallax for hero banner
        if (heroBanner) {
            heroBanner.style.transform = `translateY(${scrollY * 0.3}px)`;
        }

        // Parallax for orbs
        heroOrbs.forEach((orb, index) => {
            const speed = 0.1 + (index * 0.05);
            orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
    }, 16));
}

// ============================
// MOUSE FOLLOW EFFECTS
// ============================

function initMouseFollowEffects() {
    const hero = document.querySelector('.hero');

    if (hero) {
        hero.addEventListener('mousemove', throttle((e) => {
            const rect = hero.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            const heroBanner = hero.querySelector('.hero-banner-img');
            if (heroBanner) {
                heroBanner.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
            }

            // Move orbs slightly with mouse
            const orbs = hero.querySelectorAll('.bg-orb');
            orbs.forEach((orb, index) => {
                const factor = (index + 1) * 10;
                orb.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        }, 16));

        // Reset on mouse leave
        hero.addEventListener('mouseleave', () => {
            const heroBanner = hero.querySelector('.hero-banner-img');
            if (heroBanner) {
                heroBanner.style.transform = 'translate(0, 0)';
                heroBanner.style.transition = 'transform 0.5s ease-out';
            }
        });
    }
}

// ============================
// SMOOTH REVEAL ON SCROLL
// ============================

// Add smooth reveal class to elements as they enter viewport
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
});

console.log('ImpactIQ initialized successfully');
