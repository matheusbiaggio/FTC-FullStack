import Match from '../database/models/Match';

export default class MatchModel {
  constructor(private match = Match) {}

  async findAll() {
    const allMatch = await this.match.scope('withTeams').findAll();
    return allMatch;
  }

  // async create(teamName: string) {
  //   const team = await this.create({ teamName });
  //   return team;
  // }

  // async finById(id: number) {
  //   const team = await this.team.findByPk(id);
  //   return team;
  // }

  // async update(id: number, teamName: string) {
  //   const team = await this.update({ teamName }, { where: { id } });
  //   return team;
  // }

  // async delete(id: number) {
  //   const team = await this.destroy({ where: { id } });
  //   return team;
  // }
}
