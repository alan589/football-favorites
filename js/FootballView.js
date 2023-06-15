import { Teams } from "./Teams.js";

export class FootballView extends Teams {
  constructor(root) {
    super(root);
    this.onAdd();
  }

  onAdd() {
    const searchButton = this.root.querySelector(".search-btn");
    searchButton.onclick = (e) => {
      e.preventDefault();
      const { value } = this.root.querySelector(".search-container form input");
      this.add(value);
    };
  }

  displayTeams(fixtures) {
    fixtures.forEach((fixture) => {
      this.fixtureContainer.appendChild(this.createRound(fixture));
    });
  }
  // fixture.date
  // goals.away/home
  // teams.away/home.name
  // teams.away/home.logo
  // teams.away/home.winner
  // league.name
  createRound(fixture) {
    const { teams, goals, league } = fixture;

    const html = `
        <div class="round">
            ${league.round.slice(-2)}ª Rodada
        </div>
        <div class="teams-title">
            <span>${"SAB"} ${"21/06/2023"}</span>
            <span>${"Serie A"}</span>
            <span>${"19:00"}</span>
        </div>
        <div class="teams">
            <span class="team-1">${teams.home.name
              .slice(0, 3)
              .toLocaleUpperCase()}</span>
            <img
            src=${teams.home.logo}
            alt="logo do ${teams.home.name}"
            />
            <div class="scoreboard">
            <span>${goals.home === null ? "&nbsp;" : goals.home}</span>
            <span>X</span>
            <span>${goals.away === null ? "&nbsp;" : goals.away}</span>
            </div>
            <img
            src=${teams.away.logo}
            alt="logo do ${teams.away.name}"
            />
            <span class="team-2">${teams.away.name
              .slice(0, 3)
              .toLocaleUpperCase()}</span>
        </div>`;

    const div = document.createElement("div");
    div.classList.add("teams-container");
    div.innerHTML = html;
    return div;
  }

  removeAllRounds() {
    this.fixtureContainer
      .querySelectorAll(".teams-container")
      .forEach((container) => {
        container.remove();
      });
  }
}
