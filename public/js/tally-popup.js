window.addEventListener('DOMContentLoaded', () => {
  // Ensure Tally script is available
  if (typeof Tally === 'undefined') return;

  // Selectors for all CTA elements that should trigger the popup
  const selectors = ['.cta-button', '.navbar-cta', '.webinar-cta'];

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((cta) => {
      cta.addEventListener('click', (e) => {
        // Prevent normal navigation to the form URL
        e.preventDefault();

        Tally.openPopup('wgxR6d', {
          layout: 'default',
          overlay: false,
          width: window.innerWidth < 768 ? 340 : undefined,
          emoji: { text: '👋', animation: 'wave' }
        });
      });
    });
  });
}); 