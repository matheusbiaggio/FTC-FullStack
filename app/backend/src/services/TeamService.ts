import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  async getAll() {
    const allTeams = await this.teamModel.getAll();
    return allTeams;
  }
}
