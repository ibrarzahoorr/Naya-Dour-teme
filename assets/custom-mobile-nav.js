document.addEventListener('DOMContentLoaded', function() {
  const mobileNav = document.getElementById('CustomMobileNav');
  if (!mobileNav) return;

  const tabs = document.querySelectorAll('.custom-mobile-nav__tab-btn');
  const panels = document.querySelectorAll('.custom-mobile-nav__panel');
  const backBtn = document.querySelector('.custom-mobile-nav__back-btn');
  const closeBtn = document.querySelector('.custom-mobile-nav__close-btn');
  const level1 = document.querySelector('.custom-mobile-nav__level[data-level="1"]');
  const level2 = document.querySelector('.custom-mobile-nav__level[data-level="2"]');
  const titleElement = document.querySelector('.custom-mobile-nav__title');

  // Mobile menu open function
  window.openCustomMobileNav = function() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    if (tabs.length > 0) {
      tabs[0].click();
    }
  };

  // Mobile menu close function
  function closeMobileNav() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    resetNavigation();
  }

  // Reset navigation
  function resetNavigation() {
    if (level2) {
      level2.style.display = 'none';
      level2.classList.remove('active');
    }
    if (backBtn) backBtn.style.display = 'none';
    if (titleElement) titleElement.textContent = '';
    
    tabs.forEach(tab => tab.classList.remove('active'));
    panels.forEach(panel => {
      panel.classList.remove('active');
      panel.style.display = 'none';
    });
  }

  // Tab click event
  tabs.forEach(tab => {
    tab.addEventListener('click', function(e) {
      const hasChildren = this.getAttribute('data-has-children') === 'true';
      const menuHandle = this.getAttribute('data-menu-handle');

      if (hasChildren && menuHandle) {
        e.preventDefault();
        
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        this.classList.add('active');
        const currentPanel = document.querySelector(`.custom-mobile-nav__panel[data-menu-handle="${menuHandle}"]`);
        if (currentPanel) {
          currentPanel.classList.add('active');
          currentPanel.style.display = 'block';
        }
      }
    });
  });

  // Submenu items click
  document.addEventListener('click', function(e) {
    const gridItem = e.target.closest('.custom-mobile-nav__grid-item');
    
    if (gridItem && gridItem.hasAttribute('data-has-submenu')) {
      const hasSubmenu = gridItem.getAttribute('data-has-submenu') === 'true';
      
      if (hasSubmenu) {
        e.preventDefault();
        const submenuData = gridItem.nextElementSibling;
        const title = gridItem.getAttribute('data-title');
        
        if (submenuData && submenuData.classList.contains('custom-mobile-nav__submenu-data')) {
          showSubmenu(submenuData.innerHTML, title);
        }
      }
    }
  });

  // Show submenu
  function showSubmenu(content, title) {
    const submenuContent = document.querySelector('.custom-mobile-nav__submenu-content');
    if (submenuContent) {
      submenuContent.innerHTML = content;
    }
    
    if (level2) {
      level2.style.display = 'block';
      setTimeout(() => {
        level2.classList.add('active');
      }, 10);
    }
    
    if (titleElement) titleElement.textContent = title;
    if (backBtn) backBtn.style.display = 'flex';
  }

  // Back button
  if (backBtn) {
    backBtn.addEventListener('click', function() {
      if (level2) {
        level2.classList.remove('active');
        setTimeout(() => {
          level2.style.display = 'none';
          if (titleElement) titleElement.textContent = '';
          if (backBtn) backBtn.style.display = 'none';
        }, 300);
      }
    });
  }

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMobileNav);
  }

  // Outside click
  mobileNav.addEventListener('click', function(e) {
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });
});