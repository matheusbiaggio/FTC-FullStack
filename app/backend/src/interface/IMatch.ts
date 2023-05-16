type TeamName = {
  teamName: string
};

export default interface IMatch {
  homeTeamId: number;
  awayTeamId: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam?: TeamName;
  awayTeam?: TeamName;
}
