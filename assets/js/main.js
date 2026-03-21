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
        homeLogo:
          "/football-logos/australia_adelaide-united.football-logos.cc.svg",
        away: "Leverkusen",
        awayLogo: "/football-logos/austria_admira.football-logos.cc.svg",
        score: "0-0",
        referee: "William Collum (SCO)",
        stadium: "Donbass Arena, Donetsk (UKR)",
      },
      {
        home: "Real Sociedad",
        homeLogo: "/football-logos/cyprus_aek-larnaca.football-logos.cc.svg",
        away: "Man. United",
        awayLogo: "/football-logos/cyprus_aez.football-logos.cc.svg",
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
        homeLogo:
          "/football-logos/czech-republic_sparta-praha.football-logos.cc.svg",
        away: "Real Madrid",
        awayLogo: "/football-logos/england_afc-fylde.football-logos.cc.svg",
        score: "2-2",
        referee: "Howard Webb (ENG)",
        stadium: "Juventus Stadium, Turin (ITA)",
      },
      {
        home: "København",
        homeLogo: "/football-logos/england_afc-totton.football-logos.cc.svg",
        away: "Galatasaray",
        awayLogo: "/football-logos/france_ajaccio.football-logos.cc.svg",
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
        homeLogo:
          "/football-logos/germany_germany-national-team.football-logos.cc.svg",
        away: "Anderlecht",
        awayLogo: "/football-logos/iceland_afturelding.football-logos.cc.svg",
        score: "1-1",
        referee: "Mario Strahonja (CRO)",
        stadium: "Parc des Princes, Paris (FRA)",
      },
      {
        home: "Olympiacos",
        homeLogo: "/football-logos/scotland_aberdeen.football-logos.cc.svg",
        away: "Benfica",
        awayLogo: "/football-logos/france_ajaccio.football-logos.cc.svg",
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
        homeLogo: "/football-logos/italy_chievo.football-logos.cc.svg",
        away: "CSKA Moskva",
        awayLogo: "/football-logos/turkey_adanaspor.football-logos.cc.svg",
        score: "5-2",
        referee: "Carlos Velasco Carballo (ESP)",
        stadium: "City of Manchester Stadium, Manchester (ENG)",
      },
      {
        home: "Plzeň",
        homeLogo:
          "/football-logos/wales_aberystwyth-town.football-logos.cc.svg",
        away: "Bayern",
        awayLogo:
          "/football-logos/venezuela_academia-anzoategui.football-logos.cc.svg",
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
        homeLogo:
          "/football-logos/portugal_ac-marinhense.football-logos.cc.svg",
        away: "Chelsea",
        awayLogo: "/football-logos/iceland_afturelding.football-logos.cc.svg",
        score: "2-1",
        minute: "72'",
        stadium: "Emirates Stadium",
      },
      {
        home: "Manchester City",
        homeLogo: "/football-logos/greece_aek-athens.football-logos.cc.svg",
        away: "Liverpool",
        awayLogo: "/football-logos/finland_oulu.football-logos.cc.svg",
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
