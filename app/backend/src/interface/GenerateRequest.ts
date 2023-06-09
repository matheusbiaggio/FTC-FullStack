import { Request } from 'express';
import IUser from './IUser';

export default interface GenerateRequest extends Request {
  user?: IUser;
}
