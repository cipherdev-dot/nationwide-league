// Main entry point - dynamically loads page-specific modules
// This script uses dynamic imports for code-splitting and lazy loading

(function () {
  // Detect current page based on URL pathname
  const currentPage = window.location.pathname;
  const pageName = currentPage.substring(currentPage.lastIndexOf("/") + 1) || "index.html";
  
  // Calculate assets path - use relative paths that work from any page
  // Check if we're in the pages directory based on the current page name
  const pagesInPath = currentPage.includes('/pages/');
  
  // Use a more robust path calculation
  let assetsPath;
  
  // Try to get the script's src to determine the correct path
  const scripts = document.getElementsByTagName('script');
  let scriptSrc = '';
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src && scripts[i].src.includes('main.js')) {
      scriptSrc = scripts[i].src;
      break;
    }
  }
  
  if (scriptSrc) {
    // Extract path from script src
    const scriptPath = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
    // Go up from assets/js to assets
    const lastSlash = scriptPath.lastIndexOf('/');
    const secondLastSlash = scriptPath.substring(0, lastSlash).lastIndexOf('/');
    assetsPath = scriptPath.substring(0, secondLastSlash);
  } else if (pagesInPath) {
    // We're in /pages/ directory, go up one level
    assetsPath = '../assets';
  } else {
    // We're in root directory
    assetsPath = './assets';
  }

  // Function to load a script dynamically
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Function to initialize page-specific modules
  async function initPage() {
    // Always load core module first
    try {
      await loadScript(assetsPath + "/js/modules/core.js");
      
      // Initialize core functionality
      if (window.Core) {
        window.Core.init();
      }
    } catch (error) {
      console.error("Failed to load core module:", error);
    }

    // Load page-specific modules based on current page
    switch (pageName) {
      case "index.html":
      case "":
        // Home page - load match centre and navigation modules
        try {
          await loadScript(assetsPath + "/js/modules/matchcentre.js");
          await loadScript(assetsPath + "/js/modules/matchnavigation.js");
          
          if (window.MatchCentre) window.MatchCentre.init();
          if (window.MatchNavigation) window.MatchNavigation.init();
        } catch (error) {
          console.error("Failed to load home page modules:", error);
        }
        break;

      case "fixtures.html":
        // Fixtures page - load fixtures module
        try {
          await loadScript(assetsPath + "/js/modules/fixtures.js");
          if (window.Fixtures) {
            window.Fixtures.init();
          }
        } catch (error) {
          console.error("Failed to load fixtures module:", error);
        }
        break;

      case "tables.html":
        // Tables page - load tables module
        try {
          await loadScript(assetsPath + "/js/modules/tables.js");
          
          if (window.Tables) {
            window.Tables.init();
          }
        } catch (error) {
          console.error("Failed to load tables module:", error);
        }
        break;

      case "match-recap.html":
        // Match recap page - load match navigation and specific functionality
        try {
          await loadScript(assetsPath + "/js/modules/matchnavigation.js");
          
          // Initialize match recap specific functionality
          initMatchRecap();
        } catch (error) {
          console.error("Failed to load match recap modules:", error);
        }
        break;

      case "club-details.html":
        // Club details page - load club data module
        try {
          await loadScript(assetsPath + "/js/modules/clubdata.js");
          if (window.ClubData) window.ClubData.init();
        } catch (error) {
          console.error("Failed to load club details modules:", error);
        }
        break;

      case "players-detail.html":
        // Player details page - load player and match data modules
        try {
          await loadScript(assetsPath + "/js/modules/playerdata.js");
          await loadScript(assetsPath + "/js/modules/matchdata.js");
          
          if (window.PlayerData) window.PlayerData.init();
          if (window.MatchData) window.MatchData.init();
          // Initialize player details tab switching
          initPlayerDetails();
        } catch (error) {
          console.error("Failed to init player details:", error);
        }
        break;

      default:
        // For other pages, just load core functionality
        break;
    }
  }

  // Match recap page initialization
  function initMatchRecap() {
    // Tab switching
    const tabs = document.querySelectorAll(".tab");
    const recapSection = document.getElementById("recap-section");
    const highlightsSection = document.getElementById("highlights-section");
    const lineupsSection = document.getElementById("lineups-section");
    const potmCard = document.getElementById("potm-card");
    const centrePanel = document.querySelector(".centre-panel");

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabType = tab.getAttribute("data-tab");

        // Hide all sections first
        recapSection.style.display = "none";
        highlightsSection.style.display = "none";
        lineupsSection.style.display = "none";

        if (tabType === "lineups") {
          lineupsSection.style.display = "block";
          potmCard.style.display = "none";
          centrePanel.style.gridColumn = "2 / 4";
        } else if (tabType === "highlights") {
          highlightsSection.style.display = "block";
          potmCard.style.display = "none";
          centrePanel.style.gridColumn = "2 / 4";
        } else {
          recapSection.style.display = "block";
          potmCard.style.display = "block";
          centrePanel.style.gridColumn = "2";
        }
      });
    });

    // Populate match data from URL params
    populateMatchData();
  }

  // Populate match data from URL parameters
  function populateMatchData() {
    const params = new URLSearchParams(window.location.search);
    const data = {
      home: params.get("home") || "Home Team",
      homeLogo: params.get("homeLogo") || "",
      away: params.get("away") || "Away Team",
      awayLogo: params.get("awayLogo") || "",
      date: params.get("date") || "",
      venue: params.get("venue") || "",
      competition: params.get("competition") || "Premier League",
      score: params.get("score") || ""
    };

    // Update team names
    const homeTeamEl = document.getElementById("homeTeam");
    const awayTeamEl = document.getElementById("awayTeam");
    const homeReportName = document.getElementById("homeReportName");
    const awayReportName = document.getElementById("awayReportName");
    const homeReportLabel = document.getElementById("homeReportLabel");
    const awayReportLabel = document.getElementById("awayReportLabel");
    const lineupsHomeTeam = document.getElementById("lineupsHomeTeam");
    const lineupsAwayTeam = document.getElementById("lineupsAwayTeam");

    if (homeTeamEl) homeTeamEl.textContent = data.home;
    if (awayTeamEl) awayTeamEl.textContent = data.away;
    if (homeReportName) homeReportName.textContent = data.home;
    if (awayReportName) awayReportName.textContent = data.away;
    if (homeReportLabel) homeReportLabel.textContent = data.home + " Report";
    if (awayReportLabel) awayReportLabel.textContent = data.away + " Report";
    if (lineupsHomeTeam) lineupsHomeTeam.textContent = data.home;
    if (lineupsAwayTeam) lineupsAwayTeam.textContent = data.away;

    // Update logos
    if (data.homeLogo) {
      const homeLogo = document.getElementById("homeLogo");
      const homeReportLogo = document.getElementById("homeReportLogo");
      const lineupsHomeLogo = document.getElementById("lineupsHomeLogo");
      if (homeLogo) homeLogo.src = data.homeLogo;
      if (homeReportLogo) homeReportLogo.src = data.homeLogo;
      if (lineupsHomeLogo) lineupsHomeLogo.src = data.homeLogo;
    }
    if (data.awayLogo) {
      const awayLogo = document.getElementById("awayLogo");
      const awayReportLogo = document.getElementById("awayReportLogo");
      const lineupsAwayLogo = document.getElementById("lineupsAwayLogo");
      if (awayLogo) awayLogo.src = data.awayLogo;
      if (awayReportLogo) awayReportLogo.src = data.awayLogo;
      if (lineupsAwayLogo) lineupsAwayLogo.src = data.awayLogo;
    }

    // Update match info
    const matchDateTime = document.getElementById("matchDateTime");
    const matchCompetition = document.getElementById("matchCompetition");
    if (matchDateTime && (data.date || data.venue)) {
      matchDateTime.textContent = data.date + " • " + data.venue;
    }
    if (matchCompetition) {
      matchCompetition.textContent = data.competition;
    }

    // Update score display
    const scoreDisplay = document.getElementById("scoreDisplay");
    if (scoreDisplay) {
      if (data.score && data.score !== "VS") {
        const formattedScore = data.score.replace("-", " – ");
        scoreDisplay.textContent = formattedScore;
      } else {
        scoreDisplay.textContent = "VS";
      }
    }

    // Update page title
    document.title = data.home + " vs " + data.away + " | Match Recap | National League";
  }

  // Player details page initialization
  function initPlayerDetails() {
    // Tab switching for player details
    const playerTabs = document.querySelectorAll(".player-tabs .tab");
    const playerTabContents = document.querySelectorAll(".tab-content");

    playerTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        playerTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const tabType = tab.getAttribute("data-tab");
        playerTabContents.forEach(content => {
          content.classList.remove("active");
          content.classList.add("hidden");
          if (content.id === tabType + "-content") {
            content.classList.add("active");
            content.classList.remove("hidden");
          }
        });
      });
    });

    // Load player data from URL params
    const params = new URLSearchParams(window.location.search);
    const playerSlug = params.get("player");
    
    if (playerSlug && window.PlayerData) {
      const player = window.PlayerData[playerSlug];
      if (player) {
        // Update player info
        const firstName = document.getElementById("playerFirstName");
        const lastName = document.getElementById("playerLastName");
        const playerPortrait = document.getElementById("playerPortrait");
        
        if (firstName) firstName.textContent = player.firstName;
        if (lastName) lastName.innerHTML = "<strong>" + player.lastName + "</strong>";
        if (playerPortrait && player.avatar) playerPortrait.src = player.avatar;
      }
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();

// Global utility functions
window.scrollCarousel = function(direction) {
  const container = document.getElementById("horizontalCarousel");
  if (container) container.scrollLeft += direction === "left" ? -300 : 300;
};

window.selectPoll = function(btn) {
  const card = btn.closest(".poll-card");
  card.querySelectorAll(".poll-btn").forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
};