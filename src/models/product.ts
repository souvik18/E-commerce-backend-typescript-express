import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import { CartItem } from './cart_items';
import { OrderItem } from './order_item';

export interface ProductAttributes {
  id: number;
  name: string;
  price: number;
  image?: string;
  imagePath?: string;
  imageSize?: number;
}

export interface ProductCreationAttributes extends Optional<
  ProductAttributes,
  'id' | 'image' | 'imagePath' | 'imageSize'
> {}

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number;
  public name!: string;
  public price!: number;
  public image?: string;
  public imagePath?: string;
  public imageSize?: number;

  // 🔗 Associations typing
  public getCartItems!: HasManyGetAssociationsMixin<CartItem>;
  public cartItems?: CartItem[];

  public getOrderItems!: HasManyGetAssociationsMixin<OrderItem>;
  public orderItems?: OrderItem[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
export const initProductModel = (sequelize: Sequelize) => {
  Product.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageSize: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'products',
      timestamps: true,
      // createdAt: 'created_at',
      // updatedAt: 'updated_at',
    }
  );

  return Product;
};
