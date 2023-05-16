// import GenerateErro from '../utils/GenerateErro';
import GenerateErro from '../utils/GenerateErro';
import IMatch from '../interface/IMatch';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
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
    const [addMatch, created] = await this.matchModel.findOrCreate(match);

    if (!created) throw new GenerateErro(404, 'Match already exists');

    return addMatch;
  }
}
