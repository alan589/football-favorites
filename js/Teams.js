import { FootballApi } from "./FootballApi.js";

export class Teams {
  constructor(root) {
    this.root = document.querySelector(root);
    this.fixtureContainer = this.root.querySelector("#fixtures-container");
    this.footballApi = new FootballApi();
    this.loadTeams();
    this.loadFavorites();
  }

  addTeam(teamName) {
    const team = this.getTeam(teamName);
    if (team) {
      this.removeAllRounds();
      this.displayTeams(team.fixtures);
    } else {
      this.footballApi
        .searchTeam(teamName)
        .then((team) => {
          const { logo, id, name, country, code } = team;

          this.footballApi.searchTeamFixtures(id).then((fixtures) => {
            this.removeAllRounds();
            this.displayTeams(fixtures);
            this.teams = [
              ...this.teams,
              { logo, id, name, country, code, fixtures },
            ];
            this.saveTeams();
          });
        })
        .catch((error) => {
          console.error("error", error);
          alert("Time não encontrado");
          this.removeAllRounds();
        });
    }
  }

  filterTeams(num, teamName) {
    const { fixtures } = this.getTeam(teamName);

    if (num === "0") {
      return fixtures;
    }
    if (num === "1") {
      return fixtures.filter((round) => {
        return (
          round.fixture.status.short === "NS" ||
          round.fixture.status.short === "TBD"
        );
      });
    }
    if (num === "2") {
      return fixtures.filter((round) => {
        return round.fixture.status.short === "FT";
      });
    }
  }

  loadTeams() {
    this.teams = JSON.parse(localStorage.getItem("@teams:")) || [];
    console.log("teams:", this.teams);
  }

  saveTeams() {
    localStorage.setItem("@teams:", JSON.stringify(this.teams));
  }

  getTeam(teamName) {
    return this.teams.find(
      (team) => team.name.toLowerCase() === teamName.toLowerCase()
    );
  }

  getFavorite(favoriteName) {
    return this.favorites.find(
      (favorite) => favorite.name.toLowerCase() === favoriteName.toLowerCase()
    );
  }

  addFavorite(teamName) {
    const { code, logo, id, name } = this.getTeam(teamName);
    this.favorites = [...this.favorites, { code, logo, id, name }];
    this.saveFavorites();
  }

  removeFavorite(name) {
    const { id } = this.getTeam(name);
    const array = this.favorites.filter((favorite) => favorite.id !== id);
    this.favorites = [...array];
    this.saveFavorites();
  }

  saveFavorites() {
    localStorage.setItem("@favorites:", JSON.stringify(this.favorites));
  }

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem("@favorites:")) || [];
    console.log("favorites:", this.favorites);
  }
}
