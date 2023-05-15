import Match from '../database/models/Match';

export default class MatchModel {
  constructor(private match = Match) {}

  async findAll() {
    const allMatch = await this.match.scope('withTeams').findAll();
    return allMatch;
  }

  async findAllInProgress(inProgress: boolean) {
    const matchesInProgress = await this.match.scope('withTeams').findAll({
      where: {
        inProgress,
      },
    });
    return matchesInProgress;
  }

  async finishMatch(id: number) {
    return this.match.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    return this.match.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  // async create(teamName: string) {
  //   const team = await this.create({ teamName });
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
