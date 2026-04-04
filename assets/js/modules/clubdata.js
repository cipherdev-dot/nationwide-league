// Club Data Module - Handles club-specific data and operations
// Extracted from inline scripts for better performance

const ClubData = (() => {
  // Club data mapping - maps club names to their logo paths and details
  const clubDataMap = {
    "Arsenal": {
      logo: "../assets/logos/england_arsenal.football-logos.cc.svg",
      stadium: "Emirates Stadium",
      est: "Est. 1886"
    },
    "Aston Villa": {
      logo: "../assets/logos/cyprus_aez.football-logos.cc.svg",
      stadium: "Villa Park",
      est: "Est. 1874"
    },
    "Barnsley": {
      logo: "../assets/logos/england_accrington.football-logos.cc.svg",
      stadium: "Oakwell",
      est: "Est. 1887"
    },
    "Birmingham City": {
      logo: "../assets/logos/cyprus_aez.football-logos.cc.svg",
      stadium: "St Andrew's",
      est: "Est. 1875"
    },
    "Blackburn Rovers": {
      logo: "../assets/logos/england_chelsea.football-logos.cc.svg",
      stadium: "Ewood Park",
      est: "Est. 1875"
    },
    "Blackpool": {
      logo: "../assets/logos/england_manchester-city.football-logos.cc.svg",
      stadium: "Bloomfield Road",
      est: "Est. 1887"
    },
    "Bolton Wanderers": {
      logo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
      stadium: "University of Bolton Stadium",
      est: "Est. 1874"
    },
    "Bournemouth": {
      logo: "../assets/logos/germany_bayern-munchen.football-logos.cc.svg",
      stadium: "Vitality Stadium",
      est: "Est. 1899"
    },
    "Bradford City": {
      logo: "../assets/logos/germany_borussia-dortmund.football-logos.cc.svg",
      stadium: "Valley Parade",
      est: "Est. 1903"
    },
    "Brentford": {
      logo: "../assets/logos/italy_juventus.football-logos.cc.svg",
      stadium: "Gtech Community Stadium",
      est: "Est. 1889"
    },
    "Brighton & Hove Albion": {
      logo: "../assets/logos/saudi-arabia_al-nassr.football-logos.cc.svg",
      stadium: "Amex Stadium",
      est: "Est. 1901"
    },
    "Burnley": {
      logo: "../assets/logos/portugal_benfica.football-logos.cc.svg",
      stadium: "Turf Moor",
      est: "Est. 1882"
    },
    "Chelsea": {
      logo: "../assets/logos/england_chelsea.football-logos.cc.svg",
      stadium: "Stamford Bridge",
      est: "Est. 1905"
    },
    "Crystal Palace": {
      logo: "../assets/logos/spain_real-madrid.football-logos.cc.svg",
      stadium: "Selhurst Park",
      est: "Est. 1905"
    },
    "Everton": {
      logo: "../assets/logos/scotland_aberdeen.football-logos.cc.svg",
      stadium: "Goodison Park",
      est: "Est. 1878"
    },
    "Fulham": {
      logo: "../assets/logos/australia_adelaide-united.football-logos.cc.svg",
      stadium: "Craven Cottage",
      est: "Est. 1879"
    },
    "Leeds United": {
      logo: "../assets/logos/england_arsenal.football-logos.cc.svg",
      stadium: "Elland Road",
      est: "Est. 1919"
    },
    "Leicester City": {
      logo: "../assets/logos/scotland_aberdeen.football-logos.cc.svg",
      stadium: "King Power Stadium",
      est: "Est. 1884"
    },
    "Liverpool": {
      logo: "../assets/logos/england_liverpool.football-logos.cc.svg",
      stadium: "Anfield",
      est: "Est. 1892"
    },
    "Manchester City": {
      logo: "../assets/logos/england_manchester-city.football-logos.cc.svg",
      stadium: "Etihad Stadium",
      est: "Est. 1880"
    },
    "Manchester United": {
      logo: "../assets/logos/england_manchester-united.football-logos.cc.svg",
      stadium: "Old Trafford",
      est: "Est. 1878"
    },
    "Wolverhampton Wanderers": {
      logo: "../assets/logos/brazil_flamengo.football-logos.cc.svg",
      stadium: "Molineux Stadium",
      est: "Est. 1877"
    },
    "Tottenham Hotspur": {
      logo: "../assets/logos/spain_real-madrid.football-logos.cc.svg",
      stadium: "Tottenham Hotspur Stadium",
      est: "Est. 1882"
    },
    "Nottingham Forest": {
      logo: "../assets/logos/cyprus_aez.football-logos.cc.svg",
      stadium: "City Ground",
      est: "Est. 1865"
    },
    "Sunderland": {
      logo: "../assets/logos/england_accrington.football-logos.cc.svg",
      stadium: "Stadium of Light",
      est: "Est. 1879"
    },
    "West Ham United": {
      logo: "../assets/logos/spain_barcelona.football-logos.cc.svg",
      stadium: "London Stadium",
      est: "Est. 1895"
    },
    "Newcastle United": {
      logo: "../assets/logos/england_arsenal.football-logos.cc.svg",
      stadium: "St James' Park",
      est: "Est. 1892"
    },
    "Sheffield United": {
      logo: "../assets/logos/england_manchester-united.football-logos.cc.svg",
      stadium: "Bramall Lane",
      est: "Est. 1889"
    },
    "Middlesbrough": {
      logo: "../assets/logos/england_chelsea.football-logos.cc.svg",
      stadium: "Riverside Stadium",
      est: "Est. 1876"
    },
    "Watford": {
      logo: "../assets/logos/england_accrington.football-logos.cc.svg",
      stadium: "Vicarage Road",
      est: "Est. 1881"
    },
    "Wolves": {
      logo: "../assets/logos/brazil_flamengo.football-logos.cc.svg",
      stadium: "Molineux Stadium",
      est: "Est. 1877"
    }
  };

  // Club form data (same as match data but with club-specific container IDs)
  const formData = {
    previous: [
      {
        matchday: "MW 27",
        opponentLogo: "../assets/logos/brazil_flamengo.football-logos.cc.svg",
        opponent: "Aston Villa",
        context: "AVL (H)",
        result: "1 - 1",
        outcome: "draw",
      },
      {
        matchday: "MW 26",
        opponentLogo: "../assets/logos/australia_adelaide-united.football-logos.cc.svg",
        opponent: "Manchester City",
        context: "MCI (A)",
        result: "2 - 1",
        outcome: "win",
      },
      {
        matchday: "MW 25",
        opponentLogo: "../assets/logos/usa_inter-miami-cf.football-logos.cc.svg",
        opponent: "Liverpool",
        context: "LIV (A)",
        result: "0 - 1",
        outcome: "loss",
      },
      {
        matchday: "MW 24",
        opponentLogo: "../assets/logos/italy_juventus.football-logos.cc.svg",
        opponent: "Chelsea",
        context: "CHE (H)",
        result: "1 - 1",
        outcome: "draw",
      },
      {
        matchday: "MW 23",
        opponentLogo: "../assets/logos/england_manchester-city.football-logos.cc.svg",
        opponent: "Tottenham",
        context: "TOT (H)",
        result: "3 - 1",
        outcome: "win",
      },
    ],
    upcoming: [
      {
        matchday: "MW 31",
        opponentLogo: "../assets/logos/germany_borussia-dortmund.football-logos.cc.svg",
        opponent: "Brentford",
        context: "BRE (A)",
        result: "20 Apr",
        outcome: "upcoming",
      },
      {
        matchday: "MW 32",
        opponentLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        opponent: "Chelsea",
        context: "CHE (H)",
        result: "27 Apr",
        outcome: "upcoming",
      },
      {
        matchday: "MW 33",
        opponentLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
        opponent: "Arsenal",
        context: "ARS (A)",
        result: "04 May",
        outcome: "upcoming",
      },
      {
        matchday: "MW 34",
        opponentLogo: "../assets/logos/italy_juventus.football-logos.cc.svg",
        opponent: "Man City",
        context: "MCI (H)",
        result: "11 May",
        outcome: "upcoming",
      },
      {
        matchday: "MW 35",
        opponentLogo: "../assets/logos/scotland_aberdeen.football-logos.cc.svg",
        opponent: "Liverpool",
        context: "LIV (H)",
        result: "18 May",
        outcome: "upcoming",
      },
    ],
  };

  // Match results data
  const matchResultsData = {
    "March": [
      { date: "Tue 3 Mar", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Sunderland", awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg", homeScore: 0, awayScore: 1, status: "FT", indicator: "loss" },
      { date: "Sun 8 Mar", homeTeam: "Newcastle", homeLogo: "../assets/logos/england_arsenal.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 2, awayScore: 1, status: "FT", indicator: "loss" },
      { date: "Sun 15 Mar", homeTeam: "Crystal Palace", homeLogo: "../assets/logos/england_chelsea.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 0, awayScore: 0, status: "FT", indicator: "draw" },
      { date: "Sat 21 Mar", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Brentford", awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg", homeScore: 2, awayScore: 1, status: "FT", indicator: "win" },
      { date: "Wed 25 Mar", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Sheffield United", awayLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg", homeScore: 3, awayScore: 0, status: "FT", indicator: "win" },
      { date: "Sun 29 Mar", homeTeam: "Burnley", homeLogo: "../assets/logos/england_liverpool.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 1, awayScore: 1, status: "FT", indicator: "draw" },
      { date: "Tue 31 Mar", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Middlesbrough", awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg", homeScore: 2, awayScore: 0, status: "FT", indicator: "win" }
    ],
    "February": [
      { date: "Sat 7 Feb", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Wolves", awayLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg", homeScore: 2, awayScore: 1, status: "FT", indicator: "win" },
      { date: "Sat 14 Feb", homeTeam: "Everton", homeLogo: "../assets/logos/england_arsenal.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 1, awayScore: 1, status: "FT", indicator: "draw" },
      { date: "Sat 21 Feb", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Watford", awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg", homeScore: 1, awayScore: 0, status: "FT", indicator: "win" },
      { date: "Sat 28 Feb", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Fulham", awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg", homeScore: 3, awayScore: 0, status: "FT", indicator: "win" },
      { date: "Wed 25 Feb", homeTeam: "Cardiff", homeLogo: "../assets/logos/england_manchester-city.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 0, awayScore: 2, status: "FT", indicator: "win" }
    ],
    "January": [
      { date: "Sat 4 Jan", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Aston Villa", awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg", homeScore: 1, awayScore: 2, status: "FT", indicator: "loss" },
      { date: "Sat 11 Jan", homeTeam: "Manchester City", homeLogo: "../assets/logos/england_manchester-city.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 3, awayScore: 1, status: "FT", indicator: "loss" },
      { date: "Sat 18 Jan", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Liverpool", awayLogo: "../assets/logos/england_liverpool.football-logos.cc.svg", homeScore: 0, awayScore: 0, status: "FT", indicator: "draw" }
    ],
    "April": [
      { date: "Sat 4 Apr", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Tottenham", awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg", homeScore: 2, awayScore: 1, status: "FT", indicator: "win" },
      { date: "Sat 11 Apr", homeTeam: "West Ham", homeLogo: "../assets/logos/england_accrington.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 1, awayScore: 3, status: "FT", indicator: "win" },
      { date: "Sat 18 Apr", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Chelsea", awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg", homeScore: 1, awayScore: 1, status: "FT", indicator: "draw" }
    ],
    "May": [
      { date: "Sat 2 May", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Arsenal", awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg", homeScore: 0, awayScore: 2, status: "FT", indicator: "loss" },
      { date: "Sat 9 May", homeTeam: "Manchester United", homeLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg", awayTeam: "Leeds United", awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", homeScore: 2, awayScore: 2, status: "FT", indicator: "draw" },
      { date: "Sun 17 May", homeTeam: "Leeds United", homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg", awayTeam: "Newcastle", awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg", homeScore: 3, awayScore: 1, status: "FT", indicator: "win" }
    ]
  };

  // Month navigation
  let currentMonthIndex = 2; // March
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  // Load club data from URL parameter
  function loadClubData() {
    const urlParams = new URLSearchParams(window.location.search);
    const clubName = urlParams.get('club');

    if (!clubName) return; // No club specified, use default

    const clubData = clubDataMap[clubName];
    if (!clubData) return; // Club not found in map

    // Update page title
    document.title = clubName + " | National League";

    // Update hero section
    const heroLogo = document.getElementById('clubHeroLogo');
    const heroName = document.getElementById('clubHeroName');
    const estYear = document.getElementById('clubEstYear');
    const stadium = document.getElementById('clubStadium');

    if (heroLogo) { heroLogo.src = clubData.logo; heroLogo.alt = clubName; }
    if (heroName) heroName.textContent = clubName;
    if (estYear) estYear.textContent = clubData.est;
    if (stadium) stadium.textContent = clubData.stadium;

    // Update team form section
    const teamFormLogo = document.getElementById('clubTeamFormLogo');
    const teamFormName = document.getElementById('clubTeamFormName');
    if (teamFormLogo) { teamFormLogo.src = clubData.logo; teamFormLogo.alt = clubName; }
    if (teamFormName) teamFormName.textContent = clubName;

    // Update next match away team
    const nextAwayTeam = document.getElementById('clubNextAwayTeam');
    const nextAwayLogo = document.getElementById('clubNextAwayLogo');
    if (nextAwayTeam) nextAwayTeam.textContent = clubName;
    if (nextAwayLogo) nextAwayLogo.alt = clubName;

    // Update links section headers
    const linksHeader = document.querySelector('.club-links-header');
    const ticketsHeader = document.querySelector('.club-tickets-header');
    if (linksHeader) linksHeader.textContent = 'Visit ' + clubName + ' Website';
    if (ticketsHeader) ticketsHeader.textContent = 'Buy ' + clubName + ' Tickets';

    // Update directory page title
    const directoryTitle = document.querySelector('.directory-page-title');
    const directoryClubName = document.querySelector('.directory-club-name');
    if (directoryTitle) directoryTitle.textContent = clubName + ' Club Directory';
    if (directoryClubName) directoryClubName.textContent = clubName + ' Football Club Limited';

    // Update stadium article title
    const stadiumTitle = document.querySelector('.stadium-title');
    if (stadiumTitle) {
      stadiumTitle.textContent = 'Arriving at ' + clubData.stadium + ' by Public Transport';
    }

    // Update tickets article
    const ticketsPageTitle = document.querySelector('.tickets-page-title');
    const ticketsMainHeading = document.querySelector('.tickets-main-heading');
    if (ticketsPageTitle) {
      ticketsPageTitle.textContent = 'Guide to buying ' + clubName + ' tickets at ' + clubData.stadium;
    }
    if (ticketsMainHeading) {
      ticketsMainHeading.textContent = clubName + ' Ticket Information';
    }

    // Update tickets logo
    const ticketsLogo = document.querySelector('.tickets-logo');
    if (ticketsLogo) {
      ticketsLogo.src = clubData.logo;
      ticketsLogo.alt = clubName;
    }

    // Update highlighted team in table
    const highlightedTeam = document.querySelector('.club-match-list-item.highlighted .club-team-info span');
    if (highlightedTeam) {
      highlightedTeam.textContent = clubName;
    }
    const highlightedLogo = document.querySelector('.club-match-list-item.highlighted .club-team-mini-logo');
    if (highlightedLogo) {
      highlightedLogo.src = clubData.logo;
      highlightedLogo.alt = clubName;
    }

    // Update last starting 11 team name and logo
    const lastMatchTeamNames = document.querySelectorAll('.club-match-teams .club-team-name');
    const lastMatchTeamLogos = document.querySelectorAll('.club-match-teams .club-team-logo img');
    if (lastMatchTeamNames.length > 0) {
      lastMatchTeamNames[0].textContent = clubName;
    }
    if (lastMatchTeamLogos.length > 0) {
      lastMatchTeamLogos[0].src = clubData.logo;
      lastMatchTeamLogos[0].alt = clubName;
    }
  }

  // Create match timeline item for club page
  function createClubTimelineItem(match) {
    const item = document.createElement("div");
    item.className = "club-match-item";
    item.innerHTML = `
      <div class="club-match-day">${match.matchday}</div>
      <div class="club-opponent-crest"><img src="${match.opponentLogo}" alt="${match.opponent}" loading="lazy"></div>
      <div class="club-match-context">${match.context}</div>
      <div class="club-result-bar ${match.outcome === 'upcoming' ? '' : match.outcome}">${match.result}</div>
    `;
    return item;
  }

  // Render club match timeline
  function renderClubTimeline(type, containerId = "clubMatchTimeline") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const matches = formData[type];
    if (!matches) return;

    // Clear container
    container.innerHTML = "";

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    matches.forEach(match => {
      fragment.appendChild(createClubTimelineItem(match));
    });
    container.appendChild(fragment);
  }

  // Initialize club team form toggle
  function initClubTeamFormToggle(toggleSelector = ".club-toggle-btn", timelineContainerId = "clubMatchTimeline") {
    const toggleBtns = document.querySelectorAll(toggleSelector);
    if (toggleBtns.length === 0) return;

    toggleBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-form-type");
        if (!type) return;

        // Update active state
        toggleBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Render timeline
        renderClubTimeline(type, timelineContainerId);
      });
    });
  }

  // Initialize club tab switching
  function initClubTabs() {
    const clubTabs = document.querySelectorAll(".club-tab");
    const clubTabContents = document.querySelectorAll(".club-tab-content");

    if (clubTabs.length === 0 || clubTabContents.length === 0) return;

    clubTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        clubTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabType = tab.getAttribute("data-tab");
        clubTabContents.forEach(content => {
          content.classList.remove("active");
          content.classList.add("hidden");
          if (content.id === tabType + "-content") {
            content.classList.add("active");
            content.classList.remove("hidden");
          }
        });
      });
    });
  }

  // Render match results for club page
  function renderMatchResults(monthName, containerId = "matchResultsContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;
    const matches = matchResultsData[monthName];
    if (!matches) return;

    container.innerHTML = matches.map(match => `
      <div class="match-result-row">
        <div class="match-result-grid">
          <div class="match-date-cell">
            <span class="match-day">${match.date.split(' ')[1]}</span>
            <span class="match-month">${match.date.split(' ')[2]}</span>
          </div>
          <div class="match-team-cell home-team-cell">
            <span class="match-team-name">${match.homeTeam}</span>
          </div>
          <div class="match-logo-cell home-logo-cell">
            <img src="${match.homeLogo}" alt="${match.homeTeam}" class="match-team-logo">
          </div>
          <div class="match-score-cell">
            <span class="match-score">${match.homeScore} - ${match.awayScore}</span>
            <span class="match-status">${match.status}</span>
          </div>
          <div class="match-logo-cell away-logo-cell">
            <img src="${match.awayLogo}" alt="${match.awayTeam}" class="match-team-logo">
          </div>
          <div class="match-team-cell away-team-cell">
            <span class="match-team-name">${match.awayTeam}</span>
          </div>
          <div class="match-venue-cell">Elland Road</div>
        </div>
      </div>
    `).join('');
  }

  // Initialize month carousel
  function initMonthCarousel() {
    const prevBtn = document.getElementById("prevMonthBtn");
    const nextBtn = document.getElementById("nextMonthBtn");
    const monthTitle = document.getElementById("monthTitle");
    if (!prevBtn || !nextBtn || !monthTitle) return;
    prevBtn.addEventListener("click", () => {
      currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
      monthTitle.textContent = months[currentMonthIndex];
      renderMatchResults(months[currentMonthIndex]);
    });
    nextBtn.addEventListener("click", () => {
      currentMonthIndex = (currentMonthIndex + 1) % months.length;
      monthTitle.textContent = months[currentMonthIndex];
      renderMatchResults(months[currentMonthIndex]);
    });
  }

  // Initialize season dropdown
  function initSeasonDropdown() {
    const seasonBtn = document.getElementById("seasonBtn");
    const seasonDropdown = seasonBtn?.closest(".season-dropdown");
    if (!seasonBtn || !seasonDropdown) return;
    seasonBtn.addEventListener("click", (e) => { e.stopPropagation(); seasonDropdown.classList.toggle("open"); });
    document.addEventListener("click", () => { seasonDropdown.classList.remove("open"); });
    const seasonItems = document.querySelectorAll(".season-dropdown-item");
    seasonItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        seasonItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        seasonDropdown.classList.remove("open");
      });
    });
  }

  // Initialize
  function init() {
    // Render initial timeline
    renderClubTimeline("previous");
    
    // Initialize tab switching
    initClubTabs();

    // Initialize team form toggle (Previous/Upcoming)
    initClubTeamFormToggle();

    // Initialize month carousel and match results
    initMonthCarousel();
    initSeasonDropdown();
    renderMatchResults("March");

    // Load club data from URL
    loadClubData();
  }

  return { init };
})();

// Export for use in other modules
window.ClubData = ClubData;