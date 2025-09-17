<script>
(() => {
  const nav = document.getElementById('site-menu');
  const toggle = document.querySelector('.nav-toggle');

  // Mobile: open/close entire menu
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const nowCollapsed = nav.getAttribute('data-collapsed') === 'true';
      nav.setAttribute('data-collapsed', nowCollapsed ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', nowCollapsed ? 'true' : 'false');
    });
  }

  // Submenus: click to toggle on mobile; keyboard friendly on desktop
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dd => {
    const button = dd.querySelector('.submenu-toggle');
    const panel  = dd.querySelector('.dropdown-content');

    // If there is no dedicated button (parent link + hover only), skip.
    if (!button || !panel) { return; }

    button.addEventListener('click', (e) => {
      const isOpen = dd.getAttribute('data-open') === 'true';
      dd.setAttribute('data-open', isOpen ? 'false' : 'true');
      button.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      e.stopPropagation();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!dd.contains(e.target)) {
        dd.setAttribute('data-open', 'false');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on Escape
    dd.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dd.setAttribute('data-open', 'false');
        button.setAttribute('aria-expanded', 'false');
        button.focus();
      }
    });
  });
})();
</script>
