// Match Data Module - Handles team form, match results, and timeline rendering
// Extracted from inline scripts for better performance and maintainability

const MatchData = (() => {
  // Team form data (previous and upcoming matches)
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

  // Match results by month
  const matchResults = {
    March: [
      {
        date: "Tue 3 Mar",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Sunderland",
        awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
        homeScore: 0,
        awayScore: 1,
        status: "FT",
        indicator: "loss",
      },
      {
        date: "Sun 8 Mar",
        homeTeam: "Newcastle",
        homeLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 1,
        status: "FT",
        indicator: "loss",
      },
      {
        date: "Sun 15 Mar",
        homeTeam: "Crystal Palace",
        homeLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 0,
        awayScore: 0,
        status: "FT",
        indicator: "draw",
      },
      {
        date: "Sat 21 Mar",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Brentford",
        awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 1,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Wed 25 Mar",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Sheffield United",
        awayLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg",
        homeScore: 3,
        awayScore: 0,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Sun 29 Mar",
        homeTeam: "Burnley",
        homeLogo: "../assets/logos/england_liverpool.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 1,
        status: "FT",
        indicator: "draw",
      },
      {
        date: "Tue 31 Mar",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Middlesbrough",
        awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 0,
        status: "FT",
        indicator: "win",
      },
    ],
    February: [
      {
        date: "Sat 7 Feb",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Wolves",
        awayLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 1,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Sat 14 Feb",
        homeTeam: "Everton",
        homeLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 1,
        status: "FT",
        indicator: "draw",
      },
      {
        date: "Sat 21 Feb",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Watford",
        awayLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 0,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Sat 28 Feb",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Fulham",
        awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
        homeScore: 3,
        awayScore: 0,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Wed 25 Feb",
        homeTeam: "Cardiff",
        homeLogo: "../assets/logos/england_manchester-city.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 0,
        awayScore: 2,
        status: "FT",
        indicator: "win",
      },
    ],
    January: [
      {
        date: "Sat 4 Jan",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Aston Villa",
        awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 2,
        status: "FT",
        indicator: "loss",
      },
      {
        date: "Sat 11 Jan",
        homeTeam: "Manchester City",
        homeLogo: "../assets/logos/england_manchester-city.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 3,
        awayScore: 1,
        status: "FT",
        indicator: "loss",
      },
      {
        date: "Sat 18 Jan",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Liverpool",
        awayLogo: "../assets/logos/england_liverpool.football-logos.cc.svg",
        homeScore: 0,
        awayScore: 0,
        status: "FT",
        indicator: "draw",
      },
    ],
    April: [
      {
        date: "Sat 4 Apr",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Tottenham",
        awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 1,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Sat 11 Apr",
        homeTeam: "West Ham",
        homeLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 3,
        status: "FT",
        indicator: "win",
      },
      {
        date: "Sat 18 Apr",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Chelsea",
        awayLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
        homeScore: 1,
        awayScore: 1,
        status: "FT",
        indicator: "draw",
      },
    ],
    May: [
      {
        date: "Sat 2 May",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Arsenal",
        awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
        homeScore: 0,
        awayScore: 2,
        status: "FT",
        indicator: "loss",
      },
      {
        date: "Sat 9 May",
        homeTeam: "Manchester United",
        homeLogo: "../assets/logos/england_manchester-united.football-logos.cc.svg",
        awayTeam: "Leeds United",
        awayLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        homeScore: 2,
        awayScore: 2,
        status: "FT",
        indicator: "draw",
      },
      {
        date: "Sun 17 May",
        homeTeam: "Leeds United",
        homeLogo: "../assets/logos/france_ajaccio.football-logos.cc.svg",
        awayTeam: "Newcastle",
        awayLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
        homeScore: 3,
        awayScore: 1,
        status: "FT",
        indicator: "win",
      },
    ],
  };

  // Month names for navigation
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Current month index
  let currentMonthIndex = months.indexOf("March");

  // Create match timeline item element
  function createTimelineItem(match) {
    const item = document.createElement("div");
    item.className = "match-item";
    item.innerHTML = `
      <div class="match-day">${match.matchday}</div>
      <div class="opponent-crest"><img src="${match.opponentLogo}" alt="${match.opponent}" loading="lazy"></div>
      <div class="match-context">${match.context}</div>
      <div class="result-bar ${match.outcome === "upcoming" ? "" : match.outcome}">${match.result}</div>
    `;
    return item;
  }

  // Render match timeline
  function renderTimeline(type, containerId = "matchTimeline") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const matches = formData[type];
    if (!matches) return;

    // Clear container efficiently
    container.innerHTML = "";
    
    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    matches.forEach(match => {
      fragment.appendChild(createTimelineItem(match));
    });
    container.appendChild(fragment);
  }

  // Create match result row element
  function createMatchResultRow(match) {
    const row = document.createElement("div");
    row.className = "match-result-row";
    row.innerHTML = `
      <div class="match-result-grid">
        <div class="match-date-cell">
          <span class="match-day">${match.date.split(" ")[1]}</span>
          <span class="match-month">${match.date.split(" ")[2]}</span>
        </div>
        <div class="match-team-cell home-team-cell">
          <span class="match-team-name">${match.homeTeam}</span>
        </div>
        <div class="match-logo-cell home-logo-cell">
          <img src="${match.homeLogo}" alt="${match.homeTeam}" class="match-team-logo" loading="lazy">
        </div>
        <div class="match-score-cell">
          <span class="match-score">${match.homeScore} - ${match.awayScore}</span>
          <span class="match-status">${match.status}</span>
        </div>
        <div class="match-logo-cell away-logo-cell">
          <img src="${match.awayLogo}" alt="${match.awayTeam}" class="match-team-logo" loading="lazy">
        </div>
        <div class="match-team-cell away-team-cell">
          <span class="match-team-name">${match.awayTeam}</span>
        </div>
        <div class="match-venue-cell">Stadium</div>
      </div>
    `;
    return row;
  }

  // Render match results for a specific month
  function renderMatchResults(monthName, containerId = "matchResultsContainer") {
    const container = document.getElementById(containerId);
    if (!container) return;

    const matches = matchResults[monthName];
    if (!matches) return;

    // Clear container
    container.innerHTML = "";

    // Use DocumentFragment for better performance
    const fragment = document.createDocumentFragment();
    matches.forEach(match => {
      fragment.appendChild(createMatchResultRow(match));
    });
    container.appendChild(fragment);
  }

  // Navigate months
  function navigateMonth(direction) {
    if (direction === "prev") {
      currentMonthIndex = (currentMonthIndex - 1 + months.length) % months.length;
    } else {
      currentMonthIndex = (currentMonthIndex + 1) % months.length;
    }
    return months[currentMonthIndex];
  }

  // Get current month
  function getCurrentMonth() {
    return months[currentMonthIndex];
  }

  // Get all months
  function getMonths() {
    return months;
  }

  // Get form data
  function getFormData() {
    return formData;
  }

  // Get match results
  function getMatchResults() {
    return matchResults;
  }

  // Initialize team form toggle
  function initTeamFormToggle(toggleSelector = ".toggle-btn", timelineContainerId = "matchTimeline") {
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
        renderTimeline(type, timelineContainerId);
      });
    });
  }

  // Initialize month carousel
  function initMonthCarousel(prevBtnId = "prevMonthBtn", nextBtnId = "nextMonthBtn", monthTitleId = "monthTitle") {
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    const monthTitle = document.getElementById(monthTitleId);

    if (!prevBtn || !nextBtn || !monthTitle) return;

    prevBtn.addEventListener("click", () => {
      const month = navigateMonth("prev");
      monthTitle.textContent = month;
      renderMatchResults(month);
    });

    nextBtn.addEventListener("click", () => {
      const month = navigateMonth("next");
      monthTitle.textContent = month;
      renderMatchResults(month);
    });
  }

  // Initialize
  function init() {
    // Render initial timeline
    renderTimeline("previous");
    
    // Initialize team form toggle (Previous/Upcoming)
    initTeamFormToggle();
    
    // Initialize month carousel
    initMonthCarousel();
    
    // Render initial match results
    renderMatchResults("March");
  }

  return {
    init,
    renderTimeline,
    renderMatchResults,
    navigateMonth,
    getCurrentMonth,
    getMonths,
    getFormData,
    getMatchResults,
    initTeamFormToggle,
    initMonthCarousel,
  };
})();

// Export for use in other modules
window.MatchData = MatchData;