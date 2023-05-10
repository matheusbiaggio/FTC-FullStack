import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  async getAll(req: Request, res: Response) {
    const allTeams = await this.teamService.getAll();
    res.status(200).json(allTeams);
  }
}
