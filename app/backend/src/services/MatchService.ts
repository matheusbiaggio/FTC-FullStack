// import GenerateErro from '../utils/GenerateErro';
import GenerateErro from '../utils/GenerateErro';
import IMatch from '../interface/IMatch';
import MatchModel from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

  async findAll(inProgress?: string | undefined) {
    if (inProgress !== undefined) {
      const inProgressVerify = inProgress === 'true';
      const matchesInProgress = await this.matchModel.findAllInProgress(inProgressVerify);
      return matchesInProgress;
    }
    const allMatch = await this.matchModel.findAll();
    return allMatch;
  }

  async finishMatch(id: number) {
    await this.matchModel.finishMatch(id);
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.matchModel.updateMatch(id, homeTeamGoals, awayTeamGoals);
  }

  async create(match: IMatch) {
    if (match.homeTeamId === match.awayTeamId) {
      throw new GenerateErro(422, 'It is not possible to create a match with two equal teams');
    }

    const idHome = await this.teamModel.findById(Number(match.homeTeamId));
    const idAway = await this.teamModel.findById(Number(match.awayTeamId));

    if (!idHome || !idAway) throw new GenerateErro(404, 'There is no team with such id!');

    const [addMatch, created] = await this.matchModel.findOrCreate(match);

    if (!created) throw new GenerateErro(404, 'Match already exists');

    return addMatch;
  }
}
