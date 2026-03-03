document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initSmoothScroll();
    initDarkMode(); // ← NEW
});

/* Dark Mode Toggle */
function initDarkMode() {
    const saved = localStorage.getItem('colorMode');
    const isDark = saved ? saved === 'dark' : true; // defaults to dark
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

// (keep all your existing functions below unchanged)
function initNavbar() { /* ... your existing code ... */ }
// etc.
