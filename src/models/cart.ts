import {
  Model,
  DataTypes,
  Sequelize,
  Optional,
  HasManyGetAssociationsMixin,
  BelongsToGetAssociationMixin,
} from 'sequelize';
import { CartItem } from './cart_items';
import { User } from './user';

export interface CartAttributes {
  id: number;
  user_id: number;
  status: 'active' | 'ordered' | 'abandoned';
}

export interface CartCreationAttributes extends Optional<
  CartAttributes,
  'id' | 'status'
> {}

export class Cart
  extends Model<CartAttributes, CartCreationAttributes>
  implements CartAttributes
{
  public id!: number;
  public user_id!: number;
  public status!: 'active' | 'ordered' | 'abandoned';

  // 🔗 Associations
  public getItems!: HasManyGetAssociationsMixin<CartItem>;
  public items?: CartItem[];

  public getUser!: BelongsToGetAssociationMixin<User>;
  public user?: User;

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize model
export const initCartModel = (sequelize: Sequelize) => {
  Cart.init(
    {
      id: {
        type: DataTypes.INTEGER, // signed integer
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER, // signed integer, FK to User
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('active', 'ordered', 'abandoned'),
        allowNull: false,
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      tableName: 'carts',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );

  return Cart;
};
