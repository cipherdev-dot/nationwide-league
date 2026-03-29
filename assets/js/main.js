// smoother toggle behavior for the navbar and topbar
document.addEventListener("DOMContentLoaded", () => {
  let lastScroll = 0;
  let ticking = false;

  const topBar = document.querySelector(".top-bar");
  const body = document.body;

  window.addEventListener("scroll", () => {
    if (ticking) return;

    requestAnimationFrame(() => {
      const currentScroll = Math.max(
        0,
        window.pageYOffset || document.documentElement.scrollTop,
      );

      if (currentScroll <= 5) {
        topBar.classList.remove("hide");
        body.classList.remove("top-bar-hidden");
      } else if (currentScroll > lastScroll + 10) {
        // scrolling down
        topBar.classList.add("hide");
        body.classList.add("top-bar-hidden");
      } else if (currentScroll < lastScroll - 10) {
        // scrolling up
        topBar.classList.remove("hide");
        body.classList.remove("top-bar-hidden");
      }

      lastScroll = currentScroll;
      ticking = false;
    });

    ticking = true;
  });
});
// end of the js code for the navbar

// ===== DYNAMIC MOBILE MENU (FIXED) =====
document.addEventListener("DOMContentLoaded", function() {
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

  // === MOBILE MENU (FIX) ===
  const burger = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  function populateMobileMenu() {
    const mobileLinksContainer = mobileNav?.querySelector(".mobile-nav-links");
    if (!mobileLinksContainer) return;

    mobileLinksContainer.innerHTML = "";

    function addLinksFrom(container, parent) {
      if (!container) return;
      const links = container.querySelectorAll("a");
      links.forEach(link => {
        const clone = link.cloneNode(true);
        parent.appendChild(clone);
      });
    }

    addLinksFrom(document.querySelector(".top-bar-content"), mobileLinksContainer);
    addLinksFrom(document.querySelector(".nav-links-wrapper"), mobileLinksContainer);
  }

  if (burger && mobileNav) {
    populateMobileMenu();

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileNav.classList.toggle("open");
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
});

// Tab switching: transfer active class on click
const tabs = document.querySelectorAll(".matchcentre-tab");
tabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    tabs.forEach((t) => t.classList.remove("active"));
    // Add active class to the clicked tab
    this.classList.add("active");
  });
});

// ----- MATCH CENTRE TAB SWITCHING (FIXED: Results & Live with proper structure) -----
const matchTabs = document.querySelectorAll(".matchcentre-tab");
const matchContainer = document.querySelector(".match-date-group");

// Store original fixtures HTML (only if container exists)
const fixturesHtml = matchContainer ? matchContainer.innerHTML : "";

// ========== REALISTIC RESULTS DATA (using actual team names & logos) ==========
const resultsData = [
  {
    date: "29 Mar 2026",
    matches: [
      {
        home: "Arsenal",
        homeLogo: "./assets/logos/england_arsenal.football-logos.cc.svg",
        away: "Chelsea",
        awayLogo: "./assets/logos/england_chelsea.football-logos.cc.svg",
        score: "2 - 1",
        venue: "Emirates Stadium",
        status: "FT",
      },
      {
        home: "Manchester City",
        homeLogo: "./assets/logos/england_manchester-city.football-logos.cc.svg",
        away: "Liverpool",
        awayLogo: "./assets/logos/england_liverpool.football-logos.cc.svg",
        score: "3 - 2",
        venue: "Etihad Stadium",
        status: "FT",
      },
    ],
  },
  {
    date: "30 Mar 2026",
    matches: [
      {
        home: "Tottenham Hotspur",
        homeLogo: "./assets/logos/england_tottenham.football-logos.cc.svg",
        away: "Manchester United",
        awayLogo: "./assets/logos/england_manchester-united.football-logos.cc.svg",
        score: "1 - 1",
        venue: "Tottenham Hotspur Stadium",
        status: "FT",
      },
      {
        home: "Aston Villa",
        homeLogo: "./assets/logos/england_aston-villa.football-logos.cc.svg",
        away: "Newcastle United",
        awayLogo: "./assets/logos/england_newcastle-united.football-logos.cc.svg",
        score: "0 - 2",
        venue: "Villa Park",
        status: "FT",
      },
    ],
  },
];

