import { FootballApi } from "./FootballApi.js";

export class Teams {
  constructor(root) {
    this.root = document.querySelector(root);
    this.fixtureContainer = this.root.querySelector("#fixtures-container");
    this.footballApi = new FootballApi();
    this.load();
  }

  add(teamName) {
    const team = this.getTeamFromLocalstorage(teamName);
    console.log(team);
    if (team) {
      this.footballApi.searchTeamFixtures(team.id).then((fixtures) => {
        console.log(fixtures);
        this.removeAllRounds()
        this.displayTeams(fixtures)
      });
    } else {
      this.footballApi
        .searchTeam(teamName)
        .then((team) => {
          const { logo, id, name, country, code } = team;
          this.teams = [...this.teams, { logo, id, name, country, code }];
          console.log('salvando...');
          this.save();

          this.footballApi.searchTeamFixtures(id).then((fixtures) => {
            console.log(fixtures);
            this.removeAllRounds()
            this.displayTeams(fixtures)
          });
        })
        .catch((error) => console.error("error", error));
    }
  }

  load() {
    this.teams = JSON.parse(localStorage.getItem("@teams:")) || [];
    console.log(this.teams);
  }

  save() {
    localStorage.setItem("@teams:", JSON.stringify(this.teams));
  }

  getTeamFromLocalstorage(teamName) {
    return this.teams.find((team) => team.name.toLowerCase() === teamName.toLowerCase());
  }
}
