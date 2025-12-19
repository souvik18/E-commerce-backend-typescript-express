import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { OrderItem } from './order_item';
import { User } from './user';

export interface OrderAttributes {
  id: number;
  userId: number;
  status: 'pending' | 'completed' | 'cancelled';
  totalAmount: number;
}

export interface OrderCreationAttributes extends Optional<
  OrderAttributes,
  'id' | 'status' | 'totalAmount'
> {}

export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public userId!: number;
  public status!: 'pending' | 'completed' | 'cancelled';
  public totalAmount!: number;

  // 🔗 Association typing
  public getItems!: HasManyGetAssociationsMixin<OrderItem>;
  public items?: OrderItem[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export const initOrderModel = (sequelize: Sequelize) => {
  Order.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER, // signed integer
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'pending',
      },
      totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: 'orders',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Order;
};
