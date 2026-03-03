/* ========================================
   Crimson Swords - STEM Racing Team
   Shared JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initDarkMode();
});

function initDarkMode() {
    const saved = localStorage.getItem('colorMode');
    const isDark = saved ? saved === 'dark' : true;
    applyMode(isDark);

    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
        btn.addEventListener('click', function () {
            const currentlyDark = document.documentElement.classList.contains('dark-mode');
            applyMode(!currentlyDark);
            localStorage.setItem('colorMode', !currentlyDark ? 'dark' : 'light');
        });
    });
}

function applyMode(dark) {
    if (dark) {
        document.documentElement.classList.add('dark-mode');
        document.documentElement.classList.remove('light-mode');
    } else {
        document.documentElement.classList.add('light-mode');
        document.documentElement.classList.remove('dark-mode');
    }
    document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
        btn.textContent = dark ? '☀ Light Mode' : '🌙 Dark Mode';
    });
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    if (animatedElements.length === 0) return;

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => observer.observe(el));
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({ top: targetElement.offsetTop - navbarHeight, behavior: 'smooth' });
            }
        });
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<span>${message}</span><button class="notification-close">&times;</button>`;

    Object.assign(notification.style, {
        position: 'fixed', bottom: '20px', right: '20px',
        padding: '15px 25px', borderRadius: '10px', color: '#fff',
        fontWeight: '500', display: 'flex', alignItems: 'center',
        gap: '15px', zIndex: '9999', animation: 'slideIn 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        background: type === 'success' ? '#28a745' : '#dc3545'
    });

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);
    notification.querySelector('.notification-close').addEventListener('click', () => closeNotification(notification));
    setTimeout(() => closeNotification(notification), 5000);
}

function closeNotification(notification) {
    if (!notification) return;
    notification.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => notification.remove(), 300);
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    function update() {
        start += increment;
        if (start < target) { element.textContent = Math.floor(start); requestAnimationFrame(update); }
        else { element.textContent = target; }
    }
    update();
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target, parseInt(entry.target.dataset.counter));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
}
