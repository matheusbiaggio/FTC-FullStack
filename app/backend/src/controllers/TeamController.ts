import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) { }

  async findAll(_req: Request, res: Response) {
    const allTeams = await this.teamService.findAll();
    res.status(200).json(allTeams);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await this.teamService.findById(Number(id));
    return res.status(200).json(team);
  }
}
