window.addEventListener('load', function () {
  if (typeof Tally === 'undefined') return;

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;

  if (isDesktop) {
    // Desktop – auto-open popup
    Tally.openPopup('wgxR6d', {
      layout: 'default',
      overlay: false,
      emoji: { text: '👋', animation: 'wave' }
    });
  } else {
    // Mobile – show floating action button to open popup on demand
    const fab = document.getElementById('tallyFab');
    if (fab) {
      fab.addEventListener('click', () => {
        // Hide FAB instantly
        fab.style.display = 'none';
        Tally.openPopup('wgxR6d', {
          layout: 'default',
          overlay: false,
          width: 340,
          emoji: { text: '👋', animation: 'wave' },
          onClose: () => {
            // Show FAB again when popup closes
            fab.style.display = 'flex';
          }
        });
      });
    }
  }
}); 