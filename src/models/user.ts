import {
  DataTypes,
  Model,
  Sequelize,
  ModelCtor,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { Cart } from './cart';
import { Token } from './token';
import { Order } from './order';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone?: string;
  public image?: string;
  public address?: string;

  // 🔗 Associations typing
  public getCarts!: HasManyGetAssociationsMixin<Cart>;
  public carts?: Cart[];

  public getTokens!: HasManyGetAssociationsMixin<Token>;
  public tokens?: Token[];

  public getOrders!: HasManyGetAssociationsMixin<Order>;
  public orders?: Order[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initUserModel = (sequelize: Sequelize): ModelCtor<User> => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer to match other FK columns
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'users', // lowercase to match other tables
      timestamps: true,
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    }
  );

  return User;
};
