// Fixtures module - handles fixtures page functionality
const Fixtures = (() => {
  // ----------------------------------------------
  // LOGO MAPPING for actual logo files
  // Using relative paths that work from any page
  // ----------------------------------------------
  
  // Detect if we're in a subdirectory (pages/) or root
  // by checking the CSS link href pattern
  function getBasePath() {
    // Check CSS links - if they use ../assets/, we're in a subdirectory
    const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
    for (let i = 0; i < cssLinks.length; i++) {
      const href = cssLinks[i].getAttribute('href') || '';
      if (href.includes('../assets/')) {
        return '..';
      }
    }
    // Default to current directory (root)
    return '.';
  }

  const basePath = getBasePath();

  // All available logo files in the logos folder
  const availableLogos = [
    "australia_adelaide-united.football-logos.cc.svg",
    "brazil_flamengo.football-logos.cc.svg",
    "cyprus_ael.football-logos.cc.svg",
    "cyprus_aez.football-logos.cc.svg",
    "england_accrington.football-logos.cc.svg",
    "england_arsenal.football-logos.cc.svg",
    "england_chelsea.football-logos.cc.svg",
    "england_liverpool.football-logos.cc.svg",
    "england_manchester-city.football-logos.cc.svg",
    "england_manchester-united.football-logos.cc.svg",
    "france_ajaccio.football-logos.cc.svg",
    "germany_bayern-munchen.football-logos.cc.svg",
    "germany_borussia-dortmund.football-logos.cc.svg",
    "italy_juventus.football-logos.cc.svg",
    "portugal_benfica.football-logos.cc.svg",
    "saudi-arabia_al-nassr.football-logos.cc.svg",
    "scotland_aberdeen.football-logos.cc.svg",
    "spain_barcelona.football-logos.cc.svg",
    "spain_real-madrid.football-logos.cc.svg",
    "usa_inter-miami-cf.football-logos.cc.svg"
  ];

  // Shuffle logos to get random order
  function getShuffledLogos() {
    const shuffled = [...availableLogos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Assign unique logos to each team (no repeats until we run out)
  let logoIndex = 0;
  const shuffledLogos = getShuffledLogos();
  
  function getUniqueLogo() {
    const logo = shuffledLogos[logoIndex % availableLogos.length];
    logoIndex++;
    return logo;
  }

  // Cache for team logo assignments
  const teamLogoCache = {};

  function getLogoPath(teamName) {
    // Return cached logo if already assigned
    if (teamLogoCache[teamName]) {
      return `${basePath}/assets/logos/${teamLogoCache[teamName]}`;
    }
    
    // Assign a new unique logo
    const logo = getUniqueLogo();
    teamLogoCache[teamName] = logo;
    return `${basePath}/assets/logos/${logo}`;
  }

  // ----------------------------------------------
  // MOCK FIXTURE DATA for three matchweeks
  // ----------------------------------------------
  const fixturesDB = {
    36: {
      date: "Sun 17 May",
      matches: [
        { id: 1, homeTeam: "Arsenal", awayTeam: "Chelsea", kickoff: "15:00", competition: "Premier League" },
        { id: 2, homeTeam: "Real Madrid", awayTeam: "Atletico Madrid", kickoff: "20:00", competition: "La Liga" },
        { id: 3, homeTeam: "AC Milan", awayTeam: "Juventus", kickoff: "19:45", competition: "Serie A" },
        { id: 4, homeTeam: "Bayern Munich", awayTeam: "Borussia Dortmund", kickoff: "18:30", competition: "Bundesliga" },
        { id: 5, homeTeam: "Liverpool", awayTeam: "Manchester City", kickoff: "17:30", competition: "Premier League" },
      ],
    },
    37: {
      date: "Sun 24 May",
      matches: [
        { id: 6, homeTeam: "Manchester United", awayTeam: "Liverpool", kickoff: "16:00", competition: "Premier League" },
        { id: 7, homeTeam: "Barcelona", awayTeam: "Sevilla", kickoff: "21:00", competition: "La Liga" },
        { id: 8, homeTeam: "Inter Milan", awayTeam: "AC Milan", kickoff: "20:45", competition: "Serie A" },
        { id: 9, homeTeam: "RB Leipzig", awayTeam: "Bayern Munich", kickoff: "18:30", competition: "Bundesliga" },
        { id: 10, homeTeam: "Chelsea", awayTeam: "Arsenal", kickoff: "17:30", competition: "Premier League" },
      ],
    },
    38: {
      date: "Sun 24 May",
      matches: [
        { id: 11, homeTeam: "Arsenal", awayTeam: "Everton", kickoff: "16:00", competition: "Premier League" },
        { id: 12, homeTeam: "Manchester City", awayTeam: "West Ham", kickoff: "16:00", competition: "Premier League" },
        { id: 13, homeTeam: "Liverpool", awayTeam: "Crystal Palace", kickoff: "16:00", competition: "Premier League" },
        { id: 14, homeTeam: "Chelsea", awayTeam: "Bournemouth", kickoff: "16:00", competition: "Premier League" },
        { id: 15, homeTeam: "Manchester United", awayTeam: "Brighton", kickoff: "16:00", competition: "Premier League" },
        { id: 16, homeTeam: "Tottenham", awayTeam: "Sheffield United", kickoff: "16:00", competition: "Premier League" },
      ],
    },
  };

  // All clubs for dropdown
  const allClubs = [
    "Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United",
    "Tottenham", "Barcelona", "Real Madrid", "Bayern Munich", "Juventus",
    "AC Milan", "Inter Milan", "Atletico Madrid", "Borussia Dortmund"
  ];

  function populateClubDropdown() {
    const clubFilter = document.getElementById("clubFilter");
    if (!clubFilter) return;
    
    allClubs.forEach(club => {
      const option = document.createElement("option");
      option.value = club;
      option.textContent = club;
      clubFilter.appendChild(option);
    });
  }

  function renderFixtures(matchweek) {
    const container = document.getElementById("fixturesListContainer");
    const titleEl = document.getElementById("matchweekTitle");
    const dateEl = document.getElementById("matchDateText");
    const cardDateEl = document.getElementById("cardDateLabel");
    
    if (!container) return;

    const data = fixturesDB[matchweek];
    if (!data) {
      container.innerHTML = '<div class="empty-fixtures">No fixtures found</div>';
      return;
    }

    if (titleEl) titleEl.textContent = `Matchweek ${matchweek}`;
    if (dateEl) dateEl.textContent = data.date;
    if (cardDateEl) cardDateEl.textContent = data.date;

    let html = "";
    data.matches.forEach(match => {
      const homeLogo = getLogoPath(match.homeTeam);
      const awayLogo = getLogoPath(match.awayTeam);
      
      html += `
        <div class="match-row" data-match-id="${match.id}">
          <div class="team left">
            <span class="team-name">${match.homeTeam}</span>
            <img src="${homeLogo}" alt="${match.homeTeam}" class="team-logo" onerror="this.src='https://placehold.co/32x32/ccc/333?text=${match.homeTeam.substring(0,2).toUpperCase()}'">
          </div>
          <div class="time">${match.kickoff}</div>
          <div class="team right">
            <img src="${awayLogo}" alt="${match.awayTeam}" class="team-logo" onerror="this.src='https://placehold.co/32x32/ccc/333?text=${match.awayTeam.substring(0,2).toUpperCase()}'">
            <span class="team-name">${match.awayTeam}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function init() {
    populateClubDropdown();
    
    // Initial render
    const mwDropdown = document.getElementById("mwDropdown");
    const initialMW = mwDropdown ? mwDropdown.value : "38";
    renderFixtures(initialMW);

    // Matchweek navigation via dropdown
    if (mwDropdown) {
      mwDropdown.addEventListener("change", () => {
        renderFixtures(mwDropdown.value);
      });
    }

    // Club filter
    const clubFilter = document.getElementById("clubFilter");
    if (clubFilter) {
      clubFilter.addEventListener("change", () => {
        const selectedClub = clubFilter.value;
        filterFixtures(selectedClub);
      });
    }

    // Reset button
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        if (clubFilter) clubFilter.value = "all";
        if (mwDropdown) mwDropdown.value = "38";
        renderFixtures("38");
      });
    }

    // Arrow navigation
    const prevArrow = document.getElementById("prevWeekArrow");
    const nextArrow = document.getElementById("nextWeekArrow");
    
    if (prevArrow) {
      prevArrow.addEventListener("click", () => {
        if (mwDropdown) {
          const current = parseInt(mwDropdown.value);
          if (current > 36) {
            mwDropdown.value = current - 1;
            renderFixtures(mwDropdown.value);
          }
        }
      });
    }

    if (nextArrow) {
      nextArrow.addEventListener("click", () => {
        if (mwDropdown) {
          const current = parseInt(mwDropdown.value);
          if (current < 38) {
            mwDropdown.value = current + 1;
            renderFixtures(mwDropdown.value);
          }
        }
      });
    }

    // Matchday button navigation - update button text dynamically
    const prevMatchdayBtn = document.getElementById("prevMatchdayBtn");
    if (prevMatchdayBtn) {
      // Update button text based on current matchweek
      function updateMatchdayButtonText() {
        const currentMW = mwDropdown ? parseInt(mwDropdown.value) : 38;
        const prevMW = Math.max(36, currentMW - 1);
        prevMatchdayBtn.textContent = `← MATCHDAY ${prevMW}`;
      }
      
      // Initial update
      updateMatchdayButtonText();
      
      prevMatchdayBtn.addEventListener("click", () => {
        if (mwDropdown) {
          const current = parseInt(mwDropdown.value);
          if (current > 36) {
            mwDropdown.value = current - 1;
            renderFixtures(mwDropdown.value);
            updateMatchdayButtonText();
          }
        }
      });
    }

    // Tab switching
    document.querySelectorAll(".tabs-bar .tab").forEach(tab => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tabs-bar .tab").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });
  }

  function filterFixtures(clubName) {
    const container = document.getElementById("fixturesListContainer");
    if (!container) return;

    if (clubName === "all") {
      const mwDropdown = document.getElementById("mwDropdown");
      renderFixtures(mwDropdown ? mwDropdown.value : "38");
      return;
    }

    let html = "";
    Object.values(fixturesDB).forEach(matchweek => {
      matchweek.matches.forEach(match => {
        if (match.homeTeam === clubName || match.awayTeam === clubName) {
          const homeLogo = getLogoPath(match.homeTeam);
          const awayLogo = getLogoPath(match.awayTeam);
          
          html += `
            <div class="match-row" data-match-id="${match.id}">
              <div class="team left">
                <span class="team-name">${match.homeTeam}</span>
                <img src="${homeLogo}" alt="${match.homeTeam}" class="team-logo">
              </div>
              <div class="time">${match.kickoff}</div>
              <div class="team right">
                <img src="${awayLogo}" alt="${match.awayTeam}" class="team-logo">
                <span class="team-name">${match.awayTeam}</span>
              </div>
            </div>
          `;
        }
      });
    });

    container.innerHTML = html || '<div class="empty-fixtures">No fixtures found for this club</div>';
  }

  return { init };
})();

// Export for use in other modules
window.Fixtures = Fixtures;