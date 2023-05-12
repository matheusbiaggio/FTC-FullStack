import { Response, NextFunction } from 'express';
import AuthJWT from '../utils/JWT';
import GenerateRequest from '../interface/GenerateRequest';
import IUser from '../interface/IUser';

export default class TokenValidation {
  public static verify(req: GenerateRequest, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = new AuthJWT().validateToken<IUser>(authorization);
    req.user = token;

    next();
  }
}
