// Main JavaScript for Le Prod website
document.addEventListener('DOMContentLoaded', function() {

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close-btn');
    const navList = document.querySelector('.nav-list');

    if (menuBtn && navList) {
        menuBtn.addEventListener('click', () => {
            navList.classList.add('active');
            menuBtn.classList.add('active');
            closeBtn.style.display = 'block';
        });
    }

    if (closeBtn && navList) {
        closeBtn.addEventListener('click', () => {
            navList.classList.remove('active');
            menuBtn.classList.remove('active');
            closeBtn.style.display = 'none';
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navList && navList.classList.contains('active') &&
            !e.target.closest('.nav-list') && !e.target.closest('.mobile-menu-btn')) {
            navList.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            if (navList) navList.classList.remove('active');
            if (menuBtn) menuBtn.classList.remove('active');

            const targetId = this.getAttribute('href');
            if (targetId === "#") return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero background
    const heroSection = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');

    if (heroSection && heroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                heroSection.querySelector('.hero-bg').style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }

    // Parallax effect for realisations hero background
    const realisationsHeroSection = document.querySelector('.realisations-hero');
    const realisationsHeroContent = document.querySelector('.realisations-hero-content');

    if (realisationsHeroSection && realisationsHeroContent) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition < window.innerHeight) {
                realisationsHeroContent.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                realisationsHeroSection.querySelector('.realisations-hero-bg').style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        });
    }

    // Project cards hover effect
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            card.style.transform = `perspective(1000px) rotateX(${deltaY * -5}deg) rotateY(${deltaX * 5}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // Horizontal scroll with mouse wheel
    const scrollContainer = document.querySelector('.scroll-container');
    if (scrollContainer) {
        scrollContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            scrollContainer.scrollLeft += e.deltaY;
        });
    }

    // Video slider functionality
    const videoSlider = document.querySelector('.video-slider-track');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (videoSlider && prevBtn && nextBtn) {
        let scrollAmount = 0;
        const slideWidth = document.querySelector('.video-slide').offsetWidth + 32; // Width + gap

        nextBtn.addEventListener('click', () => {
            scrollAmount += slideWidth * 2; // Scroll 2 slides
            if (scrollAmount > videoSlider.scrollWidth - videoSlider.clientWidth) {
                scrollAmount = 0;
            }
            videoSlider.style.transform = `translateX(-${scrollAmount}px)`;
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= slideWidth * 2; // Scroll 2 slides
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
            videoSlider.style.transform = `translateX(-${scrollAmount}px)`;
        });
    }



    // Tilting effect for service cards
    const serviceCards = document.querySelectorAll('.service-card');

    serviceCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / 20;
            const deltaY = (y - centerY) / 20;

            card.style.transform = `translateY(-10px) rotateX(${deltaY}deg) rotateY(${deltaX}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    // Project detail card hover effects
    const projectDetailCards = document.querySelectorAll('.project-detail-card');

    projectDetailCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('hovered');
        });

        card.addEventListener('mouseleave', () => {
            card.classList.remove('hovered');
        });
    });

    // Video play buttons functionality
    const videoPlayBtns = document.querySelectorAll('.video-play-btn');

    videoPlayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // In a real implementation, this would open a video modal
            alert('Cette fonctionnalité ouvrirait la vidéo en mode plein écran');
        });
    });

    // Testimonials carousel functionality
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    const testimonialPrev = document.querySelector('.testimonial-prev');
    const testimonialNext = document.querySelector('.testimonial-next');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    if (testimonialsSlider && testimonialPrev && testimonialNext) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const maxSlides = slides.length - 1;

        function goToSlide(slideIndex) {
            testimonialsSlider.style.transform = `translateX(-${slideIndex * 100}%)`;

            // Update active dot
            testimonialDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === slideIndex);
            });

            currentSlide = slideIndex;
        }

        // Initialize dots click events
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);
            });
        });

        // Next button functionality
        testimonialNext.addEventListener('click', () => {
            if (currentSlide >= maxSlides) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + 1);
            }
        });

        // Previous button functionality
        testimonialPrev.addEventListener('click', () => {
            if (currentSlide <= 0) {
                goToSlide(maxSlides);
            } else {
                goToSlide(currentSlide - 1);
            }
        });

        // Auto slide every 5 seconds
        let autoSlide = setInterval(() => {
            if (currentSlide >= maxSlides) {
                goToSlide(0);
            } else {
                goToSlide(currentSlide + 1);
            }
        }, 5000);

        // Pause auto slide on hover
        testimonialsSlider.addEventListener('mouseenter', () => {
            clearInterval(autoSlide);
        });

        testimonialsSlider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                if (currentSlide >= maxSlides) {
                    goToSlide(0);
                } else {
                    goToSlide(currentSlide + 1);
                }
            }, 5000);
        });
    }
});