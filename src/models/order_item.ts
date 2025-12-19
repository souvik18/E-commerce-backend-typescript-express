import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { Order } from './order';
import { Product } from './product';

export interface OrderItemAttributes {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface OrderItemCreationAttributes extends Optional<
  OrderItemAttributes,
  'id' | 'quantity'
> {}

export class OrderItem
  extends Model<OrderItemAttributes, OrderItemCreationAttributes>
  implements OrderItemAttributes
{
  public id!: number;
  public orderId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;

  // 🔗 Associations
  public getOrder!: BelongsToGetAssociationMixin<Order>;
  public order?: Order;

  public getProduct!: BelongsToGetAssociationMixin<Product>;
  public product?: Product;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
export const initOrderItemModel = (sequelize: Sequelize) => {
  OrderItem.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer
        autoIncrement: true,
        primaryKey: true,
      },
      orderId: {
        type: DataTypes.INTEGER, // signed integer, FK to Order
        allowNull: false,
      },
      productId: {
        type: DataTypes.INTEGER, // signed integer, FK to Product
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'order_items',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return OrderItem;
};
