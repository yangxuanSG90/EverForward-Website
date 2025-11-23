// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Testimonial Carousel
let currentSlide = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

function showSlide(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        if (i === index) {
            card.classList.add('active');
        }
    });

    dots.forEach((dot, i) => {
        dot.classList.remove('active');
        if (i === index) {
            dot.classList.add('active');
        }
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentSlide);
}

if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play carousel (optional)
let carouselInterval = setInterval(nextSlide, 5000);

// Pause on hover
const carousel = document.querySelector('.testimonial-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    carousel.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(nextSlide, 5000);
    });
}

// Who Helps Accordion
const helpItems = document.querySelectorAll('.help-item');

helpItems.forEach(item => {
    item.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        helpItems.forEach(i => i.classList.remove('active'));
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Sticky CTA
const stickyCta = document.getElementById('sticky-cta');
let scrollThreshold = window.innerHeight * 0.5;

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const documentHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;
    
    // Show sticky CTA when user scrolls past 50% of the page
    if (scrollPosition > scrollThreshold && scrollPosition < documentHeight - windowHeight - 100) {
        stickyCta.classList.add('visible');
    } else {
        stickyCta.classList.remove('visible');
    }
});

// Update scroll threshold on resize
window.addEventListener('resize', () => {
    scrollThreshold = window.innerHeight * 0.5;
});

// Step Card Animation on Scroll
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe step cards
document.querySelectorAll('.step-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe feature cards
document.querySelectorAll('.feature-card, .feature-tile').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Modal Functionality
const modal = document.getElementById('getStartedModal');
const formView = document.getElementById('formView');
const successView = document.getElementById('successView');
const modalClose = document.querySelector('.modal-close');
const getStartedForm = document.getElementById('getStartedForm');
const messageField = document.getElementById('messageField');

// Open modal when "Get Started Free" is clicked
document.querySelectorAll('.btn-primary').forEach(button => {
    // Skip buttons that are inside the modal
    if (!button.closest('.modal-container')) {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    }
});

// Open modal function
function openModal() {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Reset form
        if (getStartedForm) {
            getStartedForm.reset();
            clearErrors();
            formView.style.display = 'block';
            successView.style.display = 'none';
            messageField.classList.remove('visible');
        }
    }
}

// Close modal function
function closeModal() {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal on close button click
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal on overlay click
if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

// Close modal button in success view
const closeModalBtn = document.querySelector('.btn-close-modal');
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
}

// Form Validation
function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.error-message');
    
    // Remove previous error styling
    field.classList.remove('error');
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Radio button validation
    if (field.type === 'radio' && field.name === 'urgency') {
        const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
        const isChecked = Array.from(radioGroup).some(radio => radio.checked);
        if (!isChecked) {
            const firstRadio = radioGroup[0];
            showError(firstRadio.parentElement.parentElement, 'Please select an option');
            return false;
        }
    }
    
    // Clear error if valid
    if (errorElement) {
        errorElement.textContent = '';
    }
    
    return true;
}

function showError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearErrors() {
    document.querySelectorAll('.error').forEach(field => {
        field.classList.remove('error');
    });
    document.querySelectorAll('.error-message').forEach(error => {
        error.textContent = '';
    });
}

// Real-time validation
if (getStartedForm) {
    const inputs = getStartedForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.type === 'radio') {
                // Validate radio group
                const radioGroup = document.querySelectorAll(`input[name="${input.name}"]`);
                const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                if (!isChecked) {
                    const container = input.closest('.form-group');
                    const errorElement = container.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.textContent = 'Please select an option';
                    }
                } else {
                    const container = input.closest('.form-group');
                    const errorElement = container.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
            } else {
                validateField(input);
            }
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
    
    // Show optional message field after user starts filling form
    const helpTypeSelect = document.getElementById('helpType');
    if (helpTypeSelect) {
        helpTypeSelect.addEventListener('change', () => {
            if (helpTypeSelect.value && !messageField.classList.contains('visible')) {
                setTimeout(() => {
                    messageField.classList.add('visible');
                }, 300);
            }
        });
    }
}

// Form Submission
if (getStartedForm) {
    getStartedForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        const formData = new FormData(getStartedForm);
        
            // Validate required fields
        const requiredFields = getStartedForm.querySelectorAll('[required]');
        const radioGroups = new Set();
        
        requiredFields.forEach(field => {
            if (field.type === 'radio') {
                // Track radio groups to validate once per group
                if (!radioGroups.has(field.name)) {
                    radioGroups.add(field.name);
                    const radioGroup = document.querySelectorAll(`input[name="${field.name}"]`);
                    const isChecked = Array.from(radioGroup).some(radio => radio.checked);
                    if (!isChecked) {
                        isValid = false;
                        const container = field.closest('.form-group');
                        const errorElement = container.querySelector('.error-message');
                        if (errorElement) {
                            errorElement.textContent = 'Please select an option';
                        }
                    }
                }
            } else if (!validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            // Scroll to first error
            const firstError = getStartedForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        // Disable submit button
        const submitBtn = getStartedForm.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';
        }
        
        // Simulate form submission (replace with actual API call)
        try {
            // Here you would make an actual API call
            // const response = await fetch('/api/submit-form', {
            //     method: 'POST',
            //     body: formData
            // });
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success view
            formView.style.display = 'none';
            successView.style.display = 'block';
            
            // Log form data (remove in production)
            console.log('Form submitted:', Object.fromEntries(formData));
            
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your form. Please try again.');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Start My Guidance →';
            }
        }
    });
}

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