// ========== REALISTIC LIVE DATA (in‑progress matches) ==========
const liveData = [
  {
    date: "Today",
    matches: [
      {
        home: "Arsenal",
        homeLogo: "./assets/logos/england_arsenal.football-logos.cc.svg",
        away: "Chelsea",
        awayLogo: "./assets/logos/england_chelsea.football-logos.cc.svg",
        score: "1 - 0",
        minute: "67'",
        venue: "Emirates Stadium",
      },
      {
        home: "Manchester City",
        homeLogo: "./assets/logos/england_manchester-city.football-logos.cc.svg",
        away: "Liverpool",
        awayLogo: "./assets/logos/england_liverpool.football-logos.cc.svg",
        score: "2 - 2",
        minute: "55'",
        venue: "Etihad Stadium",
      },
    ],
  },
  {
    date: "Later Today",
    matches: [
      {
        home: "Barcelona",
        homeLogo: "./assets/logos/spain_barcelona.football-logos.cc.svg",
        away: "Real Madrid",
        awayLogo: "./assets/logos/spain_real-madrid.football-logos.cc.svg",
        score: "0 - 0",
        minute: "20'",
        venue: "Camp Nou",
      },
    ],
  },
];

// Helper: create a match item (reuses the exact structure from fixtures)
function createMatchItem(match, isLive = false, dateGroup = "") {
  let leftTeamBlock = `
    <div class="team-block left">
      <span class="team-name">${match.home}</span>
      <span class="team-logo"><img src="${match.homeLogo}" alt="${match.home}" onerror="this.src='https://placehold.co/28x28/ccc/333?text=${match.home.substring(0,2).toUpperCase()}'"></span>
    </div>
  `;
  let rightTeamBlock = `
    <div class="team-block right">
      <span class="team-logo"><img src="${match.awayLogo}" alt="${match.away}" onerror="this.src='https://placehold.co/28x28/ccc/333?text=${match.away.substring(0,2).toUpperCase()}'"></span>
      <span class="team-name">${match.away}</span>
    </div>
  `;

  let centerBadge = isLive
    ? `<span class="score-badge" style="background:#c8102e; color:white;">${match.score}</span>`
    : `<span class="score-badge">${match.score}</span>`;

  let matchInfo = isLive
    ? `<div class="match-info"><span class="live-badge" style="background:#c8102e; color:white;">LIVE ${match.minute}</span> ${match.venue}</div>`
    : `<div class="match-info"><span class="result-label">${match.status || "FT"}</span> ${match.venue}</div>`;

  let dateHeader = dateGroup ? `<div class="match-date-header">${dateGroup}</div>` : "";

  return `
    ${dateHeader}
    <div class="match-item ${isLive ? "live" : "completed"}">
      <div class="match-teams">
        ${leftTeamBlock}
        ${centerBadge}
        ${rightTeamBlock}
      </div>
      ${matchInfo}
    </div>
  `;
}

// Render content based on tab type
function renderMatches(tabType) {
  if (!matchContainer) return;

  let html = "";
  if (tabType === "fixtures") {
    html = fixturesHtml;
  } else if (tabType === "results") {
    resultsData.forEach((group) => {
      group.matches.forEach((match) => {
        html += createMatchItem(match, false, group.date);
      });
    });
  } else if (tabType === "live") {
    liveData.forEach((group) => {
      group.matches.forEach((match) => {
        html += createMatchItem(match, true, group.date);
      });
    });
  }
  matchContainer.innerHTML = html;

  // Re-initialize match navigation after content is rendered
  initMatchNavigation();
}

// Add click handlers to tabs
matchTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    matchTabs.forEach((t) => t.classList.remove("active"));
    this.classList.add("active");
    const tabType = this.getAttribute("data-tab");
    renderMatches(tabType);
  });
});

function scrollCarousel(direction) {
  const container = document.getElementById("horizontalCarousel");
  if (container) container.scrollLeft += direction === "left" ? -300 : 300;
}
setTimeout(() => {
  const c = document.getElementById("horizontalCarousel");
  if (c) c.scrollLeft = 0;
}, 200);

