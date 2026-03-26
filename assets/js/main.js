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

// Store original fixtures HTML (only if container exists)
const fixturesHtml = matchContainer ? matchContainer.innerHTML : '';

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
  if (!matchContainer) return;
  
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
  
  // Re-initialize match navigation after content is rendered
  initMatchNavigation();
}

// Add click handlers to tabs (only if they exist)
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

// ----- VIDEO CARD PLAY FUNCTIONALITY -----
document.addEventListener('DOMContentLoaded', function() {
  const videoCards = document.querySelectorAll('.video-card-new');
  
  videoCards.forEach(card => {
    card.addEventListener('click', function() {
      const videoSrc = this.dataset.video;
      if (videoSrc) {
        openVideoModal(videoSrc);
      }
    });
  });
  
  function openVideoModal(src) {
    // Remove existing modal if any
    const existingModal = document.getElementById('videoModal');
    if (existingModal) existingModal.remove();
    
    // Create modal
    const modal = document.createElement('div');
    modal.id = 'videoModal';
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
    
    modal.addEventListener('click', closeVideoModal);
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
  }
  
  window.closeVideoModal = function() {
    const modal = document.getElementById('videoModal');
    if (modal) {
      modal.remove();
      document.body.style.overflow = '';
    }
  };
  
  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeVideoModal();
  });
});

// ----- POLL SELECTION FUNCTION -----
function selectPoll(btn) {
  const card = btn.closest('.poll-card');
  card.querySelectorAll('.poll-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}

// ----- MATCH CLICK NAVIGATION -----
// Make match items clickable and navigate to match recap page
function initMatchNavigation() {
  // Find all match items (in match-teams containers) that haven't been initialized
  const matchTeams = document.querySelectorAll('.match-teams:not(.match-nav-initialized)');
  
  matchTeams.forEach(match => {
    // Mark as initialized to prevent duplicate listeners
    match.classList.add('match-nav-initialized', 'match-item-clickable');
    
    match.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get team data
      const homeBlock = this.querySelector('.team-block.left');
      const awayBlock = this.querySelector('.team-block.right');
      const vsBadge = this.querySelector('.vs-badge');
      const scoreBadge = this.querySelector('.score-badge');
      
      let homeName = '', awayName = '', homeLogo = '', awayLogo = '', score = '';
      
      if (homeBlock) {
        const nameEl = homeBlock.querySelector('.team-name');
        const logoEl = homeBlock.querySelector('.team-logo img');
        homeName = nameEl ? nameEl.textContent.trim() : 'Home Team';
        homeLogo = logoEl ? logoEl.src : '';
      }
      
      if (awayBlock) {
        const nameEl = awayBlock.querySelector('.team-name');
        const logoEl = awayBlock.querySelector('.team-logo img');
        awayName = nameEl ? nameEl.textContent.trim() : 'Away Team';
        awayLogo = logoEl ? logoEl.src : '';
      }
      
      // Get score from score-badge (completed matches) or vs-badge (upcoming fixtures)
      if (scoreBadge) {
        score = scoreBadge.textContent.trim();
      } else if (vsBadge) {
        score = vsBadge.textContent.trim();
      }
      
      // Get match info if available
      const matchInfo = this.nextElementSibling;
      let date = '', venue = '';
      if (matchInfo && matchInfo.classList.contains('match-info')) {
        const infoText = matchInfo.textContent;
        venue = infoText;
      }
      
      // Build URL with parameters
      const params = new URLSearchParams();
      params.set('home', homeName);
      params.set('away', awayName);
      if (homeLogo) params.set('homeLogo', homeLogo);
      if (awayLogo) params.set('awayLogo', awayLogo);
      if (venue) params.set('venue', venue);
      if (score) params.set('score', score);
      
      // Navigate to match recap page
      window.location.href = './pages/match-recap.html?' + params.toString();
    });
  });
  
  // Also handle match-item class elements that haven't been initialized
  const matchItems = document.querySelectorAll('.match-item:not(.match-nav-initialized)');
  matchItems.forEach(item => {
    item.classList.add('match-nav-initialized', 'match-item-clickable');
    
    item.addEventListener('click', function(e) {
      e.preventDefault();
      
      const matchTeams = this.querySelector('.match-teams');
      if (!matchTeams) return;
      
      const homeBlock = matchTeams.querySelector('.team-block.left');
      const awayBlock = matchTeams.querySelector('.team-block.right');
      const vsBadge = matchTeams.querySelector('.vs-badge');
      const scoreBadge = matchTeams.querySelector('.score-badge');
      
      let homeName = '', awayName = '', homeLogo = '', awayLogo = '', score = '';
      
      if (homeBlock) {
        const nameEl = homeBlock.querySelector('.team-name');
        const logoEl = homeBlock.querySelector('.team-logo img');
        homeName = nameEl ? nameEl.textContent.trim() : 'Home Team';
        homeLogo = logoEl ? logoEl.src : '';
      }
      
      if (awayBlock) {
        const nameEl = awayBlock.querySelector('.team-name');
        const logoEl = awayBlock.querySelector('.team-logo img');
        awayName = nameEl ? nameEl.textContent.trim() : 'Away Team';
        awayLogo = logoEl ? logoEl.src : '';
      }
      
      // Get score from score-badge (completed matches) or vs-badge (upcoming fixtures)
      if (scoreBadge) {
        score = scoreBadge.textContent.trim();
      } else if (vsBadge) {
        score = vsBadge.textContent.trim();
      }
      
      const params = new URLSearchParams();
      params.set('home', homeName);
      params.set('away', awayName);
      if (homeLogo) params.set('homeLogo', homeLogo);
      if (awayLogo) params.set('awayLogo', awayLogo);
      if (score) params.set('score', score);
      
      window.location.href = './pages/match-recap.html?' + params.toString();
    });
  });
}

