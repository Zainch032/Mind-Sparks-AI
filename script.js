(function() {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');

  if (!menuToggle || !navLinks || !navbar) return;

  // Accessibility attributes
  menuToggle.setAttribute('role', 'button');
  menuToggle.setAttribute('aria-controls', 'navLinks');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Toggle navigation menu');

  function toggleMenu() {
    const isActive = navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', String(isActive));
  }

  // Click to toggle
  menuToggle.addEventListener('click', toggleMenu);

  // Keyboard support
  menuToggle.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('active') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Navbar shrink on scroll
  function updateNavbarState() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateNavbarState, { passive: true });
  updateNavbarState();
})();