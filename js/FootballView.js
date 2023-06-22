import { Teams } from "./Teams.js";

export class FootballView extends Teams {
  constructor(root) {
    super(root);
    this.onSearch();
    this.onAddFavorite();
    this.onFilter();
    this.displayFavorites();
  }

  onSearch() {
    const searchButton = this.root.querySelector(".search-btn");
    searchButton.onclick = (e) => {
      e.preventDefault();
      const formInput = this.root.querySelector(".search-container form input");
      this.lastTeamSearched = formInput.value;
      this.addTeam(formInput.value);
      formInput.value = "";
      this.selectFilter(0);
    };
  }

  onAddFavorite() {
    const favoriteBtn = this.root.querySelector(".fixtures-title svg");
    favoriteBtn.onclick = () => {
      if (favoriteBtn.classList.contains("favorited"))
        this.removeFavorite(this.lastTeamSearched);
      else this.addFavorite(this.lastTeamSearched);

      favoriteBtn.classList.toggle("favorited");
      this.displayFavorites();
    };
  }

  onFilter() {
    const filtersBtn = this.root.querySelectorAll(".filter button");
    filtersBtn.forEach((btn) => {
      btn.onclick = (e) => {
        const dataFilter = btn.getAttribute("data-filter");
        this.selectFilter(Number(dataFilter));
        const teamsFiltered = this.filterTeams(
          dataFilter,
          this.lastTeamSearched
        );
        this.removeAllRounds();
        this.displayTeams(teamsFiltered);
      };
    });
  }

  displayTeams(fixtures) {
    this.root.querySelector(".fixtures-title").classList.remove("hidden");
    this.root.querySelector(".filter").classList.remove("hidden");
    fixtures.forEach((fixture) => {
      this.fixtureContainer.appendChild(this.createRound(fixture));
    });
  }

  displayFavorites() {
    this.removeAllFavorites();
    this.favorites.forEach((favorite) => {
      const li = this.createFavorites(favorite);
      li.setAttribute("data-name", favorite.name);
      li.onclick = (e) => {
        this.selectFilter(0);
        const teamName = e.target.closest("li").getAttribute("data-name");
        console.log(teamName);
        this.lastTeamSearched = teamName;
        this.removeAllRounds();
        const { fixtures } = this.getTeam(teamName);
        this.displayTeams(fixtures);
      };
      this.root.querySelector(".favorite-list ul").appendChild(li);
    });
  }

  selectFilter(selectNumber) {
    const filtersBtn = this.root.querySelectorAll(".filter button");
    filtersBtn.forEach((btn) => {
      btn.classList.remove("filter-selected");
    });
    filtersBtn[selectNumber].classList.add("filter-selected");
  }

  removeAllFavorites() {
    this.root.querySelectorAll(".favorite-list ul li").forEach((li) => {
      li.remove();
    });
  }

  createFavorites(team) {
    const html = `
      <img src=${team.logo} alt="${team.name} logo">
      <span>${team.code}</span>
    `;

    const li = document.createElement("li");
    li.innerHTML = html;

    return li;
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
      .split(" ");

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
            <span>${goals.home ?? "&nbsp;&nbsp;"}</span>
            <span>X</span>
            <span>${goals.away ?? "&nbsp;&nbsp;"}</span>
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
    this.root.querySelector(".fixtures-title").classList.add("hidden");
    const favoriteBtn = this.root.querySelector(".fixtures-title svg");
    const favorite = this.getFavorite(this.lastTeamSearched);

    if (favorite) favoriteBtn.classList.add("favorited");
    else favoriteBtn.classList.remove("favorited");

    this.fixtureContainer
      .querySelectorAll(".teams-container")
      .forEach((container) => {
        container.remove();
      });
  }
}
