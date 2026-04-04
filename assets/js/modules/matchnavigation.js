// Match Navigation module - handles clicking on matches to navigate to recap page
const MatchNavigation = (() => {
  function init() {
    // Find all match items that haven't been initialized
    const matchTeams = document.querySelectorAll(
      ".match-teams:not(.match-nav-initialized)"
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
      });
    });

    // Also handle match-item class elements that haven't been initialized
    const matchItems = document.querySelectorAll(
      ".match-item:not(.match-nav-initialized)"
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

  return { init };
})();

// Export for use in other modules
window.MatchNavigation = MatchNavigation;