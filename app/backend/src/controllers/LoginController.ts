import { Request, Response } from 'express';
import LoginService from '../services/LoginService';

export default class LoginController {
  constructor(private loginService = new LoginService()) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await this.loginService.login({ email, password });

    return res.json({ token });
  }
}
