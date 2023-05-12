import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import 'express-async-errors';
import GenerateRequest from '../interface/GenerateRequest';
import IUser from '../interface/IUser';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.loginService.login({ email, password });

    return res.json({ token });
  }

  static async userRole(req: GenerateRequest, res: Response) {
    const { role } = req.user as IUser;

    return res.status(200).json({ role });
  }
}
