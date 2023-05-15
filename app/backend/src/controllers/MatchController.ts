import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatch = await this.matchService.findAll(inProgress as string | undefined);
    res.status(200).json(allMatch);
  }

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matchService
      .updateMatch(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
    res.status(200).json({ message: 'Update' });
  }
}
