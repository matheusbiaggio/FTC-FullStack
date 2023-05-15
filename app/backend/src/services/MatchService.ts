// import GenerateErro from '../utils/GenerateErro';
import MatchModel from '../models/MatchModel';

export default class MatchService {
  constructor(
    private matchModel = new MatchModel(),
  ) { }

  async findAll() {
    const allMatch = await this.matchModel.findAll();
    return allMatch;
  }
}
