/**
* Template Name: Arsha
* Template URL: https://bootstrapmade.com/arsha-free-bootstrap-html-template-corporate/
* Updated: Feb 22 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

/**
 * Hero typed line: cycles through the algorithm names
 */
(function () {
  const typed = document.getElementById('typed');
  if (!typed) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const words = ['Rational Closure', 'Lexicographic Closure', 'Relevant Closure', 'the drowning problem'];
  let wordIndex = 0;
  let charIndex = words[0].length;
  let deleting = true;

  function tick() {
    const word = words[wordIndex];

    if (deleting) {
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    } else {
      charIndex++;
      if (charIndex === word.length) deleting = true;
    }

    typed.textContent = word.slice(0, charIndex);

    const delay = (deleting && charIndex === word.length) ? 2200 : (deleting ? 40 : 70);
    setTimeout(tick, delay);
  }

  setTimeout(tick, 2500);
})();

/**
 * Overview: animated algorithm trace
 */
(function () {
  const trace = document.getElementById('trace');
  if (!trace) return;

  const lines = trace.querySelectorAll('.ln');
  const cursor = trace.querySelector('.trace-cursor');
  const stepEl = document.getElementById('traceStep');
  const ranksEl = document.getElementById('traceRanks');
  const noteEl = document.getElementById('traceNote');
  const statusEl = document.getElementById('traceStatus');
  const statusText = statusEl.querySelector('em');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current = 0;
  let timer = null;

  function flash(el) {
    el.classList.remove('flash');
    void el.offsetWidth;
    el.classList.add('flash');
  }

  function show(k) {
    const line = lines[k];
    const last = k === lines.length - 1;
    const bp = line.classList.contains('bp');

    lines.forEach(function (el, j) {
      el.classList.toggle('done', j < k);
      el.classList.toggle('cur', j === k);
    });

    cursor.style.transform = 'translateY(' + (k * line.offsetHeight) + 'px)';
    cursor.classList.toggle('hit', bp);

    stepEl.textContent = (k + 1) + ' / ' + lines.length;
    flash(stepEl);
    if (ranksEl.textContent !== line.dataset.ranks) {
      ranksEl.textContent = line.dataset.ranks;
      flash(ranksEl);
    }

    const span = document.createElement('span');
    span.textContent = line.dataset.note;
    noteEl.replaceChildren(span);

    statusEl.className = 'trace-status' + (last ? ' done' : bp ? ' bp' : '');
    statusText.textContent = last ? 'finished' : bp ? 'breakpoint' : 'running';
  }

  function tick() {
    show(current);
    const bp = lines[current].classList.contains('bp');
    const delay = current === lines.length - 1 ? 3600 : bp ? 2600 : 1600;
    timer = setTimeout(function () {
      current = (current + 1) % lines.length;
      tick();
    }, delay);
  }

  trace.classList.add('is-live');

  if (reduce) {
    show(lines.length - 1);
    return;
  }

  show(0);

  // only animate while it's on screen
  new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting && !timer) {
      tick();
    } else if (!entries[0].isIntersecting) {
      clearTimeout(timer);
      timer = null;
    }
  }, { threshold: 0.3 }).observe(trace);

  // gentle tilt on hover (mouse only)
  if (window.matchMedia('(hover: hover)').matches) {
    trace.addEventListener('mousemove', function (e) {
      const r = trace.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      trace.style.transform = 'perspective(1100px) rotateY(' + ((px - 0.5) * 7) + 'deg) rotateX(' + ((0.5 - py) * 6) + 'deg)';
    });
    trace.addEventListener('mouseleave', function () {
      trace.style.transform = '';
    });
  }
})();