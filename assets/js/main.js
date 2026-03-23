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

// ----- MATCH CENTRE TAB SWITCHING (enhanced) -----
const matchTabs = document.querySelectorAll(".matchcentre-tab");
const matchContainer = document.querySelector(".match-date-group");

// Store original fixtures HTML
const fixturesHtml = matchContainer.innerHTML;

// --- SAMPLE RESULTS DATA ---
const resultsData = [
  {
    group: "Group A",
    matches: [
      {
        home: "Shakhtar Donetsk",
        homeLogo: "https://picsum.photos/id/1/24/24",
        away: "Leverkusen",
        awayLogo: "https://picsum.photos/id/2/24/24",
        score: "0-0",
        referee: "William Collum (SCO)",
        stadium: "Donbass Arena, Donetsk (UKR)",
      },
      {
        home: "Real Sociedad",
        homeLogo: "https://picsum.photos/id/3/24/24",
        away: "Man. United",
        awayLogo: "https://picsum.photos/id/4/24/24",
        score: "0-0",
        referee: "Nicol Rizzoli (ITA)",
        stadium: "Anoeta, San Sebastian (ESP)",
      },
    ],
  },
  {
    group: "Group B",
    matches: [
      {
        home: "Juventus",
        homeLogo: "https://picsum.photos/id/5/24/24",
        away: "Real Madrid",
        awayLogo: "https://picsum.photos/id/6/24/24",
        score: "2-2",
        referee: "Howard Webb (ENG)",
        stadium: "Juventus Stadium, Turin (ITA)",
      },
      {
        home: "København",
        homeLogo: "https://picsum.photos/id/7/24/24",
        away: "Galatasaray",
        awayLogo: "https://picsum.photos/id/8/24/24",
        score: "1-0",
        referee: "Martin Atkinson (ENG)",
        stadium: "Parken, Copenhagen (DEN)",
      },
    ],
  },
  {
    group: "Group C",
    matches: [
      {
        home: "Paris",
        homeLogo: "https://picsum.photos/id/9/24/24",
        away: "Anderlecht",
        awayLogo: "https://picsum.photos/id/10/24/24",
        score: "1-1",
        referee: "Mario Strahonja (CRO)",
        stadium: "Parc des Princes, Paris (FRA)",
      },
      {
        home: "Olympiacos",
        homeLogo: "https://picsum.photos/id/11/24/24",
        away: "Benfica",
        awayLogo: "https://picsum.photos/id/12/24/24",
        score: "1-0",
        referee: "Damir Skomina (SVN)",
        stadium: "Stadio Georgios Karaiskakis, Piraeus (GRE)",
      },
    ],
  },
  {
    group: "Group D",
    matches: [
      {
        home: "Man. City",
        homeLogo: "https://picsum.photos/id/13/24/24",
        away: "CSKA Moskva",
        awayLogo: "https://picsum.photos/id/14/24/24",
        score: "5-2",
        referee: "Carlos Velasco Carballo (ESP)",
        stadium: "City of Manchester Stadium, Manchester (ENG)",
      },
      {
        home: "Plzeň",
        homeLogo: "https://picsum.photos/id/15/24/24",
        away: "Bayern",
        awayLogo: "https://picsum.photos/id/16/24/24",
        score: "0-1",
        referee: "Cüneyt Çakır (TUR)",
        stadium: "Doosan Arena, Plzeň (CZE)",
      },
    ],
  },
];

// --- SAMPLE LIVE DATA (with live badges and in-progress scores) ---
const liveData = [
  {
    group: "Premier League",
    matches: [
      {
        home: "Arsenal",
        homeLogo: "https://picsum.photos/id/1/24/24",
        away: "Chelsea",
        awayLogo: "https://picsum.photos/id/2/24/24",
        score: "2-1",
        minute: "72'",
        stadium: "Emirates Stadium",
      },
      {
        home: "Manchester City",
        homeLogo: "https://picsum.photos/id/3/24/24",
        away: "Liverpool",
        awayLogo: "https://picsum.photos/id/4/24/24",
        score: "0-0",
        minute: "55'",
        stadium: "Etihad Stadium",
      },
    ],
  },
];

// Helper: create a match item for results/live (grouped view)
function createGroupedMatch(match, isLive = false) {
  return `
    <div class="results-match">
      <div class="match-teams">
        <div class="team-block left">
          <span class="team-name">${match.home}</span>
          <span class="team-logo"><img src="${match.homeLogo}" alt="${match.home}"></span>
        </div>
        <span class="vs-badge">${match.score}</span>
        <div class="team-block right">
          <span class="team-logo"><img src="${match.awayLogo}" alt="${match.away}"></span>
          <span class="team-name">${match.away}</span>
        </div>
      </div>
      <div class="match-info">
        ${isLive ? `<span class="live-badge-sm">LIVE ${match.minute}</span>` : ""}
        ${isLive ? match.stadium : `${match.referee} – ${match.stadium}`}
      </div>
    </div>
  `;
}

// Render content based on tab type
function renderMatches(tabType) {
  let html = "";
  if (tabType === "fixtures") {
    html = fixturesHtml;
  } else if (tabType === "results") {
    resultsData.forEach((group) => {
      html += `<div class="results-group"><h6>${group.group}</h6>`;
      group.matches.forEach((match) => {
        html += createGroupedMatch(match, false);
      });
      html += `</div>`;
    });
  } else if (tabType === "live") {
    liveData.forEach((group) => {
      html += `<div class="results-group"><h6>${group.group}</h6>`;
      group.matches.forEach((match) => {
        html += createGroupedMatch(match, true);
      });
      html += `</div>`;
    });
  }
  matchContainer.innerHTML = html;
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
  document.querySelectorAll(".logs-tabs .tab-btn").forEach((b) => b.classList.remove("active"));
  document.querySelectorAll(".logs-panel .tab-content").forEach((c) => c.classList.remove("active"));
  btn.classList.add("active");
  document.getElementById(id).classList.add("active");
}

