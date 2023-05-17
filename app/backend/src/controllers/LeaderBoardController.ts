import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class TeamController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  async generateBoardHome(req: Request, res: Response) {
    const matchesFinished = await this.leaderBoardService.generateBoardHome();
    return res.status(200).json(matchesFinished);
  }

  async generateBoardAway(req: Request, res: Response) {
    const matchesFinished = await this.leaderBoardService.generateBoardAway();
    return res.status(200).json(matchesFinished);
  }
}
