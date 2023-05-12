import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import Login from '../interface/Login';
import GenerateErro from '../utils/GenerateErro';
import UserModel from '../models/UserModel';

export default class LoginService {
  constructor(private userModel = new UserModel()) { }

  async login({ email, password }: Login) {
    const user = await this.userModel.findByEmail(email);

    if (!user || !LoginService.verifyPassword(password, user.password)) {
      throw new GenerateErro(500, 'Invalid email or password');
    }

    const NewAuth = new JWT();
    const token = NewAuth.generateToken({ email, role: user.role });

    return token;
  }

  private static verifyPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
