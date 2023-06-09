import Team from '../database/models/Team';

export default class TeamModel {
  constructor(private team = Team) {}

  async findAll() {
    const teams = await this.team.findAll();
    return teams;
  }

  // async create(teamName: string) {
  //   const team = await this.create({ teamName });
  //   return team;
  // }

  async findById(id: number) {
    const team = await this.team.findByPk(id);
    return team;
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
