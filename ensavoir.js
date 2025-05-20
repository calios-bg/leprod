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
            if (closeBtn) closeBtn.style.display = 'none';
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
});