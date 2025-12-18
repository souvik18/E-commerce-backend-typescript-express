import { ModelCtor } from 'sequelize';
import { initUserModel, User } from './user';
import { initTokenModel, Token } from './token';
import sequelize from '../config/database';

interface DB {
  sequelize: typeof sequelize;
  Sequelize: typeof import('sequelize').Sequelize;
  User: ModelCtor<User>;
  Token: ModelCtor<Token>;
  [key: string]: any;
}

const db = {} as DB;

// Initialize models
db.User = initUserModel(sequelize);
db.Token = initTokenModel(sequelize);

// Associations
db.User.hasMany(db.Token, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: 'tokens',
});

db.Token.belongsTo(db.User, {
  targetKey: 'id',
  foreignKey: 'user_id',
  as: 'user',
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize').Sequelize;

export default db;
