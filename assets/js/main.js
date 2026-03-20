(function () {
  const mainVideo = document.getElementById("mainVideo");
  const featureItems = document.querySelectorAll(
    ".middle-features-card .feature-item",
  );
  const videoTitle = document.getElementById("video-title");
  const videoSubtitle = document.getElementById("video-subtitle");
  const videoBadge = document.getElementById("video-badge");
  function setVideoSourceAndText(src, title, subtitle, badge) {
    if (!mainVideo) return;
    mainVideo.classList.add("fade-out");
    setTimeout(() => {
      const source = mainVideo.querySelector("source");
      if (source) {
        source.src = src;
        mainVideo.load();
        mainVideo.play().catch((e) => console.log("autoplay blocked"));
      }
      mainVideo.classList.remove("fade-out");
    }, 150);
    if (videoTitle) videoTitle.textContent = title;
    if (videoSubtitle) videoSubtitle.textContent = subtitle;
    if (videoBadge) videoBadge.textContent = badge;
  }
  featureItems.forEach((item) => {
    item.addEventListener("click", function () {
      const videoSrc = this.dataset.videoSrc,
        title = this.dataset.title,
        subtitle = this.dataset.subtitle,
        badge = this.dataset.badge;
      if (videoSrc) setVideoSourceAndText(videoSrc, title, subtitle, badge);
    });
  });
  const burger = document.getElementById("burgerBtn"),
    mobileNav = document.getElementById("mobileNav");
  if (burger && mobileNav) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle("open");
    });
    mobileNav
      .querySelectorAll("a")
      .forEach((link) =>
        link.addEventListener("click", () =>
          mobileNav.classList.remove("open"),
        ),
      );
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 1024) mobileNav.classList.remove("open");
    });
    document.addEventListener("click", (event) => {
      if (
        !burger.contains(event.target) &&
        !mobileNav.contains(event.target) &&
        mobileNav.classList.contains("open")
      )
        mobileNav.classList.remove("open");
    });
  }
})();
function scrollCarousel(direction) {
  const container = document.getElementById("horizontalCarousel");
  if (container) container.scrollLeft += direction === "left" ? -300 : 300;
}
setTimeout(() => {
  const c = document.getElementById("horizontalCarousel");
  if (c) c.scrollLeft = 0;
}, 200);
