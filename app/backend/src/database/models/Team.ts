import { DataTypes, Model } from 'sequelize';
import Match from './Match';
import db from '.';

class Team extends Model {
  declare teamName: string;
}

Team.init({
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  modelName: 'teams',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Team.hasMany(Match, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Team.hasMany(Match, { foreignKey: 'awayTeamId', as: 'awayTeam' });

export default Team;
