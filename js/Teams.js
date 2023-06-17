import { FootballApi } from "./FootballApi.js";

export class Teams {
  constructor(root) {
    this.root = document.querySelector(root);
    this.fixtureContainer = this.root.querySelector("#fixtures-container");
    this.footballApi = new FootballApi();
    this.loadTeams();
    this.loadFavorites()
  }

  addTeam(teamName) {
    const team = this.getTeamFromLocalstorage(teamName);
    if (team) {
      this.removeAllRounds()
      this.displayTeams(team.fixtures)
    } else {
      this.footballApi
        .searchTeam(teamName)
        .then((team) => {
          const { logo, id, name, country, code } = team;
          
          this.footballApi.searchTeamFixtures(id).then((fixtures) => {
            console.log(fixtures);
            this.removeAllRounds()
            this.displayTeams(fixtures)
            this.teams = [...this.teams, { logo, id, name, country, code, fixtures }];
            this.saveTeams()
          });
        })
        .catch((error) => {
          console.error("error", error)
          alert('Time não encontrado')
          this.removeAllRounds()
        });
    }
  }

  loadTeams() {
    this.teams = JSON.parse(localStorage.getItem("@teams:")) || [];
    console.log('teams:', this.teams);
  }

  saveTeams() {
    localStorage.setItem("@teams:", JSON.stringify(this.teams));
  }

  getTeamFromLocalstorage(teamName) {
    return this.teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase());
  }

  getFavoriteFromLocalstorage(favoriteName) {
    return this.favorites.find((favorite) => favorite.name.toLowerCase() === favoriteName.toLowerCase());
  }

  addFavorite(teamName){
    const {code, logo, id, name} = this.getTeamFromLocalstorage(teamName)
    this.favorites = [...this.favorites, {code, logo, id, name}]
    this.saveFavorites()
  }

  removeFavorite(name) {
    const {id} = this.getTeamFromLocalstorage(name)
    const array = this.favorites.filter(favorite => favorite.id !== id);  
    this.favorites = [...array]
    this.saveFavorites()
  }

  saveFavorites(){
    localStorage.setItem("@favorites:", JSON.stringify(this.favorites));
  }

  loadFavorites() {
    this.favorites = JSON.parse(localStorage.getItem("@favorites:")) || [];
    console.log('favorites:', this.favorites);
  }
}
