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
    
    // Ver más testimonios
    const btnVerMas = document.querySelector('.btn-ver-mas');
    const testimoniosList = document.querySelector('.testimonios-list');
    let testimoniosVisibles = 3;
    
    // Array de testimonios adicionales
    const testimoniosExtra = [
        {
            nombre: 'Carlos Ruiz',
            tiempo: '3h atrás',
            contenido: 'Excelente atención y profesionalismo. El Dr. Mendoza realizó un trabajo excepcional con mi tratamiento de conducto.'
        },
        {
            nombre: 'Laura Soto',
            tiempo: '4h atrás',
            contenido: 'Muy buena experiencia. El personal es amable y las instalaciones son muy modernas y limpias.'
        },
        {
            nombre: 'Pedro Gómez',
            tiempo: '5h atrás',
            contenido: 'Increíble servicio. El tratamiento de ortodoncia está dando excelentes resultados.'
        }
    ];
    
    if (btnVerMas) {
        btnVerMas.addEventListener('click', function() {
            // Mostrar más testimonios
            testimoniosExtra.forEach(testimonio => {
                const testimonioHTML = `
                    <div class="testimonio-item" style="opacity: 0; transform: translateY(20px);">
                        <div class="testimonio-user">
                            <img src="/placeholder.svg?height=50&width=50" alt="Usuario">
                            <div class="user-info">
                                <h4>${testimonio.nombre}</h4>
                                <span class="review-time">${testimonio.tiempo}</span>
                            </div>
                        </div>
                        <div class="testimonio-content">
                            <p>${testimonio.contenido}</p>
                        </div>
                    </div>
                `;
                
                testimoniosList.insertAdjacentHTML('beforeend', testimonioHTML);
                
                // Animar la entrada del nuevo testimonio
                setTimeout(() => {
                    const nuevoTestimonio = testimoniosList.lastElementChild;
                    nuevoTestimonio.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    nuevoTestimonio.style.opacity = '1';
                    nuevoTestimonio.style.transform = 'translateY(0)';
                }, 100);
            });
            
            // Ocultar el botón después de mostrar todos los testimonios
            btnVerMas.style.display = 'none';
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
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
        const elements = document.querySelectorAll('.servicio-card, .doctor-card, .nosotros-image, .nosotros-text, .testimonio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for animation
    const animatedElements = document.querySelectorAll('.servicio-card, .doctor-card, .nosotros-image, .nosotros-text, .testimonio-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});