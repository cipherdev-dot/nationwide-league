// Player Data Module - Extracted from players-detail.html for better performance
// This module handles all player-related data and operations

const PlayerData = (() => {
  // Player database
  const players = {
    "brenden-aaronson": {
      firstName: "Brenden",
      lastName: "Aaronson",
      avatar: "../assets/img/field-player-2.png",
      club: "Leeds United",
      clubShort: "Leeds",
      number: 11,
      position: "Midfielder",
      nationality: "United States",
      nationalityCode: "us",
      preferredFoot: "Right",
      dob: "10/12/1997",
      appearances: 16,
      cleanSheets: 3,
      saves: 38,
      clubLogo: "../assets/logos/australia_adelaide-united.football-logos.cc.svg",
    },
    "jerome-abbey": {
      firstName: "Jerome",
      lastName: "Abbey",
      avatar: "../assets/img/field-player-1.png",
      club: "Wolverhampton Wanderers",
      clubShort: "Wolves",
      number: 7,
      position: "Midfielder",
      nationality: "England",
      nationalityCode: "gb",
      preferredFoot: "Left",
      dob: "15/03/1999",
      appearances: 22,
      cleanSheets: 8,
      saves: 52,
      clubLogo: "../assets/logos/brazil_flamengo.football-logos.cc.svg",
    },
    "george-abbott": {
      firstName: "George",
      lastName: "Abbott",
      avatar: "../assets/img/field-player-3.png",
      club: "Tottenham Hotspur",
      clubShort: "Spurs",
      number: 23,
      position: "Midfielder",
      nationality: "England",
      nationalityCode: "gb",
      preferredFoot: "Right",
      dob: "22/08/2000",
      appearances: 18,
      cleanSheets: 5,
      saves: 41,
      clubLogo: "../assets/logos/cyprus_ael.football-logos.cc.svg",
    },
    "zach-abbott": {
      firstName: "Zach",
      lastName: "Abbott",
      avatar: "../assets/img/recap-image-2.png",
      club: "Nottingham Forest",
      clubShort: "Forest",
      number: 4,
      position: "Defender",
      nationality: "England",
      nationalityCode: "gb",
      preferredFoot: "Right",
      dob: "05/01/1998",
      appearances: 25,
      cleanSheets: 12,
      saves: 28,
      clubLogo: "../assets/logos/cyprus_aez.football-logos.cc.svg",
    },
    "salis-abdul-samed": {
      firstName: "Salis Abdul",
      lastName: "Samed",
      avatar: "../assets/img/recap-image.png",
      club: "Sunderland",
      clubShort: "Sunderland",
      number: 6,
      position: "Midfielder",
      nationality: "Ghana",
      nationalityCode: "gh",
      preferredFoot: "Right",
      dob: "18/06/1996",
      appearances: 20,
      cleanSheets: 6,
      saves: 45,
      clubLogo: "../assets/logos/england_accrington.football-logos.cc.svg",
    },
    "ahmed-abdullahi": {
      firstName: "Ahmed",
      lastName: "Abdullahi",
      avatar: "../assets/img/field-player-2.png",
      club: "Sunderland",
      clubShort: "Sunderland",
      number: 9,
      position: "Forward",
      nationality: "Nigeria",
      nationalityCode: "ng",
      preferredFoot: "Right",
      dob: "12/09/1995",
      appearances: 24,
      cleanSheets: 2,
      saves: 35,
      clubLogo: "../assets/logos/england_arsenal.football-logos.cc.svg",
    },
    "tammy-abraham": {
      firstName: "Tammy",
      lastName: "Abraham",
      avatar: "../assets/img/field-player-3.png",
      club: "Aston Villa",
      clubShort: "Villa",
      number: 9,
      position: "Forward",
      nationality: "England",
      nationalityCode: "gb",
      preferredFoot: "Right",
      dob: "02/10/1997",
      appearances: 28,
      cleanSheets: 1,
      saves: 22,
      clubLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
    },
    "josh-acheampong": {
      firstName: "Josh",
      lastName: "Acheampong",
      avatar: "../assets/img/recap-image-2.png",
      club: "Chelsea",
      clubShort: "Chelsea",
      number: 2,
      position: "Defender",
      nationality: "England",
      nationalityCode: "gb",
      preferredFoot: "Right",
      dob: "08/04/2001",
      appearances: 15,
      cleanSheets: 9,
      saves: 31,
      clubLogo: "../assets/logos/england_chelsea.football-logos.cc.svg",
    },
    "tyler-adams": {
      firstName: "Tyler",
      lastName: "Adams",
      avatar: "../assets/img/recap-image.png",
      club: "Bournemouth",
      clubShort: "Bournemouth",
      number: 12,
      position: "Midfielder",
      nationality: "United States",
      nationalityCode: "us",
      preferredFoot: "Right",
      dob: "14/02/1999",
      appearances: 19,
      cleanSheets: 4,
      saves: 48,
      clubLogo: "../assets/logos/germany_bayern-munchen.football-logos.cc.svg",
    },
  };

  // Get player by ID
  function getPlayer(playerId) {
    return players[playerId] || null;
  }

  // Get all players
  function getAllPlayers() {
    return Object.values(players);
  }

  // Get player ID from URL
  function getPlayerIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("player");
  }

  // Populate player data on page
  function populatePlayerData() {
    const playerId = getPlayerIdFromUrl();
    const player = getPlayer(playerId);

    if (!player) {
      console.warn("No valid player ID found in URL");
      return null;
    }

    // Update page title
    document.title = `${player.firstName} ${player.lastName} | National League`;

    // Update DOM elements with player data
    const updates = {
      playerPortrait: { src: player.avatar, alt: `${player.firstName} ${player.lastName} Portrait` },
      playerFirstName: { textContent: player.firstName },
      playerLastName: { innerHTML: `<strong>${player.lastName}</strong>` },
      playerClub: { textContent: player.clubShort },
      playerNumber: { textContent: player.number },
      playerPosition: { textContent: player.position },
      nationalityValue: { 
        innerHTML: `<img src="https://flagcdn.com/w40/${player.nationalityCode}.png" alt="${player.nationality} flag" style="width: 20px; height: 15px; margin-right: 6px; border-radius: 2px;" /> ${player.nationality}` 
      },
      preferredFootValue: { textContent: player.preferredFoot },
      dobValue: { textContent: player.dob },
      appearancesValue: { textContent: player.appearances },
      cleanSheetsValue: { textContent: player.cleanSheets },
      savesValue: { textContent: player.saves },
      teamFormLogo: { src: player.clubLogo },
      teamFormName: { textContent: player.club },
    };

    Object.entries(updates).forEach(([id, props]) => {
      const el = document.getElementById(id);
      if (el) {
        Object.entries(props).forEach(([key, value]) => {
          el[key] = value;
        });
      }
    });

    return player;
  }

  // Initialize
  function init() {
    populatePlayerData();
  }

  return { init };
})();

// Export for use in other modules
window.PlayerData = PlayerData;