import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const allMatch = await this.matchService.findAll(inProgress as string | undefined);
    res.status(200).json(allMatch);
  }
}
