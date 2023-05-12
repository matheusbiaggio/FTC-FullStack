import User from '../database/models/User';

export default class UserModel {
  constructor(private user = User) { }

  async findAll() {
    const users = await this.user.findAll();
    return users;
  }

  // async create(teamName: string) {
  //   const team = await this.create({ teamName });
  //   return team;
  // }

  async findById(id: number) {
    const user = await this.user.findByPk(id);
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.user.findOne({ where: { email } });
    return user;
  }

  // async update(id: number, teamName: string) {
  //   const team = await this.update({ teamName }, { where: { id } });
  //   return team;
  // }

  // async delete(id: number) {
  //   const team = await this.destroy({ where: { id } });
  //   return team;
  // }
}
