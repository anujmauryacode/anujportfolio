const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const navToggle = document.querySelector('.nav-toggle');
const navPanel = document.querySelector('.nav-panel');
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');
const formStatus = document.querySelector('.form-status');

const applyTheme = (theme) => {
  const isLight = theme === 'light-mode';
  body.classList.toggle('light-mode', isLight);
  themeIcon.classList.toggle('fa-moon', !isLight);
  themeIcon.classList.toggle('fa-sun', isLight);
  localStorage.setItem('portfolio-theme', theme);
};

const savedTheme = localStorage.getItem('portfolio-theme') || 'dark-mode';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light-mode') ? 'dark-mode' : 'light-mode';
  applyTheme(nextTheme);
});

navToggle.addEventListener('click', () => {
  navPanel.classList.toggle('open');
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => revealObserver.observe(item));

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please fill in all fields before sending.';
    formStatus.style.color = '#f87171';
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formStatus.textContent = 'Opening your email app...';
  formStatus.style.color = '#34d399';

  window.location.href = `mailto:anujm0046@gmail.com?subject=${subject}&body=${body}`;
  contactForm.reset();
});

if (window.innerWidth <= 760) {
  navPanel.classList.remove('open');
}

