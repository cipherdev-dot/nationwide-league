// Match Centre module - handles fixtures, results, and live match tabs
const MatchCentre = (() => {
  // Store original fixtures HTML
  let fixturesHtml = "";
  
  // Results data
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
          homeLogo: "./assets/logos/portugal_benfica.football-logos.cc.svg",
          away: "Manchester United",
          awayLogo: "./assets/logos/england_manchester-united.football-logos.cc.svg",
          score: "1 - 1",
          venue: "Tottenham Hotspur Stadium",
          status: "FT",
        },
        {
          home: "Aston Villa",
          homeLogo: "./assets/logos/germany_bayern-munchen.football-logos.cc.svg",
          away: "Newcastle United",
          awayLogo: "./assets/logos/saudi-arabia_al-nassr.football-logos.cc.svg",
          score: "0 - 2",
          venue: "Villa Park",
          status: "FT",
        },
      ],
    },
  ];

  // Live data
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

  // Helper: create a match item
  function createMatchItem(match, isLive = false, dateGroup = "") {
    let leftTeamBlock = `
      <div class="team-block left">
        <span class="team-name">${match.home}</span>
        <span class="team-logo"><img src="${match.homeLogo}" alt="${match.home}" onerror="this.src='https://placehold.co/28x28/ccc/333?text=${match.home.substring(0, 2).toUpperCase()}'"></span>
      </div>
    `;
    let rightTeamBlock = `
      <div class="team-block right">
        <span class="team-logo"><img src="${match.awayLogo}" alt="${match.away}" onerror="this.src='https://placehold.co/28x28/ccc/333?text=${match.away.substring(0, 2).toUpperCase()}'"></span>
        <span class="team-name">${match.away}</span>
      </div>
    `;

    let centerBadge = isLive
      ? `<span class="score-badge" style="background-color:#e8f5e9; color:black;">${match.score}</span>`
      : `<span class="score-badge">${match.score}</span>`;

    let matchInfo = isLive
      ? `<div class="match-info"><span class="live-badge" style="background-color:green; color:white;">LIVE ${match.minute}</span> ${match.venue}</div>`
      : `<div class="match-info"><span class="result-label">${match.status || "FT"}</span> ${match.venue}</div>`;

    let dateHeader = dateGroup
      ? `<div class="match-date-header">${dateGroup}</div>`
      : "";

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
  function renderMatches(tabType, container) {
    if (!container) return;

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
    container.innerHTML = html;

    // Re-initialize match navigation after content is rendered
    if (window.MatchNavigation) {
      window.MatchNavigation.init();
    }
  }

  // Initialize match centre tabs
  function init() {
    const matchTabs = document.querySelectorAll(".matchcentre-tab");
    const matchContainer = document.querySelector(".match-date-group");

    if (!matchTabs.length || !matchContainer) return;

    // Store original fixtures HTML
    fixturesHtml = matchContainer.innerHTML;

    matchTabs.forEach((tab) => {
      tab.addEventListener("click", function () {
        matchTabs.forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
        const tabType = this.getAttribute("data-tab");
        renderMatches(tabType, matchContainer);
      });
    });
  }

  return { init, renderMatches };
})();

// Export for use in other modules
window.MatchCentre = MatchCentre;