// Initialize match navigation when DOM is ready
document.addEventListener('DOMContentLoaded', initMatchNavigation);

// Table functionality
document.addEventListener('DOMContentLoaded', function() {
  const teams = [
    {
      pos: 1, indicator: 'blue', name: 'Arsenal', pl: 31, w: 21, d: 7, l: 3, gf: 61, ga: 22, gd: 39, pts: 70,
      form: ['D','W','W','W','W'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t3.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t91.svg'
    },
    {
      pos: 2, indicator: 'blue', name: 'Manchester City', pl: 30, w: 18, d: 7, l: 5, gf: 60, ga: 28, gd: 32, pts: 61,
      form: ['W','W','W','D','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t43.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t8.svg'
    },
    {
      pos: 3, indicator: 'blue', name: 'Manchester United', pl: 31, w: 15, d: 10, l: 6, gf: 56, ga: 43, gd: 13, pts: 55,
      form: ['W','W','L','W','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t1.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t2.svg'
    },
    {
      pos: 4, indicator: 'blue', name: 'Aston Villa', pl: 31, w: 16, d: 6, l: 9, gf: 42, ga: 37, gd: 5, pts: 54,
      form: ['D','L','L','L','W'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t7.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t17.svg'
    },
    {
      pos: 5, indicator: 'orange', name: 'Liverpool', pl: 31, w: 14, d: 7, l: 10, gf: 50, ga: 42, gd: 8, pts: 49,
      form: ['W','W','L','D','L'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t14.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t54.svg'
    },
    {
      pos: 6, indicator: 'none', name: 'Chelsea', pl: 31, w: 13, d: 9, l: 9, gf: 53, ga: 38, gd: 15, pts: 48,
      form: ['D','L','W','L','L'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t8.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t43.svg'
    },
    {
      pos: 7, indicator: 'none', name: 'Brentford', pl: 31, w: 13, d: 7, l: 11, gf: 46, ga: 42, gd: 4, pts: 46,
      form: ['L','W','D','D','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t94.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t11.svg'
    },
    {
      pos: 8, indicator: 'none', name: 'Everton', pl: 31, w: 13, d: 7, l: 11, gf: 37, ga: 35, gd: 2, pts: 46,
      form: ['L','W','W','L','W'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t11.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t94.svg'
    },
    {
      pos: 9, indicator: 'none', name: 'Fulham', pl: 31, w: 13, d: 5, l: 13, gf: 43, ga: 44, gd: -1, pts: 44,
      form: ['W','W','L','D','W'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t54.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t14.svg'
    },
    {
      pos: 10, indicator: 'none', name: 'Tottenham', pl: 31, w: 12, d: 6, l: 13, gf: 48, ga: 51, gd: -3, pts: 42,
      form: ['L','D','W','W','L'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t6.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t36.svg'
    },
    {
      pos: 11, indicator: 'none', name: 'Newcastle', pl: 31, w: 11, d: 8, l: 12, gf: 45, ga: 47, gd: -2, pts: 41,
      form: ['D','W','D','L','W'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t4.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t7.svg'
    },
    {
      pos: 12, indicator: 'none', name: 'Brighton', pl: 31, w: 11, d: 7, l: 13, gf: 50, ga: 53, gd: -3, pts: 40,
      form: ['W','L','W','D','L'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t36.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t6.svg'
    },
    {
      pos: 13, indicator: 'none', name: 'West Ham', pl: 31, w: 10, d: 8, l: 13, gf: 38, ga: 48, gd: -10, pts: 38,
      form: ['L','L','D','W','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t21.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t4.svg'
    },
    {
      pos: 14, indicator: 'none', name: 'Wolverhampton', pl: 31, w: 9, d: 8, l: 14, gf: 36, ga: 52, gd: -16, pts: 35,
      form: ['D','L','W','L','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t39.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t21.svg'
    },
    {
      pos: 15, indicator: 'none', name: 'Crystal Palace', pl: 31, w: 8, d: 9, l: 14, gf: 33, ga: 49, gd: -16, pts: 33,
      form: ['L','D','L','W','D'],
      logo: 'https://resources.premierleague.com/premierleague/badges/t31.svg',
      nextLogo: 'https://resources.premierleague.com/premierleague/badges/t39.svg'
    },
  ];

  function buildRow(t) {
    const gd = t.gd > 0 ? '+' + t.gd : t.gd;
    const formBubbles = t.form.map(f => `<span class="form-bubble ${f}">${f}</span>`).join('');

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
          <div class="team-logo-placeholder" style="display:none">${t.name.substring(0,2).toUpperCase()}</div>
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

  const tableBody = document.getElementById('table-body');
  if (tableBody) {
    tableBody.innerHTML = teams.map(buildRow).join('');
  }

  // First Team / U21 / U18 tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    });
  });

  // Mobile Short / Full / Form column tabs
  const views = ['short', 'full', 'form'];
  function setView(view) {
    views.forEach(v => document.body.classList.remove('view-' + v));
    document.body.classList.add('view-' + view);
  }

  // default view
  setView('short');

  document.querySelectorAll('.mobile-col-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.mobile-col-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      setView(tab.dataset.view);
    });
  });
});

