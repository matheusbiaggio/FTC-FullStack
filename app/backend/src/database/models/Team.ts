import { DataTypes, Model } from 'sequelize';
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

export default Team;
