// Tables module - handles league table functionality
const Tables = (() => {
  // Team data
  const teams = [
    {
      pos: 1,
      indicator: "blue",
      name: "Arsenal",
      pl: 31,
      w: 21,
      d: 7,
      l: 3,
      gf: 61,
      ga: 22,
      gd: 39,
      pts: 70,
      form: ["D", "W", "W", "W", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t3.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t91.svg",
    },
    {
      pos: 2,
      indicator: "blue",
      name: "Manchester City",
      pl: 30,
      w: 18,
      d: 7,
      l: 5,
      gf: 60,
      ga: 28,
      gd: 32,
      pts: 61,
      form: ["W", "W", "W", "D", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
    },
    {
      pos: 3,
      indicator: "blue",
      name: "Manchester United",
      pl: 31,
      w: 15,
      d: 10,
      l: 6,
      gf: 56,
      ga: 43,
      gd: 13,
      pts: 55,
      form: ["W", "W", "L", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t1.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t2.svg",
    },
    {
      pos: 4,
      indicator: "blue",
      name: "Aston Villa",
      pl: 31,
      w: 16,
      d: 6,
      l: 9,
      gf: 42,
      ga: 37,
      gd: 5,
      pts: 54,
      form: ["D", "L", "L", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t17.svg",
    },
    {
      pos: 5,
      indicator: "orange",
      name: "Liverpool",
      pl: 31,
      w: 14,
      d: 7,
      l: 10,
      gf: 50,
      ga: 42,
      gd: 8,
      pts: 49,
      form: ["W", "W", "L", "D", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t54.svg",
    },
    {
      pos: 6,
      indicator: "none",
      name: "Chelsea",
      pl: 31,
      w: 13,
      d: 9,
      l: 9,
      gf: 53,
      ga: 38,
      gd: 15,
      pts: 48,
      form: ["D", "L", "W", "L", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t8.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t43.svg",
    },
    {
      pos: 7,
      indicator: "none",
      name: "Brentford",
      pl: 31,
      w: 13,
      d: 7,
      l: 11,
      gf: 46,
      ga: 42,
      gd: 4,
      pts: 46,
      form: ["L", "W", "D", "D", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t94.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
    },
    {
      pos: 8,
      indicator: "none",
      name: "Everton",
      pl: 31,
      w: 13,
      d: 7,
      l: 11,
      gf: 37,
      ga: 35,
      gd: 2,
      pts: 46,
      form: ["L", "W", "W", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t11.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t94.svg",
    },
    {
      pos: 9,
      indicator: "none",
      name: "Fulham",
      pl: 31,
      w: 13,
      d: 5,
      l: 13,
      gf: 43,
      ga: 44,
      gd: -1,
      pts: 44,
      form: ["W", "W", "L", "D", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t54.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t14.svg",
    },
    {
      pos: 10,
      indicator: "none",
      name: "Tottenham",
      pl: 31,
      w: 12,
      d: 6,
      l: 13,
      gf: 48,
      ga: 51,
      gd: -3,
      pts: 42,
      form: ["L", "D", "W", "W", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t6.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
    },
    {
      pos: 11,
      indicator: "none",
      name: "Newcastle",
      pl: 31,
      w: 11,
      d: 8,
      l: 12,
      gf: 45,
      ga: 47,
      gd: -2,
      pts: 41,
      form: ["D", "W", "D", "L", "W"],
      logo: "https://resources.premierleague.com/premierleague/badges/t4.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t7.svg",
    },
    {
      pos: 12,
      indicator: "none",
      name: "Brighton",
      pl: 31,
      w: 11,
      d: 7,
      l: 13,
      gf: 50,
      ga: 53,
      gd: -3,
      pts: 40,
      form: ["W", "L", "W", "D", "L"],
      logo: "https://resources.premierleague.com/premierleague/badges/t36.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t6.svg",
    },
    {
      pos: 13,
      indicator: "none",
      name: "West Ham",
      pl: 31,
      w: 10,
      d: 8,
      l: 13,
      gf: 38,
      ga: 48,
      gd: -10,
      pts: 38,
      form: ["L", "L", "D", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t21.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t4.svg",
    },
    {
      pos: 14,
      indicator: "none",
      name: "Wolverhampton",
      pl: 31,
      w: 9,
      d: 8,
      l: 14,
      gf: 36,
      ga: 52,
      gd: -16,
      pts: 35,
      form: ["D", "L", "W", "L", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t39.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t21.svg",
    },
    {
      pos: 15,
      indicator: "none",
      name: "Crystal Palace",
      pl: 31,
      w: 8,
      d: 9,
      l: 14,
      gf: 33,
      ga: 49,
      gd: -16,
      pts: 33,
      form: ["L", "D", "L", "W", "D"],
      logo: "https://resources.premierleague.com/premierleague/badges/t31.svg",
      nextLogo: "https://resources.premierleague.com/premierleague/badges/t39.svg",
    },
  ];

  function buildRow(t) {
    const gd = t.gd > 0 ? "+" + t.gd : t.gd;
    const formBubbles = t.form
      .map((f) => `<span class="form-bubble ${f}">${f}</span>`)
      .join("");

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
            <div class="team-logo-placeholder" style="display:none">${t.name.substring(0, 2).toUpperCase()}</div>
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

  function renderTable(tableBody) {
    if (!tableBody) return;
    tableBody.innerHTML = teams.map(buildRow).join("");
  }

  function initTabs() {
    // First Team / U21 / U18 tabs
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
      });
    });

    // Mobile Short / Full / Form column tabs
    const views = ["short", "full", "form"];
    function setView(view) {
      views.forEach((v) => document.body.classList.remove("view-" + v));
      document.body.classList.add("view-" + view);
    }

    // default view
    setView("short");

    document.querySelectorAll(".mobile-col-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".mobile-col-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        setView(tab.dataset.view);
      });
    });
  }

  function init() {
    const tableBody = document.getElementById("table-body");
    if (tableBody) {
      renderTable(tableBody);
    }
    initTabs();
  }

  return { init, renderTable };
})();

// Export for use in other modules
window.Tables = Tables;