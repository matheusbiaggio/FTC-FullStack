import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  constructor(private matchService = new MatchService()) { }

  async findAll(_req: Request, res: Response) {
    const allMatch = await this.matchService.findAll();
    res.status(200).json(allMatch);
  }
}
