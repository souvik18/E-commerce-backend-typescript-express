import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { Cart } from './cart';
import { Product } from './product';

export interface CartItemAttributes {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface CartItemCreationAttributes extends Optional<
  CartItemAttributes,
  'id' | 'quantity'
> {}

export class CartItem
  extends Model<CartItemAttributes, CartItemCreationAttributes>
  implements CartItemAttributes
{
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
  public price!: number;

  // 🔗 Associations
  public getCart!: BelongsToGetAssociationMixin<Cart>;
  public cart?: Cart;

  public getProduct!: BelongsToGetAssociationMixin<Product>;
  public product?: Product;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
export const initCartItemModel = (sequelize: Sequelize) => {
  CartItem.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer
        autoIncrement: true,
        primaryKey: true,
      },
      cartId: {
        type: DataTypes.INTEGER, // signed integer, FK to Cart
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
      tableName: 'cart_item', // plural for consistency
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return CartItem;
};
