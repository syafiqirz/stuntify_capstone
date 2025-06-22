document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Determine scroll direction
        if (currentScroll <= 0) {
            // At the top
            navbar.classList.remove('nav-scrolled-down');
            navbar.classList.add('nav-scrolled-up');
        } else if (currentScroll > lastScroll) {
            // Scrolling down
            navbar.classList.remove('nav-scrolled-up');
            navbar.classList.add('nav-scrolled-down');
            
            // If menu is open, close it
            const navMenu = document.getElementById('nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        } else {
            // Scrolling up
            navbar.classList.remove('nav-scrolled-down');
            navbar.classList.add('nav-scrolled-up');
        }
        
        lastScroll = currentScroll;
    });
});
