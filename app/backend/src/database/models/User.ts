import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

User.init({
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  modelName: 'users',
  underscored: true,
  sequelize: db,
  timestamps: false,
});

export default User;
