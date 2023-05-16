import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class TeamController {
  constructor(private leaderBoardService = new LeaderBoardService()) { }

  async generateBoard(req: Request, res: Response) {
    const matchesFinished = await this.leaderBoardService.generateBoard();
    return res.status(200).json(matchesFinished);
  }
}
