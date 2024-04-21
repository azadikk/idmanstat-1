export const api = {
  popular_and_all_leagues: "http://127.0.0.1:8000/flash/api/popular-and-all-leagues/",
  popular_and_all_countries: "http://127.0.0.1:8000/flash/api/popular-and-all-countries/",
  get_country_and_league: "http://127.0.0.1:8000/flash/api/get-country-league/",
  teams_countries: "https://api-football-v1.p.rapidapi.com/v3/teams/countries",
  fixtures: "https://api-football-v1.p.rapidapi.com/v3/fixtures",
  fixtures_events: "https://api-football-v1.p.rapidapi.com/v3/fixtures/events",
  odds: "https://api-football-v1.p.rapidapi.com/v3/odds",
  emoji_api: "https://emoji-api.com/emojis?access_key=aaf150f2a4297709ed23426001ed2eec0943c2b3",
};

export const postApiEndpoints = {
  matchtips: "http://localhost:8000/flash/api/match-tip/",
  userlogin: "http://127.0.0.1:8000/account/api/user-login/",
  user_register: "http://127.0.0.1:8000/account/api/user-register/",
};

export const putApiEndpoints = {
  change_username_nationality: "http://localhost:8000/account/api/change-nationality-username/",
};
