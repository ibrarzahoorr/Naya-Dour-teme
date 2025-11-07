document.addEventListener('DOMContentLoaded', function() {
  const mobileNav = document.getElementById('CustomMobileNav');
  const tabs = document.querySelectorAll('.custom-mobile-nav__tab-btn');
  const panels = document.querySelectorAll('.custom-mobile-nav__panel');
  const backBtn = document.querySelector('.custom-mobile-nav__back-btn');
  const closeBtn = document.querySelector('.custom-mobile-nav__close-btn');
  const level1 = document.querySelector('.custom-mobile-nav__level[data-level="1"]');
  const level2 = document.querySelector('.custom-mobile-nav__level[data-level="2"]');
  const titleElement = document.querySelector('.custom-mobile-nav__title');

  // Mobile menu open karne ka function (aapke existing code se connect karein)
  function openMobileNav() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // First tab ko default active banao
    if (tabs.length > 0) {
      tabs[0].click();
    }
  }

  // Mobile menu close karne ka function
  function closeMobileNav() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    resetNavigation();
  }

  // Navigation reset karna
  function resetNavigation() {
    level2.style.display = 'none';
    level2.classList.remove('active');
    backBtn.style.display = 'none';
    titleElement.textContent = '';
    
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

      // Agar children hai toh panel show karo aur navigation rok do
      if (hasChildren && menuHandle) {
        e.preventDefault();
        
        // Sab tabs aur panels ko deactivate karo
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        // Current tab aur panel ko activate karo
        this.classList.add('active');
        const currentPanel = document.querySelector(`.custom-mobile-nav__panel[data-menu-handle="${menuHandle}"]`);
        if (currentPanel) {
          currentPanel.classList.add('active');
          currentPanel.style.display = 'block';
        }
      }
      // Agar children nahi hai toh directly page par navigate hone do (default behavior)
    });
  });

  // Submenu items click event
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
      // Agar submenu nahi hai toh link naturally work karega
    }
  });

  // Submenu show karna
  function showSubmenu(content, title) {
    const submenuContent = document.querySelector('.custom-mobile-nav__submenu-content');
    submenuContent.innerHTML = content;
    
    level2.style.display = 'block';
    setTimeout(() => {
      level2.classList.add('active');
    }, 10);
    
    titleElement.textContent = title;
    backBtn.style.display = 'flex';
  }

  // Back button
  backBtn.addEventListener('click', function() {
    level2.classList.remove('active');
    setTimeout(() => {
      level2.style.display = 'none';
      titleElement.textContent = '';
      backBtn.style.display = 'none';
    }, 300);
  });

  // Close button
  closeBtn.addEventListener('click', closeMobileNav);

  // Mobile menu trigger button (aapke existing hamburger icon se connect karein)
  // Example:
  const mobileMenuTrigger = document.querySelector('.your-hamburger-icon-class');
  if (mobileMenuTrigger) {
    mobileMenuTrigger.addEventListener('click', openMobileNav);
  }

  // Outside click se close
  mobileNav.addEventListener('click', function(e) {
    if (e.target === mobileNav) {
      closeMobileNav();
    }
  });
});