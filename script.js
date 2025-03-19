document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!menu.contains(event.target) && !menuToggle.contains(event.target) && menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
        });
    }
    
    // Testimonials Slider
    const testimonios = document.querySelectorAll('.testimonio');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    
    function showTestimonio(index) {
        testimonios.forEach(testimonio => testimonio.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonios[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showTestimonio(index);
            });
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonios.length) % testimonios.length;
            showTestimonio(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonios.length;
            showTestimonio(currentIndex);
        });
    }
    
    // Touch swipe for testimonials on mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    const testimoniosSlider = document.querySelector('.testimonios-slider');
    
    if (testimoniosSlider) {
        testimoniosSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        testimoniosSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, {passive: true});
    }
    
    function handleSwipe() {
        if (touchEndX < touchStartX) {
            // Swipe left - next
            currentIndex = (currentIndex + 1) % testimonios.length;
            showTestimonio(currentIndex);
        } else if (touchEndX > touchStartX) {
            // Swipe right - previous
            currentIndex = (currentIndex - 1 + testimonios.length) % testimonios.length;
            showTestimonio(currentIndex);
        }
    }
    
    // Auto slide testimonials
    let autoSlideInterval = setInterval(() => {
        if (nextBtn) {
            currentIndex = (currentIndex + 1) % testimonios.length;
            showTestimonio(currentIndex);
        }
    }, 5000);
    
    // Pause auto slide on interaction
    const testimoniosControls = document.querySelector('.testimonios-controls');
    if (testimoniosControls) {
        testimoniosControls.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });
        
        testimoniosControls.addEventListener('mouseleave', () => {
            autoSlideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonios.length;
                showTestimonio(currentIndex);
            }, 5000);
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Add offset for fixed header
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                if (formElements[i].hasAttribute('required') && !formElements[i].value) {
                    isValid = false;
                    formElements[i].style.borderColor = 'red';
                } else if (formElements[i].type !== 'submit') {
                    formElements[i].style.borderColor = '';
                }
            }
            
            if (isValid) {
                // Get form data
                const formData = new FormData(contactForm);
                const formDataObj = {};
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // Here you would typically send the data to a server
                // For demo purposes, we'll just show an alert
                alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
                contactForm.reset();
            } else {
                alert('Por favor completa todos los campos requeridos.');
            }
        });
    }
    
    // Newsletter form
    const newsletterForm = document.getElementById('form-newsletter');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the email to a server
            // For demo purposes, we'll just show an alert
            alert('¡Gracias por suscribirte a nuestro boletín!');
            newsletterForm.reset();
        });
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.servicio-card, .doctor-card, .nosotros-image, .nosotros-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});