// Mobile menu toggle – simplified, click only
const nav  = document.querySelector('.navbar-nav');
const btn  = document.querySelector('.mobile-menu-btn');
const icon = btn.querySelector('i');

btn.addEventListener('click', () => {
    const opened = nav.classList.toggle('active');
    btn.setAttribute('aria-expanded', opened);
    icon.className = opened ? 'fas fa-times' : 'fas fa-bars';
});

// Close menu after clicking any link inside
nav.addEventListener('click', (e) => {
    if (e.target.matches('a') && nav.classList.contains('active')) {
        nav.classList.remove('active');
        btn.setAttribute('aria-expanded', false);
        icon.className = 'fas fa-bars';
    }
});

// Schedule cards auto-activation based on current date
function setActiveScheduleCard() {
    const scheduleCards = document.querySelectorAll('.schedule-card');
    const today = new Date();
    
    // Define start dates for each week (2025) – aligned with 5 schedule cards
    const weekStartDates = [
        new Date(2025, 5, 30), // 30 czerwca
        new Date(2025, 6, 7),  // 7 lipca
        new Date(2025, 6, 14), // 14 lipca
        new Date(2025, 6, 21), // 21 lipca
        new Date(2025, 6, 28)  // 28 lipca
    ];
    
    // Find the current active week
    let activeWeekIndex = 0;
    
    for (let i = 0; i < weekStartDates.length; i++) {
        if (today >= weekStartDates[i]) {
            activeWeekIndex = i;
        } else {
            break;
        }
    }
    
    // Remove active class from all cards
    scheduleCards.forEach(card => card.classList.remove('active'));
    
    // Add active class to current week card
    if (scheduleCards[activeWeekIndex]) {
        scheduleCards[activeWeekIndex].classList.add('active');
    }
}

// Set active card on page load
setActiveScheduleCard();

// ===== Countdown timer to 30 June 2025 17:00 =====
const countdownEl = document.getElementById('countdown');
const daysEl    = document.getElementById('days');
const hoursEl   = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

// Data docelowa – 30 czerwca 2025, godz. 17:00 (miesiące 0-indexed)
const targetDate = new Date(2025, 5, 30, 17, 0, 0);

// Zwraca właściwą odmianę rzeczownika w zależności od liczby
function pluralizePL(n, one, few, many) {
    const v = Math.abs(n);
    if (v % 10 === 1 && v % 100 !== 11) return one;      // 1, 21, 31...
    if ([2, 3, 4].includes(v % 10) && ![12, 13, 14].includes(v % 100)) {
        return few;                                      // 2-4, 22-24, 32-34...
    }
    return many;                                          // 0, 5-20, 11-14, 25-30...
}

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    // Jeśli czas minął – ustaw wszystkie na zero i zatrzymaj licznik
    if (diff <= 0) {
        daysEl.textContent    = '0';
        hoursEl.textContent   = '00';
        minutesEl.textContent = '00';
        secondsEl.textContent = '00';
        clearInterval(timerId);
        return;
    }

    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    const hours   = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

    daysEl.textContent    = days;
    hoursEl.textContent   = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
const timerId = setInterval(updateCountdown, 1000); 