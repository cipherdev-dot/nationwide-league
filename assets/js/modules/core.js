// Core module - handles common functionality across all pages
const Core = (() => {
  // Mobile menu functionality
  function initMobileMenu() {
    const burger = document.getElementById("burgerBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (!burger || !mobileNav) return;

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
          window.pageYOffset || document.documentElement.scrollTop,
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
      const lazyImages = document.querySelectorAll(
        "img[data-src], img[data-srcset]",
      );

      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) img.src = img.dataset.src;
              if (img.dataset.srcset) img.srcset = img.dataset.srcset;
              img.classList.add("lazy-loaded");
              imageObserver.unobserve(img);
            }
          });
        },
        { rootMargin: "50px 0px", threshold: 0.01 },
      );

      lazyImages.forEach((img) => imageObserver.observe(img));
    } else {
      const lazyImages = document.querySelectorAll(
        "img[data-src], img[data-srcset]",
      );
      lazyImages.forEach((img) => {
        if (img.dataset.src) img.src = img.dataset.src;
        if (img.dataset.srcset) img.srcset = img.dataset.srcset;
      });
    }
  }

  // Initialize video lazy loading
  function initVideoLazyLoading() {
    const lazyVideos = document.querySelectorAll("video[data-poster]");
    if ("IntersectionObserver" in window) {
      const videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const video = entry.target;
              if (video.dataset.poster) video.poster = video.dataset.poster;
              if (video.dataset.src && !video.querySelector("source")) {
                const source = document.createElement("source");
                source.src = video.dataset.src;
                source.type = video.dataset.type || "video/mp4";
                video.appendChild(source);
              }
              video.classList.add("lazy-loaded");
              videoObserver.unobserve(video);
            }
          });
        },
        { rootMargin: "100px 0px" },
      );
      lazyVideos.forEach((video) => videoObserver.observe(video));
    }
  }

  // ========== HERO VIDEO SWITCHING ==========
  function initHeroVideoSwitching() {
    const featureItems = document.querySelectorAll(".feature-item");
    const mainVideo = document.getElementById("mainVideo");
    const videoTitle = document.getElementById("video-title");
    const videoSubtitle = document.getElementById("video-subtitle");
    const videoBadge = document.getElementById("video-badge");

    console.log("Hero video switching init:", {
      hasFeatureItems: featureItems.length > 0,
      featureItemCount: featureItems.length,
      hasMainVideo: !!mainVideo,
      videoSrc: mainVideo ? mainVideo.src : null
    });

    if (!featureItems.length || !mainVideo) {
      console.warn("Hero video switching not initialised: missing elements");
      return;
    }

    // Ensure initial video plays
    if (mainVideo.readyState >= 3) {
      mainVideo.play().catch(e => console.log("Initial play attempt:", e.message));
    } else {
      mainVideo.addEventListener("canplay", () => {
        mainVideo.play().catch(e => console.log("Initial canplay:", e.message));
      }, { once: true });
    }

    // Helper to switch video
    function switchVideo(videoSrc, badge, title, subtitle, clickedItem) {
      if (!videoSrc) return;

      // Update overlay text
      if (videoTitle && title) videoTitle.textContent = title;
      if (videoSubtitle && subtitle) videoSubtitle.textContent = subtitle;
      if (videoBadge && badge) videoBadge.textContent = badge;

      // Pause current video first
      mainVideo.pause();

      // Remove all source children to ensure clean state
      const existingSources = mainVideo.querySelectorAll("source");
      existingSources.forEach(src => src.remove());

      // Create new source element
      const sourceEl = document.createElement("source");
      sourceEl.src = videoSrc;
      sourceEl.type = "video/mp4";
      mainVideo.appendChild(sourceEl);

      // Set video attributes for autoplay
      mainVideo.muted = true;
      mainVideo.autoplay = true;
      mainVideo.loop = true;
      mainVideo.playsInline = true;
      mainVideo.preload = "auto";

      // Force the video to reload with new source
      mainVideo.src = videoSrc;
      mainVideo.load();

      console.log("Switching video to:", videoSrc);

      // Handle video events for debugging
      const onCanPlay = async () => {
        console.log("Video canplay event fired, readyState:", mainVideo.readyState);
        try {
          await mainVideo.play();
          console.log("Video play() succeeded");
        } catch (err) {
          console.warn("Video play() failed:", err.name, err.message);
        }
        mainVideo.removeEventListener("canplay", onCanPlay);
        mainVideo.removeEventListener("error", onError);
      };

      const onError = (e) => {
        console.error("Video error:", e);
        console.error("Error code:", mainVideo.error);
        mainVideo.removeEventListener("error", onError);
        mainVideo.removeEventListener("canplay", onCanPlay);
      };

      mainVideo.addEventListener("canplay", onCanPlay);
      mainVideo.addEventListener("error", onError);

      // Update active class
      featureItems.forEach((f) => f.classList.remove("active"));
      if (clickedItem) clickedItem.classList.add("active");
    }

    // Attach click handlers
    featureItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const videoSrc = item.getAttribute("data-video-src");
        const badge = item.getAttribute("data-badge");
        const title = item.getAttribute("data-title");
        const subtitle = item.getAttribute("data-subtitle");
        switchVideo(videoSrc, badge, title, subtitle, item);
      });
    });

    // DO NOT call play() manually on page load – rely on HTML autoplay.
    // The video will start playing automatically because it has `autoplay muted`.
    // If it doesn't, the user can click the video controls.

    // Activate first feature item visually without reloading video
    if (
      featureItems.length > 0 &&
      !document.querySelector(".feature-item.active")
    ) {
      featureItems[0].classList.add("active");
    }
  }

  // Initialize smooth scroll behavior
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
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
    initHeroVideoSwitching();
    initSmoothScroll();
  }

  return { init };
})();

window.Core = Core;
