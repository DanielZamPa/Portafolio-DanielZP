document.addEventListener('DOMContentLoaded', () => {
  const dropdownBtn = document.querySelector('.dropdown-btn');
  if (dropdownBtn) {
    dropdownBtn.addEventListener('click', function () {
      const dropdownContent = document.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

  // New hamburger menu logic
  const hamburger = document.querySelector('.hamburger-menu');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-menu-open');
      const isExpanded = navLinks.classList.contains('mobile-menu-open');
      hamburger.setAttribute('aria-expanded', isExpanded);
      hamburger.classList.toggle('is-active');
    });
  }
});