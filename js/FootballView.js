import { Teams } from "./Teams.js";

export class FootballView extends Teams {
  constructor(root) {
    super(root);
    this.onAdd();
    this.onAddFavorite()
  }

  onAdd() {
    const searchButton = this.root.querySelector(".search-btn");
    searchButton.onclick = (e) => {
      e.preventDefault();
      const formInput = this.root.querySelector(".search-container form input");
      this.lastTeamSearched = formInput.value
      this.addTeam(formInput.value);
      formInput.value = ''
    };
  }

  onAddFavorite() {
    const favoriteBtn = this.root.querySelector(".fixtures-title svg");
    favoriteBtn.onclick = () => {
      if(favoriteBtn.classList.contains('favorited')) this.removeFavorite(this.lastTeamSearched)
      else this.addFavorite(this.lastTeamSearched)

      favoriteBtn.classList.toggle('favorited')

      console.log(this.lastTeamSearched);
    }
  }

  displayTeams(fixtures) {
    this.root.querySelector(".fixtures-title").classList.remove('hidden')
    const favoriteBtn = this.root.querySelector(".fixtures-title svg");
    console.log('this.lastTeamSearched', this.lastTeamSearched);
    const favorite = this.getFavoriteFromLocalstorage(this.lastTeamSearched)

    console.log(favorite);

    if(favorite) favoriteBtn.classList.add('favorited')
    else favoriteBtn.classList.remove('favorited')

    fixtures.forEach((fixture) => {
      this.fixtureContainer.appendChild(this.createRound(fixture));
    });
  }

  // loadFavorites(){
  //   this.teams.forEach((team) => {
  //     this.root.querySelector(".favorite-list ul").appendChild(this.createFavorites(team));
  //   })
  // }

  createFavorites(team){
    const html = `
      <img src=${team.logo} alt="${team.name} logo">
      <span>${team.code}</span>
    `

    const li = document.createElement('li')
    li.innerHTML = html

    return li
  }

  createRound(round) {
    const { teams, goals, league, fixture } = round;

    let options = {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const roundDateArray = new Intl.DateTimeFormat("pt-BR", options)
      .format(new Date(fixture.date))
      .split(",");

    const html = `
        <div class="round">
            ${league.round.slice(-2)}ª Rodada
        </div>
        <div class="teams-title">
            <span>${roundDateArray[0].slice(0, 3).toUpperCase()} ${
      roundDateArray[1]
    } </span>
            <span>${league.name}</span>
            <span>${roundDateArray[2]}</span>
        </div>
        <div class="teams">
            <span class="team-1">${teams.home.name
              .slice(0, 3)
              .toLocaleUpperCase()}</span>
            <img
            src=${teams.home.logo}
            alt="${teams.home.name} logo"
            />
            <div class="scoreboard">
            <span>${goals.home === null ? "&nbsp;" : goals.home}</span>
            <span>X</span>
            <span>${goals.away === null ? "&nbsp;" : goals.away}</span>
            </div>
            <img
            src=${teams.away.logo}
            alt="${teams.away.name} logo"
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
