// Core module - handles common functionality across all pages
const Core = (() => {
  // Mobile menu functionality
  function initMobileMenu() {
    const burger = document.getElementById("burgerBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (!burger || !mobileNav) return;

    // Populate mobile menu from header links if empty
    const mobileLinksContainer = mobileNav.querySelector(".mobile-nav-links");
    if (mobileLinksContainer && mobileLinksContainer.children.length === 0) {
      populateMobileMenu(mobileLinksContainer);
    }

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      e.preventDefault();
      mobileNav.classList.toggle("open");
      burger.classList.toggle("active");
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) mobileNav.classList.remove("open");
    });

    document.addEventListener("click", (event) => {
      if (
        !burger.contains(event.target) &&
        !mobileNav.contains(event.target) &&
        mobileNav.classList.contains("open")
      ) {
        mobileNav.classList.remove("open");
      }
    });
  }

  function populateMobileMenu(container) {
    const topBarContent = document.querySelector(".top-bar-content");
    const navLinksWrapper = document.querySelector(".nav-links-wrapper");

    if (topBarContent) {
      const links = topBarContent.querySelectorAll("a");
      links.forEach((link) => {
        const clone = link.cloneNode(true);
        container.appendChild(clone);
      });
    }

    if (navLinksWrapper) {
      const links = navLinksWrapper.querySelectorAll("a");
      links.forEach((link) => {
        const clone = link.cloneNode(true);
        container.appendChild(clone);
      });
    }
  }

  // Scroll behavior for top bar
  function initScrollBehavior() {
    const topBar = document.querySelector(".top-bar");
    if (!topBar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener("scroll", () => {
      if (ticking) return;

      requestAnimationFrame(() => {
        const currentScroll = Math.max(
          0,
          window.pageYOffset || document.documentElement.scrollTop
        );

        if (currentScroll <= 5) {
          topBar.classList.remove("hide");
          document.body.classList.remove("top-bar-hidden");
        } else if (currentScroll > lastScroll + 10) {
          topBar.classList.add("hide");
          document.body.classList.add("top-bar-hidden");
        } else if (currentScroll < lastScroll - 10) {
          topBar.classList.remove("hide");
          document.body.classList.remove("top-bar-hidden");
        }

        lastScroll = currentScroll;
        ticking = false;
      });

      ticking = true;
    });
  }

  // Initialize lazy loading for images
  function initLazyLoading() {
    if ("IntersectionObserver" in window) {
      const lazyImages = document.querySelectorAll("img[data-src], img[data-srcset]");
      
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            
            if (img.dataset.src) {
              img.src = img.dataset.src;
            }
            if (img.dataset.srcset) {
              img.srcset = img.dataset.srcset;
            }
            
            img.classList.add("lazy-loaded");
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: "50px 0px",
        threshold: 0.01
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      const lazyImages = document.querySelectorAll("img[data-src], img[data-srcset]");
      lazyImages.forEach(img => {
        if (img.dataset.src) img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      });
    }
  }

  // Initialize video lazy loading
  function initVideoLazyLoading() {
    const lazyVideos = document.querySelectorAll("video[data-poster]");
    
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (video.dataset.poster) {
              video.poster = video.dataset.poster;
            }
            if (video.dataset.src && !video.querySelector("source")) {
              const source = document.createElement("source");
              source.src = video.dataset.src;
              source.type = video.dataset.type || "video/mp4";
              video.appendChild(source);
            }
            video.classList.add("lazy-loaded");
            observer.unobserve(video);
          }
        });
      }, { rootMargin: "100px 0px" });

      lazyVideos.forEach(video => videoObserver.observe(video));
    }
  }

  // Initialize smooth scroll behavior
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // Public initialization
  function init() {
    initMobileMenu();
    initScrollBehavior();
    initLazyLoading();
    initVideoLazyLoading();
    initSmoothScroll();
  }

  return { init };
})();

// Export for use in other modules
window.Core = Core;