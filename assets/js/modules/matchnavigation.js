// Match Navigation module - handles clicking on matches to navigate to recap page
const MatchNavigation = (() => {
  // Helper function to extract match data and navigate
  function navigateToMatchRecap(matchElement) {
    // Get team data
    const homeBlock = matchElement.querySelector(".team-block.left");
    const awayBlock = matchElement.querySelector(".team-block.right");
    const vsBadge = matchElement.querySelector(".vs-badge");
    const scoreBadge = matchElement.querySelector(".score-badge");

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
    const matchInfo = matchElement.nextElementSibling;
    let venue = "";
    if (matchInfo && matchInfo.classList.contains("match-info")) {
      venue = matchInfo.textContent;
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
  }

  function init() {
    // Find all match items that haven't been initialized
    const matchElements = document.querySelectorAll(
      ".match-item:not(.match-nav-initialized)"
    );

    matchElements.forEach((match) => {
      // Mark as initialized to prevent duplicate listeners
      match.classList.add("match-nav-initialized", "match-item-clickable");

      match.addEventListener("click", function (e) {
        e.preventDefault();
        navigateToMatchRecap(this);
      });
    });
  }

  return { init };
})();

// Export for use in other modules
window.MatchNavigation = MatchNavigation;