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
    const h2 = document.createElement('h2')
    h2.innerText = 'Partidas'
    this.fixtureContainer.appendChild(h2)
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

  // let options = {
  //   weekday: "short",
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  // };

  // new Intl.DateTimeFormat('pt-BR', options).format(new Date("2023-04-15T21:00:00-03:00"))


  // new Intl.DateTimeFormat(navigator.language, { weekday: "short" }).format(new Date("2023-04-15T21:00:00-03:00"))
  // console.log(new Intl.DateTimeFormat('en-US').format(date));




  createRound(round) {
    const { teams, goals, league, fixture } = round;

    let options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    };

    const roundDateArray = new Intl.DateTimeFormat('pt-BR', options).format(new Date(fixture.date)).split(',')
    
    const html = `
        <div class="round">
            ${league.round.slice(-2)}ª Rodada
        </div>
        <div class="teams-title">
            <span>${roundDateArray[0].slice(0,3).toUpperCase()} ${roundDateArray[1]} </span>
            <span>${league.name}</span>
            <span>${roundDateArray[2]}</span>
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