// ----- LOGS TAB SWITCHING -----
function switchTab(btn, id) {
  document
    .querySelectorAll(".logs-tabs .tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".logs-panel .tab-content")
    .forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(id).classList.add("active");
}

// ----- VIDEO CARD PLAY FUNCTIONALITY -----
document.addEventListener("DOMContentLoaded", function () {
  const videoCards = document.querySelectorAll(".video-card-new");

  videoCards.forEach((card) => {
    card.addEventListener("click", function () {
      const videoSrc = this.dataset.video;
      if (videoSrc) {
        openVideoModal(videoSrc);
      }
    });
  });

  function openVideoModal(src) {
    // Remove existing modal if any
    const existingModal = document.getElementById("videoModal");
    if (existingModal) existingModal.remove();

    // Create modal
    const modal = document.createElement("div");
    modal.id = "videoModal";
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 9999;
      cursor: pointer;
    `;

    modal.innerHTML = `
      <div style="position: relative; width: 90%; max-width: 900px;" onclick="event.stopPropagation()">
        <button onclick="closeVideoModal()" style="
          position: absolute;
          top: -40px;
          right: 0;
          background: none;
          border: none;
          color: #fff;
          font-size: 2rem;
          cursor: pointer;
          z-index: 10;
        ">&times;</button>
        <video controls autoplay style="width: 100%; border-radius: 8px;">
          <source src="${src}" type="video/mp4">
        </video>
      </div>
    `;

    modal.addEventListener("click", closeVideoModal);
    document.body.appendChild(modal);
    document.body.style.overflow = "hidden";
  }

  window.closeVideoModal = function () {
    const modal = document.getElementById("videoModal");
    if (modal) {
      modal.remove();
      document.body.style.overflow = "";
    }
  };

  // Close on Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeVideoModal();
  });
});

// ----- POLL SELECTION FUNCTION -----
function selectPoll(btn) {
  const card = btn.closest(".poll-card");
  card
    .querySelectorAll(".poll-btn")
    .forEach((b) => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// ----- MATCH CLICK NAVIGATION -----
// Make match items clickable and navigate to match recap page
function initMatchNavigation() {
  // Find all match items (in match-teams containers) that haven't been initialized
  const matchTeams = document.querySelectorAll(
    ".match-teams:not(.match-nav-initialized)",
  );

  matchTeams.forEach((match) => {
    // Mark as initialized to prevent duplicate listeners
    match.classList.add("match-nav-initialized", "match-item-clickable");

    match.addEventListener("click", function (e) {
      e.preventDefault();

      // Get team data
      const homeBlock = this.querySelector(".team-block.left");
      const awayBlock = this.querySelector(".team-block.right");
      const vsBadge = this.querySelector(".vs-badge");
      const scoreBadge = this.querySelector(".score-badge");

      let homeName = "",
        awayName = "",
        homeLogo = "",
        awayLogo = "",
        score = "";

      if (homeBlock) {
        const nameEl = homeBlock.querySelector(".team-name");
        const logoEl = homeBlock.querySelector(".team-logo img");
        homeName = nameEl ? nameEl.textContent.trim() : "Home Team";
        homeLogo = logoEl ? logoEl.src : "";
      }

      if (awayBlock) {
        const nameEl = awayBlock.querySelector(".team-name");
        const logoEl = awayBlock.querySelector(".team-logo img");
        awayName = nameEl ? nameEl.textContent.trim() : "Away Team";
        awayLogo = logoEl ? logoEl.src : "";
      }

      // Get score from score-badge (completed matches) or vs-badge (upcoming fixtures)
      if (scoreBadge) {
        score = scoreBadge.textContent.trim();
      } else if (vsBadge) {
        score = vsBadge.textContent.trim();
      }

      // Get match info if available
      const matchInfo = this.nextElementSibling;
      let date = "",
        venue = "";
      if (matchInfo && matchInfo.classList.contains("match-info")) {
        const infoText = matchInfo.textContent;
        venue = infoText;
      }

      // Build URL with parameters
      const params = new URLSearchParams();
      params.set("home", homeName);
      params.set("away", awayName);
      if (homeLogo) params.set("homeLogo", homeLogo);
      if (awayLogo) params.set("awayLogo", awayLogo);
      if (venue) params.set("venue", venue);
      if (score) params.set("score", score);

      // Navigate to match recap page
      window.location.href = "./pages/match-recap.html?" + params.toString();
    });
  });

  // Also handle match-item class elements that haven't been initialized
  const matchItems = document.querySelectorAll(
    ".match-item:not(.match-nav-initialized)",
  );
  matchItems.forEach((item) => {
    item.classList.add("match-nav-initialized", "match-item-clickable");

    item.addEventListener("click", function (e) {
      e.preventDefault();

      const matchTeams = this.querySelector(".match-teams");
      if (!matchTeams) return;

      const homeBlock = matchTeams.querySelector(".team-block.left");
      const awayBlock = matchTeams.querySelector(".team-block.right");
      const vsBadge = matchTeams.querySelector(".vs-badge");
      const scoreBadge = matchTeams.querySelector(".score-badge");

      let homeName = "",
        awayName = "",
        homeLogo = "",
        awayLogo = "",
        score = "";

      if (homeBlock) {
        const nameEl = homeBlock.querySelector(".team-name");
        const logoEl = homeBlock.querySelector(".team-logo img");
        homeName = nameEl ? nameEl.textContent.trim() : "Home Team";
        homeLogo = logoEl ? logoEl.src : "";
      }

      if (awayBlock) {
        const nameEl = awayBlock.querySelector(".team-name");
        const logoEl = awayBlock.querySelector(".team-logo img");
        awayName = nameEl ? nameEl.textContent.trim() : "Away Team";
        awayLogo = logoEl ? logoEl.src : "";
      }

      // Get score from score-badge (completed matches) or vs-badge (upcoming fixtures)
      if (scoreBadge) {
        score = scoreBadge.textContent.trim();
      } else if (vsBadge) {
        score = vsBadge.textContent.trim();
      }

      const params = new URLSearchParams();
      params.set("home", homeName);
      params.set("away", awayName);
      if (homeLogo) params.set("homeLogo", homeLogo);
      if (awayLogo) params.set("awayLogo", awayLogo);
      if (score) params.set("score", score);

      window.location.href = "./pages/match-recap.html?" + params.toString();
    });
  });
}

// Initialize match navigation when DOM is ready
document.addEventListener("DOMContentLoaded", initMatchNavigation);

// Table functionality
document.addEventListener("DOMContentLoaded", function () {
  const teams = [
    {
      pos: 1,
      indicator: "blue",
      name: "Arsenal",
      pl: 31,
      w: 21,
      d: 7,
      l: 3,
      gf: 61,
      ga: 22,
      gd: 39,
      pts: 70,
      form: ["D", "W", "W", "W", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t91.svg",
    },
    {
      pos: 2,
      indicator: "blue",
      name: "Manchester City",
      pl: 30,
      w: 18,
      d: 7,
      l: 5,
      gf: 60,
      ga: 28,
      gd: 32,
      pts: 61,
      form: ["W", "W", "W", "D", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t8.svg",
    },
    {
      pos: 3,
      indicator: "blue",
      name: "Manchester United",
      pl: 31,
      w: 15,
      d: 10,
      l: 6,
      gf: 56,
      ga: 43,
      gd: 13,
      pts: 55,
      form: ["W", "W", "L", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t1.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t2.svg",
    },
    {
      pos: 4,
      indicator: "blue",
      name: "Aston Villa",
      pl: 31,
      w: 16,
      d: 6,
      l: 9,
      gf: 42,
      ga: 37,
      gd: 5,
      pts: 54,
      form: ["D", "L", "L", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t17.svg",
    },
    {
      pos: 5,
      indicator: "orange",
      name: "Liverpool",
      pl: 31,
      w: 14,
      d: 7,
      l: 10,
      gf: 50,
      ga: 42,
      gd: 8,
      pts: 49,
      form: ["W", "W", "L", "D", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t54.svg",
    },
    {
      pos: 6,
      indicator: "none",
      name: "Chelsea",
      pl: 31,
      w: 13,
      d: 9,
      l: 9,
      gf: 53,
      ga: 38,
      gd: 15,
      pts: 48,
      form: ["D", "L", "W", "L", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t43.svg",
    },
    {
      pos: 7,
      indicator: "none",
      name: "Brentford",
      pl: 31,
      w: 13,
      d: 7,
      l: 11,
      gf: 46,
      ga: 42,
      gd: 4,
      pts: 46,
      form: ["L", "W", "D", "D", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t94.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t11.svg",
    },
    {
      pos: 8,
      indicator: "none",
      name: "Everton",
      pl: 31,
      w: 13,
      d: 7,
      l: 11,
      gf: 37,
      ga: 35,
      gd: 2,
      pts: 46,
      form: ["L", "W", "W", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t94.svg",
    },
    {
      pos: 9,
      indicator: "none",
      name: "Fulham",
      pl: 31,
      w: 13,
      d: 5,
      l: 13,
      gf: 43,
      ga: 44,
      gd: -1,
      pts: 44,
      form: ["W", "W", "L", "D", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t54.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t14.svg",
    },
    {
      pos: 10,
      indicator: "none",
      name: "Tottenham",
      pl: 31,
      w: 12,
      d: 6,
      l: 13,
      gf: 48,
      ga: 51,
      gd: -3,
      pts: 42,
      form: ["L", "D", "W", "W", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t6.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t36.svg",
    },
    {
      pos: 11,
      indicator: "none",
      name: "Newcastle",
      pl: 31,
      w: 11,
      d: 8,
      l: 12,
      gf: 45,
      ga: 47,
      gd: -2,
      pts: 41,
      form: ["D", "W", "D", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t4.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t7.svg",
    },
    {
      pos: 12,
      indicator: "none",
      name: "Brighton",
      pl: 31,
      w: 11,
      d: 7,
      l: 13,
      gf: 50,
      ga: 53,
      gd: -3,
      pts: 40,
      form: ["W", "L", "W", "D", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t6.svg",
    },
    {
      pos: 13,
      indicator: "none",
      name: "West Ham",
      pl: 31,
      w: 10,
      d: 8,
      l: 13,
      gf: 38,
      ga: 48,
      gd: -10,
      pts: 38,
      form: ["L", "L", "D", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t21.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t4.svg",
    },
    {
      pos: 14,
      indicator: "none",
      name: "Wolverhampton",
      pl: 31,
      w: 9,
      d: 8,
      l: 14,
      gf: 36,
      ga: 52,
      gd: -16,
      pts: 35,
      form: ["D", "L", "W", "L", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t39.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t21.svg",
    },
    {
      pos: 15,
      indicator: "none",
      name: "Crystal Palace",
      pl: 31,
      w: 8,
      d: 9,
      l: 14,
      gf: 33,
      ga: 49,
      gd: -16,
      pts: 33,
      form: ["L", "D", "L", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t31.svg",
      nextLogo:
        "https://resources.premierleague.com/premierleague/badges/t39.svg",
    },
  ];

  function buildRow(t) {
    const gd = t.gd > 0 ? "+" + t.gd : t.gd;
    const formBubbles = t.form
      .map((f) => `<span class="form-bubble ${f}">${f}</span>`)
      .join("");

    return `
       <tr>
        <td class="col-pos">
          <div class="pos-cell">
            <div class="pos-indicator ${t.indicator}"></div>
            <span class="pos-num">${t.pos}</span>
            <span class="pos-change">—</span>
          </div>
         </td>
        <td class="col-team">
          <div class="team-cell">
            <img class="team-logo" src="${t.logo}" alt="${t.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
            <div class="team-logo-placeholder" style="display:none">${t.name.substring(0, 2).toUpperCase()}</div>
            <span class="team-name">${t.name}</span>
          </div>
         </td>
        <td class="stat-muted col-pl">${t.pl}</td>
        <td class="col-w">${t.w}</td>
        <td class="col-d stat-muted">${t.d}</td>
        <td class="col-l">${t.l}</td>
        <td class="col-gf stat-muted">${t.gf}</td>
        <td class="col-ga stat-muted">${t.ga}</td>
        <td class="col-gd stat-muted">${gd}</td>
        <td class="col-pts">${t.pts}</td>
        <td class="col-form">
          <div class="form-cell">${formBubbles}</div>
         </td>
        <td class="col-next">
          <img class="next-logo" src="${t.nextLogo}" alt="Next" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
          <div class="next-logo-placeholder" style="display:none">?</div>
         </td>
       </tr>`;
  }

  const tableBody = document.getElementById("table-body");
  if (tableBody) {
    tableBody.innerHTML = teams.map(buildRow).join("");
  }

  // First Team / U21 / U18 tabs
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  // Mobile Short / Full / Form column tabs
  const views = ["short", "full", "form"];
  function setView(view) {
    views.forEach((v) => document.body.classList.remove("view-" + v));
    document.body.classList.add("view-" + view);
  }

  // default view
  setView("short");

  document.querySelectorAll(".mobile-col-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".mobile-col-tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      setView(tab.dataset.view);
    });
  });
});

// Fixtures dynamic page
// ----------------------------------------------
//  HELPER: generate SVG logo (object-fit: contain ensures no distortion)
//  creates a unique circular emblem per club
// ----------------------------------------------
function generateClubLogo(teamName) {
  let initials = teamName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  if (initials.length < 2)
    initials = (teamName.slice(0, 2) + "FC").toUpperCase().slice(0, 2);
  const hue = (teamName.length * 31) % 360;
  const bgColor = `hsl(${hue}, 68%, 86%)`;
  const textColor = `hsl(${hue}, 70%, 28%)`;
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="48" fill="${bgColor}" stroke="#e2e8f0" stroke-width="1"/>
      <text x="50" y="68" font-size="44" font-weight="bold" font-family="Arial, sans-serif" text-anchor="middle" fill="${textColor}">${initials}</text>
    </svg>`;
  return "data:image/svg+xml," + encodeURIComponent(svgString);
}

// ----------------------------------------------
//  LOGO MAPPING for actual logo files
// ----------------------------------------------
const logoMap = {
  Arsenal: "../assets/logos/england_arsenal.football-logos.cc.svg",
  Chelsea: "../assets/logos/england_chelsea.football-logos.cc.svg",
  Liverpool: "../assets/logos/england_liverpool.football-logos.cc.svg",
  "Manchester City":
    "../assets/logos/england_manchester-city.football-logos.cc.svg",
  "Manchester United":
    "../assets/logos/england_manchester-united.football-logos.cc.svg",
  "Man. United":
    "../assets/logos/england_manchester-united.football-logos.cc.svg",
  "Manchester Utd":
    "../assets/logos/england_manchester-united.football-logos.cc.svg",
  "Bayern Munich":
    "../assets/logos/germany_bayern-munchen.football-logos.cc.svg",
  "Borussia Dortmund":
    "../assets/logos/germany_borussia-dortmund.football-logos.cc.svg",
  Juventus: "../assets/logos/italy_juventus.football-logos.cc.svg",
  Barcelona: "../assets/logos/spain_barcelona.football-logos.cc.svg",
  "Real Madrid": "../assets/logos/spain_real-madrid.football-logos.cc.svg",
  Flamengo: "../assets/logos/brazil_flamengo.football-logos.cc.svg",
  "Adelaide United":
    "../assets/logos/australia_adelaide-united.football-logos.cc.svg",
  Accrington: "../assets/logos/england_accrington.football-logos.cc.svg",
};

// Function to get logo path, fallback to random logo
function getLogoPath(teamName) {
  if (logoMap[teamName]) {
    return logoMap[teamName];
  }
  // Return random logo from available ones
  const logoKeys = Object.keys(logoMap);
  const randomKey = logoKeys[Math.floor(Math.random() * logoKeys.length)];
  return logoMap[randomKey];
}

// ----------------------------------------------
//  MOCK FIXTURE DATA for three matchweeks
//  each includes home/away, kickoff, competition
// ----------------------------------------------
const fixturesDB = {
  36: {
    date: "Sun 17 May",
    matches: [
      {
        id: 1,
        homeTeam: "Arsenal",
        awayTeam: "Chelsea",
        kickoff: "15:00",
        competition: "Premier League",
      },
      {
        id: 2,
        homeTeam: "Real Madrid",
        awayTeam: "Atletico Madrid",
        kickoff: "20:00",
        competition: "La Liga",
      },
      {
        id: 3,
        homeTeam: "AC Milan",
        awayTeam: "Juventus",
        kickoff: "19:45",
        competition: "Serie A",
      },
      {
        id: 4,
        homeTeam: "Bayern Munich",
        awayTeam: "Borussia Dortmund",
        kickoff: "18:30",
        competition: "Bundesliga",
      },
      {
        id: 5,
        homeTeam: "Liverpool",
        awayTeam: "Manchester City",
        kickoff: "17:30",
        competition: "Premier League",
      },
    ],
  },
  37: {
    date: "Sun 23 May",
    matches: [
      {
        id: 6,
        homeTeam: "Manchester Utd",
        awayTeam: "Newcastle",
        kickoff: "14:00",
        competition: "Premier League",
      },
      {
        id: 7,
        homeTeam: "Barcelona",
        awayTeam: "Real Betis",
        kickoff: "21:00",
        competition: "La Liga",
      },
      {
        id: 8,
        homeTeam: "Inter Milan",
        awayTeam: "Roma",
        kickoff: "20:45",
        competition: "Serie A",
      },
      {
        id: 9,
        homeTeam: "Bayer Leverkusen",
        awayTeam: "RB Leipzig",
        kickoff: "15:30",
        competition: "Bundesliga",
      },
      {
        id: 10,
        homeTeam: "Tottenham",
        awayTeam: "Aston Villa",
        kickoff: "16:00",
        competition: "Premier League",
      },
    ],
  },
  38: {
    date: "Sun 24 May",
    matches: [
      {
        id: 11,
        homeTeam: "Brighton and Hove Albion",
        awayTeam: "Manchester United",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 12,
        homeTeam: "Burnley",
        awayTeam: "Wolverhampton Wanderers",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 13,
        homeTeam: "Crystal Palace",
        awayTeam: "Arsenal",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 14,
        homeTeam: "Fulham",
        awayTeam: "Newcastle United",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 15,
        homeTeam: "Liverpool",
        awayTeam: "Brentford",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 16,
        homeTeam: "Manchester City",
        awayTeam: "Aston Villa",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 17,
        homeTeam: "Nottingham Forest",
        awayTeam: "Bournemouth",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 18,
        homeTeam: "Sunderland",
        awayTeam: "Chelsea",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 19,
        homeTeam: "Tottenham Hotspur",
        awayTeam: "Everton",
        kickoff: "16:00",
        competition: "Premier League",
      },
      {
        id: 20,
        homeTeam: "West Ham United",
        awayTeam: "Leeds United",
        kickoff: "16:00",
        competition: "Premier League",
      },
    ],
  },
};

// Attach logos to each fixture
for (let mw in fixturesDB) {
  fixturesDB[mw].matches = fixturesDB[mw].matches.map((m) => ({
    ...m,
    homeLogo: getLogoPath(m.homeTeam),
    awayLogo: getLogoPath(m.awayTeam),
  }));
}

// ----- GLOBAL STATE -----
let currentWeek = 38; // 36, 37, 38
let currentComp = "all";
let currentClub = "all";

// ----- DOM ELEMENTS -----
const fixturesContainer = document.getElementById("fixturesListContainer");
const matchweekTitle = document.getElementById("matchweekTitle");
const matchDateText = document.getElementById("matchDateText");
const cardDateLabel = document.getElementById("cardDateLabel");
const prevArrow = document.getElementById("prevWeekArrow");
const nextArrow = document.getElementById("nextWeekArrow");
const compFilter = document.getElementById("compFilter");
const clubFilter = document.getElementById("clubFilter");
const mwDropdown = document.getElementById("mwDropdown");
const resetBtn = document.getElementById("resetBtn");
const prevMatchdayBtn = document.getElementById("prevMatchdayBtn");

// Helper: escape HTML
function escapeHtml(str) {
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

// Populate clubs dropdown based on current week's fixtures
function updateClubDropdown() {
  let weekData = fixturesDB[currentWeek]?.matches || [];
  let clubsSet = new Set();
  weekData.forEach((m) => {
    clubsSet.add(m.homeTeam);
    clubsSet.add(m.awayTeam);
  });
  let sortedClubs = Array.from(clubsSet).sort();
  let currentVal = clubFilter.value;
  clubFilter.innerHTML = '<option value="all">All Clubs </option>';
  sortedClubs.forEach((club) => {
    clubFilter.innerHTML += `<option value="${escapeHtml(club)}">${escapeHtml(club)}</option>`;
  });
  // restore previous selection if still valid
  if (sortedClubs.includes(currentVal) && currentVal !== "all") {
    clubFilter.value = currentVal;
    currentClub = currentVal;
  } else {
    clubFilter.value = "all";
    currentClub = "all";
  }
}

// Main render function: filters and builds fixture rows
function renderFixtures() {
  let weekData = fixturesDB[currentWeek];
  if (!weekData) {
    fixturesContainer.innerHTML =
      '<div class="empty-fixtures">No fixtures available</div>';
    return;
  }
  let matches = [...weekData.matches];

  // apply competition filter
  if (currentComp !== "all") {
    matches = matches.filter((m) => m.competition === currentComp);
  }
  // apply club filter
  if (currentClub !== "all") {
    matches = matches.filter(
      (m) => m.homeTeam === currentClub || m.awayTeam === currentClub,
    );
  }

  // update header info
  matchweekTitle.innerText = `Matchweek ${currentWeek}`;
  matchDateText.innerText = weekData.date;
  cardDateLabel.innerHTML =
    weekData.date === "Sun 17 May" ||
    weekData.date === "Sun 23 May" ||
    weekData.date === "Sun 24 May"
      ? `<span style="color: black;">${weekData.date}</span>`
      : weekData.date;

  // sync matchweek dropdown
  mwDropdown.value = currentWeek.toString();

  // enable/disable arrows
  prevArrow.disabled = currentWeek === 36;
  nextArrow.disabled = currentWeek === 38;
  // update matchday button text
  prevMatchdayBtn.innerText = `← MATCHDAY ${currentWeek - 1}`;
  prevMatchdayBtn.style.opacity = currentWeek === 36 ? "0.5" : "1";

  if (matches.length === 0) {
    fixturesContainer.innerHTML =
      '<div class="empty-fixtures">✨ No matches match your filters. Try resetting ✨</div>';
    return;
  }

  // build rows using the exact HTML structure required by CSS
  let rowsHtml = "";
  for (let m of matches) {
    rowsHtml += `
        <div class="match-row">
          <div class="team left">
            <span>${escapeHtml(m.homeTeam)}</span>
            <img src="${m.homeLogo}" alt="${escapeHtml(m.homeTeam)} logo" loading="lazy">
          </div>
          <div class="time">${m.kickoff}</div>
          <div class="team right">
            <img src="${m.awayLogo}" alt="${escapeHtml(m.awayTeam)} logo" loading="lazy">
            <span>${escapeHtml(m.awayTeam)}</span>
          </div>
        </div>
      `;
  }
  fixturesContainer.innerHTML = rowsHtml;
}

// Change week and reset club filter (to avoid stale club options)
function setWeek(week) {
  if (week < 36 || week > 38) return;
  currentWeek = week;
  // reset club filter to "all" when changing week (clean UX)
  currentClub = "all";
  updateClubDropdown(); // rebuild club list for new week
  renderFixtures();
}

// Filter change handlers
function onCompChange() {
  currentComp = compFilter.value;
  renderFixtures();
}
function onClubChange() {
  currentClub = clubFilter.value;
  renderFixtures();
}
function onMWDropdownChange() {
  let newWeek = parseInt(mwDropdown.value, 10);
  if (!isNaN(newWeek) && newWeek !== currentWeek) {
    setWeek(newWeek);
  }
}
function resetFilters() {
  compFilter.value = "all";
  clubFilter.value = "all";
  currentComp = "all";
  currentClub = "all";
  renderFixtures();
}
function goPrevMatchday() {
  if (currentWeek > 36) setWeek(currentWeek - 1);
}

// ----- INITIALIZATION -----
function init() {
  if (!fixturesContainer) return; // not on fixtures page

  updateClubDropdown(); // populate club list for week 38
  renderFixtures();

  // attach event listeners
  if (prevArrow)
    prevArrow.addEventListener("click", () => setWeek(currentWeek - 1));
  if (nextArrow)
    nextArrow.addEventListener("click", () => setWeek(currentWeek + 1));
  if (compFilter) compFilter.addEventListener("change", onCompChange);
  if (clubFilter) clubFilter.addEventListener("change", onClubChange);
  if (mwDropdown) mwDropdown.addEventListener("change", onMWDropdownChange);
  if (resetBtn) resetBtn.addEventListener("click", resetFilters);
  if (prevMatchdayBtn)
    prevMatchdayBtn.addEventListener("click", goPrevMatchday);
}
init();
// End of Fixtures page

// start of players page
document.querySelectorAll(".follow-btn").forEach((btn) => {
  btn.onclick = () => {
    btn.textContent = "✓ Following";
    setTimeout(() => (btn.textContent = "Follow"), 1000);
  };
});
// end of players page