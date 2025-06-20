window.addEventListener('DOMContentLoaded', () => {
  const selectors = ['.cta-button', '.navbar-cta', '.webinar-cta'];

  const openModal = () => {
    Tally.openPopup('wgxR6d', {
      layout: 'modal',
      overlay: true,
      width: window.innerWidth < 768 ? 340 : undefined,
      emoji: { text: '👋', animation: 'wave' }
    });
  };

  const ensureTallyLoaded = (callback) => {
    if (typeof Tally !== 'undefined') {
      callback();
      return;
    }
    const scriptUrl = 'https://tally.so/widgets/embed.js';
    if (!document.querySelector(`script[src="${scriptUrl}"]`)) {
      const s = document.createElement('script');
      s.src = scriptUrl;
      document.body.appendChild(s);
    }
    const interval = setInterval(() => {
      if (typeof Tally !== 'undefined') {
        clearInterval(interval);
        callback();
      }
    }, 50);
  };

  selectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((cta) => {
      cta.addEventListener('click', (e) => {
        e.preventDefault();
        ensureTallyLoaded(openModal);
      });
    });
  });
});
