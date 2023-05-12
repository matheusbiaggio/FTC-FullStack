import GenerateErro from '../utils/GenerateErro';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel = new TeamModel(),
  ) { }

  async findAll() {
    const allTeams = await this.teamModel.findAll();
    return allTeams;
  }

  async findById(id: number) {
    const team = await this.teamModel.finById(id);

    if (!team) throw new GenerateErro(401, 'Team not found');

    return team;
  }
}
