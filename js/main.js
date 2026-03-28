/* ========================================
   Circé Restaurant — Main JavaScript
   Enhanced with advanced animations
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Animated particles in hero ---
  const hero = document.getElementById('hero');
  if (hero) {
    const canvas = document.createElement('canvas');
    canvas.classList.add('hero-particles');
    canvas.style.cssText = 'position:absolute;inset:0;z-index:1;pointer-events:none;';
    hero.insertBefore(canvas, hero.firstChild);
    const ctx = canvas.getContext('2d');
    let particles = [];
    let w, h;

    function resize() {
      w = canvas.width = hero.offsetWidth;
      h = canvas.height = hero.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = -(Math.random() * 0.3 + 0.1);
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.4 + 0.1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.growing = Math.random() > 0.5;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += this.growing ? this.fadeSpeed : -this.fadeSpeed;
        if (this.opacity >= 0.5) this.growing = false;
        if (this.opacity <= 0.05) this.growing = true;
        if (this.y < -10 || this.x < -10 || this.x > w + 10) this.reset();
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${this.opacity})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 60; i++) particles.push(new Particle());

    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // --- Hero title reveal animation ---
  const heroTitle = document.querySelector('.hero-title');
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = '0';
    heroContent.style.transform = 'translateY(40px)';
    setTimeout(() => {
      heroContent.style.transition = 'opacity 1.2s ease, transform 1.2s ease';
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateY(0)';
    }, 300);
  }

  // --- Navbar scroll effect with hide/show ---
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;
  if (navbar) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      navbar.classList.toggle('scrolled', currentScroll > 60);

      if (currentScroll > lastScroll && currentScroll > 400) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScroll = currentScroll;
    });
  }

  // --- Mobile nav toggle ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // --- Staggered scroll-triggered animations ---
  const animatedSections = document.querySelectorAll('.section, .menu-section, .event-detail, .page-header');

  animatedSections.forEach(section => {
    const children = section.querySelectorAll(
      '.section-header, .about-text, .about-image, .chef-image, .chef-text, ' +
      '.menu-card, .cocktail-card, .gallery-item, .event-card, .info-block, ' +
      '.event-detail-grid > *, .contact-info, .contact-form, .menu-grid, ' +
      '.menu-section-header, .section-cta'
    );
    children.forEach((el, i) => {
      el.classList.add('fade-in');
      el.style.transitionDelay = `${i * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // --- Parallax effect on scroll ---
  const parallaxElements = document.querySelectorAll('.image-placeholder, .hero-content');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        const speed = el.classList.contains('hero-content') ? 0.3 : 0.08;
        const yPos = (rect.top - window.innerHeight / 2) * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  });

  // --- Magnetic hover effect on buttons ---
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.4s ease';
    });
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.1s ease';
    });
  });

  // --- Counter animation for menu prices ---
  const menuPrices = document.querySelectorAll('.menu-item-price');
  const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent.trim();
        const match = text.match(/(\d+)/);
        if (match) {
          const target = parseInt(match[1]);
          const prefix = text.substring(0, text.indexOf(match[1]));
          let current = 0;
          const step = Math.ceil(target / 20);
          const interval = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = prefix + current;
            if (current >= target) clearInterval(interval);
          }, 30);
        }
        priceObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  menuPrices.forEach(el => priceObserver.observe(el));

  // --- Smooth scroll for anchor links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = navbar ? navbar.offsetHeight + 20 : 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Text split animation for section titles ---
  document.querySelectorAll('.section-title').forEach(title => {
    const text = title.textContent;
    title.setAttribute('data-text', text);
  });

  // --- Custom cursor for desktop ---
  if (window.matchMedia('(hover: hover)').matches) {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('custom-cursor-dot');
    document.body.appendChild(cursor);
    document.body.appendChild(cursorDot);

    let cursorX = 0, cursorY = 0, dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    });

    function animateCursor() {
      dotX += (cursorX - dotX) * 0.15;
      dotY += (cursorY - dotY) * 0.15;
      cursor.style.left = dotX + 'px';
      cursor.style.top = dotY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, .btn, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
        cursorDot.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
        cursorDot.classList.remove('cursor-hover');
      });
    });
  }

  // --- Horizontal scroll indicator ---
  const scrollIndicator = document.createElement('div');
  scrollIndicator.classList.add('scroll-progress');
  document.body.prepend(scrollIndicator);
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollIndicator.style.width = (winScroll / height * 100) + '%';
  });

});
