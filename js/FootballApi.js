export class FootballApi {
  constructor() {
    const headers = {
      "x-rapidapi-key": "19ae334f3f724e1c99c54e0aa871ee2c",
      "x-rapidapi-host": "v3.football.api-sports.io",
    };

    this.requestOptions = {
      method: "GET",
      headers,
    };
  }

  searchTeam(team) {
    const endpoint = `https://v3.football.api-sports.io/teams?name=${team}&country=brazil`;

    return fetch(endpoint, this.requestOptions)
      .then((data) => data.json())
      .then((result) => {
        const [response] = result.response;
        const { team } = response;
        console.log(team);
        return team;
      });
  }
  searchTeamFixtures(id) {
    const endpoint = `https://v3.football.api-sports.io/fixtures?
    season=2023&league=71&team=${id}&timezone=America/Sao_Paulo`;

    return fetch(endpoint, this.requestOptions)
      .then((data) => data.json())
      .then((result) => {
        console.log(result);
        const {response} = result
        return response
      });
  }
}
