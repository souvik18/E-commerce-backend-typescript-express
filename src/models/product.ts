import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public image?: string;
  public imagePath?: string;
  public imageSize?: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
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
    tableName: 'Products',
    timestamps: true,
  }
);

export default Product;
