import { DataTypes, Model } from 'sequelize';
import db from '.';

class TeamModel extends Model {
  declare teamName: string;
}

TeamModel.init({
  teamName: {
    allowNull: false,
    type: DataTypes.STRING,
  }
}, {
  tableName: 'TRYBE_FUTEBOL_CLUBE',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default TeamModel;